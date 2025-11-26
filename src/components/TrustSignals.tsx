import { Award, Shield, Users, TrendingUp } from "lucide-react";

const TrustSignals = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Doanh nghiệp tin tưởng",
      description: "Được các công ty hàng đầu lựa chọn",
    },
    {
      icon: Award,
      number: "15+",
      label: "Năm kinh nghiệm",
      description: "Hoạt động trong lĩnh vực SHTT",
    },
    {
      icon: Shield,
      number: "98%",
      label: "Tỷ lệ thành công",
      description: "Hồ sơ được cấp văn bằng",
    },
    {
      icon: TrendingUp,
      number: "1000+",
      label: "Nhãn hiệu bảo hộ",
      description: "Đã hỗ trợ đăng ký thành công",
    },
  ];

  const badges = [
    {
      title: "Đại diện SHTT được Cấp phép",
      description: "Cục SHTT công nhận",
      icon: Award,
    },
    {
      title: "Chứng nhận ISO 9001:2015",
      description: "Quản lý chất lượng quốc tế",
      icon: Shield,
    },
    {
      title: "Top 10 Công ty SHTT",
      description: "Việt Nam năm 2024",
      icon: TrendingUp,
    },
  ];

  const clientLogos = [
    "TechStart", "Bella Fashion", "VietEco", "Food Group",
    "Smart Solutions", "Green Energy", "Digital Agency", "Retail Group"
  ];

  return (
    <section id="trust-signals" className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tại sao chọn ASL LAW?
          </h2>
          <p className="text-lg text-muted-foreground">
            Những con số nói lên uy tín và chất lượng dịch vụ
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-6 text-center hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Chứng nhận & Giải thưởng
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 hover:shadow-medium transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <badge.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {badge.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Đối tác tin cậy của các thương hiệu
          </h3>
          <div className="glass-effect rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {clientLogos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 flex items-center justify-center h-20 hover:bg-secondary/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-muted-foreground font-semibold text-sm">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Bạn đã sẵn sàng bảo hộ thương hiệu của mình chưa?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Hơn 500 doanh nghiệp đã tin tưởng ASL LAW. Bạn là người tiếp theo!
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
            className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Nhận tư vấn miễn phí ngay
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
