import React, { useState } from 'react';
import { Gauge, ArrowRight, RotateCw, RotateCcw, Calendar, Check, Info, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface MeterReaderProps {
  onApplyKwhToCalculator: (kwh: number) => void;
  onNavigate: (route: PageRoute) => void;
}

export const MeterReader: React.FC<MeterReaderProps> = ({
  onApplyKwhToCalculator,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'analogico' | 'digital'>('analogico');

  // Interactive Analog Dials state (4 dials: Milhar, Centena, Dezena, Unidade)
  const [dialValues, setDialValues] = useState<[number, number, number, number]>([3, 7, 4, 8]);

  // Digital meter LCD interactive state
  const [digitalMode, setDigitalMode] = useState<'03' | '04' | '08' | '88'>('03');
  const [digitalKwhValue, setDigitalKwhValue] = useState<number>(14826);

  // Period Reading Calculator state
  const [leituraAtual, setLeituraAtual] = useState<string>('14826');
  const [leituraAnterior, setLeituraAnterior] = useState<string>('14610');
  const [dataAtual, setDataAtual] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Previous date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const [dataAnterior, setDataAnterior] = useState<string>(thirtyDaysAgo.toISOString().split('T')[0]);

  // Calculation for Period
  const parsedAtual = parseFloat(leituraAtual);
  const parsedAnterior = parseFloat(leituraAnterior);
  const consumoPeriodo = !isNaN(parsedAtual) && !isNaN(parsedAnterior) && parsedAtual >= parsedAnterior
    ? parsedAtual - parsedAnterior
    : null;

  let diasDiferenca: number | null = null;
  let consumoMedioDiario: number | null = null;
  let projecao30Dias: number | null = null;

  if (dataAtual && dataAnterior && consumoPeriodo !== null) {
    const d1 = new Date(dataAnterior);
    const d2 = new Date(dataAtual);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    if (diffDays > 0) {
      diasDiferenca = diffDays;
      consumoMedioDiario = consumoPeriodo / diffDays;
      projecao30Dias = consumoMedioDiario * 30;
    }
  }

  // Analog calculated value from the 4 dials
  const analogCalculatedKwh =
    dialValues[0] * 1000 + dialValues[1] * 100 + dialValues[2] * 10 + dialValues[3];

  const handleDialChange = (index: number, val: number) => {
    const newVals: [number, number, number, number] = [
      index === 0 ? val : dialValues[0],
      index === 1 ? val : dialValues[1],
      index === 2 ? val : dialValues[2],
      index === 3 ? val : dialValues[3],
    ];
    setDialValues(newVals);
  };

  const handleApplyAnalogKwh = () => {
    setLeituraAtual(analogCalculatedKwh.toString());
  };

  const handleSendToMainCalculator = () => {
    if (consumoPeriodo !== null && consumoPeriodo > 0) {
      onApplyKwhToCalculator(Math.round(consumoPeriodo));
      const el = document.getElementById('calculadora-principal');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="guia-medidor" className="py-8 sm:py-12 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Gauge className="w-3.5 h-3.5" /> Ferramenta 3 • Simulador e Leitor de Relógio
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Como Ler o Medidor de Luz e Calcular o Consumo
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Aprenda a ler os relógios analógicos e digitais da sua residência, decifre o sentido dos ponteiros e calcule seu consumo antes do leiturista passar.
          </p>

          {/* Toggle Type */}
          <div className="inline-flex p-1 bg-white border border-slate-300 rounded-2xl mt-6 shadow-xs">
            <button
              id="tab-btn-analogico"
              type="button"
              onClick={() => setActiveTab('analogico')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'analogico'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Medidor Analógico (Ponteiros)
            </button>
            <button
              id="tab-btn-digital"
              type="button"
              onClick={() => setActiveTab('digital')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'digital'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Medidor Digital (Display LCD)
            </button>
          </div>
        </div>

        {/* Interactive Viewer */}
        {activeTab === 'analogico' ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  Simulador Interativo • 4 Ponteiros
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Relógio de Ponteiros (Eletromecânico)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Arraste os seletores abaixo dos mostradores para simular a rotação e entender a leitura
                </p>
              </div>

              {/* Live resulting value */}
              <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Leitura Registrada
                  </span>
                  <span className="text-xl font-mono font-bold text-emerald-400">
                    {analogCalculatedKwh} <span className="text-xs text-slate-300">kWh</span>
                  </span>
                </div>
                <button
                  id="btn-apply-analog-to-period"
                  type="button"
                  onClick={handleApplyAnalogKwh}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                >
                  Copiar p/ Calculadora
                </button>
              </div>
            </div>

            {/* Dials visual row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-4">
              {[
                { label: '1º Relógio (Milhar)', mult: 1000, isClockwise: true, idx: 0 },
                { label: '2º Relógio (Centena)', mult: 100, isClockwise: false, idx: 1 },
                { label: '3º Relógio (Dezena)', mult: 10, isClockwise: true, idx: 2 },
                { label: '4º Relógio (Unidade)', mult: 1, isClockwise: false, idx: 3 },
              ].map((dial) => {
                const currentVal = dialValues[dial.idx];
                // 10 digits around circle (0 to 9) = 36 degrees per step
                const rotationDeg = dial.isClockwise
                  ? currentVal * 36
                  : -currentVal * 36;

                return (
                  <div
                    key={dial.idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center relative overflow-hidden group hover:border-emerald-300 transition-colors"
                  >
                    {/* Direction badge */}
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 mb-2">
                      {dial.isClockwise ? (
                        <>
                          <RotateCw className="w-3 h-3 text-emerald-600" />
                          <span>Sentido Horário</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-3 h-3 text-amber-600" />
                          <span>Sentido Anti-Horário</span>
                        </>
                      )}
                    </div>

                    {/* SVG Clock Face */}
                    <div className="relative w-36 h-36 my-2">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                        {/* Outer bezel */}
                        <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
                        <circle cx="50" cy="50" r="42" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

                        {/* Dial Numbers 0 to 9 */}
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                          const angle = dial.isClockwise
                            ? (num * 36 - 90) * (Math.PI / 180)
                            : (-num * 36 - 90) * (Math.PI / 180);
                          const x = 50 + 32 * Math.cos(angle);
                          const y = 50 + 32 * Math.sin(angle);
                          return (
                            <text
                              key={num}
                              x={x}
                              y={y + 3.5}
                              textAnchor="middle"
                              fontSize="9"
                              fontWeight="700"
                              fill={num === currentVal ? '#059669' : '#475569'}
                              className="font-mono select-none"
                            >
                              {num}
                            </text>
                          );
                        })}

                        {/* Center pivot */}
                        <circle cx="50" cy="50" r="3.5" fill="#0f172a" />

                        {/* Pointer Needle */}
                        <g transform={`rotate(${rotationDeg} 50 50)`}>
                          {/* Needle line */}
                          <line
                            x1="50"
                            y1="50"
                            x2="50"
                            y2="20"
                            stroke="#dc2626"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          {/* Arrow head */}
                          <polygon points="50,15 47,23 53,23" fill="#dc2626" />
                        </g>
                      </svg>
                    </div>

                    {/* Label & Multiplier */}
                    <span className="text-xs font-bold text-slate-800 mt-1 block">
                      {dial.label}
                    </span>

                    {/* Slider selector for digit */}
                    <div className="w-full mt-3 pt-2 border-t border-slate-200">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-[11px] text-slate-500 font-medium">Dígito:</span>
                        <span className="font-mono font-bold text-base text-emerald-700 bg-emerald-50 px-2 rounded">
                          {currentVal}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="9"
                        step="1"
                        value={currentVal}
                        onChange={(e) => handleDialChange(dial.idx, parseInt(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Golden Rule Callout */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs leading-relaxed text-amber-950">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-900 mb-0.5">
                  Regra de Ouro da ANEEL para Ponteiros:
                </strong>
                <p>
                  Sempre que o ponteiro estiver <strong>entre dois algarismos</strong>, anote o <strong>MENOR</strong> número (o que o ponteiro já ultrapassou). Exceção: quando estiver entre o 9 e o 0, anote o 9.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('como-ler-medidor-analogico')}
                  className="mt-2 text-emerald-800 hover:text-emerald-950 font-bold underline inline-flex items-center gap-1"
                >
                  Ver o guia passo a passo ilustrado com todas as regras <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Digital LCD Simulation */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  Simulador Interativo • Medidor Eletrônico
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Medidor Digital com Display LCD
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clique no botão do medidor para alternar entre as funções e identificar o consumo ativo em kWh
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('como-ler-medidor-digital')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline flex items-center gap-1"
              >
                Guia detalhado do medidor digital <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* LCD Meter Body */}
            <div className="max-w-xl mx-auto p-6 rounded-3xl bg-slate-900 text-white border-4 border-slate-800 shadow-2xl relative">
              {/* Brand and pulses */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
                <span className="font-bold tracking-wider text-slate-300">MEDIDOR ELETRÔNICO B1</span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[10px] text-rose-400 font-mono">1 Wh/pulso</span>
                </div>
              </div>

              {/* LCD Screen Box */}
              <div className="p-5 rounded-2xl bg-lime-950/40 border-2 border-lime-800/60 font-mono text-lime-400 shadow-inner flex flex-col justify-between min-h-[140px]">
                <div className="flex justify-between items-center text-xs opacity-80">
                  <span className="bg-lime-900/40 px-2 py-0.5 rounded text-[11px] font-bold">
                    CÓDIGO: {digitalMode}
                  </span>
                  <span className="text-[11px]">
                    {digitalMode === '03' && 'CONSUMO ATIVO TOTAL'}
                    {digitalMode === '04' && 'DEMANDA MÁXIMA'}
                    {digitalMode === '08' && 'TENSÃO INSTANTÂNEA'}
                    {digitalMode === '88' && 'TESTE DE DISPLAY'}
                  </span>
                </div>

                {/* Big number display */}
                <div className="text-center py-2">
                  <span className="text-4xl sm:text-5xl font-black tracking-widest text-lime-300 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]">
                    {digitalMode === '03' && `${digitalKwhValue}`}
                    {digitalMode === '04' && '04.82 kW'}
                    {digitalMode === '08' && '127.4 V'}
                    {digitalMode === '88' && '888888'}
                  </span>
                  {digitalMode === '03' && (
                    <span className="text-sm font-bold text-lime-400 ml-2">kWh</span>
                  )}
                </div>

                <div className="text-[10px] opacity-70 text-right">
                  {digitalMode === '03'
                    ? '👉 É ESTE NÚMERO QUE VOCÊ DEVE ANOTAR!'
                    : 'Aperte o botão para voltar ao Código 03'}
                </div>
              </div>

              {/* Physical Button Control */}
              <div className="mt-6 flex items-center justify-between pt-2">
                <div className="text-xs text-slate-400">
                  Display cicla a cada 6s ou pelo clique manual:
                </div>
                <button
                  id="btn-meter-cycle-lcd"
                  type="button"
                  onClick={() => {
                    const modes: ('03' | '04' | '08' | '88')[] = ['03', '04', '08', '88'];
                    const nextIdx = (modes.indexOf(digitalMode) + 1) % modes.length;
                    setDigitalMode(modes[nextIdx]);
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold border border-slate-600 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Trocar Tela / Função
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Period Reading Calculator Tool */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Calculadora de Consumo entre Duas Leituras
              </h3>
              <p className="text-xs text-slate-500">
                Compare duas medições do relógio para saber seu consumo em kWh e a média diária
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Leitura Atual */}
            <div>
              <label htmlFor="input-leitura-atual" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Leitura Atual (Hoje)
              </label>
              <div className="relative">
                <input
                  id="input-leitura-atual"
                  type="number"
                  value={leituraAtual}
                  onChange={(e) => setLeituraAtual(e.target.value)}
                  placeholder="Ex: 14826"
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                />
                <span className="absolute right-3 top-3 text-xs font-bold text-slate-400 pointer-events-none">
                  kWh
                </span>
              </div>
            </div>

            {/* Data Leitura Atual */}
            <div>
              <label htmlFor="input-data-atual" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Data da Leitura Atual
              </label>
              <input
                id="input-data-atual"
                type="date"
                value={dataAtual}
                onChange={(e) => setDataAtual(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
              />
            </div>

            {/* Leitura Anterior */}
            <div>
              <label htmlFor="input-leitura-anterior" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Leitura Anterior
              </label>
              <div className="relative">
                <input
                  id="input-leitura-anterior"
                  type="number"
                  value={leituraAnterior}
                  onChange={(e) => setLeituraAnterior(e.target.value)}
                  placeholder="Ex: 14610"
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                />
                <span className="absolute right-3 top-3 text-xs font-bold text-slate-400 pointer-events-none">
                  kWh
                </span>
              </div>
            </div>

            {/* Data Leitura Anterior */}
            <div>
              <label htmlFor="input-data-anterior" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Data Leitura Anterior
              </label>
              <input
                id="input-data-anterior"
                type="date"
                value={dataAnterior}
                onChange={(e) => setDataAnterior(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Results Bar */}
          {consumoPeriodo !== null && (
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
                    Consumo no Período
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                    {consumoPeriodo.toFixed(0)}{' '}
                    <span className="text-sm font-bold text-emerald-700">kWh</span>
                  </span>
                </div>

                {diasDiferenca && diasDiferenca > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
                      Média Diária ({diasDiferenca} dias)
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-950">
                      {consumoMedioDiario?.toFixed(1)}{' '}
                      <span className="text-xs font-medium text-emerald-700">kWh/dia</span>
                    </span>
                  </div>
                )}

                {projecao30Dias && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
                      Projeção p/ 30 Dias
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-950">
                      ~{projecao30Dias.toFixed(0)}{' '}
                      <span className="text-xs font-medium text-emerald-700">kWh/mês</span>
                    </span>
                  </div>
                )}
              </div>

              <button
                id="btn-apply-kwh-to-calc"
                type="button"
                onClick={handleSendToMainCalculator}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Usar este consumo na Calculadora de Conta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
