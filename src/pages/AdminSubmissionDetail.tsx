import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  FileText,
  Calendar,
  Tag,
  MessageSquare,
  CheckCircle,
  XCircle,
  Edit,
  Image,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  trademark: string;
  message: string;
  timestamp: string;
  source: string;
  status: "new" | "contacted" | "closed";
  notes?: string;
  logo?: string;
  logoName?: string;
  logoType?: string;
}

const AdminSubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      navigate("/admin");
      return;
    }

    fetchSubmission();
  }, [id, navigate]);

  const fetchSubmission = async () => {
    try {
      const response = await fetch(`/api/submissions/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data);
        setNotes(data.notes || "");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error fetching submission:", error);
      navigate("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: "new" | "contacted" | "closed") => {
    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setSubmission({ ...submission!, status });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (response.ok) {
        // Notes saved successfully
      }
    } catch (error) {
      console.error("Error saving notes:", error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default">Mới</Badge>;
      case "contacted":
        return <Badge variant="secondary">Đã liên hệ</Badge>;
      case "closed":
        return <Badge variant="outline">Đã đóng</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!submission) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/30 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Chi tiết Submission</h1>
            <p className="text-muted-foreground">ID: {submission.id}</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Trạng thái</span>
                {getStatusBadge(submission.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={submission.status}
                onValueChange={(v) => handleStatusChange(v as any)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Mới</SelectItem>
                  <SelectItem value="contacted">Đã liên hệ</SelectItem>
                  <SelectItem value="closed">Đã đóng</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Họ tên</div>
                    <div className="font-medium">{submission.name}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Thời gian gửi</div>
                    <div className="font-medium">
                      {format(new Date(submission.timestamp), "dd/MM/yyyy HH:mm:ss", { locale: vi })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Số điện thoại</div>
                    <div className="font-medium">
                      <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                        {submission.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">
                      {submission.email ? (
                        <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                          {submission.email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Không có</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trademark Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Thông tin thương hiệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Tên thương hiệu cần bảo hộ</div>
                <div className="text-lg font-medium">{submission.trademark}</div>
              </div>
            </CardContent>
          </Card>

          {/* Logo */}
          {submission.logo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Logo thương hiệu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-64 h-64 rounded-lg overflow-hidden bg-white border flex items-center justify-center p-4">
                    <img
                      src={submission.logo}
                      alt={submission.logoName || "Logo"}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  {submission.logoName && (
                    <div className="text-sm text-muted-foreground text-center">
                      <div>Tên file: {submission.logoName}</div>
                      <div>Định dạng: {submission.logoType}</div>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = submission.logo!;
                      link.download = submission.logoName || 'logo.png';
                      link.click();
                    }}
                  >
                    Tải xuống logo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Message */}
          {submission.message && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Tin nhắn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  {submission.message}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Ghi chú nội bộ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Thêm ghi chú về khách hàng này</Label>
                <Textarea
                  id="notes"
                  placeholder="Ghi chú về cuộc gọi, email đã gửi, tiến độ xử lý..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <Button onClick={handleSaveNotes} disabled={saving}>
                {saving ? "Đang lưu..." : "Lưu ghi chú"}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hành động nhanh</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => window.open(`tel:${submission.phone}`, "_self")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Gọi điện
              </Button>
              {submission.email && (
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${submission.email}`, "_blank")}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Gửi email
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissionDetail;
