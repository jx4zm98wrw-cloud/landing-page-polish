import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { trackPageView } from "./lib/analytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Success from "./pages/Success";

// Lazy load admin pages for code splitting
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminSubmissionDetail = lazy(() => import("./pages/AdminSubmissionDetail"));

const queryClient = new QueryClient();

// Component to track page views on route changes
const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.hash);
  }, [location]);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/submissions/:id" element={<AdminSubmissionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  // Initialize Web Vitals monitoring on app startup
  useEffect(() => {
    import("./lib/web-vitals").then(({ initWebVitals }) => {
      initWebVitals();
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="asllaw-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
