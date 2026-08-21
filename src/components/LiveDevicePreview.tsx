import React, { useState } from 'react';
import { ProfileConfig } from '../types';
import { PublicProfileView } from './PublicProfileView';
import {
  Smartphone,
  Tablet,
  Monitor,
  ExternalLink,
  QrCode,
  Share2,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveDevicePreviewProps {
  profile: ProfileConfig;
  onLinkClick: (linkId: string) => void;
  onOpenQR: () => void;
  onOpenPublicView: () => void;
}

export const LiveDevicePreview: React.FC<LiveDevicePreviewProps> = ({
  profile,
  onLinkClick,
  onOpenQR,
  onOpenPublicView,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyProfileUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      try {
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.2 },
        });
      } catch {}
    }
  };

  return (
    <div id="live-device-preview-root" className="h-full flex flex-col bg-slate-100 text-slate-800 overflow-hidden">
      {/* Top Preview Controls Bar in Bento White/Slate Style */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            id="device-switch-mobile"
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'mobile'
                ? 'bg-white text-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Phone (360px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          <button
            id="device-switch-tablet"
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'tablet'
                ? 'bg-white text-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Tablet (580px)"
          >
            <Tablet className="w-4 h-4" />
          </button>

          <button
            id="device-switch-desktop"
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'desktop'
                ? 'bg-white text-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Canvas"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls: QR, Copy Link, Fullscreen Live Profile */}
        <div className="flex items-center gap-2">
          <button
            id="preview-qr-btn"
            type="button"
            onClick={onOpenQR}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors border border-slate-200"
            title="Generate QR code"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">QR Code</span>
          </button>

          <button
            id="preview-copy-btn"
            type="button"
            onClick={handleCopyProfileUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors border border-slate-200"
            title="Copy Shareable Link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Share Link</span>
              </>
            )}
          </button>

          <button
            id="preview-fullscreen-btn"
            type="button"
            onClick={onOpenPublicView}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs text-white font-semibold shadow-xs transition-all hover:scale-[1.02]"
          >
            <span>Live View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Canvas Wrapper with Bento Slate Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-10 flex items-center justify-center bg-slate-100">
        {deviceMode === 'mobile' ? (
          /* Bento Mockup Frame */
          <div className="w-[360px] h-[660px] max-h-[88vh] bg-white rounded-[48px] shadow-2xl border-[8px] border-slate-900 flex flex-col overflow-hidden relative animate-fade-in">
            {/* Dynamic Island Speaker Bar */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
              <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
            </div>

            {/* Inner Bento Canvas Content */}
            <div className="relative w-full h-full rounded-[38px] overflow-y-auto custom-scrollbar flex flex-col pt-5 pb-3">
              <PublicProfileView
                profile={profile}
                onLinkClick={onLinkClick}
                onOpenQR={onOpenQR}
                onShare={handleCopyProfileUrl}
              />
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-300 rounded-full z-20 pointer-events-none" />
          </div>
        ) : deviceMode === 'tablet' ? (
          /* Tablet Mockup */
          <div className="relative w-full max-w-[540px] h-[720px] max-h-[88vh] bg-white rounded-[36px] p-2 shadow-2xl border-[8px] border-slate-900 flex flex-col overflow-hidden animate-fade-in">
            <div className="relative w-full h-full rounded-[28px] overflow-y-auto custom-scrollbar flex flex-col">
              <PublicProfileView
                profile={profile}
                onLinkClick={onLinkClick}
                onOpenQR={onOpenQR}
                onShare={handleCopyProfileUrl}
              />
            </div>
          </div>
        ) : (
          /* Fullscreen Canvas */
          <div className="w-full max-w-xl h-full rounded-2xl overflow-y-auto custom-scrollbar shadow-xl border border-slate-200 bg-white animate-fade-in">
            <PublicProfileView
              profile={profile}
              onLinkClick={onLinkClick}
              onOpenQR={onOpenQR}
              onShare={handleCopyProfileUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
};
