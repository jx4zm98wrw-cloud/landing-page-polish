import { Phone, Mail, Globe, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

const Contact = () => {
  const offices = [
    {
      city: "Hà Nội",
      address: "Tầng 12, Toà nhà 319 Bộ Quốc Phòng, 63 Lê Văn Lương, Phường Yên Hoà, Hà Nội",
    },
    {
      city: "TP. Hồ Chí Minh",
      address: "Tầng 2, Số 21–23 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh",
    },
    {
      city: "Singapore",
      address: "1 Raffles Place, #19, One Raffles Place, Singapore (048616)",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Liên hệ ngay</h2>
              <p className="text-lg text-muted-foreground">
                Đội ngũ luật sư của ASL LAW luôn sẵn sàng hỗ trợ bạn
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Hotline</h4>
                  <a href="tel:+84914195266" className="text-primary font-semibold hover:underline">
                    (+84) 914 195 266
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <a href="mailto:info@aslaw.vn" className="text-primary font-semibold hover:underline">
                    info@aslaw.vn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Website</h4>
                  <a
                    href="https://www.baohothuonghieu.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    www.baohothuonghieu.net
                  </a>
                </div>
              </div>

              {offices.map((office, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Văn phòng {office.city}</h4>
                    <p className="text-muted-foreground">{office.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <ContactForm isCompact={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
