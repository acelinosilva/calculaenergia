import React, { useState, useMemo } from 'react';
import {
  BANDEIRAS_INFO,
  BANDEIRA_VIGENTE_PADRAO,
  CONCESSIONARIAS,
  CUSTO_DISPONIBILIDADE_KWH,
  ESTADOS,
  ULTIMA_ATUALIZACAO_TARIFAS,
  calcularContaEnergia,
  verificarFatura
} from '../data/tariffs';
import {
  BandeiraTarifaria,
  ClasseConsumo,
  PageRoute,
  TipoLigacao,
  UF
} from '../types';
import {
  Calculator as CalcIcon,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Info,
  ShieldAlert,
  ChevronDown,
  Gauge
} from 'lucide-react';
import { AdSlot } from './AdSlot';

interface CalculatorProps {
  initialKwh?: number;
  onNavigate: (route: PageRoute) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ initialKwh, onNavigate }) => {
  // Calculator inputs
  const [selectedUf, setSelectedUf] = useState<UF>('SP');
  const [selectedConcessionariaId, setSelectedConcessionariaId] = useState<string>('enel-sp');
  const [consumoKwh, setConsumoKwh] = useState<number>(initialKwh ?? 220);
  const [bandeira, setBandeira] = useState<BandeiraTarifaria>(BANDEIRA_VIGENTE_PADRAO);
  const [tipoLigacao, setTipoLigacao] = useState<TipoLigacao>('monofasico');
  const [classeConsumo, setClasseConsumo] = useState<ClasseConsumo>('residencial');
  const [cosipCustom, setCosipCustom] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Verifier input (Ferramenta 2)
  const [valorFaturaRealStr, setValorFaturaRealStr] = useState<string>('');

  // Synchronize when initialKwh changes from meter reading tool
  React.useEffect(() => {
    if (initialKwh !== undefined && initialKwh > 0) {
      setConsumoKwh(initialKwh);
    }
  }, [initialKwh]);

  // Filter concessionárias by state
  const concessionariasDoEstado = useMemo(() => {
    const list = CONCESSIONARIAS.filter((c) => c.uf === selectedUf);
    return list.length > 0 ? list : CONCESSIONARIAS.filter((c) => c.uf === 'SP');
  }, [selectedUf]);

  // Handle UF change
  const handleUfChange = (newUf: UF) => {
    setSelectedUf(newUf);
    const concessionarias = CONCESSIONARIAS.filter((c) => c.uf === newUf);
    if (concessionarias.length > 0) {
      setSelectedConcessionariaId(concessionarias[0].id);
    }
  };

  // Selected Concessionaria object
  const currentConcessionaria = useMemo(() => {
    return (
      CONCESSIONARIAS.find((c) => c.id === selectedConcessionariaId) ||
      concessionariasDoEstado[0]
    );
  }, [selectedConcessionariaId, concessionariasDoEstado]);

  // Perform calculations
  const parsedCosip = cosipCustom.trim() !== '' ? parseFloat(cosipCustom.replace(',', '.')) : undefined;

  const resultadoCalculo = useMemo(() => {
    return calcularContaEnergia({
      uf: selectedUf,
      concessionariaId: selectedConcessionariaId,
      consumoKwh: Math.max(0, consumoKwh || 0),
      bandeira,
      tipoLigacao,
      classeConsumo,
      cosipManual: isNaN(parsedCosip as number) ? undefined : parsedCosip,
    });
  }, [selectedUf, selectedConcessionariaId, consumoKwh, bandeira, tipoLigacao, classeConsumo, parsedCosip]);

  // Verification evaluation
  const parsedValorFatura = parseFloat(valorFaturaRealStr.replace(',', '.'));
  const resultadoVerificacao = useMemo(() => {
    if (!isNaN(parsedValorFatura) && parsedValorFatura > 0) {
      return verificarFatura(parsedValorFatura, resultadoCalculo);
    }
    return null;
  }, [parsedValorFatura, resultadoCalculo]);

  const bandeiraAtual = BANDEIRAS_INFO[bandeira];
  const estadoAtual = ESTADOS[selectedUf];

  // Percent breakdown calculations
  const total = resultadoCalculo.valorTotalEstimado;
  const pctEnergia = total > 0 ? ((resultadoCalculo.valorEnergiaBase - resultadoCalculo.descontoBaixaRenda) / total) * 100 : 0;
  const pctBandeira = total > 0 ? (resultadoCalculo.valorBandeira / total) * 100 : 0;
  const pctImpostos = total > 0 ? (resultadoCalculo.totalImpostos / total) * 100 : 0;
  const pctCosip = total > 0 ? (resultadoCalculo.valorCosip / total) * 100 : 0;

  return (
    <section id="calculadora-principal" className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Ferramenta 1 & 2 • Simulador Regulatório ANEEL
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Calculadora e Conferência de Conta de Energia
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Informe seu consumo em kWh para descobrir o valor justo a pagar ou compare com a sua fatura real para identificar cobranças fora do padrão.
          </p>
        </div>

        {/* AdSense Top Header Slot */}
        <AdSlot id="ad-slot-top-header" format="leaderboard" label="Publicidade Patrocinada" />

        {/* Main Grid: Inputs vs Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          {/* Left Column: Input Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <CalcIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Parâmetros de Consumo</h3>
                  <p className="text-xs text-slate-500">Ajuste os dados conforme sua residência</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                ANEEL {ULTIMA_ATUALIZACAO_TARIFAS}
              </span>
            </div>

            {/* State & Concessionaria */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="select-uf" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Estado (UF)
                </label>
                <div className="relative">
                  <select
                    id="select-uf"
                    value={selectedUf}
                    onChange={(e) => handleUfChange(e.target.value as UF)}
                    className="w-full h-11 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden transition-all appearance-none pr-8 cursor-pointer"
                  >
                    {Object.keys(ESTADOS).map((ufKey) => (
                      <option key={ufKey} value={ufKey}>
                        {ufKey} — {ESTADOS[ufKey as UF].nome}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="select-concessionaria" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Distribuidora de Energia
                </label>
                <div className="relative">
                  <select
                    id="select-concessionaria"
                    value={selectedConcessionariaId}
                    onChange={(e) => setSelectedConcessionariaId(e.target.value)}
                    className="w-full h-11 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden transition-all appearance-none pr-8 cursor-pointer"
                  >
                    {concessionariasDoEstado.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Consumo em kWh */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="input-consumo-kwh" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Consumo do Mês (kWh)
                </label>
                <button
                  id="link-meter-guide-helper"
                  type="button"
                  onClick={() => onNavigate('como-ler-medidor-analogico')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 hover:underline"
                >
                  <Gauge className="w-3.5 h-3.5" /> Não sabe o consumo? Aprenda a ler seu medidor
                </button>
              </div>

              <div className="relative">
                <input
                  id="input-consumo-kwh"
                  type="number"
                  min="0"
                  max="10000"
                  step="1"
                  value={consumoKwh || ''}
                  onChange={(e) => setConsumoKwh(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Ex: 220"
                  className="w-full h-14 pl-4 pr-16 bg-white border-2 border-slate-300 rounded-2xl text-xl font-bold text-slate-900 focus:border-emerald-600 focus:ring-3 focus:ring-emerald-600/20 focus:outline-hidden transition-all"
                />
                <span className="absolute right-4 top-4 font-bold text-slate-400 text-sm pointer-events-none">
                  kWh
                </span>
              </div>

              {/* Fast presets */}
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="text-xs text-slate-500">Valores rápidos:</span>
                {[80, 150, 220, 300, 450].map((preset) => (
                  <button
                    key={preset}
                    id={`preset-kwh-${preset}`}
                    type="button"
                    onClick={() => setConsumoKwh(preset)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                      consumoKwh === preset
                        ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {preset} kWh
                  </button>
                ))}
              </div>
            </div>

            {/* Bandeira Tarifária Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Bandeira Tarifária Vigente
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('o-que-e-bandeira-tarifaria')}
                  className="text-xs text-slate-500 hover:text-emerald-700 underline flex items-center gap-0.5"
                >
                  Ver tabela ANEEL <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['verde', 'amarela', 'vermelha1', 'vermelha2'] as BandeiraTarifaria[]).map((bKey) => {
                  const bInfo = BANDEIRAS_INFO[bKey];
                  const isSelected = bandeira === bKey;
                  return (
                    <button
                      key={bKey}
                      id={`btn-bandeira-${bKey}`}
                      type="button"
                      onClick={() => setBandeira(bKey)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? `${bInfo.corBadge} border-2 shadow-xs scale-[1.02]`
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: bInfo.corHex }}
                        />
                        {bKey === BANDEIRA_VIGENTE_PADRAO && (
                          <span className="text-[9px] uppercase tracking-wider font-bold bg-white/80 px-1 rounded text-slate-700">
                            Atual
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold block leading-tight">{bInfo.nome}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {bInfo.adicionalKwh === 0 ? 'Sem taxa' : `+R$ ${bInfo.adicional100kwh.toFixed(2)}/100kWh`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle Advanced Options */}
            <div className="pt-2">
              <button
                id="toggle-advanced-calc-btn"
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 focus:outline-hidden"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
                />
                {showAdvanced ? 'Ocultar opções avançadas (Ligação, Tarifa Social, COSIP)' : 'Opções avançadas (Tipo de ligação, Tarifa Social, COSIP)'}
              </button>

              {showAdvanced && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tipo de Ligação */}
                    <div>
                      <label htmlFor="select-tipo-ligacao" className="block text-xs font-semibold text-slate-700 mb-1">
                        Tipo de Ligação Elétrica
                      </label>
                      <select
                        id="select-tipo-ligacao"
                        value={tipoLigacao}
                        onChange={(e) => setTipoLigacao(e.target.value as TipoLigacao)}
                        className="w-full h-10 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                      >
                        <option value="monofasico">Monofásico (Custo mínimo: 30 kWh)</option>
                        <option value="bifasico">Bifásico (Custo mínimo: 50 kWh)</option>
                        <option value="trifasico">Trifásico (Custo mínimo: 100 kWh)</option>
                      </select>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        Define a taxa mínima faturada mesmo sem consumo.
                      </span>
                    </div>

                    {/* Classe de Consumo */}
                    <div>
                      <label htmlFor="select-classe-consumo" className="block text-xs font-semibold text-slate-700 mb-1">
                        Classe de Consumo
                      </label>
                      <select
                        id="select-classe-consumo"
                        value={classeConsumo}
                        onChange={(e) => setClasseConsumo(e.target.value as ClasseConsumo)}
                        className="w-full h-10 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                      >
                        <option value="residencial">Residencial Normal (B1)</option>
                        <option value="baixa_renda">Tarifa Social Baixa Renda (TSEE CadÚnico)</option>
                      </select>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        Aplica até 65% de desconto progressivo por faixa.
                      </span>
                    </div>
                  </div>

                  {/* COSIP Manual */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="input-cosip-custom" className="block text-xs font-semibold text-slate-700">
                        COSIP / Iluminação Pública Municipal (R$)
                      </label>
                      <button
                        type="button"
                        onClick={() => onNavigate('o-que-e-cosip-iluminacao-publica')}
                        className="text-[11px] text-emerald-700 underline"
                      >
                        O que é COSIP?
                      </button>
                    </div>
                    <div className="relative max-w-xs">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">R$</span>
                      <input
                        id="input-cosip-custom"
                        type="text"
                        value={cosipCustom}
                        onChange={(e) => setCosipCustom(e.target.value)}
                        placeholder={currentConcessionaria.cosipEstimada.toFixed(2)}
                        className="w-full h-10 pl-9 pr-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Estimativa média municipal: R$ {currentConcessionaria.cosipEstimada.toFixed(2)}. Insira o valor exato da sua conta se desejar.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Ferramenta 2: Input para Comparar com Fatura Real */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Ferramenta 2 • Conferir com o Valor da Sua Fatura Real (Opcional)
                  </h4>
                  <p className="text-[11px] text-amber-800">
                    Informe o valor em reais cobrado na conta para verificar se está dentro do esperado.
                  </p>
                </div>
              </div>

              <div className="relative max-w-sm">
                <span className="absolute left-3.5 top-3 text-sm font-bold text-slate-500">R$</span>
                <input
                  id="input-fatura-real"
                  type="text"
                  value={valorFaturaRealStr}
                  onChange={(e) => setValorFaturaRealStr(e.target.value)}
                  placeholder="Ex: 245,80"
                  className="w-full h-11 pl-10 pr-3 bg-white border border-amber-300 rounded-xl text-base font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 focus:outline-hidden transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results & Verification (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Result Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Estimativa Homologada
                </span>
                <span className="text-xs text-slate-400">
                  {resultadoCalculo.consumoFaturadoKwh} kWh faturados
                </span>
              </div>

              <div className="mb-6">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1">
                  Valor Total Estimado da Conta
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-emerald-400">R$</span>
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    {resultadoCalculo.valorTotalEstimado.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Tarifa média efetiva c/ tributos:{' '}
                    <strong className="text-slate-200">
                      R$ {resultadoCalculo.tarifaKwhEfetiva.toFixed(3).replace('.', ',')}/kWh
                    </strong>
                  </span>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Composição do Custo</span>
                  <span>100%</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${pctEnergia}%` }}
                    className="bg-emerald-500 h-full transition-all"
                    title={`Energia e Rede: ${pctEnergia.toFixed(1)}%`}
                  />
                  {pctBandeira > 0 && (
                    <div
                      style={{ width: `${pctBandeira}%` }}
                      className="bg-amber-400 h-full transition-all"
                      title={`Bandeira: ${pctBandeira.toFixed(1)}%`}
                    />
                  )}
                  <div
                    style={{ width: `${pctImpostos}%` }}
                    className="bg-sky-400 h-full transition-all"
                    title={`Impostos (ICMS/PIS/COFINS): ${pctImpostos.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${pctCosip}%` }}
                    className="bg-indigo-400 h-full transition-all"
                    title={`Iluminação Pública (COSIP): ${pctCosip.toFixed(1)}%`}
                  />
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Energia & Rede ({pctEnergia.toFixed(0)}%)
                  </span>
                  {pctBandeira > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> Bandeira ({pctBandeira.toFixed(0)}%)
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400" /> Impostos ({pctImpostos.toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" /> COSIP ({pctCosip.toFixed(0)}%)
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown Lines */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span>Consumo Ativo ({currentConcessionaria.nome.split(' ')[0]})</span>
                  </span>
                  <span className="font-semibold text-white">
                    R$ {resultadoCalculo.valorEnergiaBase.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {resultadoCalculo.valorBandeira > 0 && (
                  <div className="flex justify-between items-center text-amber-300">
                    <span>Adicional {bandeiraAtual.nome}</span>
                    <span className="font-semibold">
                      + R$ {resultadoCalculo.valorBandeira.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                {resultadoCalculo.descontoBaixaRenda > 0 && (
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>Desconto Tarifa Social (Baixa Renda)</span>
                    <span className="font-semibold">
                      - R$ {resultadoCalculo.descontoBaixaRenda.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-300">
                  <span>ICMS Estadual ({(estadoAtual.aliquotaIcms * 100).toFixed(0)}% por dentro)</span>
                  <span className="font-semibold text-white">
                    R$ {resultadoCalculo.valorIcms.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>PIS e COFINS Federais (~{(estadoAtual.pisCofinsEstimado * 100).toFixed(1)}%)</span>
                  <span className="font-semibold text-white">
                    R$ {resultadoCalculo.valorPisCofins.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Iluminação Pública Municipal (COSIP)</span>
                  <span className="font-semibold text-white">
                    R$ {resultadoCalculo.valorCosip.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {resultadoCalculo.custoDisponibilidadeAplicado && (
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] mt-2">
                    <strong>Aviso de Custo de Disponibilidade:</strong> Seu consumo ({resultadoCalculo.consumoKwh} kWh) foi menor que o mínimo legal da ligação {tipoLigacao} ({CUSTO_DISPONIBILIDADE_KWH[tipoLigacao]} kWh). Foi faturado o mínimo.
                  </div>
                )}
              </div>

              {/* Disclaimer Notice */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <Info className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                Valor estimado para a distribuidora <strong>{currentConcessionaria.nome}</strong>. Variações podem ocorrer por taxas municipais específicas e arredondamentos fiscais.
              </div>
            </div>

            {/* Verification Result Card (If User inputted invoice value) */}
            {resultadoVerificacao && (
              <div
                id="resultado-verificacao-card"
                className={`rounded-3xl p-6 border shadow-md space-y-4 animate-in fade-in duration-200 ${
                  resultadoVerificacao.status === 'normal'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : resultadoVerificacao.status === 'alta'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : 'bg-blue-50 border-blue-200 text-blue-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  {resultadoVerificacao.status === 'normal' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  ) : resultadoVerificacao.status === 'alta' ? (
                    <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="text-base font-bold">
                      {resultadoVerificacao.status === 'normal'
                        ? 'Sua conta parece estar dentro do esperado!'
                        : resultadoVerificacao.status === 'alta'
                        ? 'Atenção: A conta cobrada está MAIOR que a estimativa'
                        : 'Sua conta cobrada está MENOR que a estimativa'}
                    </h4>
                    <p className="text-xs mt-0.5 opacity-90">
                      Cobrado na fatura:{' '}
                      <strong>R$ {resultadoVerificacao.valorFaturaReal.toFixed(2).replace('.', ',')}</strong> vs.{' '}
                      Estimado:{' '}
                      <strong>R$ {resultadoVerificacao.valorEstimado.toFixed(2).replace('.', ',')}</strong> (
                      {resultadoVerificacao.diferencaPercentual > 0 ? '+' : ''}
                      {resultadoVerificacao.diferencaPercentual.toFixed(1)}%)
                    </p>
                  </div>
                </div>

                {/* Motivos Prováveis */}
                <div className="space-y-2 pt-2 border-t border-black/5 text-xs">
                  <span className="font-bold block uppercase tracking-wider text-[11px] opacity-80">
                    Possíveis Causas para a Diferença:
                  </span>
                  <ul className="space-y-1.5 pl-4 list-disc text-xs leading-relaxed">
                    {resultadoVerificacao.motivosProvaveis.slice(0, 4).map((motivo, idx) => (
                      <li key={idx}>{motivo}</li>
                    ))}
                  </ul>
                </div>

                {/* Recomendações */}
                <div className="pt-2">
                  <span className="font-bold block uppercase tracking-wider text-[11px] opacity-80 mb-1.5">
                    Recomendações Práticas:
                  </span>
                  <ul className="space-y-1 pl-4 list-disc text-xs leading-relaxed">
                    {resultadoVerificacao.recomendacoes.slice(0, 3).map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>

                  {resultadoVerificacao.status === 'alta' && (
                    <button
                      id="btn-goto-alta-artigo"
                      onClick={() => onNavigate('conta-de-luz-muito-alta-motivos')}
                      className="mt-4 w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      Ver Guia Completo de Como Contestar na Distribuidora <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AdSense In-Content Slot between tools and content */}
        <AdSlot id="ad-slot-after-calc" format="in-content" label="Publicidade" />
      </div>
    </section>
  );
};
