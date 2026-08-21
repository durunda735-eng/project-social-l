import React, { useState, useEffect } from 'react';
import { ProfileConfig } from './types';
import { DEFAULT_PROFILE } from './data/themes';
import { DragDropEditor } from './components/DragDropEditor';
import { LiveDevicePreview } from './components/LiveDevicePreview';
import { PublicProfileView } from './components/PublicProfileView';
import { QRCodeModal } from './components/QRCodeModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import {
  Edit3,
  Eye,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  BarChart2,
  QrCode,
  LayoutGrid,
  Palette,
  User,
  Sliders,
  Settings,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'social_link_hub_bento_profile_v2';

export default function App() {
  const [profile, setProfile] = useState<ProfileConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore error
    }
    return DEFAULT_PROFILE;
  });

  const [viewMode, setViewMode] = useState<'editor' | 'public'>('editor');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Storage quota safety
    }
  }, [profile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLinkClick = (linkId: string) => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.map((l) =>
        l.id === linkId ? { ...l, clicks: (l.clicks || 0) + 1 } : l
      ),
    }));
  };

  const handleResetClicks = () => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.map((l) => ({ ...l, clicks: 0 })),
    }));
    showToast('Analytics statistics reset');
  };

  const handleResetAll = () => {
    if (window.confirm('Discard changes and reset all bento widgets to default?')) {
      setProfile(DEFAULT_PROFILE);
      showToast('Reset to default Bento profile');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${profile.handle || 'bento-bio'}-backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Bento configuration exported');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.links && parsed.name) {
          setProfile(parsed);
          showToast('Profile imported successfully!');
        } else {
          alert('Invalid profile JSON structure');
        }
      } catch {
        alert('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Bento Bio link copied to clipboard!');
      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {}
    }
  };

  // If Public Mode is active: render standalone Link-in-Bio profile
  if (viewMode === 'public') {
    return (
      <div className="relative min-h-screen w-full flex flex-col bg-slate-50">
        {/* Floating Back to Editor Toggle Button */}
        <div className="fixed top-4 left-4 z-50">
          <button
            id="back-to-editor-btn"
            onClick={() => setViewMode('editor')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-xl border border-slate-200 transition-all hover:scale-105"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Customize Bento</span>
          </button>
        </div>

        <PublicProfileView
          profile={profile}
          onLinkClick={handleLinkClick}
          onOpenQR={() => setIsQRModalOpen(true)}
          onShare={handleShareProfile}
          isStandalone={true}
        />

        {/* QR Code Modal */}
        <QRCodeModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          url={window.location.href}
          title={profile.name || 'Bento Social Hub'}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold border border-slate-800 shadow-2xl backdrop-blur-md flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Bento Studio Editor Mode
  return (
    <div id="social-hub-app-root" className="h-screen w-screen flex flex-row bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Far Left Bento Icon Rail Navigation */}
      <nav className="w-16 sm:w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 sm:py-8 gap-8 shrink-0 select-none z-20">
        {/* Logo Mark */}
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xs transition-transform hover:scale-105">
          B
        </div>

        {/* Nav Icons */}
        <div className="flex flex-col gap-5 text-slate-400">
          <button
            type="button"
            id="rail-nav-widgets"
            onClick={() => setMobileTab('editor')}
            title="Widgets & Links"
            className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shadow-2xs transition-all hover:scale-105"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          <button
            type="button"
            id="rail-nav-analytics"
            onClick={() => setIsAnalyticsModalOpen(true)}
            title="Analytics Insights"
            className="p-2.5 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-xl transition-all"
          >
            <BarChart2 className="w-5 h-5" />
          </button>

          <button
            type="button"
            id="rail-nav-qr"
            onClick={() => setIsQRModalOpen(true)}
            title="QR Code Generator"
            className="p-2.5 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-xl transition-all"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col gap-4 text-slate-400">
          <button
            type="button"
            id="rail-nav-reset"
            onClick={handleResetAll}
            title="Discard changes & Reset"
            className="p-2.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              Social Canvas
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 hidden sm:inline">
                Bento Bio
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-tight">
              bento.bio/{profile.handle?.replace('@', '') || 'marcus-design'}
            </p>
          </div>

          {/* Mobile Tab Toggle */}
          <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setMobileTab('editor')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                mobileTab === 'editor' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Widgets
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                mobileTab === 'preview' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Canvas
            </button>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Export JSON */}
            <button
              id="btn-export-config"
              type="button"
              onClick={handleExportJson}
              title="Export Profile JSON"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 hidden md:flex items-center gap-1.5 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            {/* Import JSON */}
            <label
              htmlFor="import-profile-input"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-semibold"
              title="Import Profile JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
              <input
                id="import-profile-input"
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>

            {/* Discard Button */}
            <button
              id="header-discard-btn"
              type="button"
              onClick={handleResetAll}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors hidden sm:block"
            >
              Discard
            </button>

            {/* Publish Live / View Mode */}
            <button
              id="header-publish-btn"
              type="button"
              onClick={() => setViewMode('public')}
              className="px-5 sm:px-6 py-2 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all hover:scale-[1.02] flex items-center gap-1.5"
            >
              <span>Publish Live</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Main Content Pane */}
        <main className="flex-1 flex flex-row overflow-hidden">
          {/* Builder Sidebar Pane (Widgets, Themes, Profile) */}
          <div
            className={`w-full lg:w-[420px] xl:w-[460px] h-full shrink-0 flex flex-col ${
              mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <DragDropEditor
              profile={profile}
              onChange={setProfile}
              onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
            />
          </div>

          {/* Center Stage: Bento Canvas & Live Mockup */}
          <div
            className={`flex-1 h-full flex flex-col ${
              mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <LiveDevicePreview
              profile={profile}
              onLinkClick={handleLinkClick}
              onOpenQR={() => setIsQRModalOpen(true)}
              onOpenPublicView={() => setViewMode('public')}
            />
          </div>
        </main>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        url={window.location.href}
        title={profile.name || 'Marcus Chen'}
      />

      {/* Analytics Modal */}
      <AnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        profile={profile}
        onResetClicks={handleResetClicks}
      />

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold border border-slate-800 shadow-2xl backdrop-blur-md flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
