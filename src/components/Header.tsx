import React, { useState } from 'react';
import { Zap, Gauge, Calculator, Lightbulb, HelpCircle, Menu, X, BookOpen, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';
import { ULTIMA_ATUALIZACAO_TARIFAS } from '../data/tariffs';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute; icon: React.ReactNode; badge?: string }[] = [
    { label: 'Calculadora de Conta', route: 'home', icon: <Calculator className="w-4 h-4" /> },
    { label: 'Leitura do Medidor', route: 'como-ler-medidor-analogico', icon: <Gauge className="w-4 h-4" /> },
    { label: 'Consumo por Aparelho', route: 'quanto-cada-aparelho-gasta', icon: <Lightbulb className="w-4 h-4" /> },
    { label: 'Bandeiras ANEEL', route: 'o-que-e-bandeira-tarifaria', icon: <Zap className="w-4 h-4" /> },
    { label: 'Conta Muito Alta?', route: 'conta-de-luz-muito-alta-motivos', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Dúvidas / FAQ', route: 'faq', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ANEEL {ULTIMA_ATUALIZACAO_TARIFAS}
            </span>
            <span className="hidden sm:inline text-slate-300">
              Dados homologados de concessionárias de energia de todo o Brasil
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button
              id="top-nav-about-btn"
              onClick={() => handleNavClick('sobre')}
              className="hover:text-white transition-colors"
            >
              Sobre o Projeto
            </button>
            <span>•</span>
            <button
              id="top-nav-privacy-btn"
              onClick={() => handleNavClick('politica-de-privacidade')}
              className="hover:text-white transition-colors"
            >
              Privacidade
            </button>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3 h-3" /> 100% Gratuito
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-900 block leading-tight">
                Calculadora<span className="text-emerald-600">Energia</span>
              </span>
              <span className="text-[11px] text-slate-500 block leading-none">
                Conferência e Cálculo de Conta de Luz
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick CTA button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              id="header-cta-calc-btn"
              onClick={() => handleNavClick('home')}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30 transition-all active:scale-95"
            >
              Simular Fatura
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in fade-in duration-150">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                id={`mobile-nav-link-${item.route}`}
                onClick={() => handleNavClick(item.route)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`p-1 rounded ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="mobile-nav-cta-btn"
              onClick={() => handleNavClick('home')}
              className="w-full py-2.5 rounded-xl text-center text-sm font-semibold bg-emerald-600 text-white shadow-sm"
            >
              Calcular Conta Agora
            </button>
            <div className="flex justify-center gap-4 text-xs text-slate-500 pt-2">
              <button onClick={() => handleNavClick('sobre')}>Sobre</button>
              <span>•</span>
              <button onClick={() => handleNavClick('politica-de-privacidade')}>Privacidade</button>
              <span>•</span>
              <button onClick={() => handleNavClick('termos-de-uso')}>Termos</button>
              <span>•</span>
              <button onClick={() => handleNavClick('contato')}>Contato</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
