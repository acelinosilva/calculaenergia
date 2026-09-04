import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Calculator } from './components/Calculator';
import { MeterReader } from './components/MeterReader';
import { ApplianceCalculator } from './components/ApplianceCalculator';
import { FaqSection } from './components/FaqSection';
import { ArticlesView } from './components/ArticlesView';
import { JsonLd } from './components/JsonLd';
import { AdSlot } from './components/AdSlot';
import { SEO_PAGES } from './data/seoContent';
import { BANDEIRAS_INFO } from './data/tariffs';
import {
  Zap,
  Gauge,
  Calculator as CalcIcon,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
  BookOpen
} from 'lucide-react';

export default function App() {
  // Navigation state initialized from hash or default to 'home'
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [sharedKwh, setSharedKwh] = useState<number>(220);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (hash && SEO_PAGES[hash]) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
  };

  const handleApplyKwhToCalc = (kwh: number) => {
    setSharedKwh(kwh);
    if (currentRoute !== 'home') {
      navigateTo('home');
    }
    // Smooth scroll to calculator
    setTimeout(() => {
      const el = document.getElementById('calculadora-principal');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Inject dynamic JSON-LD SEO schemas */}
      <JsonLd route={currentRoute} />

      {/* Main navigation header */}
      <Header currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* View routing */}
      <main className="grow">
        {currentRoute === 'home' ? (
          <>
            {/* Hero Banner Section */}
            <section className="relative pt-8 pb-4 sm:pt-14 sm:pb-8 overflow-hidden bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Atualizado com as Tarifas Homologadas ANEEL 2026
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-tight">
                    Calculadora de Conta de Energia Elétrica{' '}
                    <span className="text-emerald-600 block sm:inline">— Veja se o Valor Está Correto</span>
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Três ferramentas completas em uma só plataforma: calcule o valor estimado em reais, confira se a sua fatura veio com cobrança indevida e aprenda a ler seu medidor em casa.
                  </p>

                  {/* 3 Value propositions badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-6 text-left">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CalcIcon className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">1. Calcule por kWh</span>
                        <span className="text-slate-500">Tarifas oficiais de todas as concessionárias</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">2. Confira a Fatura</span>
                        <span className="text-slate-500">Detecte cobranças fora do padrão</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                        <Gauge className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">3. Leia seu Relógio</span>
                        <span className="text-slate-500">Medidor analógico e digital passo a passo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Tool 1 & 2: Calculator and Invoice Verifier */}
            <Calculator
              initialKwh={sharedKwh}
              onNavigate={navigateTo}
            />

            {/* Core Tool 3: Meter Reader and Reading Calculator */}
            <MeterReader
              onApplyKwhToCalculator={handleApplyKwhToCalc}
              onNavigate={navigateTo}
            />

            {/* Core Tool 4: Appliances Consumption Calculator */}
            <ApplianceCalculator
              onApplyTotalKwh={handleApplyKwhToCalc}
              onNavigate={navigateTo}
            />

            {/* Comprehensive SEO Educational Content Section (800-1200 words) */}
            <section className="py-12 bg-white border-t border-slate-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Guia Explicativo do Consumidor
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Como é Composta a Conta de Energia Elétrica no Brasil
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Entenda para onde vai cada centavo da sua fatura e como os tributos são aplicados
                  </p>
                </div>

                <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-slate-700">
                  <p>
                    Para a maioria dos consumidores residenciais, a conta de luz é um dos boletos mais difíceis de compreender. Entre siglas como <strong>TUSD</strong>, <strong>TE</strong>, <strong>COSIP</strong> e bandeiras coloridas, é comum a sensação de que o valor oscila sem critério claro.
                  </p>
                  <p>
                    No entanto, toda a cobrança de energia no Brasil é rigidamente regulamentada pela <strong>ANEEL (Agência Nacional de Energia Elétrica)</strong>. O valor final faturado não remunera apenas a energia gerada: ele divide-se em quatro custos essenciais:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        1. Tarifa de Energia (TE)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Remunera as usinas geradoras (hidrelétricas, eólicas, solares e térmicas) pela quantidade bruta de eletricidade injetada no Sistema Interligado Nacional. Representa em média de 30% a 35% do valor total da conta.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        2. Tarifa de Distribuição (TUSD)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Cobre os custos de operação, postes, transformadores, cabos e equipes de emergência da concessionária local (como Enel, CPFL, Light, Cemig). Responde por cerca de 35% a 40% da fatura.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        3. Tributos e Impostos (ICMS, PIS/COFINS)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        O ICMS é estadual e é calculado "por dentro" (a alíquota incide sobre si mesma). O PIS e a COFINS são federais. Desde a LC 194/2022, o ICMS varia de 17% a 20% dependendo da sua Unidade Federativa.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                        4. Taxa Municipal de Iluminação (COSIP)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Arrecadada pela distribuidora e repassada integralmente à prefeitura municipal para iluminar praças, ruas e postes públicos. Cada cidade tem sua própria lei e tabela de valores.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-8">
                    Tabela Atual de Bandeiras Tarifárias (ANEEL)
                  </h3>
                  <p>
                    Quando as chuvas diminuem e os reservatórios das hidrelétricas esvaziam, o Operador Nacional do Sistema (ONS) despacha usinas termelétricas, que têm custo de combustível muito superior. Para cobrir essa despesa em tempo real, a ANEEL aplica as bandeiras tarifárias:
                  </p>

                  <div className="overflow-x-auto not-prose my-4 rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                          <th className="p-3">Bandeira</th>
                          <th className="p-3">Condição de Geração</th>
                          <th className="p-3 text-right">Adicional por kWh</th>
                          <th className="p-3 text-right">Adicional a cada 100 kWh</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {Object.values(BANDEIRAS_INFO).map((b) => (
                          <tr key={b.tipo} className="hover:bg-slate-50/70">
                            <td className="p-3 font-semibold flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: b.corHex }} />
                              {b.nome}
                            </td>
                            <td className="p-3 text-slate-600">{b.descricao.split('.')[0]}</td>
                            <td className="p-3 text-right font-mono font-medium">
                              {b.adicionalKwh === 0 ? 'R$ 0,00' : `R$ ${b.adicionalKwh.toFixed(5)}`}
                            </td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-700">
                              {b.adicional100kwh === 0 ? 'Sem acréscimo' : `R$ ${b.adicional100kwh.toFixed(2)}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-8">
                    Por que a Leitura Estimada Pode Prejudicar o Consumidor?
                  </h3>
                  <p>
                    Conforme a Resolução Normativa nº 1.000/2021 da ANEEL, quando o leiturista não consegue acessar o medidor (por portão trancado, cães soltos ou chuvas fortes), a distribuidora tem autorização para emitir a fatura com base na média dos últimos 12 meses.
                  </p>
                  <p>
                    O grande risco para a família é o efeito cascata: se no mês da estimativa o consumo real foi muito alto (por exemplo, uso intenso de ar-condicionado no auge do calor), no mês seguinte, quando o leiturista fizer a leitura física, todo o resíduo acumulado será cobrado de uma só vez. Isso pode elevar o consumo para faixas superiores com alíquotas tributárias mais elevadas, gerando um valor de fatura alarmante.
                  </p>
                </div>

                {/* AdSense In-Content Slot */}
                <AdSlot id="ad-slot-middle-text" format="in-content" label="Publicidade" />

                {/* Quick Satellite Articles Links Hub */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Guias e Artigos Recomendados
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { route: 'como-ler-medidor-analogico', title: 'Como Ler Medidor de Ponteiros' },
                      { route: 'como-ler-medidor-digital', title: 'Como Ler Medidor Digital LCD' },
                      { route: 'conta-de-luz-muito-alta-motivos', title: 'Conta Muito Alta: 7 Motivos' },
                      { route: 'conta-estimada-o-que-fazer', title: 'Conta Estimada: O Que Fazer' },
                      { route: 'tarifa-distribuicao-vs-geracao', title: 'Diferença entre TUSD e TE' },
                      { route: 'o-que-e-bandeira-tarifaria', title: 'Guia das Bandeiras Tarifárias' },
                    ].map((art) => (
                      <button
                        key={art.route}
                        type="button"
                        onClick={() => navigateTo(art.route as PageRoute)}
                        className="p-3 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between group transition-all"
                      >
                        <span>{art.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive FAQ Section */}
            <FaqSection />
          </>
        ) : (
          /* Satellite Page View (como-ler-medidor-analogico, sobre, etc.) */
          <ArticlesView route={currentRoute} onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer with mandatory PRD legal disclaimer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
