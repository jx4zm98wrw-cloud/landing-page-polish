import { Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">ASL LAW</h3>
            <p className="text-gray-300 leading-relaxed">
              ASL LAW là hãng luật quốc tế với thế mạnh đặc biệt trong lĩnh vực Sở hữu trí tuệ, doanh
              nghiệp, đầu tư và giải quyết tranh chấp.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/aslawfirm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/asl-law-39b8ba1ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              {[
                { name: "Đăng ký bảo hộ nhãn hiệu", href: "#documents" },
                { name: "Đăng ký bản quyền", href: "#documents" },
                { name: "Đăng ký kiểu dáng công nghiệp", href: "#documents" },
                { name: "Đăng ký sáng chế", href: "#documents" },
                { name: "Xử lý xâm phạm SHTT", href: "#documents" },
              ].map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(service.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-300 hover:text-accent transition-colors text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="tel:+84914195266" className="hover:text-accent transition-colors">
                  Hotline: (+84) 914 195 266
                </a>
              </li>
              <li>
                <a href="mailto:info@aslaw.vn" className="hover:text-accent transition-colors">
                  Email: info@aslaw.vn
                </a>
              </li>
              <li>
                <a
                  href="https://www.baohothuonghieu.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  www.baohothuonghieu.net
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Offices */}
          <div>
            <h4 className="text-lg font-bold mb-4">Văn phòng</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <strong className="text-white">Hà Nội:</strong>
                <br />
                Tầng 12, Tòa 319 Bộ Quốc Phòng, 63 Lê Văn Lương
              </li>
              <li>
                <strong className="text-white">HCM:</strong>
                <br />
                Tầng 2, 21–23 Nguyễn Thị Minh Khai, Q.1
              </li>
              <li>
                <strong className="text-white">Singapore:</strong>
                <br />
                One Raffles Place, #19
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-gray-400">
          <p>© {currentYear} ASL LAW. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
