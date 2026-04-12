import type { Tuition } from "@/types";

interface FAQ {
  question: string;
  answer: string;
}

function buildFAQs(tuition: Tuition): FAQ[] {
  const city = tuition.city || tuition.locality || "your area";
  return [
    {
      question: "How to apply for this tuition?",
      answer: `Click the "Apply & Get Contact" button on this page to unlock the student's contact details. You can then directly call or message them to discuss ${tuition.subject} tutoring needs for ${tuition.course} in ${city}.`,
    },
    {
      question: "Is this tuition verified?",
      answer: tuition.verify
        ? "Yes, this tuition requirement has been verified by the HomeTutorly team. The student details and requirements have been confirmed."
        : "This tuition requirement has not been verified yet. We recommend confirming details directly with the student before starting.",
    },
    {
      question: `Is this online or home tuition?`,
      answer:
        tuition.teaching_mode === "online"
          ? `This is an online tuition requirement. You can teach the student remotely from anywhere using video calling platforms.`
          : `This is a home tuition requirement in ${city}. You will need to visit the student's location for in-person classes.`,
    },
  ];
}

export default function FAQSection({ tuition }: { tuition: Tuition }) {
  const faqs = buildFAQs(tuition);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-linear-to-r from-amber-50/60 via-white to-orange-50/60">
        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-sm font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
      </div>

      <div className="p-4 space-y-2">
        {faqs.map((faq, i) => (
          <details
            key={i}
            open={i === 0}
            className="group rounded-lg border border-gray-100 hover:border-gray-200 open:border-violet-200 open:bg-violet-50/30 transition-all duration-200"
          >
            <summary className="flex items-center justify-between w-full px-3 py-2.5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="text-[12px] font-semibold pr-3 text-gray-800 group-open:text-violet-800 transition-colors">{faq.question}</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-md shrink-0 bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-open:bg-violet-200 group-open:text-violet-700 transition-all duration-200">
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="px-3 pb-2.5">
              <p className="text-[12px] text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>

      {/* FAQ Schema (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </div>
  );
}
