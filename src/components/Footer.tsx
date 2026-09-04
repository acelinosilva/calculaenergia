import React from 'react';
import { PageRoute } from '../types';
import { Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { ULTIMA_ATUALIZACAO_TARIFAS, FONTE_DADOS_OFICIAL } from '../data/tariffs';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mandatory Legal Disclaimer from PRD Section 12 */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs leading-relaxed text-slate-300">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-1 text-sm">
                Aviso Legal e Regulatório Obrigatório
              </span>
              <p>
                Os valores exibidos nesta ferramenta são estimativas com base em tarifas de referência públicas
                (ANEEL e distribuidoras) e podem não refletir com exatidão o valor da sua fatura, que pode incluir
                taxas municipais, parcelamentos, multas ou ajustes específicos da sua distribuidora. Para o valor
                oficial e em caso de dúvida sobre cobrança indevida, consulte sua fatura detalhada ou entre em contato
                com sua distribuidora ou com a ANEEL (telefone 167 ou agência virtual).
              </p>
            </div>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Calculadora<span className="text-emerald-400">Energia</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal independente de utilidade pública para cálculo, conferência de faturas e educação sobre o setor elétrico residencial brasileiro.
            </p>
            <div className="pt-1 text-[11px] text-slate-400">
              <span className="text-slate-300 font-medium">Base de Tarifas:</span> {ULTIMA_ATUALIZACAO_TARIFAS}
              <br />
              <span className="text-slate-500">{FONTE_DADOS_OFICIAL}</span>
            </div>
          </div>

          {/* Tools Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Ferramentas Centrais
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  Calculadora de Valor da Conta (kWh) <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  Verificador de Fatura (Conferência) <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('como-ler-medidor-analogico')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  Guia do Medidor Analógico de Ponteiros <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('como-ler-medidor-digital')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  Guia do Medidor Digital Eletrônico <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quanto-cada-aparelho-gasta')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  Calculadora de Consumo por Aparelho <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          {/* Guides & SEO Sitemap Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Guias e Artigos ANEEL
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('o-que-e-bandeira-tarifaria')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  O que é Bandeira Tarifária e Valores
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('conta-de-luz-muito-alta-motivos')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Por que a conta de luz veio muito alta?
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('conta-estimada-o-que-fazer')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Conta com leitura estimada — o que fazer?
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tarifa-distribuicao-vs-geracao')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Tarifa de Distribuição (TUSD) vs. Geração (TE)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('impostos-na-conta-de-luz')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  ICMS "por dentro" e PIS/COFINS na conta
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('o-que-e-cosip-iluminacao-publica')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  O que é COSIP / CIP de iluminação pública?
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Institucional e Ajuda
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-emerald-400 transition-colors">
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sobre')} className="hover:text-emerald-400 transition-colors">
                  Sobre Nós e Metodologia
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('politica-de-privacidade')} className="hover:text-emerald-400 transition-colors">
                  Política de Privacidade & Cookies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('termos-de-uso')} className="hover:text-emerald-400 transition-colors">
                  Termos de Uso
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contato')} className="hover:text-emerald-400 transition-colors">
                  Contato e Sugestões
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Calculadora de Conta de Energia. Todos os direitos reservados.</p>
          <p className="text-[11px] text-slate-400">
            Projeto educativo e sem vínculo com órgãos governamentais ou concessionárias.
          </p>
        </div>
      </div>
    </footer>
  );
};
