import React, { useState } from 'react';
import { X, Copy, Check, Download, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    url
  )}&margin=12&color=0F172A&bgcolor=FFFFFF`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-qrcode.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="qr-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        id="qr-modal-card"
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center text-slate-800 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="qr-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">Scan with any smartphone camera to visit all socials</p>
        </div>

        {/* QR Code Container */}
        <div className="bg-slate-50 p-4 rounded-2xl inline-block shadow-inner my-2 border-2 border-slate-200">
          <img
            src={qrImageUrl}
            alt="QR Code"
            className="w-52 h-52 object-contain rounded-lg mx-auto bg-white"
            crossOrigin="anonymous"
          />
        </div>

        {/* URL Box */}
        <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-700 font-mono">
          <span className="truncate mr-2">{url}</span>
          <button
            id="qr-copy-url-btn"
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-indigo-600 shrink-0 flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <button
            id="qr-download-btn"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors border border-slate-200"
          >
            <Download className="w-4 h-4" />
            Download QR
          </button>
          <button
            id="qr-share-btn"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
