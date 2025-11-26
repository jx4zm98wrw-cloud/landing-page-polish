const Process = () => {
  const steps = [
    {
      number: 1,
      title: "Tra cứu & Đánh giá",
      description: "Kiểm tra khả năng đăng ký để hạn chế rủi ro.",
    },
    {
      number: 2,
      title: "Tư vấn chiến lược",
      description: "Tư vấn nhóm ngành — phạm vi bảo hộ tối ưu.",
    },
    {
      number: 3,
      title: "Soạn hồ sơ",
      description: "Chuẩn hóa — rà soát — hoàn thiện hồ sơ pháp lý.",
    },
    {
      number: 4,
      title: "Nộp đơn tại Cục SHTT",
      description: "Đại diện theo ủy quyền thực hiện trọn gói.",
    },
    {
      number: 5,
      title: "Theo dõi thẩm định",
      description: "Cập nhật liên tục – xử lý phản hồi của Cục.",
    },
    {
      number: 6,
      title: "Cấp văn bằng",
      description: "Khách hàng nhận văn bằng bảo hộ hợp lệ.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quy Trình Đăng Ký Nhãn Hiệu</h2>
          <p className="text-lg text-muted-foreground">Quy trình chuẩn hóa — nhanh chóng — minh bạch</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-center mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
