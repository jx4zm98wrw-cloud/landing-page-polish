import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Đại diện sở hữu công nghiệp là gì?",
      answer: (
        <div className="space-y-3">
          <p>
            Đại diện sở hữu công nghiệp là tổ chức hoặc cá nhân được Cục Sở hữu trí tuệ cấp phép
            để thay mặt cá nhân, doanh nghiệp thực hiện các thủ tục liên quan đến quyền sở hữu công nghiệp.
          </p>
          <p className="font-semibold">Vai trò chính:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Tư vấn pháp lý</li>
            <li>Soạn thảo và nộp hồ sơ</li>
            <li>Theo dõi quá trình thẩm định</li>
            <li>Giải quyết khiếu nại và tranh chấp</li>
            <li>Gia hạn văn bằng</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Phạm vi bảo hộ của nhãn hiệu bao gồm những gì?",
      answer:
        "Phạm vi bảo hộ phụ thuộc vào nhóm ngành nghề được đăng ký theo bảng phân loại Nice. Nhãn hiệu chỉ được bảo hộ đối với các nhóm đã được nộp đơn.",
    },
    {
      question: "Có bắt buộc phải tra cứu nhãn hiệu trước khi nộp đơn không?",
      answer:
        "Không bắt buộc nhưng rất nên làm. Tra cứu giúp giảm rủi ro bị từ chối, tiết kiệm thời gian và chi phí cho doanh nghiệp.",
    },
    {
      question: "Cá nhân nước ngoài có thể đăng ký nhãn hiệu tại Việt Nam không?",
      answer:
        "Có. Tuy nhiên cá nhân/tổ chức nước ngoài bắt buộc phải nộp đơn thông qua một đại diện SHTT được cấp phép tại Việt Nam — như ASL LAW.",
    },
    {
      question: "Đăng ký nhãn hiệu quốc tế cần điều kiện gì?",
      answer:
        "Doanh nghiệp cần có nhãn hiệu đã đăng ký hoặc nộp đơn tại Việt Nam, sau đó có thể đăng ký quốc tế theo Hệ thống Madrid.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kiến Thức & Giải Đáp</h2>
          <p className="text-lg text-muted-foreground">Những câu hỏi thường gặp về đăng ký nhãn hiệu</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-xl px-6 border-none shadow-soft"
            >
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
