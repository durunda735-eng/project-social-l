import { SocialPlatformId, SocialPlatformInfo } from '../types';

export const SOCIAL_PLATFORMS: Record<SocialPlatformId, SocialPlatformInfo> = {
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'social',
    defaultTitle: 'LinkedIn',
    defaultPlaceholder: 'https://linkedin.com/in/username',
    defaultPrefix: 'https://linkedin.com/in/',
    brandColor: '#4F46E5', // Indigo-600 in Bento theme
    brandBg: 'bg-indigo-50 hover:bg-indigo-100',
    brandText: 'text-indigo-900',
    bentoBg: 'bg-indigo-50 hover:bg-indigo-100/90',
    bentoBorder: 'border-indigo-200',
    bentoText: 'text-indigo-950',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    defaultTitle: 'Instagram',
    defaultPlaceholder: 'https://instagram.com/username or @username',
    defaultPrefix: 'https://instagram.com/',
    brandColor: '#F43F5E',
    brandBg: 'bg-rose-50 hover:bg-rose-100',
    brandText: 'text-rose-900',
    bentoBg: 'bg-rose-50 hover:bg-rose-100/90',
    bentoBorder: 'border-rose-200',
    bentoText: 'text-rose-950',
  },
  github: {
    id: 'github',
    name: 'GitHub',
    category: 'developer',
    defaultTitle: 'GitHub',
    defaultPlaceholder: 'https://github.com/username or username',
    defaultPrefix: 'https://github.com/',
    brandColor: '#0F172A',
    brandBg: 'bg-slate-900 hover:bg-slate-800 text-white',
    brandText: 'text-white',
    bentoBg: 'bg-slate-900 hover:bg-slate-800 text-white',
    bentoBorder: 'border-slate-800',
    bentoText: 'text-white',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    category: 'video',
    defaultTitle: 'YouTube',
    defaultPlaceholder: 'https://youtube.com/@channel or @handle',
    defaultPrefix: 'https://youtube.com/@',
    brandColor: '#EF4444',
    brandBg: 'bg-red-50 hover:bg-red-100',
    brandText: 'text-red-900',
    bentoBg: 'bg-red-50 hover:bg-red-100/90',
    bentoBorder: 'border-red-200',
    bentoText: 'text-red-950',
  },
  twitter: {
    id: 'twitter',
    name: 'X / Twitter',
    category: 'social',
    defaultTitle: 'X / Twitter',
    defaultPlaceholder: 'https://x.com/username or @username',
    defaultPrefix: 'https://x.com/',
    brandColor: '#0284C7',
    brandBg: 'bg-sky-50 hover:bg-sky-100',
    brandText: 'text-sky-900',
    bentoBg: 'bg-sky-50 hover:bg-sky-100/90',
    bentoBorder: 'border-sky-200',
    bentoText: 'text-sky-950',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    category: 'video',
    defaultTitle: 'TikTok',
    defaultPlaceholder: 'https://tiktok.com/@username or @username',
    defaultPrefix: 'https://tiktok.com/@',
    brandColor: '#0F172A',
    brandBg: 'bg-slate-100 hover:bg-slate-200',
    brandText: 'text-slate-900',
    bentoBg: 'bg-slate-100 hover:bg-slate-200/90',
    bentoBorder: 'border-slate-300',
    bentoText: 'text-slate-950',
  },
  twitch: {
    id: 'twitch',
    name: 'Twitch',
    category: 'video',
    defaultTitle: 'Twitch Stream',
    defaultPlaceholder: 'https://twitch.tv/username or username',
    defaultPrefix: 'https://twitch.tv/',
    brandColor: '#9333EA',
    brandBg: 'bg-purple-50 hover:bg-purple-100',
    brandText: 'text-purple-900',
    bentoBg: 'bg-purple-50 hover:bg-purple-100/90',
    bentoBorder: 'border-purple-200',
    bentoText: 'text-purple-950',
  },
  discord: {
    id: 'discord',
    name: 'Discord',
    category: 'chat',
    defaultTitle: 'Discord Community',
    defaultPlaceholder: 'https://discord.gg/inviteCode',
    defaultPrefix: 'https://discord.gg/',
    brandColor: '#6366F1',
    brandBg: 'bg-indigo-50 hover:bg-indigo-100',
    brandText: 'text-indigo-900',
    bentoBg: 'bg-indigo-50/80 hover:bg-indigo-100/90',
    bentoBorder: 'border-indigo-200',
    bentoText: 'text-indigo-950',
  },
  spotify: {
    id: 'spotify',
    name: 'Spotify',
    category: 'music',
    defaultTitle: 'Spotify',
    defaultPlaceholder: 'https://open.spotify.com/artist/id or /track/id',
    defaultPrefix: 'https://open.spotify.com/',
    brandColor: '#10B981',
    brandBg: 'bg-emerald-50 hover:bg-emerald-100',
    brandText: 'text-emerald-900',
    bentoBg: 'bg-emerald-50 hover:bg-emerald-100/90',
    bentoBorder: 'border-emerald-200',
    bentoText: 'text-emerald-950',
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    category: 'social',
    defaultTitle: 'Threads',
    defaultPlaceholder: 'https://threads.net/@username or @username',
    defaultPrefix: 'https://threads.net/@',
    brandColor: '#1E293B',
    brandBg: 'bg-slate-100 hover:bg-slate-200',
    brandText: 'text-slate-900',
    bentoBg: 'bg-slate-100 hover:bg-slate-200/90',
    bentoBorder: 'border-slate-300',
    bentoText: 'text-slate-950',
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    category: 'chat',
    defaultTitle: 'Telegram',
    defaultPlaceholder: 'https://t.me/username or @username',
    defaultPrefix: 'https://t.me/',
    brandColor: '#0EA5E9',
    brandBg: 'bg-sky-50 hover:bg-sky-100',
    brandText: 'text-sky-900',
    bentoBg: 'bg-sky-50 hover:bg-sky-100/90',
    bentoBorder: 'border-sky-200',
    bentoText: 'text-sky-950',
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'chat',
    defaultTitle: 'WhatsApp',
    defaultPlaceholder: 'https://wa.me/1234567890 or phone number',
    defaultPrefix: 'https://wa.me/',
    brandColor: '#22C55E',
    brandBg: 'bg-emerald-50 hover:bg-emerald-100',
    brandText: 'text-emerald-900',
    bentoBg: 'bg-emerald-50 hover:bg-emerald-100/90',
    bentoBorder: 'border-emerald-200',
    bentoText: 'text-emerald-950',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    category: 'social',
    defaultTitle: 'Facebook',
    defaultPlaceholder: 'https://facebook.com/page-name',
    defaultPrefix: 'https://facebook.com/',
    brandColor: '#2563EB',
    brandBg: 'bg-blue-50 hover:bg-blue-100',
    brandText: 'text-blue-900',
    bentoBg: 'bg-blue-50 hover:bg-blue-100/90',
    bentoBorder: 'border-blue-200',
    bentoText: 'text-blue-950',
  },
  snapchat: {
    id: 'snapchat',
    name: 'Snapchat',
    category: 'social',
    defaultTitle: 'Snapchat',
    defaultPlaceholder: 'https://snapchat.com/add/username',
    defaultPrefix: 'https://snapchat.com/add/',
    brandColor: '#EAB308',
    brandBg: 'bg-amber-50 hover:bg-amber-100',
    brandText: 'text-amber-900',
    bentoBg: 'bg-amber-50 hover:bg-amber-100/90',
    bentoBorder: 'border-amber-200',
    bentoText: 'text-amber-950',
  },
  reddit: {
    id: 'reddit',
    name: 'Reddit',
    category: 'social',
    defaultTitle: 'Reddit',
    defaultPlaceholder: 'https://reddit.com/u/username',
    defaultPrefix: 'https://reddit.com/u/',
    brandColor: '#EA580C',
    brandBg: 'bg-orange-50 hover:bg-orange-100',
    brandText: 'text-orange-900',
    bentoBg: 'bg-orange-50 hover:bg-orange-100/90',
    bentoBorder: 'border-orange-200',
    bentoText: 'text-orange-950',
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    category: 'social',
    defaultTitle: 'Pinterest',
    defaultPlaceholder: 'https://pinterest.com/username',
    defaultPrefix: 'https://pinterest.com/',
    brandColor: '#E11D48',
    brandBg: 'bg-rose-50 hover:bg-rose-100',
    brandText: 'text-rose-900',
    bentoBg: 'bg-rose-50 hover:bg-rose-100/90',
    bentoBorder: 'border-rose-200',
    bentoText: 'text-rose-950',
  },
  patreon: {
    id: 'patreon',
    name: 'Patreon',
    category: 'creator',
    defaultTitle: 'Patreon Support',
    defaultPlaceholder: 'https://patreon.com/creator',
    defaultPrefix: 'https://patreon.com/',
    brandColor: '#F43F5E',
    brandBg: 'bg-rose-50 hover:bg-rose-100',
    brandText: 'text-rose-900',
    bentoBg: 'bg-rose-50 hover:bg-rose-100/90',
    bentoBorder: 'border-rose-200',
    bentoText: 'text-rose-950',
  },
  substack: {
    id: 'substack',
    name: 'Substack',
    category: 'creator',
    defaultTitle: 'Substack Newsletter',
    defaultPlaceholder: 'https://username.substack.com',
    defaultPrefix: 'https://',
    brandColor: '#EA580C',
    brandBg: 'bg-orange-50 hover:bg-orange-100',
    brandText: 'text-orange-900',
    bentoBg: 'bg-orange-50 hover:bg-orange-100/90',
    bentoBorder: 'border-orange-200',
    bentoText: 'text-orange-950',
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    category: 'creator',
    defaultTitle: 'Medium Articles',
    defaultPlaceholder: 'https://medium.com/@username',
    defaultPrefix: 'https://medium.com/@',
    brandColor: '#059669',
    brandBg: 'bg-emerald-50 hover:bg-emerald-100',
    brandText: 'text-emerald-900',
    bentoBg: 'bg-emerald-50 hover:bg-emerald-100/90',
    bentoBorder: 'border-emerald-200',
    bentoText: 'text-emerald-950',
  },
  calendly: {
    id: 'calendly',
    name: 'Book a Call',
    category: 'other',
    defaultTitle: 'Schedule 1-on-1',
    defaultPlaceholder: 'https://calendly.com/username',
    defaultPrefix: 'https://calendly.com/',
    brandColor: '#4F46E5',
    brandBg: 'bg-indigo-50 hover:bg-indigo-100',
    brandText: 'text-indigo-900',
    bentoBg: 'bg-indigo-50 hover:bg-indigo-100/90',
    bentoBorder: 'border-indigo-200',
    bentoText: 'text-indigo-950',
  },
  website: {
    id: 'website',
    name: 'Portfolio / Web',
    category: 'other',
    defaultTitle: 'Official Website',
    defaultPlaceholder: 'https://yourwebsite.com',
    defaultPrefix: 'https://',
    brandColor: '#4F46E5',
    brandBg: 'bg-slate-50 hover:bg-slate-100',
    brandText: 'text-slate-900',
    bentoBg: 'bg-slate-50 hover:bg-slate-100/90',
    bentoBorder: 'border-slate-200',
    bentoText: 'text-slate-950',
  },
  email: {
    id: 'email',
    name: 'Email Contact',
    category: 'other',
    defaultTitle: 'Email Me',
    defaultPlaceholder: 'mailto:contact@domain.com or email address',
    defaultPrefix: 'mailto:',
    brandColor: '#DC2626',
    brandBg: 'bg-red-50 hover:bg-red-100',
    brandText: 'text-red-900',
    bentoBg: 'bg-red-50 hover:bg-red-100/90',
    bentoBorder: 'border-red-200',
    bentoText: 'text-red-950',
  },
  custom: {
    id: 'custom',
    name: 'Custom Web Link',
    category: 'other',
    defaultTitle: 'Custom Link',
    defaultPlaceholder: 'https://anylink.com',
    defaultPrefix: 'https://',
    brandColor: '#4F46E5',
    brandBg: 'bg-slate-50 hover:bg-slate-100',
    brandText: 'text-slate-900',
    bentoBg: 'bg-slate-50 hover:bg-slate-100/90',
    bentoBorder: 'border-slate-200',
    bentoText: 'text-slate-950',
  },
};

export const PLATFORM_LIST = Object.values(SOCIAL_PLATFORMS);

export function detectPlatformFromUrl(input: string): { platformId: SocialPlatformId; cleanUrl: string; titleSuggestion?: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { platformId: 'custom', cleanUrl: '' };
  }

  const lower = trimmed.toLowerCase();

  if (lower.includes('linkedin.com')) {
    return { platformId: 'linkedin', cleanUrl: formatUrl(trimmed), titleSuggestion: 'LinkedIn' };
  }
  if (lower.includes('instagram.com')) {
    return { platformId: 'instagram', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Instagram' };
  }
  if (lower.includes('github.com')) {
    return { platformId: 'github', cleanUrl: formatUrl(trimmed), titleSuggestion: 'GitHub' };
  }
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    return { platformId: 'youtube', cleanUrl: formatUrl(trimmed), titleSuggestion: 'YouTube' };
  }
  if (lower.includes('tiktok.com')) {
    return { platformId: 'tiktok', cleanUrl: formatUrl(trimmed), titleSuggestion: 'TikTok' };
  }
  if (lower.includes('twitter.com') || lower.includes('x.com')) {
    return { platformId: 'twitter', cleanUrl: formatUrl(trimmed), titleSuggestion: 'X / Twitter' };
  }
  if (lower.includes('twitch.tv')) {
    return { platformId: 'twitch', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Twitch Stream' };
  }
  if (lower.includes('discord.gg') || lower.includes('discord.com')) {
    return { platformId: 'discord', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Discord' };
  }
  if (lower.includes('spotify.com')) {
    return { platformId: 'spotify', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Spotify' };
  }
  if (lower.includes('threads.net')) {
    return { platformId: 'threads', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Threads' };
  }
  if (lower.includes('t.me') || lower.includes('telegram.me')) {
    return { platformId: 'telegram', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Telegram' };
  }
  if (lower.includes('wa.me') || lower.includes('whatsapp.com')) {
    return { platformId: 'whatsapp', cleanUrl: formatUrl(trimmed), titleSuggestion: 'WhatsApp' };
  }
  if (lower.includes('reddit.com')) {
    return { platformId: 'reddit', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Reddit' };
  }
  if (lower.includes('pinterest.com')) {
    return { platformId: 'pinterest', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Pinterest' };
  }
  if (lower.includes('patreon.com')) {
    return { platformId: 'patreon', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Patreon' };
  }
  if (lower.includes('substack.com')) {
    return { platformId: 'substack', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Substack' };
  }
  if (lower.includes('medium.com')) {
    return { platformId: 'medium', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Medium' };
  }
  if (lower.includes('calendly.com')) {
    return { platformId: 'calendly', cleanUrl: formatUrl(trimmed), titleSuggestion: 'Book Meeting' };
  }
  if (lower.startsWith('mailto:') || (lower.includes('@') && !lower.includes('/'))) {
    return { platformId: 'email', cleanUrl: lower.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`, titleSuggestion: 'Email Inquiries' };
  }

  return {
    platformId: 'custom',
    cleanUrl: formatUrl(trimmed),
    titleSuggestion: trimmed.replace(/^https?:\/\//i, '').split('/')[0] || 'My Link',
  };
}

export function formatUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
