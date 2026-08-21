import React from 'react';
import { X, TrendingUp, MousePointerClick, Award, RefreshCw, BarChart2 } from 'lucide-react';
import { ProfileConfig } from '../types';
import { SOCIAL_PLATFORMS } from '../data/platforms';
import { SocialIcon } from './SocialIcon';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileConfig;
  onResetClicks: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onResetClicks,
}) => {
  if (!isOpen) return null;

  const totalClicks = profile.links.reduce((acc, l) => acc + (l.clicks || 0), 0);
  const sortedLinks = [...profile.links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  const topLink = sortedLinks[0];
  const maxClicks = Math.max(...profile.links.map((l) => l.clicks || 0), 1);

  return (
    <div
      id="analytics-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        id="analytics-modal-card"
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl text-slate-800 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Social Canvas Analytics</h3>
              <p className="text-xs text-slate-400 font-medium">Real-time click statistics & engagement breakdown</p>
            </div>
          </div>
          <button
            id="analytics-close-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Bento Metric Cards */}
        <div className="grid grid-cols-2 gap-3 my-4 shrink-0">
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 mb-1">
              <MousePointerClick className="w-4 h-4 text-indigo-600" />
              <span>Total Redirects</span>
            </div>
            <span className="text-2xl font-black text-indigo-950 tracking-tight">{totalClicks.toLocaleString()}</span>
            <span className="text-[11px] text-indigo-700 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3 text-indigo-600" /> Live engagement
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Top Destination</span>
            </div>
            <span className="text-sm font-bold text-slate-900 truncate">
              {topLink ? topLink.title || SOCIAL_PLATFORMS[topLink.platformId]?.name : 'None'}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 font-medium">
              {topLink ? `${topLink.clicks || 0} clicks (${Math.round(((topLink.clicks || 0) / (totalClicks || 1)) * 100)}%)` : '0 clicks'}
            </span>
          </div>
        </div>

        {/* Link-by-Link Performance Breakdown */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar min-h-36">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 px-1">Per-Widget Activity</h4>
          {sortedLinks.map((link) => {
            const platform = SOCIAL_PLATFORMS[link.platformId] || SOCIAL_PLATFORMS.custom;
            const percentage = Math.round(((link.clicks || 0) / (totalClicks || 1)) * 100);
            const barWidth = Math.round(((link.clicks || 0) / maxClicks) * 100);

            return (
              <div
                key={link.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${platform.brandColor}20`, color: platform.brandColor }}
                    >
                      <SocialIcon platformId={link.platformId} size={14} />
                    </div>
                    <span className="font-semibold text-slate-800 truncate">{link.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-slate-900">{link.clicks || 0}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({percentage}%)</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(barWidth, 2)}%`,
                      backgroundColor: platform.brandColor || '#4F46E5',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info & Reset */}
        <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-400 text-[11px] font-medium">Counts increment in real time upon redirects</span>
          <button
            id="analytics-reset-btn"
            onClick={onResetClicks}
            className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-colors text-xs px-2.5 py-1 rounded-lg hover:bg-rose-50 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Analytics
          </button>
        </div>
      </div>
    </div>
  );
};
