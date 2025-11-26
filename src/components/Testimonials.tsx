import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Anh Minh Tuấn",
      role: "CEO, TechStart Vietnam",
      company: "Công ty Công nghệ TechStart",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      content: "ASL LAW đã giúp chúng tôi bảo hộ thành công nhãn hiệu cho 3 sản phẩm chính. Quy trình tư vấn rất chuyên nghiệp, đội ngũ luật sư nhiệt tình và kinh nghiệm. Tôi hoàn toàn yên tâm giới thiệu ASL LAW cho các doanh nghiệp khác.",
      rating: 5,
    },
    {
      name: "Chị Nguyễn Thị Hương",
      role: "Founder, Bella Fashion",
      company: "Thời trang Bella",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      content: "Dịch vụ tư vấn miễn phí rất hữu ích, giúp tôi hiểu rõ quy trình đăng ký nhãn hiệu. ASL LAW đã hỗ trợ chúng tôi từ khâu tra cứu đến hoàn tất thủ tục. Chỉ sau 8 tháng, nhãn hiệu của chúng tôi đã được cấp Giấy chứng nhận.",
      rating: 5,
    },
    {
      name: "Anh David Chen",
      role: "Managing Director",
      company: "International Food Group",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      content: "As a foreign investor, I was impressed by ASL LAW's professional service and international perspective. They guided us through the entire trademark registration process seamlessly. Their expertise in both local and international IP law is exceptional.",
      rating: 5,
    },
    {
      name: "Chị Lê Thị Mai",
      role: "Giám đốc Marketing",
      company: "VietEco Solutions",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      content: "Đội ngũ ASL LAW luôn cập nhật tiến độ kịp thời và giải đáp mọi thắc mắc của chúng tôi một cách nhanh chóng. Đặc biệt ấn tượng với dịch vụ hỗ trợ bằng cả tiếng Việt và tiếng Anh. Rất đáng tin cậy!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-lg text-muted-foreground">
            Hơn 500+ doanh nghiệp tin tưởng dịch vụ của ASL LAW
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-primary/20 mb-4" />

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                  loading="lazy"
                  width={56}
                  height={56}
                />
                <div>
                  <h4 className="font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-accent font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Khách hàng hài lòng</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
            <p className="text-muted-foreground">Năm kinh nghiệm</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-muted-foreground">Tỷ lệ thành công</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24h</div>
            <p className="text-muted-foreground">Phản hồi nhanh</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
