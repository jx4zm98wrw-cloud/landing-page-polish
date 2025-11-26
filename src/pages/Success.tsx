import { CheckCircle2, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-medium text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Gửi thông tin thành công!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Cảm ơn bạn đã tin tưởng dịch vụ của ASL LAW. Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong vòng 24 giờ.
          </p>

          {/* What Happens Next */}
          <div className="bg-secondary/50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-xl font-bold mb-4 text-center">Quy trình tiếp theo:</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Chuyên viên tư vấn liên hệ</h4>
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi sẽ gọi điện hoặc email để tìm hiểu nhu cầu của bạn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Phân tích miễn phí</h4>
                  <p className="text-sm text-muted-foreground">
                    Đánh giá nhãn hiệu và tư vấn chiến lược bảo hộ phù hợp
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Báo giá chi tiết</h4>
                  <p className="text-sm text-muted-foreground">
                    Gửi báo giá và hướng dẫn thủ tục chi tiết
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-xl">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+84914195266" className="font-semibold hover:text-primary">
                (+84) 914 195 266
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-xl">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:info@aslaw.vn" className="font-semibold hover:text-primary">
                info@aslaw.vn
              </a>
            </div>
          </div>

          {/* Time Reminder */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <Clock className="w-4 h-4" />
            <span>Thời gian làm việc: Thứ 2 - Thứ 6 (8:00 - 18:00)</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href="tel:+84914195266">
                <Phone className="w-5 h-5" />
                Gọi ngay
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                Về trang chủ
              </Link>
            </Button>
          </div>

          {/* Additional Note */}
          <p className="text-xs text-muted-foreground mt-6">
            Nếu cần hỗ trợ ngay, vui lòng gọi hotline. Chúng tôi luôn sẵn sàng tư vấn miễn phí 24/7.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
