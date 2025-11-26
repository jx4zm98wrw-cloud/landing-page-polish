import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  isCompact?: boolean;
}

const ContactForm = ({ isCompact = false }: ContactFormProps) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      trademark: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate form submission
    console.log("Form submitted:", data);
    
    toast({
      title: "Gửi thông tin thành công!",
      description: "ASL LAW sẽ liên hệ với bạn sớm nhất có thể.",
    });

    form.reset();
  };

  return (
    <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-medium">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
        {isCompact ? "Liên hệ ngay" : "NHẬN TƯ VẤN MIỄN PHÍ"}
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <Button
            type="submit"
            className="w-full h-12 text-base font-bold"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
