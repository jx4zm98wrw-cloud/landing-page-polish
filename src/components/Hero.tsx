import { CheckCircle2 } from "lucide-react";
import ContactForm from "./ContactForm";
import heroImage from "@/assets/hero-office.jpg";

const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 bg-gradient-to-br from-background to-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Đăng ký <span className="text-primary">Bảo hộ Nhãn hiệu</span>
              <br />
              Toàn diện – Nhanh chóng – Hiệu quả
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground">
              Bảo vệ thương hiệu của bạn với đội ngũ luật sư SHTT được xếp hạng quốc tế.
            </p>

            <ul className="space-y-4">
              {[
                "Đại diện Sở hữu Công nghiệp được Cục SHTT cấp phép",
                "Tra cứu đánh giá khả năng bảo hộ miễn phí",
                "Quy trình tiêu chuẩn quốc tế – Minh bạch tiến độ",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block">
              <img
                src={heroImage}
                alt="Professional law office"
                className="rounded-2xl shadow-medium w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-fade-in">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
