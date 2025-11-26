import lawyer1 from "@/assets/lawyer-1.jpg";
import lawyer2 from "@/assets/lawyer-2.jpg";
import lawyer3 from "@/assets/lawyer-3.jpg";
import lawyer4 from "@/assets/lawyer-4.jpg";

const Team = () => {
  const lawyers = [
    {
      name: "PHẠM DUY KHƯƠNG",
      role: "Luật sư điều hành",
      image: lawyer1,
      expertise: [
        "Xâm phạm sở hữu trí tuệ",
        "Bản quyền",
        "Sáng chế & Kiểu dáng công nghiệp",
        "Nhãn hiệu",
        "Nhượng quyền thương mại",
        "Luật đầu tư nước ngoài",
      ],
    },
    {
      name: "ĐỖ BÁ THÍCH",
      role: "Luật sư cấp cao",
      image: lawyer2,
      expertise: [
        "Xâm phạm sở hữu trí tuệ",
        "Bản quyền",
        "Nhãn hiệu",
        "Nhượng quyền thương mại",
        "Luật sở hữu trí tuệ",
        "Đầu tư nước ngoài",
      ],
    },
    {
      name: "NGUYỄN THỊ THÚY CHUNG",
      role: "Luật sư cấp cao",
      image: lawyer3,
      expertise: [
        "Giải quyết tranh chấp",
        "Xâm phạm sở hữu trí tuệ",
        "Bản quyền",
        "Nhãn hiệu",
        "Mua bán & Sáp nhập",
        "Luật doanh nghiệp",
      ],
    },
    {
      name: "NGUYỄN TIẾN HÒA",
      role: "Luật sư cấp cao",
      image: lawyer4,
      expertise: [
        "Giải quyết tranh chấp",
        "Bản quyền",
        "Nhãn hiệu",
        "Sáng chế & Kiểu dáng",
        "Luật sở hữu trí tuệ",
        "Luật doanh nghiệp",
      ],
    },
  ];

  return (
    <section id="team" className="py-20 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Đội Ngũ Luật Sư</h2>
          <p className="text-lg text-muted-foreground">
            Chuyên gia Sở hữu trí tuệ – Đại diện SHTT được cấp phép tại Việt Nam
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lawyers.map((lawyer, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={lawyer.image}
                alt={lawyer.name}
                className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">{lawyer.name}</h3>
              <p className="text-primary font-semibold mb-4">{lawyer.role}</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {lawyer.expertise.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
