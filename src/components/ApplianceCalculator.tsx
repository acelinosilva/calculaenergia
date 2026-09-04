import React, { useState } from 'react';
import { ELETRODOMESTICOS_PADRAO } from '../data/tariffs';
import { Eletrodomestico, PageRoute } from '../types';
import { Lightbulb, Plus, Trash2, RotateCcw, ArrowRight, Zap, Info } from 'lucide-react';
import { AdSlot } from './AdSlot';

interface ApplianceState extends Eletrodomestico {
  quantidade: number;
  horasDia: number;
  diasMes: number;
  potenciaCustom: number;
}

interface ApplianceCalculatorProps {
  tarifaKwhReferencia?: number;
  onApplyTotalKwh?: (kwh: number) => void;
  onNavigate: (route: PageRoute) => void;
}

export const ApplianceCalculator: React.FC<ApplianceCalculatorProps> = ({
  tarifaKwhReferencia = 0.95,
  onApplyTotalKwh,
  onNavigate,
}) => {
  // Initialize with the most common appliances active
  const [items, setItems] = useState<ApplianceState[]>(() =>
    ELETRODOMESTICOS_PADRAO.slice(0, 6).map((app) => ({
      ...app,
      quantidade: 1,
      horasDia: app.horasDiaPadrao,
      diasMes: app.diasMesPadrao,
      potenciaCustom: app.potenciaWatts,
    }))
  );

  const [availableToAdd, setAvailableToAdd] = useState<string>('');

  // Calculate consumption for an appliance item
  // kWh/mês = (Watts * horas/dia * dias/mês * qtd) / 1000
  const calculateItemKwh = (item: ApplianceState) => {
    return (
      (item.potenciaCustom * item.horasDia * item.diasMes * item.quantidade) /
      1000
    );
  };

  const totalKwh = items.reduce((acc, curr) => acc + calculateItemKwh(curr), 0);
  const totalReais = totalKwh * tarifaKwhReferencia;

  const handleUpdateItem = (
    id: string,
    field: 'horasDia' | 'diasMes' | 'quantidade' | 'potenciaCustom',
    val: number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: Math.max(0, val) } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddAppliance = () => {
    if (!availableToAdd) return;
    const found = ELETRODOMESTICOS_PADRAO.find((e) => e.id === availableToAdd);
    if (!found) return;

    if (items.some((i) => i.id === found.id)) {
      // Increment quantity
      handleUpdateItem(
        found.id,
        'quantidade',
        (items.find((i) => i.id === found.id)?.quantidade || 1) + 1
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          ...found,
          quantidade: 1,
          horasDia: found.horasDiaPadrao,
          diasMes: found.diasMesPadrao,
          potenciaCustom: found.potenciaWatts,
        },
      ]);
    }
    setAvailableToAdd('');
  };

  const handleResetDefaults = () => {
    setItems(
      ELETRODOMESTICOS_PADRAO.slice(0, 6).map((app) => ({
        ...app,
        quantidade: 1,
        horasDia: app.horasDiaPadrao,
        diasMes: app.diasMesPadrao,
        potenciaCustom: app.potenciaWatts,
      }))
    );
  };

  const handleApplyToMainCalc = () => {
    if (onApplyTotalKwh && totalKwh > 0) {
      onApplyTotalKwh(Math.round(totalKwh));
      const el = document.getElementById('calculadora-principal');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="calculadora-aparelhos" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Lightbulb className="w-3.5 h-3.5" /> Ferramenta 4 • Consumo por Eletrodoméstico
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Quanto Cada Aparelho Gasta de Energia?
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Descubra os vilões da sua conta. Ajuste a potência, horas de uso e dias no mês para calcular o gasto individual em kWh e em reais.
          </p>
        </div>

        {/* Top summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Consumo Total dos Aparelhos
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {totalKwh.toFixed(1)}
              </span>
              <span className="text-sm font-bold text-slate-500">kWh/mês</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-900 text-white shadow-md">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
              Custo Mensal Estimado
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-emerald-400">R$</span>
              <span className="text-3xl font-extrabold text-white">
                {totalReais.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-xs text-emerald-200/70 ml-1">
                (tarifa ref. R$ {tarifaKwhReferencia.toFixed(2)}/kWh)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Usar soma na Calculadora Geral
              </span>
              <span className="text-[11px] text-slate-500">
                Transfira {totalKwh.toFixed(0)} kWh para o simulador oficial
              </span>
            </div>
            <button
              id="btn-apply-appliances-kwh"
              type="button"
              onClick={handleApplyToMainCalc}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            >
              <span>Aplicar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Controls & Select */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              id="select-add-appliance"
              value={availableToAdd}
              onChange={(e) => setAvailableToAdd(e.target.value)}
              className="h-10 px-3 py-1 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="">Selecione outro aparelho para adicionar...</option>
              {ELETRODOMESTICOS_PADRAO.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.nome} ({app.potenciaWatts}W)
                </option>
              ))}
            </select>
            <button
              id="btn-add-appliance"
              type="button"
              onClick={handleAddAppliance}
              disabled={!availableToAdd}
              className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 self-end sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restaurar padrões
          </button>
        </div>

        {/* Appliance List Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Aparelho</th>
                  <th className="p-4 text-center">Potência (W)</th>
                  <th className="p-4 text-center">Horas/Dia</th>
                  <th className="p-4 text-center">Dias/Mês</th>
                  <th className="p-4 text-center">Qtd</th>
                  <th className="p-4 text-right">Consumo (kWh)</th>
                  <th className="p-4 text-right">Custo Est. (R$)</th>
                  <th className="p-4 text-center">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {items.map((item) => {
                  const itemKwh = calculateItemKwh(item);
                  const itemReais = itemKwh * tarifaKwhReferencia;
                  const pctDoTotal = totalKwh > 0 ? (itemKwh / totalKwh) * 100 : 0;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{item.nome}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs">
                          {item.dicaEconomia}
                        </p>
                      </td>

                      {/* Potência */}
                      <td className="p-4 text-center">
                        <input
                          type="number"
                          min="1"
                          max="10000"
                          value={item.potenciaCustom}
                          onChange={(e) =>
                            handleUpdateItem(item.id, 'potenciaCustom', parseInt(e.target.value) || 0)
                          }
                          className="w-18 h-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </td>

                      {/* Horas/dia */}
                      <td className="p-4 text-center">
                        <input
                          type="number"
                          min="0.1"
                          max="24"
                          step="0.5"
                          value={item.horasDia}
                          onChange={(e) =>
                            handleUpdateItem(item.id, 'horasDia', parseFloat(e.target.value) || 0)
                          }
                          className="w-16 h-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </td>

                      {/* Dias/mês */}
                      <td className="p-4 text-center">
                        <input
                          type="number"
                          min="1"
                          max="31"
                          value={item.diasMes}
                          onChange={(e) =>
                            handleUpdateItem(item.id, 'diasMes', parseInt(e.target.value) || 0)
                          }
                          className="w-14 h-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </td>

                      {/* Quantidade */}
                      <td className="p-4 text-center">
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={item.quantidade}
                          onChange={(e) =>
                            handleUpdateItem(item.id, 'quantidade', parseInt(e.target.value) || 1)
                          }
                          className="w-14 h-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </td>

                      {/* Consumo */}
                      <td className="p-4 text-right">
                        <span className="font-bold text-slate-900 block text-sm">
                          {itemKwh.toFixed(1)} kWh
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {pctDoTotal.toFixed(0)}% do total
                        </span>
                      </td>

                      {/* Custo */}
                      <td className="p-4 text-right">
                        <span className="font-extrabold text-emerald-700 text-sm">
                          R$ {itemReais.toFixed(2).replace('.', ',')}
                        </span>
                      </td>

                      {/* Ação */}
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remover aparelho"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* AdSense In-Content Slot */}
        <AdSlot id="ad-slot-after-appliances" format="in-content" label="Publicidade" />
      </div>
    </section>
  );
};
