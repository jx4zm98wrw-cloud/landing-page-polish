import { Shield, Search, Award, Clock, DollarSign } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Dịch vụ trọn gói",
      description: "Xử lý toàn bộ quy trình từ A–Z, bạn không cần thực hiện bất kỳ thủ tục nào.",
    },
    {
      icon: Search,
      title: "Tra cứu miễn phí",
      description: "Đánh giá chính xác khả năng đăng ký — giảm tối đa rủi ro bị từ chối.",
    },
    {
      icon: Award,
      title: "Kinh nghiệm chuyên sâu",
      description: "Đội ngũ luật sư được xếp hạng bởi các tổ chức quốc tế hàng đầu.",
    },
    {
      icon: Clock,
      title: "Tiến độ nhanh chóng",
      description: "Quy trình được tối ưu hóa — minh bạch — cập nhật liên tục theo từng giai đoạn.",
    },
    {
      icon: DollarSign,
      title: "Chi phí tối ưu",
      description: "Giải pháp hợp lý, phù hợp với doanh nghiệp mọi quy mô.",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Những lợi ích vượt trội</h2>
          <p className="text-lg text-muted-foreground">
            Đối tác pháp lý chiến lược trong mọi vấn đề về Sở hữu trí tuệ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
