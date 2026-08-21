import React, { useState } from 'react';
import {
  ProfileConfig,
  SocialLink,
  SocialPlatformId,
  ButtonRadius,
  ButtonVariant,
  AvatarShape,
  FontStyle,
  AnimationEffect,
  LayoutType,
} from '../types';
import { SOCIAL_PLATFORMS, PLATFORM_LIST, detectPlatformFromUrl, formatUrl } from '../data/platforms';
import { THEMES, DEMO_PRESETS } from '../data/themes';
import { SocialIcon } from './SocialIcon';
import {
  GripVertical,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Sparkles,
  Link2,
  CheckCircle2,
  Layers,
  Palette,
  User,
  Sliders,
  Wand2,
  AlertCircle,
  TrendingUp,
  LayoutGrid,
  Columns,
} from 'lucide-react';
import { Reorder } from 'motion/react';

interface DragDropEditorProps {
  profile: ProfileConfig;
  onChange: (updated: ProfileConfig) => void;
  onOpenAnalytics: () => void;
}

export const DragDropEditor: React.FC<DragDropEditorProps> = ({
  profile,
  onChange,
  onOpenAnalytics,
}) => {
  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'profile' | 'presets'>('links');
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  // Quick link input state
  const [quickUrl, setQuickUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<SocialPlatformId | null>(null);
  const [quickTitle, setQuickTitle] = useState('');

  // Handle quick url change with intelligent auto-detection
  const handleQuickUrlChange = (value: string) => {
    setQuickUrl(value);
    if (value.trim()) {
      const detection = detectPlatformFromUrl(value);
      setDetectedPlatform(detection.platformId);
      if (!quickTitle || quickTitle === '') {
        setQuickTitle(detection.titleSuggestion || SOCIAL_PLATFORMS[detection.platformId]?.defaultTitle || '');
      }
    } else {
      setDetectedPlatform(null);
    }
  };

  const handleAddQuickLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;

    const detection = detectPlatformFromUrl(quickUrl);
    const platformId = detectedPlatform || detection.platformId;
    const platform = SOCIAL_PLATFORMS[platformId] || SOCIAL_PLATFORMS.custom;

    const newLink: SocialLink = {
      id: `link-${Date.now()}`,
      platformId,
      title: quickTitle.trim() || detection.titleSuggestion || platform.defaultTitle,
      url: formatUrl(quickUrl),
      subtitle: `${platform.name} Link`,
      isEnabled: true,
      clicks: 0,
      animationEffect: 'none',
      cardSpan: profile.links.length % 3 === 0 ? 'full' : 'half',
    };

    onChange({
      ...profile,
      links: [newLink, ...profile.links],
    });

    setQuickUrl('');
    setQuickTitle('');
    setDetectedPlatform(null);
    setEditingLinkId(newLink.id);
  };

  const handleAddPlatformDirect = (platformId: SocialPlatformId) => {
    const platform = SOCIAL_PLATFORMS[platformId];
    const isFirstOrThird = profile.links.length % 3 === 0;

    const newLink: SocialLink = {
      id: `link-${Date.now()}`,
      platformId,
      title: platform.defaultTitle,
      url: platform.defaultPrefix,
      subtitle: platform.category === 'social' ? `@${profile.handle.replace('@', '') || 'username'}` : `${platform.name} Channel`,
      isEnabled: true,
      clicks: 0,
      animationEffect: 'none',
      cardSpan: isFirstOrThird ? 'full' : 'half',
    };

    onChange({
      ...profile,
      links: [...profile.links, newLink],
    });

    setEditingLinkId(newLink.id);
  };

  const handleReorderLinks = (newLinks: SocialLink[]) => {
    onChange({
      ...profile,
      links: newLinks,
    });
  };

  const handleUpdateLink = (id: string, updates: Partial<SocialLink>) => {
    onChange({
      ...profile,
      links: profile.links.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    });
  };

  const handleDeleteLink = (id: string) => {
    onChange({
      ...profile,
      links: profile.links.filter((l) => l.id !== id),
    });
    if (editingLinkId === id) {
      setEditingLinkId(null);
    }
  };

  const handleDuplicateLink = (link: SocialLink) => {
    const duplicated: SocialLink = {
      ...link,
      id: `link-${Date.now()}`,
      title: `${link.title} (Copy)`,
      clicks: 0,
    };
    onChange({
      ...profile,
      links: [...profile.links, duplicated],
    });
  };

  const handleToggleMiniSocial = (platformId: SocialPlatformId) => {
    const existing = profile.miniSocials.find((m) => m.platformId === platformId);
    if (existing) {
      onChange({
        ...profile,
        miniSocials: profile.miniSocials.map((m) =>
          m.platformId === platformId ? { ...m, isEnabled: !m.isEnabled } : m
        ),
      });
    } else {
      const platform = SOCIAL_PLATFORMS[platformId];
      onChange({
        ...profile,
        miniSocials: [
          ...profile.miniSocials,
          {
            id: `mini-${Date.now()}`,
            platformId,
            url: platform.defaultPrefix,
            isEnabled: true,
          },
        ],
      });
    }
  };

  const handleApplyPreset = (presetKey: string) => {
    const preset = DEMO_PRESETS[presetKey];
    if (preset) {
      onChange({
        ...profile,
        ...preset.profile,
      });
    }
  };

  return (
    <div id="drag-drop-editor-root" className="h-full flex flex-col bg-white border-r border-slate-200 text-slate-800">
      {/* Top Header Tabs with Bento styling */}
      <div className="p-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              B
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-slate-900">Bento Grid Studio</h2>
              <p className="text-[11px] text-slate-400 font-medium">Drag, customize & arrange widgets</p>
            </div>
          </div>

          <button
            id="editor-analytics-trigger-btn"
            type="button"
            onClick={onOpenAnalytics}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors border border-slate-200 shadow-2xs"
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Tab Navigation in Bento style */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            id="tab-links"
            type="button"
            onClick={() => setActiveTab('links')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-semibold transition-all ${
              activeTab === 'links'
                ? 'bg-white text-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Widgets</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
              {profile.links.length}
            </span>
          </button>

          <button
            id="tab-appearance"
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-semibold transition-all ${
              activeTab === 'appearance'
                ? 'bg-white text-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Themes</span>
          </button>

          <button
            id="tab-profile"
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            id="tab-presets"
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-semibold transition-all ${
              activeTab === 'presets'
                ? 'bg-white text-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Presets</span>
          </button>
        </div>
      </div>

      {/* Main Tab Panels Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar flex flex-col justify-between">
        <div className="space-y-5">
          {/* TAB 1: LINKS & BENTO WIDGETS BUILDER */}
          {activeTab === 'links' && (
            <div className="space-y-5 animate-fade-in">
              {/* Quick Add Form with Auto-Detect */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-indigo-600" />
                    Add Custom Link / URL
                  </span>
                  {detectedPlatform && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold flex items-center gap-1">
                      Detected: <strong>{SOCIAL_PLATFORMS[detectedPlatform]?.name}</strong>
                    </span>
                  )}
                </div>

                <form onSubmit={handleAddQuickLink} className="space-y-2.5">
                  <div>
                    <input
                      id="quick-link-url-input"
                      type="text"
                      value={quickUrl}
                      onChange={(e) => handleQuickUrlChange(e.target.value)}
                      placeholder="Paste URL or handle (e.g. instagram.com/username)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
                    />
                  </div>

                  {quickUrl.trim() && (
                    <div className="flex gap-2 animate-fade-in">
                      <input
                        id="quick-link-title-input"
                        type="text"
                        value={quickTitle}
                        onChange={(e) => setQuickTitle(e.target.value)}
                        placeholder="Widget Title (e.g. Follow on Instagram)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                      <button
                        id="submit-quick-link-btn"
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-2xs flex items-center gap-1.5 shrink-0 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Add New Widget - Bento Grid Palette */}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Add New Widget
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Click to insert</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
                    { id: 'instagram', label: 'Instagram', icon: 'instagram' },
                    { id: 'github', label: 'GitHub', icon: 'github' },
                    { id: 'youtube', label: 'YouTube', icon: 'youtube' },
                    { id: 'twitter', label: 'X / Twitter', icon: 'twitter' },
                    { id: 'spotify', label: 'Spotify', icon: 'spotify' },
                    { id: 'website', label: 'Custom Web', icon: 'website' },
                    { id: 'email', label: 'Email', icon: 'email' },
                  ].map((item) => {
                    const platform = SOCIAL_PLATFORMS[item.id as SocialPlatformId];
                    return (
                      <div
                        key={item.id}
                        id={`quick-add-${item.id}`}
                        onClick={() => handleAddPlatformDirect(item.id as SocialPlatformId)}
                        className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer group transition-all"
                      >
                        <div className="w-10 h-10 bg-white shadow-2xs rounded-lg flex items-center justify-center text-slate-600 group-hover:text-indigo-600 mb-2 transition-transform group-hover:scale-105">
                          <SocialIcon platformId={item.id as SocialPlatformId} size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 group-hover:text-indigo-900 truncate">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reorderable Active Bento Widgets List */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Active Widgets ({profile.links.length})
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium border border-slate-200">
                      <GripVertical className="w-3 h-3 text-slate-400" /> Drag to reorder
                    </span>
                  </div>
                </div>

                {profile.links.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 text-xs">
                    <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-60 text-slate-400" />
                    No widgets on your canvas yet. Click any social tile above to add one!
                  </div>
                ) : (
                  <Reorder.Group
                    axis="y"
                    values={profile.links}
                    onReorder={handleReorderLinks}
                    className="space-y-2.5"
                  >
                    {profile.links.map((link) => {
                      const platform = SOCIAL_PLATFORMS[link.platformId] || SOCIAL_PLATFORMS.custom;
                      const isExpanded = editingLinkId === link.id;

                      return (
                        <Reorder.Item
                          key={link.id}
                          value={link}
                          id={`draggable-link-${link.id}`}
                          className={`rounded-2xl border transition-all ${
                            isExpanded
                              ? 'bg-white border-indigo-400 shadow-md ring-2 ring-indigo-50'
                              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                          } ${!link.isEnabled ? 'opacity-50' : ''}`}
                        >
                          {/* Drag Handle & Summary Header */}
                          <div className="flex items-center gap-2.5 p-3 select-none">
                            {/* Grip Handle */}
                            <div className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600">
                              <GripVertical className="w-4 h-4" />
                            </div>

                            {/* Icon */}
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: `${platform.brandColor}15`,
                                color: platform.brandColor,
                              }}
                            >
                              <SocialIcon platformId={link.platformId} size={18} color={platform.brandColor} />
                            </div>

                            {/* Title & URL preview */}
                            <div
                              className="flex-1 min-w-0 cursor-pointer"
                              onClick={() => setEditingLinkId(isExpanded ? null : link.id)}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900 truncate">
                                  {link.title || platform.defaultTitle}
                                </span>
                                {link.highlightBadge && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                                    {link.highlightBadge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400 truncate block font-medium">
                                {link.url || 'No URL configured'}
                              </span>
                            </div>

                            {/* Card Span Indicator Badge */}
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateLink(link.id, {
                                  cardSpan: link.cardSpan === 'half' ? 'full' : 'half',
                                })
                              }
                              title={`Card span: ${link.cardSpan || 'full'} (Click to toggle width)`}
                              className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-600 transition-colors"
                            >
                              {link.cardSpan === 'half' ? '1x1' : '2x1'}
                            </button>

                            {/* Quick Actions */}
                            <div className="flex items-center gap-1 shrink-0">
                              {/* Toggle visibility */}
                              <button
                                type="button"
                                id={`toggle-link-${link.id}`}
                                onClick={() => handleUpdateLink(link.id, { isEnabled: !link.isEnabled })}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                title={link.isEnabled ? 'Hide button' : 'Show button'}
                              >
                                {link.isEnabled ? <Eye className="w-4 h-4 text-slate-600" /> : <EyeOff className="w-4 h-4 text-slate-300" />}
                              </button>

                              {/* Edit Drawer Trigger */}
                              <button
                                type="button"
                                id={`edit-link-${link.id}`}
                                onClick={() => setEditingLinkId(isExpanded ? null : link.id)}
                                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                                  isExpanded ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <Sliders className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Edit Form */}
                          {isExpanded && (
                            <div className="p-3.5 pt-0 border-t border-slate-100 mt-1 space-y-3 animate-fade-in text-xs">
                              {/* Platform Selector & Title */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Social Platform</label>
                                  <select
                                    value={link.platformId}
                                    onChange={(e) =>
                                      handleUpdateLink(link.id, {
                                        platformId: e.target.value as SocialPlatformId,
                                      })
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                                  >
                                    {PLATFORM_LIST.map((p) => (
                                      <option key={p.id} value={p.id}>
                                        {p.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Widget Title</label>
                                  <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                                    placeholder="e.g. LinkedIn"
                                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                                  />
                                </div>
                              </div>

                              {/* Destination URL */}
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Destination URL</label>
                                <input
                                  type="text"
                                  value={link.url}
                                  onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                                  placeholder="https://..."
                                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-500"
                                />
                              </div>

                              {/* Bento Card Width Span & Subtitle */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bento Grid Span</label>
                                  <div className="grid grid-cols-2 gap-1.5 p-0.5 bg-slate-100 rounded-xl border border-slate-200">
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateLink(link.id, { cardSpan: 'full' })}
                                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                                        link.cardSpan !== 'half' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
                                      }`}
                                    >
                                      Full Width (2x1)
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateLink(link.id, { cardSpan: 'half' })}
                                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                                        link.cardSpan === 'half' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
                                      }`}
                                    >
                                      Half Tile (1x1)
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Badge Tag (Optional)</label>
                                  <input
                                    type="text"
                                    value={link.highlightBadge || ''}
                                    onChange={(e) => handleUpdateLink(link.id, { highlightBadge: e.target.value })}
                                    placeholder="e.g. CAREER, VIP"
                                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                                  />
                                </div>
                              </div>

                              {/* Subtitle / Description */}
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Subtitle / Bio Note</label>
                                <input
                                  type="text"
                                  value={link.subtitle || ''}
                                  onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                                  placeholder="e.g. Professional Network & Articles"
                                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                                />
                              </div>

                              {/* Bottom Actions for link */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                <span className="text-[11px] text-slate-400">
                                  Redirects: <strong className="text-slate-700">{link.clicks || 0}</strong>
                                </span>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    id={`duplicate-link-${link.id}`}
                                    onClick={() => handleDuplicateLink(link)}
                                    className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-slate-100"
                                  >
                                    <Copy className="w-3 h-3" />
                                    Duplicate
                                  </button>
                                  <button
                                    type="button"
                                    id={`delete-link-${link.id}`}
                                    onClick={() => handleDeleteLink(link.id)}
                                    className="flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg hover:bg-rose-50"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: APPEARANCE & THEMES */}
          {activeTab === 'appearance' && (
            <div className="space-y-5 animate-fade-in">
              {/* Theme Presets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Color Themes
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {THEMES.map((theme) => {
                    const isSelected = profile.themeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        id={`theme-select-${theme.id}`}
                        type="button"
                        onClick={() => onChange({ ...profile, themeId: theme.id })}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/20 shadow-2xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`h-10 w-full rounded-xl mb-2 flex items-center justify-center p-2 text-xs font-semibold ${theme.background} border border-slate-200`}>
                          <div className={`w-full h-5 rounded-lg ${theme.cardBg} ${theme.cardBorder} flex items-center justify-center text-[9px] font-bold ${theme.textColor}`}>
                            Bento Tile
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">{theme.name}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Layout Mode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Layout Structure
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ ...profile, layoutType: 'bento-grid' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      profile.layoutType === 'bento-grid'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4 text-indigo-600" />
                    <span>2-Column Bento Grid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChange({ ...profile, layoutType: 'classic-stack' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      profile.layoutType === 'classic-stack'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Columns className="w-4 h-4 text-slate-600" />
                    <span>Classic Vertical Stack</span>
                  </button>
                </div>
              </div>

              {/* Corner Radius */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Widget Corner Radius
                </label>
                <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                  {(['full', 'xl', 'lg', 'md', 'none'] as ButtonRadius[]).map((radius) => (
                    <button
                      key={radius}
                      type="button"
                      id={`radius-btn-${radius}`}
                      onClick={() => onChange({ ...profile, buttonRadius: radius })}
                      className={`py-2 px-1 rounded-lg text-center font-bold capitalize transition-all ${
                        profile.buttonRadius === radius
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {radius === 'none' ? 'Sharp' : radius}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini Social Icons Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Header / Footer Social Icons
                </label>
                <select
                  value={profile.socialBarPlacement}
                  onChange={(e) =>
                    onChange({
                      ...profile,
                      socialBarPlacement: e.target.value as 'header' | 'footer' | 'both' | 'hidden',
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                >
                  <option value="header">Top Header (Under Bio)</option>
                  <option value="footer">Bottom Footer</option>
                  <option value="both">Both Top & Bottom</option>
                  <option value="hidden">Hidden</option>
                </select>

                <div className="flex flex-wrap gap-2 pt-1">
                  {PLATFORM_LIST.slice(0, 10).map((platform) => {
                    const isActive = profile.miniSocials.some((m) => m.platformId === platform.id && m.isEnabled);
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => handleToggleMiniSocial(platform.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <SocialIcon platformId={platform.id} size={14} color={isActive ? platform.brandColor : undefined} />
                        <span>{platform.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE INFO */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-fade-in text-xs">
              {/* Avatar & Shape */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Profile Avatar
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                    alt="Avatar"
                    className={`w-14 h-14 object-cover border-2 border-indigo-600 ${
                      profile.avatarShape === 'circle'
                        ? 'rounded-full'
                        : profile.avatarShape === 'squircle'
                        ? 'rounded-[32%]'
                        : 'rounded-xl'
                    }`}
                  />
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={profile.avatarUrl}
                      onChange={(e) => onChange({ ...profile, avatarUrl: e.target.value })}
                      placeholder="Avatar image URL"
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                    />
                    <div className="flex gap-1.5">
                      {(['circle', 'squircle', 'rounded'] as AvatarShape[]).map((shape) => (
                        <button
                          key={shape}
                          type="button"
                          onClick={() => onChange({ ...profile, avatarShape: shape })}
                          className={`px-2 py-0.5 rounded-md text-[10px] capitalize font-bold transition-colors ${
                            profile.avatarShape === shape
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Name & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Display Name</label>
                  <input
                    id="input-profile-name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => onChange({ ...profile, name: e.target.value })}
                    placeholder="Marcus Chen"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Handle</label>
                  <input
                    id="input-profile-handle"
                    type="text"
                    value={profile.handle}
                    onChange={(e) => onChange({ ...profile, handle: e.target.value })}
                    placeholder="@marcus.design"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 font-bold"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bio / Tagline</label>
                <textarea
                  id="input-profile-bio"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => onChange({ ...profile, bio: e.target.value })}
                  placeholder="Digital Creative & Visual Artist..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 resize-none font-medium"
                />
              </div>

              {/* Location & Status Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => onChange({ ...profile, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status Banner</label>
                  <input
                    type="text"
                    value={profile.statusBadge || ''}
                    onChange={(e) => onChange({ ...profile, statusBadge: e.target.value })}
                    placeholder="e.g. 🚀 Open for Freelance"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Verified Blue Badge */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <div>
                    <span className="font-bold text-slate-900 block">Verified Checkmark</span>
                    <span className="text-[10px] text-slate-500">Show verification checkmark next to your name</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.isVerified}
                  onChange={(e) => onChange({ ...profile, isVerified: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          )}

          {/* TAB 4: PRESETS & TEMPLATES */}
          {activeTab === 'presets' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900">
                <p className="font-bold text-xs mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Bento Starter Templates
                </p>
                <p className="text-[11px] text-indigo-700">
                  Switch between designer, developer, and creator starter presets with one click.
                </p>
              </div>

              <div className="space-y-2.5">
                {Object.entries(DEMO_PRESETS).map(([key, preset]) => (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{preset.label}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{preset.description}</p>
                    </div>
                    <button
                      type="button"
                      id={`apply-preset-${key}`}
                      onClick={() => handleApplyPreset(key)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-600 font-bold text-xs shrink-0 border border-slate-200 shadow-2xs transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bento Pro Tip Card at bottom of left panel */}
        <div className="mt-6 p-4 bg-slate-900 rounded-2xl text-white shadow-sm shrink-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400">Pro Tip</span>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            Hold and drag any widget from the list or toggle between 1x1 tile and 2x1 banner to customize your bento profile layout.
          </p>
        </div>
      </div>
    </div>
  );
};
