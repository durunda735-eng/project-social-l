export type SocialPlatformId =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'twitch'
  | 'discord'
  | 'spotify'
  | 'threads'
  | 'facebook'
  | 'telegram'
  | 'whatsapp'
  | 'snapchat'
  | 'reddit'
  | 'pinterest'
  | 'patreon'
  | 'substack'
  | 'medium'
  | 'calendly'
  | 'website'
  | 'email'
  | 'custom';

export interface SocialPlatformInfo {
  id: SocialPlatformId;
  name: string;
  category: 'social' | 'video' | 'developer' | 'music' | 'chat' | 'creator' | 'other';
  defaultTitle: string;
  defaultPlaceholder: string;
  defaultPrefix: string;
  brandColor: string;
  brandBg: string;
  brandText: string;
  bentoBg?: string;
  bentoBorder?: string;
  bentoText?: string;
}

export type AnimationEffect = 'none' | 'pulse' | 'glow' | 'bounce' | 'shimmer';
export type ButtonVariant = 'solid' | 'outline' | 'glass' | 'gradient' | 'minimal' | 'pop' | 'bento';
export type ButtonRadius = 'full' | 'xl' | 'lg' | 'md' | 'none';
export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'colored' | 'glass';
export type AvatarShape = 'circle' | 'squircle' | 'rounded';
export type LayoutType = 'classic-stack' | 'grid-cards' | 'bento-grid' | 'compact-chips' | 'featured-hero';
export type FontStyle = 'sans' | 'serif' | 'mono';

export interface SocialLink {
  id: string;
  platformId: SocialPlatformId;
  title: string;
  url: string;
  subtitle?: string;
  highlightBadge?: string;
  isEnabled: boolean;
  clicks: number;
  customIcon?: string;
  customBgColor?: string;
  customTextColor?: string;
  animationEffect?: AnimationEffect;
  isFeatured?: boolean;
  cardSpan?: 'full' | 'half';
}

export interface MiniSocialIcon {
  id: string;
  platformId: SocialPlatformId;
  url: string;
  isEnabled: boolean;
}

export interface ThemeConfig {
  id: string;
  name: string;
  background: string;
  cardBg: string;
  cardBorder: string;
  textColor: string;
  subtextColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  buttonVariant: ButtonVariant;
  buttonRadius: ButtonRadius;
  buttonShadow: ButtonShadow;
  fontFamily: FontStyle;
  isDark: boolean;
}

export interface ProfileConfig {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  avatarShape: AvatarShape;
  isVerified: boolean;
  location?: string;
  statusBadge?: string;
  themeId: string;
  customTheme?: Partial<ThemeConfig>;
  layoutType: LayoutType;
  fontStyle: FontStyle;
  buttonRadius: ButtonRadius;
  buttonVariant: ButtonVariant;
  socialBarPlacement: 'header' | 'footer' | 'both' | 'hidden';
  links: SocialLink[];
  miniSocials: MiniSocialIcon[];
  footerText?: string;
}
