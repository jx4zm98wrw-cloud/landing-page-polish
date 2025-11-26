import iflr1000Badge from "@/assets/awards/iflr1000-badge.jpg";
import legal500Badge from "@/assets/awards/legal500-badge.jpg";
import chambersBadge from "@/assets/awards/chambers-badge.jpg";
import asialawBadge from "@/assets/awards/asialaw-badge.jpg";
import bestlawyersBadge from "@/assets/awards/bestlawyers-badge.jpg";
import wtr1000Badge from "@/assets/awards/wtr1000-badge.jpg";
import { Badge } from "@/components/ui/badge";

const Awards = () => {
  const awards = [
    {
      name: "IFLR1000",
      image: iflr1000Badge,
      title: "Ranked Firm 2024",
      category: "International Financial Law",
    },
    {
      name: "Legal 500",
      image: legal500Badge,
      title: "Recommended Firm 2024",
      category: "Intellectual Property",
    },
    {
      name: "Chambers & Partners",
      image: chambersBadge,
      title: "Leading Firm 2024",
      category: "Corporate/M&A",
    },
    {
      name: "AsiaLaw",
      image: asialawBadge,
      title: "Top Tier Firm 2024",
      category: "Regional Excellence",
    },
    {
      name: "Best Lawyers",
      image: bestlawyersBadge,
      title: "Recognized Firm 2024",
      category: "Commercial Law",
    },
    {
      name: "WTR1000",
      image: wtr1000Badge,
      title: "Elite Firm 2024",
      category: "Trademark Prosecution",
    },
  ];

  return (
    <section id="awards" className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
            Công nhận quốc tế
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Giải Thưởng & Xếp Hạng
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Được công nhận bởi các tổ chức pháp lý hàng đầu thế giới
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {awards.map((award, index) => (
            <div
              key={award.name}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-xl bg-card p-6 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={award.image}
                    alt={`${award.name} Award Badge`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    loading="lazy"
                    width={300}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-sm mb-1 text-foreground">
                    {award.name}
                  </h3>
                  <p className="text-xs text-primary font-semibold mb-2">
                    {award.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {award.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Được xếp hạng liên tục trong các bảng xếp hạng uy tín từ năm 2018
          </p>
        </div>
      </div>
    </section>
  );
};

export default Awards;
