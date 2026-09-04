import React from 'react';

interface AdSlotProps {
  id?: string;
  format?: 'leaderboard' | 'in-content' | 'rectangle' | 'sidebar';
  label?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id = 'ad-slot',
  format = 'in-content',
  label = 'Publicidade',
  className = '',
}) => {
  // Styles based on AdSense standard dimensions
  const getFormatClasses = () => {
    switch (format) {
      case 'leaderboard':
        return 'w-full min-h-[90px] max-w-[728px]';
      case 'rectangle':
        return 'w-full min-h-[250px] max-w-[336px]';
      case 'sidebar':
        return 'w-full min-h-[600px] max-w-[300px]';
      case 'in-content':
      default:
        return 'w-full min-h-[110px] max-w-full';
    }
  };

  return (
    <aside
      id={id}
      aria-label={label}
      className={`my-6 mx-auto flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-300/80 bg-slate-100/60 transition-colors ${getFormatClasses()} ${className}`}
    >
      <div className="flex items-center justify-between w-full max-w-md px-2 pb-1.5 mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-200/60">
        <span>{label}</span>
        <span className="text-[9px] lowercase font-normal text-slate-400">google adsense ready</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-2 text-slate-500">
        <div className="w-8 h-8 rounded-full bg-slate-200/80 flex items-center justify-center mb-1.5 text-slate-400 text-xs font-mono">
          AD
        </div>
        <p className="text-xs font-medium text-slate-600">
          Espaço Reservado para Anúncios Relevantes
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
          Energia Solar Residencial • Eletrodomésticos Procel A • Geradores e Climatização
        </p>
      </div>
    </aside>
  );
};
