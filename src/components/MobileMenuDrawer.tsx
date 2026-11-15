import React from 'react';
import {
  ShieldCheck,
  Globe,
  Star,
  BookOpen,
  Building2,
  ArrowRight,
  X,
} from 'lucide-react';

type ActivePage = 'reddit' | 'news' | 'insights' | 'reviews' | 'about';

interface MobileMenuDrawerProps {
  activePage: ActivePage;
  onClose: () => void;
  onSelectPage: (page: ActivePage, targetHash?: string) => void;
}

export function MobileMenuDrawer({
  activePage,
  onClose,
  onSelectPage,
}: MobileMenuDrawerProps) {
  const navItems: {
    page: ActivePage;
    label: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      page: 'reddit',
      label: 'Reddit Thread Removal',
      subtitle: 'Source deletion + Google & AI cache purge',
      icon: ShieldCheck,
    },
    {
      page: 'news',
      label: 'News & Media Removal',
      subtitle: 'Publisher outreach & Google News de-indexing',
      icon: Globe,
    },
    {
      page: 'reviews',
      label: 'Review Management',
      subtitle: 'Google Maps, Trustpilot, Glassdoor & Sitejabber',
      icon: Star,
    },
    {
      page: 'insights',
      label: 'Insights & Blog',
      subtitle: 'Legal compliance & de-indexing briefings',
      icon: BookOpen,
    },
    {
      page: 'about',
      label: 'About PostWipe',
      subtitle: 'Agency credentials & Escrow.com terms',
      icon: Building2,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden bg-black/75 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div className="w-full max-w-xs bg-[#090D16] border-l border-slate-800 h-full p-5 flex flex-col justify-between overflow-y-auto shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => {
                    onSelectPage(item.page);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-blue-950/60 border-blue-500/40 text-white'
                      : 'bg-[#0F172A] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive ? 'bg-[#2563EB] text-white' : 'bg-slate-800 text-[#60A5FA]'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{item.label}</div>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onSelectPage('reddit', '#case-results');
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] border border-slate-800 text-slate-200 text-xs font-bold text-center cursor-pointer"
          >
            View Verified Case Results
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectPage(
                activePage === 'news' ? 'news' : activePage === 'reviews' ? 'reviews' : 'reddit',
                activePage === 'news'
                  ? '#news-audit-form'
                  : activePage === 'reviews'
                  ? '#review-audit-form'
                  : '#audit-form'
              );
              onClose();
            }}
            className="pw-btn-primary w-full inline-flex items-center justify-center gap-2 text-white font-bold text-sm py-3 px-4 rounded-xl border border-blue-500/40 cursor-pointer"
          >
            <span>Free 12h Link Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileMenuDrawer;
