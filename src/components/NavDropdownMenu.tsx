import React from 'react';
import { ShieldCheck, Globe, Star } from 'lucide-react';

type ActivePage = 'reddit' | 'news' | 'insights' | 'reviews' | 'about';

interface SolutionsDropdownProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
}

export function SolutionsDropdown({ activePage, onSelectPage }: SolutionsDropdownProps) {
  return (
    <div className="absolute left-0 top-full pt-2 w-80 z-50">
      <div className="bg-[#0F172A] rounded-xl border border-slate-800 shadow-2xl p-2 space-y-1">
        <button
          type="button"
          onClick={() => onSelectPage('reddit')}
          className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 cursor-pointer ${
            activePage === 'reddit'
              ? 'bg-blue-950/50 border border-blue-500/40 text-white'
              : 'hover:bg-slate-800/60 border border-transparent text-slate-300'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>Reddit Thread &amp; Comment Removal</span>
              {activePage === 'reddit' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug mt-0.5 font-normal">
              Source deletion + Google &amp; AI search cache purge
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectPage('news')}
          className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 cursor-pointer ${
            activePage === 'news'
              ? 'bg-blue-950/50 border border-blue-500/40 text-white'
              : 'hover:bg-slate-800/60 border border-transparent text-slate-300'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-blue-300 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>News &amp; Media Article Removal</span>
              {activePage === 'news' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug mt-0.5 font-normal">
              Publisher legal takedowns &amp; Google News de-indexing
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectPage('reviews')}
          className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 cursor-pointer ${
            activePage === 'reviews'
              ? 'bg-blue-950/50 border border-blue-500/40 text-white'
              : 'hover:bg-slate-800/60 border border-transparent text-slate-300'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
            <Star className="w-4 h-4 fill-amber-400/20" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>Review Management &amp; Suppression</span>
              {activePage === 'reviews' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug mt-0.5 font-normal">
              Trustpilot, Google Maps, Glassdoor &amp; Sitejabber
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

interface ProtocolDropdownProps {
  activePage: ActivePage;
  onClose: () => void;
  onSwitchPage: (page: ActivePage, targetHash?: string) => void;
}

export function ProtocolDropdown({
  activePage,
  onClose,
  onSwitchPage,
}: ProtocolDropdownProps) {
  return (
    <div className="absolute left-0 top-full pt-2 w-72 z-50">
      <div className="bg-[#0F172A] rounded-xl border border-slate-800 shadow-2xl p-2 space-y-0.5">
        {activePage === 'news' ? (
          <>
            <a
              href="#news-process"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-xs font-bold text-white">3-Stage Publisher Protocol</div>
              <div className="text-[11px] text-slate-400 font-normal">Editorial, legal &amp; SERP de-indexing</div>
            </a>
            <a
              href="#news-features"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-xs font-bold text-white">Escrow &amp; Free-Fix Guarantee</div>
              <div className="text-[11px] text-slate-400 font-normal">Zero upfront retainer risk model</div>
            </a>
            <a
              href="#news-audit-form"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-xs font-bold text-blue-400">Submit Article URL for Audit →</div>
            </a>
          </>
        ) : activePage === 'reviews' ? (
          <>
            <a
              href="#review-audit-form"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-xs font-bold text-white">12-Hour Review Feasibility Audit</div>
              <div className="text-[11px] text-slate-400 font-normal">Free intake for Google Maps &amp; Trustpilot</div>
            </a>
            <a
              href="#review-audit-form"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-xs font-bold text-white">Two-Pillar Strategy Framework</div>
              <div className="text-[11px] text-slate-400 font-normal">Direct removal + organic suppression</div>
            </a>
            <a
              href="#review-audit-form"
              onClick={onClose}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-xs font-bold text-blue-400">Submit Review URL for Audit →</div>
            </a>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onSwitchPage('reddit', '#why-postwipe')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-white">Why Hostile Reddit Threads Hurt</div>
              <div className="text-[11px] text-slate-400 font-normal">Google SERP &amp; AI search contamination</div>
            </button>
            <button
              type="button"
              onClick={() => onSwitchPage('reddit', '#removal-options')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-white">Surgical Removal Scope</div>
              <div className="text-[11px] text-slate-400 font-normal">Comment wipe vs. full thread deletion</div>
            </button>
            <button
              type="button"
              onClick={() => onSwitchPage('reddit', '#escrow-workflow')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-white">4-Step Escrow.com Workflow</div>
              <div className="text-[11px] text-slate-400 font-normal">Pay only after verified deletion</div>
            </button>
            <button
              type="button"
              onClick={() => onSwitchPage('reddit', '#faq')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-white">Due Diligence &amp; Escrow FAQ</div>
              <div className="text-[11px] text-slate-400 font-normal">Timelines, guarantees &amp; NDA terms</div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
