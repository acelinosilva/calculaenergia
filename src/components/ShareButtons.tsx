import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Facebook,
  Linkedin,
  Mail,
  X as CloseIcon,
  Sparkles
} from 'lucide-react';

export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
  kwh?: number;
  valorEstimado?: number;
  distribuidora?: string;
}

interface ShareButtonsProps {
  data?: ShareData;
  variant?: 'inline' | 'card' | 'floating';
  label?: string;
}

const SITE_URL = 'https://calculaenergia.vercel.app';

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  data,
  variant = 'inline',
  label = 'Compartilhar'
}) => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate real share message
  const shareUrl = data?.url || SITE_URL;
  
  let shareText =
    '⚡ Calculadora de Conta de Energia: Calcule o valor estimado da sua conta de luz, confira se a fatura está correta e aprenda a ler seu medidor em casa!';
  
  if (data?.kwh && data?.valorEstimado && data?.distribuidora) {
    shareText = `⚡ Fiz o cálculo da minha conta de luz no CalculaEnergia: para ${
      data.kwh
    } kWh na ${data.distribuidora}, o valor estimado ficou em R$ ${data.valorEstimado
      .toFixed(2)
      .replace('.', ',')}. Veja se a sua fatura veio certa:`;
  } else if (data?.text) {
    shareText = data.text;
  }

  const shareTitle = data?.title || 'CalculaEnergia — Calculadora de Conta de Luz Oficial';

  // Real Social Links
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n\n👉 Acesse: ${shareUrl}`
  )}`;

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  const emailUrl = `mailto:?subject=${encodeURIComponent(
    shareTitle
  )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to modal
        if ((err as Error).name !== 'AbortError') {
          setIsModalOpen(true);
        }
      }
    } else {
      setIsModalOpen(true);
    }
  };

  if (variant === 'card') {
    return (
      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white mt-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Compartilhar Resultado
            </span>
          </div>
          <span className="text-[11px] text-slate-400">calculaenergia.vercel.app</span>
        </div>

        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Ajude amigos e familiares a conferirem se a conta de luz deles veio com cobrança indevida ou erro no leiturista.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            title="Compartilhar no WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Telegram Button */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            title="Compartilhar no Telegram"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </a>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Link</span>
              </>
            )}
          </button>

          {/* More options modal */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all text-xs"
            title="Mais redes sociais"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ShareModal
            shareTitle={shareTitle}
            shareText={shareText}
            shareUrl={shareUrl}
            onClose={() => setIsModalOpen(false)}
            onCopy={handleCopyLink}
            copied={copied}
            whatsappUrl={whatsappUrl}
            telegramUrl={telegramUrl}
            twitterUrl={twitterUrl}
            facebookUrl={facebookUrl}
            linkedinUrl={linkedinUrl}
            emailUrl={emailUrl}
          />
        )}
      </div>
    );
  }

  // Inline Variant
  return (
    <div className="flex items-center gap-2">
      <button
        id="btn-share-main"
        type="button"
        onClick={handleNativeShare}
        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
      >
        <Share2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>{label}</span>
      </button>

      {/* Direct WhatsApp Quick Shortcut */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-all shadow-2xs"
        title="Enviar via WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      {/* Copy link button */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all shadow-2xs text-xs"
        title="Copiar link real do site"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <ShareModal
          shareTitle={shareTitle}
          shareText={shareText}
          shareUrl={shareUrl}
          onClose={() => setIsModalOpen(false)}
          onCopy={handleCopyLink}
          copied={copied}
          whatsappUrl={whatsappUrl}
          telegramUrl={telegramUrl}
          twitterUrl={twitterUrl}
          facebookUrl={facebookUrl}
          linkedinUrl={linkedinUrl}
          emailUrl={emailUrl}
        />
      )}
    </div>
  );
};

interface ShareModalProps {
  shareTitle: string;
  shareText: string;
  shareUrl: string;
  onClose: () => void;
  onCopy: () => void;
  copied: boolean;
  whatsappUrl: string;
  telegramUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  emailUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  shareTitle,
  shareText,
  shareUrl,
  onClose,
  onCopy,
  copied,
  whatsappUrl,
  telegramUrl,
  twitterUrl,
  facebookUrl,
  linkedinUrl,
  emailUrl,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-900 relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Compartilhar Site</h3>
              <p className="text-[11px] text-slate-500 font-medium">calculaenergia.vercel.app</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Message preview */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mb-4 font-mono leading-relaxed">
          {shareText}
        </div>

        {/* Direct Social Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all text-center"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all text-center"
          >
            <Send className="w-5 h-5 text-sky-600" />
            <span>Telegram</span>
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all text-center"
          >
            <span className="font-extrabold text-base leading-none">𝕏</span>
            <span>Twitter / X</span>
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all text-center"
          >
            <Facebook className="w-5 h-5 text-blue-600" />
            <span>Facebook</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all text-center"
          >
            <Linkedin className="w-5 h-5 text-indigo-600" />
            <span>LinkedIn</span>
          </a>

          <a
            href={emailUrl}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex flex-col items-center gap-1.5 transition-all text-center"
          >
            <Mail className="w-5 h-5 text-slate-600" />
            <span>E-mail</span>
          </a>
        </div>

        {/* Copy Link input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="grow h-10 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-700 select-all"
          />
          <button
            type="button"
            onClick={onCopy}
            className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
