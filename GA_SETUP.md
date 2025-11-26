# Google Analytics 4 Setup Guide

## Quick Setup

To activate Google Analytics tracking, you need to replace the placeholder tracking ID in two files:

### 1. Update `src/lib/analytics.ts`
Replace line 2:
```typescript
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 tracking ID
```

With your actual tracking ID:
```typescript
export const GA_TRACKING_ID = 'G-1234567890'; // Your actual GA4 tracking ID
```

### 2. Update `index.html`
Replace lines 101 and 106:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

And:
```javascript
gtag('config', 'G-XXXXXXXXXX');
```

With your actual tracking ID.

## How to Get Your GA4 Tracking ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" (gear icon)
4. Click "Create Account" (if you don't have one)
5. Fill in your account name (e.g., "ASL LAW")
6. Create a property for your website
7. Enter your website name and URL (e.g., https://asllaw.vn)
8. Select your industry and timezone
9. After creation, you'll get a Measurement ID (format: G-XXXXXXXXXX)

## Events Being Tracked

### 1. Page Views
- Automatically tracks when users navigate to different sections
- Tracks page loads and hash changes

### 2. Form Submissions
- Tracked when users successfully submit the contact form
- Event name: `form_submit`
- Parameters:
  - `form_name`: "contact_form"
  - `form_location`: "landing_page"
  - `has_email`: boolean
  - `has_message`: boolean

### 3. CTA Clicks (if implemented)
- Tracked when users click CTA buttons
- Event name: `cta_click`
- Parameters:
  - `cta_name`: name of the button
  - `cta_location`: where the button is located

## Testing Your Setup

1. After updating the tracking IDs, rebuild your site:
   ```bash
   npm run build
   ```

2. Open your site and submit the contact form

3. Check Google Analytics Real-Time reports:
   - Go to Analytics → Reports → Realtime
   - You should see active users and events

4. Check the Events report after 24-48 hours:
   - Go to Analytics → Reports → Engagement → Events

## Important Notes

- The current setup uses placeholder ID `G-XXXXXXXXXX`
- **You MUST replace this with your actual GA4 tracking ID for tracking to work**
- All form submissions and page views are tracked
- Events will appear in your Analytics dashboard after a few minutes

## Custom Events

You can add more custom events by using the `trackEvent` function from `src/lib/analytics.ts`:

```typescript
import { trackEvent } from "@/lib/analytics";

// Track any custom event
trackEvent('custom_event_name', {
  event_param_1: 'value1',
  event_param_2: 'value2'
});
```
