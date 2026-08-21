import React, { useState } from 'react';
import { SocialLink, ThemeConfig, ButtonRadius, ButtonVariant } from '../types';
import { SOCIAL_PLATFORMS } from '../data/platforms';
import { SocialIcon } from './SocialIcon';
import { ExternalLink, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SocialRedirectButtonProps {
  link: SocialLink;
  theme: ThemeConfig;
  buttonRadius?: ButtonRadius;
  buttonVariant?: ButtonVariant;
  onLinkClick?: (linkId: string) => void;
  isPreview?: boolean;
  compact?: boolean;
  isBentoMode?: boolean;
}

export const SocialRedirectButton: React.FC<SocialRedirectButtonProps> = ({
  link,
  theme,
  buttonRadius = theme.buttonRadius,
  buttonVariant = theme.buttonVariant,
  onLinkClick,
  isPreview = false,
  compact = false,
  isBentoMode = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const platform = SOCIAL_PLATFORMS[link.platformId] || SOCIAL_PLATFORMS.custom;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onLinkClick) {
      onLinkClick(link.id);
    }

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    if (link.isFeatured || link.highlightBadge) {
      try {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 26,
          spread: 50,
          origin: { x, y },
          colors: [platform.brandColor || '#4F46E5', '#F43F5E', '#10B981'],
          disableForReducedMotion: true,
        });
      } catch {}
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard && link.url) {
      navigator.clipboard.writeText(link.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Radius mapping
  const radiusClass = {
    full: 'rounded-full',
    xl: 'rounded-2xl',
    lg: 'rounded-xl',
    md: 'rounded-lg',
    none: 'rounded-none',
  }[buttonRadius] || 'rounded-2xl';

  // Animation classes
  const getAnimationClass = () => {
    switch (link.animationEffect) {
      case 'pulse':
        return 'animate-pulse ring-2 ring-indigo-400/40 ring-offset-2';
      case 'glow':
        return 'shadow-[0_0_20px_rgba(79,70,229,0.3)] border-indigo-400/60';
      case 'bounce':
        return 'hover:-translate-y-1';
      case 'shimmer':
        return 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';
      default:
        return '';
    }
  };

  const isBento = isBentoMode || buttonVariant === 'bento';
  const isHalfSpan = isBento && link.cardSpan === 'half';

  // Specific Bento style per platform
  const getBentoCardStyles = () => {
    if (link.platformId === 'github') {
      return 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800/95 shadow-sm';
    }
    if (link.platformId === 'linkedin') {
      return 'bg-indigo-50 border-indigo-200 text-indigo-950 hover:bg-indigo-100/90 shadow-sm';
    }
    if (link.platformId === 'instagram') {
      return 'bg-rose-50 border-rose-200 text-rose-950 hover:bg-rose-100/90 shadow-sm';
    }
    if (link.platformId === 'youtube') {
      return 'bg-red-50 border-red-200 text-red-950 hover:bg-red-100/90 shadow-sm';
    }
    if (link.platformId === 'twitter') {
      return 'bg-sky-50 border-sky-200 text-sky-950 hover:bg-sky-100/90 shadow-sm';
    }
    if (link.platformId === 'spotify') {
      return 'bg-emerald-50 border-emerald-200 text-emerald-950 hover:bg-emerald-100/90 shadow-sm';
    }
    if (platform.bentoBg && platform.bentoBorder) {
      return `${platform.bentoBg} ${platform.bentoBorder} ${platform.bentoText || 'text-slate-900'} shadow-sm`;
    }
    return `${theme.cardBg} ${theme.cardBorder} ${theme.textColor} shadow-sm hover:border-indigo-300`;
  };

  // Variant Styling for Standard Mode
  const getVariantStyles = () => {
    if (isBento) {
      return getBentoCardStyles();
    }
    if (buttonVariant === 'pop') {
      return 'border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
    }
    if (buttonVariant === 'outline') {
      return `${theme.cardBorder} bg-transparent hover:bg-slate-100/50 ${theme.textColor}`;
    }
    if (buttonVariant === 'solid') {
      return `${theme.cardBg} ${theme.cardBorder} ${theme.textColor} shadow-xs hover:shadow-sm`;
    }
    if (buttonVariant === 'gradient') {
      return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border border-indigo-500/50 shadow-sm hover:from-indigo-500 hover:to-purple-500';
    }
    return `${theme.cardBg} ${theme.cardBorder} ${theme.textColor} backdrop-blur-md shadow-xs hover:shadow-sm`;
  };

  // Bento Half-Tile Layout (1x1 Squircle tile)
  if (isHalfSpan) {
    const isDarkCard = link.platformId === 'github';

    return (
      <div
        id={`social-link-wrapper-${link.id}`}
        className="group relative w-full col-span-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          id={`social-redirect-${link.id}`}
          href={link.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={`group relative flex flex-col justify-between p-4 w-full min-h-[110px] sm:min-h-[120px] transition-all duration-200 cursor-pointer select-none no-underline border rounded-2xl ${getVariantStyles()} ${getAnimationClass()} ${
            isClicked ? 'scale-[0.98]' : 'hover:scale-[1.02]'
          }`}
          style={
            link.customBgColor || link.customTextColor
              ? {
                  backgroundColor: link.customBgColor || undefined,
                  color: link.customTextColor || undefined,
                }
              : undefined
          }
        >
          {/* Top Bar with Icon & Actions */}
          <div className="flex items-center justify-between w-full">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                isDarkCard
                  ? 'bg-white text-slate-900 shadow-sm'
                  : link.platformId === 'linkedin'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : link.platformId === 'instagram'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : link.platformId === 'youtube'
                  ? 'bg-red-600 text-white shadow-sm'
                  : link.platformId === 'twitter'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : link.platformId === 'spotify'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-indigo-600 text-white shadow-sm'
              }`}
            >
              <SocialIcon platformId={link.platformId} size={18} />
            </div>

            {/* Quick Copy Tooltip Button */}
            <button
              type="button"
              id={`copy-btn-${link.id}`}
              onClick={handleCopyLink}
              title="Copy URL"
              className="p-1 rounded-md opacity-0 group-hover:opacity-80 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-xs"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>
          </div>

          {/* Bottom Title & Handle info */}
          <div className="mt-3 flex flex-col text-left">
            <span className="font-bold text-xs sm:text-sm tracking-tight truncate leading-tight">
              {link.title || platform.defaultTitle}
            </span>
            {link.subtitle ? (
              <span className={`text-[10px] truncate mt-0.5 font-medium opacity-70 ${isDarkCard ? 'text-slate-400' : 'text-slate-500'}`}>
                {link.subtitle}
              </span>
            ) : (
              <span className={`text-[10px] uppercase font-bold tracking-tight mt-0.5 opacity-60 ${isDarkCard ? 'text-slate-400' : 'text-slate-500'}`}>
                {platform.name}
              </span>
            )}
          </div>
        </a>
      </div>
    );
  }

  // Full-width Bento Card / Classic List Item
  const isDarkCard = isBento && link.platformId === 'github';

  return (
    <div
      id={`social-link-wrapper-${link.id}`}
      className={`group relative w-full transition-transform duration-200 ${isBento ? 'col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        id={`social-redirect-${link.id}`}
        href={link.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`group relative flex items-center justify-between gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4 w-full transition-all duration-200 cursor-pointer select-none no-underline border ${radiusClass} ${getVariantStyles()} ${getAnimationClass()} ${
          isClicked ? 'scale-[0.98]' : 'hover:scale-[1.015]'
        }`}
        style={
          link.customBgColor || link.customTextColor
            ? {
                backgroundColor: link.customBgColor || undefined,
                color: link.customTextColor || undefined,
              }
            : undefined
        }
      >
        {/* Left Icon with Brand badge */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div
            className={`relative flex items-center justify-center shrink-0 w-10 h-10 transition-transform duration-200 group-hover:scale-105 ${
              buttonRadius === 'full' ? 'rounded-full' : 'rounded-xl'
            } ${
              isBento
                ? isDarkCard
                  ? 'bg-white text-slate-900 shadow-xs'
                  : link.platformId === 'linkedin'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : link.platformId === 'instagram'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : link.platformId === 'youtube'
                  ? 'bg-red-600 text-white shadow-xs'
                  : link.platformId === 'twitter'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : link.platformId === 'spotify'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-indigo-600 text-white shadow-xs'
                : ''
            }`}
            style={
              !isBento
                ? {
                    backgroundColor: `${platform.brandColor}20`,
                    color: platform.brandColor,
                    border: `1px solid ${platform.brandColor}40`,
                  }
                : undefined
            }
          >
            <SocialIcon
              platformId={link.platformId}
              size={20}
              color={!isBento ? platform.brandColor : undefined}
            />
            {link.isFeatured && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
              </span>
            )}
          </div>

          {/* Text Info */}
          <div className="flex flex-col min-w-0 text-left">
            <div className="flex items-center gap-2">
              <span className={`font-bold text-xs sm:text-sm tracking-tight truncate leading-snug ${isDarkCard ? 'text-white' : ''}`}>
                {link.title || platform.defaultTitle}
              </span>
              {link.highlightBadge && (
                <span
                  className={`text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full shrink-0 shadow-2xs ${
                    isBento
                      ? isDarkCard
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : theme.badgeBg || 'bg-indigo-600 text-white'
                  }`}
                >
                  {link.highlightBadge}
                </span>
              )}
            </div>
            {link.subtitle && !compact && (
              <span className={`text-[11px] truncate mt-0.5 font-medium ${isDarkCard ? 'text-slate-400' : isBento && link.platformId === 'linkedin' ? 'text-indigo-700/80 uppercase tracking-tighter' : 'text-slate-500'}`}>
                {link.subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Right Arrow / Actions */}
        <div className="flex items-center gap-1.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            id={`copy-btn-full-${link.id}`}
            onClick={handleCopyLink}
            title="Copy URL"
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-xs flex items-center justify-center"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </a>
    </div>
  );
};
