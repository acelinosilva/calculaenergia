import React, { useState } from 'react';
import { PageRoute } from '../types';
import { SEO_PAGES } from '../data/seoContent';
import {
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Calculator,
  ArrowRight,
  Send,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { AdSlot } from './AdSlot';

interface ArticlesViewProps {
  route: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ route, onNavigate }) => {
  const pageData = SEO_PAGES[route] || SEO_PAGES.home;

  // Contact form state (for 'contato' route)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactUf, setContactUf] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSent(true);
    }
  };

  return (
    <article className="py-8 sm:py-12 bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb List for SEO */}
        <nav aria-label="Navegação Estrutural" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            {pageData.breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                {crumb.route ? (
                  <button
                    onClick={() => {
                      onNavigate(crumb.route!);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-700 transition-colors font-medium"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-slate-900 font-semibold">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Header Title Section */}
        <header className="mb-8 border-b border-slate-100 pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {pageData.badge}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5" /> {pageData.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {pageData.h1}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {pageData.subheadline}
          </p>
        </header>

        {/* AdSense Top In-Content */}
        <AdSlot id={`ad-article-top-${route}`} format="in-content" label="Publicidade" />

        {/* Main Content Sections */}
        <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {pageData.contentSections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {section.title}
              </h2>

              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Callout Highlight Box */}
              {section.highlightBox && (
                <div
                  className={`p-5 rounded-2xl border my-4 text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 ${
                    section.highlightBox.type === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : section.highlightBox.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  {section.highlightBox.type === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : section.highlightBox.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-bold text-slate-900 mb-1">
                      {section.highlightBox.title}
                    </strong>
                    <p className="whitespace-pre-line">{section.highlightBox.text}</p>
                  </div>
                </div>
              )}

              {/* Data Table */}
              {section.table && (
                <div className="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3.5 sm:p-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-3.5 sm:p-4 ${
                                cIdx === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Bullet list */}
              {section.bulletList && (
                <ul className="space-y-2 pl-4 list-disc text-slate-700 my-4 text-xs sm:text-sm">
                  {section.bulletList.map((item, bIdx) => (
                    <li key={bIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Contact Form special block */}
        {route === 'contato' && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Envie sua Mensagem</h3>
            <p className="text-xs text-slate-600 mb-6">
              Nosso time técnico revisa sugestões de tarifas e melhorias continuamente.
            </p>

            {contactSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <div>
                  <strong>Mensagem enviada com sucesso!</strong>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Obrigado pela colaboração com a comunidade tarifária.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Seu Nome</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Seu E-mail</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Ex: carlos@email.com"
                      className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Sua Concessionária ou Estado
                  </label>
                  <input
                    type="text"
                    value={contactUf}
                    onChange={(e) => setContactUf(e.target.value)}
                    placeholder="Ex: Cemig - MG ou Enel - SP"
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mensagem ou Dúvida</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Descreva sua dúvida, sugestão ou correção tarifária..."
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        )}

        {/* FAQs if present on satellite page */}
        {pageData.faqs && pageData.faqs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" /> Perguntas Frequentes sobre este Tema
            </h3>
            <div className="space-y-3">
              {pageData.faqs.map((faq, fIdx) => {
                const isOpen = openFaqs.includes(fIdx);
                return (
                  <div
                    key={fIdx}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(fIdx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center gap-2 hover:text-emerald-700"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-emerald-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Inter-linking cross-navigation box */}
        <div className="mt-12 p-6 rounded-3xl bg-emerald-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1">
              Próximo Passo Recomendado
            </span>
            <h4 className="text-lg font-bold text-white">
              Deseja calcular o valor estimado da sua conta agora?
            </h4>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-md">
              Use nossa calculadora regulatória com tarifas de {pageData.breadcrumbs[0]?.label} e bandeira tarifária atualizada.
            </p>
          </div>
          <button
            id="btn-article-cta-home"
            type="button"
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Calculator className="w-4 h-4" />
            <span>Acessar Calculadora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* AdSense Bottom Slot */}
        <AdSlot id={`ad-article-bottom-${route}`} format="in-content" label="Publicidade" />
      </div>
    </article>
  );
};
