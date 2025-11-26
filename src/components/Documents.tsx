import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import documentsImg from "@/assets/documents-illustration.jpg";

const Documents = () => {
  const documents = [
    "Mẫu nhãn hiệu (file ảnh rõ nét)",
    "Thông tin chủ đơn: Tên & Địa chỉ",
    "Giấy ủy quyền (ASL LAW cung cấp mẫu)",
    "Danh mục sản phẩm/dịch vụ theo bảng Nice",
    "Tài liệu ưu tiên (nếu có)",
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="documents" className="py-20 bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Hồ Sơ Đăng Ký Nhãn Hiệu</h2>
            <p className="text-lg text-muted-foreground">
              Chuẩn hóa theo tiêu chuẩn của Cục Sở Hữu Trí Tuệ
            </p>

            <ul className="space-y-3">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-base">{doc}</span>
                </li>
              ))}
            </ul>

            <Button onClick={scrollToContact} size="lg" className="mt-4">
              Nhận hướng dẫn chi tiết
            </Button>
          </div>

          {/* Right Image */}
          <div className="glass-effect rounded-2xl p-6 shadow-medium">
            <img
              src={documentsImg}
              alt="Hồ sơ đăng ký nhãn hiệu"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
