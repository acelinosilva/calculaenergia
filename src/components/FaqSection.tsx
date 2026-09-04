import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { SEO_PAGES } from '../data/seoContent';

interface FaqSectionProps {
  limit?: number;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ limit }) => {
  const homeFaqs = SEO_PAGES.home.faqs || [];
  const displayFaqs = limit ? homeFaqs.slice(0, limit) : homeFaqs;

  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq-section" className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Dúvidas Comuns
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes sobre a Conta de Energia
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Respostas diretas fundamentadas nas Resoluções Normativas da ANEEL e no Código de Defesa do Consumidor.
          </p>
        </div>

        <div className="space-y-3">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  id={`faq-toggle-${idx}`}
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
