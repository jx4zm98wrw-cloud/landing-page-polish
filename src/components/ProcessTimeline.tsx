import { Search, FileText, CheckCircle, Award } from "lucide-react";

const ProcessTimeline = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Tra cứu & Tư vấn",
      duration: "1-2 ngày",
      description: "Miễn phí tra cứu khả năng đăng ký. Đánh giá rủi ro và tư vấn chiến lược bảo hộ phù hợp với mục tiêu cùng ngân sách kinh doanh của doanh nghiệp.",
      details: [
        "Tra cứu sơ bộ miễn phí",
        "Đánh giá xung đột tiềm ẩn",
        "Tư vấn nhóm ngành nghề",
        "Báo giá chi tiết dịch vụ",
      ],
    },
    {
      number: "02",
      icon: FileText,
      title: "Ký Hợp đồng & Nộp Đơn",
      duration: "3-5 ngày",
      description: "Ký kết hợp đồng dịch vụ, chuẩn bị bộ hồ sơ chuẩn hóa và thực hiện nộp đơn tại Cục Sở Hữu Trí Tuệ, bảo đảm toàn bộ quy trình tuân thủ đúng quy định pháp luật.",
      details: [
        "Ký hợp đồng dịch vụ",
        "Chuẩn bị hồ sơ đăng ký",
        "Nộp đơn tại Cục SHTT",
        "Nhận Giấy chứng nhận nộp đơn",
      ],
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Theo Dõi & Thẩm Định",
      duration: "6-12 tháng",
      description: "Theo dõi tiến trình thẩm định, xử lý yêu cầu phát sinh từ Cục Sở Hữu Trí Tuệ nếu có và cập nhật tiến độ định kỳ, giúp khách hàng nắm rõ tình trạng hồ sơ.",
      details: [
        "Theo dõi thẩm định hình thức",
        "Theo dõi thẩm định nội dung",
        "Phản hồi yêu cầu (nếu có)",
        "Cập nhật tiến độ định kỳ",
      ],
    },
    {
      number: "04",
      icon: Award,
      title: "Nhận Văn Bằng & Bảo Hộ",
      duration: "Tháng 12-18",
      description: "Nhận Giấy chứng nhận đăng ký nhãn hiệu, được hướng dẫn sử dụng đúng quy chuẩn và được hỗ trợ gia hạn, duy trì bảo hộ ổn định trong tương lai.",
      details: [
        "Nhận Giấy chứng nhận đăng ký",
        "Hướng dẫn sử dụng văn bằng",
        "Tư vấn chiến lược bảo hộ",
        "Hỗ trợ gia hạn và duy trì",
      ],
    },
  ];

  return (
    <section id="process" className="py-20 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quy Trình Đăng Ký Nhãn Hiệu
          </h2>
          <p className="text-lg text-muted-foreground">
            4 bước đơn giản - Minh bạch tiến độ - Cam kết chất lượng
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Node - Desktop */}
                <div className="hidden lg:block absolute top-20 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background shadow-medium z-10" />

                {/* Card */}
                <div className="glass-effect rounded-2xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-2 mt-12 lg:mt-0">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-primary font-bold mb-1">
                        BƯỚC {step.number}
                      </div>
                      <div className="text-xs text-accent font-semibold">
                        ⏱ {step.duration}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Bắt đầu quy trình đăng ký ngay hôm nay
          </p>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("hero");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Tư vấn miễn phí ngay
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
