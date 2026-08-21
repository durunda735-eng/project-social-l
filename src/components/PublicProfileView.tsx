import React from 'react';
import { ProfileConfig, ThemeConfig } from '../types';
import { THEMES } from '../data/themes';
import { SOCIAL_PLATFORMS } from '../data/platforms';
import { SocialRedirectButton } from './SocialRedirectButton';
import { SocialIcon } from './SocialIcon';
import { CheckCircle2, QrCode, Share2, Sparkles, MapPin, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PublicProfileViewProps {
  profile: ProfileConfig;
  onLinkClick: (linkId: string) => void;
  onOpenQR: () => void;
  onShare: () => void;
  isStandalone?: boolean;
}

export const PublicProfileView: React.FC<PublicProfileViewProps> = ({
  profile,
  onLinkClick,
  onOpenQR,
  onShare,
  isStandalone = false,
}) => {
  const currentTheme: ThemeConfig =
    THEMES.find((t) => t.id === profile.themeId) || THEMES[0];

  const isBento = profile.layoutType === 'bento-grid' || profile.themeId === 'bento-grid';
  const activeLinks = profile.links.filter((l) => l.isEnabled);
  const activeMiniSocials = profile.miniSocials.filter((m) => m.isEnabled && m.url);

  // Avatar shape classes
  const avatarShapeClass = {
    circle: 'rounded-full',
    squircle: 'rounded-[30%]',
    rounded: 'rounded-2xl',
  }[profile.avatarShape] || 'rounded-full';

  const handleShareClick = () => {
    onShare();
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch {}
  };

  return (
    <div
      id="public-profile-container"
      className={`min-h-full w-full flex flex-col items-center justify-between p-4 sm:p-6 transition-colors duration-300 relative ${
        isBento ? 'bg-white text-slate-900' : currentTheme.background
      } ${profile.fontStyle === 'serif' ? 'font-serif' : profile.fontStyle === 'mono' ? 'font-mono' : 'font-sans'}`}
    >
      {/* Top Floating Share / QR Bar (when standalone) */}
      <div className="w-full max-w-sm flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Bento Bio</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="public-qr-trigger-btn"
            onClick={onOpenQR}
            title="Show QR Code"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-xs flex items-center gap-1.5 shadow-2xs border border-slate-200"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
          <button
            id="public-share-trigger-btn"
            onClick={handleShareClick}
            title="Share Profile"
            className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all text-xs flex items-center gap-1.5 shadow-2xs border border-indigo-200 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Profile Content Card */}
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        {/* Avatar Section */}
        <div className="relative mb-3 group mt-1">
          {profile.avatarUrl ? (
            <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto p-1 border-2 border-slate-100 overflow-hidden shadow-sm">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className={`w-full h-full object-cover ${avatarShapeClass}`}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto border-2 border-slate-50 overflow-hidden shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                {profile.name.charAt(0) || 'M'}
              </div>
            </div>
          )}

          {/* Status Badge */}
          {profile.statusBadge && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white border border-slate-800 shadow-sm flex items-center gap-1">
              <span>{profile.statusBadge}</span>
            </div>
          )}
        </div>

        {/* User Titles */}
        <div className="mt-1 mb-2">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
            {profile.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100 shrink-0" />
            )}
          </div>
          {profile.handle && (
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              {profile.handle.startsWith('@') ? profile.handle : `@${profile.handle}`}
            </p>
          )}
          {profile.location && (
            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" /> {profile.location}
            </p>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-xs text-slate-500 max-w-xs mb-4 leading-relaxed font-normal px-2">
            {profile.bio}
          </p>
        )}

        {/* Header Mini Socials Bar */}
        {(profile.socialBarPlacement === 'header' || profile.socialBarPlacement === 'both') &&
          activeMiniSocials.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              {activeMiniSocials.map((mini) => {
                const platform = SOCIAL_PLATFORMS[mini.platformId] || SOCIAL_PLATFORMS.custom;
                return (
                  <a
                    key={mini.id}
                    id={`mini-header-${mini.platformId}`}
                    href={mini.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onLinkClick(mini.id)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all hover:scale-105 shadow-2xs"
                    style={{ color: platform.brandColor }}
                    title={platform.name}
                  >
                    <SocialIcon platformId={mini.platformId} size={16} color={platform.brandColor} />
                  </a>
                );
              })}
            </div>
          )}

        {/* Bento Grid Redirect Links */}
        <div
          id="active-social-links-list"
          className={`w-full ${
            isBento
              ? 'grid grid-cols-2 gap-3 mb-6'
              : profile.layoutType === 'grid-cards'
              ? 'grid grid-cols-2 gap-3 mb-6'
              : 'space-y-3 mb-6'
          }`}
        >
          {activeLinks.length === 0 ? (
            <div className="col-span-2 p-8 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
              <div className="p-2 bg-slate-50 rounded-full text-slate-300">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Drop widget here
              </span>
            </div>
          ) : (
            <>
              {activeLinks.map((link) => (
                <SocialRedirectButton
                  key={link.id}
                  link={link}
                  theme={currentTheme}
                  buttonRadius={profile.buttonRadius || currentTheme.buttonRadius}
                  buttonVariant={profile.buttonVariant || currentTheme.buttonVariant}
                  onLinkClick={onLinkClick}
                  compact={profile.layoutType === 'compact-chips'}
                  isBentoMode={isBento}
                />
              ))}

              {/* Bento Drop Widget Placeholder (when in bento mode and has active links) */}
              {isBento && (
                <div className="col-span-2 border-2 border-dashed border-slate-200 rounded-2xl p-3.5 flex flex-col items-center justify-center text-slate-400 gap-1.5 hover:border-indigo-300 transition-colors">
                  <div className="p-1.5 bg-slate-50 rounded-full text-slate-300">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    Drop widget here
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Mini Socials Bar */}
        {(profile.socialBarPlacement === 'footer' || profile.socialBarPlacement === 'both') &&
          activeMiniSocials.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              {activeMiniSocials.map((mini) => {
                const platform = SOCIAL_PLATFORMS[mini.platformId] || SOCIAL_PLATFORMS.custom;
                return (
                  <a
                    key={mini.id}
                    id={`mini-footer-${mini.platformId}`}
                    href={mini.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onLinkClick(mini.id)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all hover:scale-105 shadow-2xs"
                    style={{ color: platform.brandColor }}
                    title={platform.name}
                  >
                    <SocialIcon platformId={mini.platformId} size={16} color={platform.brandColor} />
                  </a>
                );
              })}
            </div>
          )}
      </div>

      {/* Footer Branding */}
      <div className="mt-auto pt-4 pb-1 text-center text-xs text-slate-400 flex items-center justify-center gap-1 font-medium">
        <Sparkles className="w-3 h-3 text-indigo-500" />
        <span>{profile.footerText || 'bento.bio/marcus-design'}</span>
      </div>
    </div>
  );
};
