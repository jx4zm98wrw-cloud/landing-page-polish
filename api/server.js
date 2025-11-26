import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const dataFile = path.join(__dirname, 'submissions.json');

// Helper function to read submissions
async function readSubmissions() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write submissions
async function writeSubmissions(submissions) {
  await fs.writeFile(dataFile, JSON.stringify(submissions, null, 2));
}

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, trademark, message, logo, logoName, logoType } = req.body;

    // Validate required fields
    if (!name || !phone || !trademark) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      });
    }

    // Create submission object
    const submission = {
      id: Date.now().toString(),
      name,
      phone,
      email: email || '',
      trademark,
      message: message || '',
      timestamp: new Date().toISOString(),
      source: 'landing-page',
      status: 'new', // Default status for new submissions
      logo: logo || null, // Base64 encoded logo
      logoName: logoName || null, // Original file name
      logoType: logoType || null, // MIME type
    };

    // Read existing submissions
    const submissions = await readSubmissions();

    // Add new submission
    submissions.push(submission);

    // Write back to file
    await writeSubmissions(submissions);

    // Log to console (in production, you'd send email notifications here)
    console.log('New contact form submission:', submission);

    // Return success response
    res.json({
      success: true,
      message: 'Thông tin đã được gửi thành công! ASL LAW sẽ liên hệ với bạn sớm nhất có thể.',
      data: {
        id: submission.id,
        timestamp: submission.timestamp
      }
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
    });
  }
});

// Get submissions (for admin purposes)
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await readSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Error reading submissions:', error);
    res.status(500).json({ error: 'Failed to read submissions' });
  }
});

// Get single submission
app.get('/api/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const submissions = await readSubmissions();
    const submission = submissions.find(s => s.id === id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error reading submission:', error);
    res.status(500).json({ error: 'Failed to read submission' });
  }
});

// Update submission (status, notes)
app.patch('/api/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const submissions = await readSubmissions();
    const index = submissions.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Update fields
    if (status) submissions[index].status = status;
    if (notes !== undefined) submissions[index].notes = notes;
    submissions[index].updatedAt = new Date().toISOString();

    await writeSubmissions(submissions);

    res.json(submissions[index]);
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// Delete submission
app.delete('/api/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const submissions = await readSubmissions();
    const filteredSubmissions = submissions.filter(s => s.id !== id);

    if (filteredSubmissions.length === submissions.length) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    await writeSubmissions(filteredSubmissions);

    res.json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const submissions = await readSubmissions();

    const stats = {
      total: submissions.length,
      new: submissions.filter(s => s.status === 'new').length,
      contacted: submissions.filter(s => s.status === 'contacted').length,
      closed: submissions.filter(s => s.status === 'closed').length,
      today: submissions.filter(s => {
        const today = new Date().toDateString();
        return new Date(s.timestamp).toDateString() === today;
      }).length,
      thisWeek: submissions.filter(s => {
        const submissionDate = new Date(s.timestamp);
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return submissionDate >= weekAgo;
      }).length,
      thisMonth: submissions.filter(s => {
        const submissionDate = new Date(s.timestamp);
        const now = new Date();
        return submissionDate.getMonth() === now.getMonth() &&
               submissionDate.getFullYear() === now.getFullYear();
      }).length,
    };

    res.json(stats);
  } catch (error) {
    console.error('Error reading stats:', error);
    res.status(500).json({ error: 'Failed to read statistics' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Contact form endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`Admin endpoints:`);
  console.log(`  GET    /api/submissions - List all submissions`);
  console.log(`  GET    /api/submissions/:id - Get single submission`);
  console.log(`  PATCH  /api/submissions/:id - Update submission`);
  console.log(`  DELETE /api/submissions/:id - Delete submission`);
  console.log(`  GET    /api/stats - Get statistics`);
});
