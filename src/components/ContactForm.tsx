import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackContactFormSubmission } from "@/lib/analytics";
import { Upload, X, FileImage, Loader2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên").max(100, "Họ tên quá dài"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ").max(15, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  trademark: z.string().min(2, "Vui lòng nhập tên thương hiệu").max(200, "Tên thương hiệu quá dài"),
  message: z.string().max(1000, "Nội dung quá dài").optional(),
  logo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  isCompact?: boolean;
}

const ContactForm = ({ isCompact = false }: ContactFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      trademark: "",
      message: "",
      logo: undefined,
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "File không hợp lệ",
          description: "Vui lòng chọn file hình ảnh",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File quá lớn",
          description: "Kích thước file tối đa là 5MB",
          variant: "destructive",
        });
        return;
      }

      setLogoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    form.setValue('logo', undefined);
    const input = document.getElementById('logo-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Prepare submission data
      const submissionData: any = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        trademark: data.trademark,
        message: data.message,
      };

      // Add logo if uploaded
      if (logoFile) {
        submissionData.logo = await convertFileToBase64(logoFile);
        submissionData.logoName = logoFile.name;
        submissionData.logoType = logoFile.type;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        // Track form submission
        trackContactFormSubmission(data);

        // Reset form and logo
        form.reset();
        setLogoFile(null);
        setLogoPreview(null);

        // Navigate to success page
        navigate('/success');
      } else {
        throw new Error(result.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau hoặc liên hệ trực tiếp qua số điện thoại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-medium">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
        {isCompact ? "Liên hệ ngay" : "NHẬN TƯ VẤN MIỄN PHÍ"}
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Thông tin của bạn được bảo mật 100%</span>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Họ và tên *" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Số điện thoại *" type="tel" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email (không bắt buộc)" type="email" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trademark"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Tên thương hiệu cần bảo hộ *" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Logo thương hiệu (không bắt buộc)
            </label>
            {!logoPreview ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="p-3 bg-secondary rounded-full">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-primary">Click để tải lên</span> hoặc kéo thả file
                  </div>
                  <div className="text-xs text-muted-foreground">
                    PNG, JPG, GIF tối đa 5MB
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative border rounded-lg p-4 bg-secondary/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{logoFile?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(logoFile!.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeLogo}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {!isCompact && (
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Mô tả vấn đề của bạn (không bắt buộc)" 
                      {...field} 
                      className="min-h-24 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Đang gửi thông tin...
                </>
              ) : (
                "🚀 Gửi thông tin tư vấn miễn phí"
              )}
            </Button>

            {/* Response Time Promise */}
            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <span>⏱</span>
              Chúng tôi sẽ liên hệ trong vòng 24 giờ
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
