import React, { useState } from 'react';
import {
  Scale,
  ArrowRight,
  FileText,
  ExternalLink,
  UserCheck,
  Bookmark,
} from 'lucide-react';
import { AeoBlogPostTemplate } from './AeoBlogPostTemplate';
import {
  INSIGHTS_ARTICLES_DATA,
  type InsightArticle,
  type InsightTopicTag,
} from '../data/insightsArticles';

export type { InsightArticle, InsightTopicTag };

const TOPIC_TAGS: ('All Publications' | InsightTopicTag)[] = [
  'All Publications',
  'Reddit Compliance',
  'Google De-indexing',
  'DMCA Policy',
  'Brand Protection',
];

interface InsightsAndComplianceProps {
  onRequestAudit?: (prefillContext?: string) => void;
  selectedArticleId?: string;
  onSelectArticle?: (article: InsightArticle) => void;
  onNavigatePath?: (href: string) => void;
}

export function InsightsAndCompliance({
  onRequestAudit,
  selectedArticleId: controlledArticleId,
  onSelectArticle,
  onNavigatePath,
}: InsightsAndComplianceProps) {
  const [internalArticleId, setInternalArticleId] = useState<string>(
    INSIGHTS_ARTICLES_DATA[0].id
  );
  const [activeTagFilter, setActiveTagFilter] = useState<'All Publications' | InsightTopicTag>(
    'All Publications'
  );

  const selectedArticleId = controlledArticleId || internalArticleId;
  const activeArticle =
    INSIGHTS_ARTICLES_DATA.find((art) => art.id === selectedArticleId) ||
    INSIGHTS_ARTICLES_DATA[0];

  const handleSelectArticle = (article: InsightArticle) => {
    setInternalArticleId(article.id);
    if (onSelectArticle) {
      onSelectArticle(article);
    }
  };

  const filteredArticles =
    activeTagFilter === 'All Publications'
      ? INSIGHTS_ARTICLES_DATA
      : INSIGHTS_ARTICLES_DATA.filter((art) => art.tags.includes(activeTagFilter));

  const handleTriggerAudit = (articleTitle?: string) => {
    if (onRequestAudit) {
      onRequestAudit(articleTitle);
      return;
    }
    const formEl = document.getElementById('audit-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const authorSidebar = (
    <>
      <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#60A5FA]">
            Author &amp; Practice Lead
          </span>
          <UserCheck className="w-4 h-4 text-[#60A5FA]" />
        </div>

        <div className="space-y-1.5">
          <div className="font-display text-lg font-extrabold text-white">
            {activeArticle.author.name}
          </div>
          <div className="text-xs font-semibold text-blue-400">
            {activeArticle.author.role}
          </div>
          <div className="text-[11px] font-mono text-slate-400 pt-0.5">
            {activeArticle.author.credentials}
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
          {activeArticle.author.bio}
        </p>

        <div className="pt-2 space-y-2 border-t border-slate-800">
          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Practice Area Focus
          </div>
          <div className="text-xs font-medium text-slate-200">
            {activeArticle.author.practiceArea}
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <a
            href={activeArticle.author.directContactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-xs transition-all"
          >
            <span>{activeArticle.author.directContactLabel}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#60A5FA]" />
          </a>
          <a
            href="/#audit-form"
            onClick={(e) => {
              e.preventDefault();
              handleTriggerAudit(activeArticle.title);
            }}
            className="pw-btn-primary w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg text-white font-semibold text-xs cursor-pointer"
          >
            <span>Submit URL for 12-Hour Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-5 space-y-3 shadow-lg">
        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2.5 flex items-center justify-between">
          <span>In This Briefing Series</span>
          <Bookmark className="w-3.5 h-3.5 text-[#60A5FA]" />
        </div>
        <div className="divide-y divide-slate-800/80">
          {INSIGHTS_ARTICLES_DATA.map((item, idx) => {
            const isCurrent = item.id === activeArticle.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectArticle(item)}
                className={`w-full text-left py-3 first:pt-1 last:pb-1 transition-colors cursor-pointer group ${
                  isCurrent ? 'text-[#60A5FA]' : 'text-slate-300 hover:text-white'
                }`}
              >
                <div className="font-mono text-[10px] text-slate-400 mb-0.5">
                  Briefing 0{idx + 1} · {item.readTime}
                </div>
                <div
                  className={`text-xs leading-snug ${
                    isCurrent ? 'font-bold text-blue-400' : 'font-medium'
                  }`}
                >
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <section
      id="insights-compliance"
      className="py-20 bg-[#090D16] border-b border-slate-800 text-[#F8FAFC]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Institutional Header Banner */}
        <div className="border-b border-slate-800 pb-6 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
              <Scale className="w-3.5 h-3.5" />
              <span>Publications · Insights, Compliance &amp; Case Briefs</span>
            </div>
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Insights &amp; Compliance Briefings
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Authoritative legal-grade analysis on platform policy enforcement, non-public Reddit
              crisis remediation, DMCA compliance, and permanent Google search de-indexing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0F172A] border border-slate-800 text-xs font-mono text-slate-300 font-semibold shadow-xs">
              <FileText className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>Corporate Reputation &amp; Platform Governance Practice</span>
            </div>
          </div>
        </div>

        {/* Reusable AEO Blog Post Template View */}
        <div className="mb-14">
          <AeoBlogPostTemplate
            post={activeArticle}
            sidebar={authorSidebar}
            ctaHref="/#audit-form"
            onRequestQuote={handleTriggerAudit}
            onNavigatePath={onNavigatePath}
          />
        </div>

        {/* Grid View for Recent Articles */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <p className="font-display text-xl sm:text-2xl font-extrabold text-white">
                Recent Compliance Publications &amp; Guides
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Select any briefing below to load the full AEO compliance analysis above.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {TOPIC_TAGS.map((tag) => {
                const isActive = activeTagFilter === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTagFilter(tag)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-[#0B0F19] text-slate-300 hover:bg-[#0F172A] hover:text-white border border-slate-800'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const isSelected = article.id === activeArticle.id;
              return (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => {
                    handleSelectArticle(article);
                    const sectionEl = document.getElementById('insights-compliance');
                    if (sectionEl) {
                      sectionEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`pw-card text-left rounded-2xl border p-6 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2563EB] ring-1 ring-blue-500/30 bg-[#0F172A]'
                      : 'border-slate-800 bg-[#0B0F19] hover:bg-[#0F172A] hover:border-slate-700'
                  }`}
                >
                  <span className="block space-y-4 w-full">
                    <span className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                      <span>{article.publicationType}</span>
                      <span>{article.readTime}</span>
                    </span>

                    <span className="block text-[11px] font-mono text-blue-300">
                      {article.tags.join(' · ')}
                    </span>

                    <span className="block font-display text-lg font-extrabold text-white leading-snug">
                      {article.title}
                    </span>

                    <span className="block text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {article.quickAnswer}
                    </span>
                  </span>

                  <span className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between gap-2 w-full">
                    <span className="block text-xs">
                      <span className="block font-bold text-white">{article.author.name}</span>
                      <span className="block font-mono text-[10px] text-slate-400">
                        {article.publishedDate}
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#60A5FA]">
                      <span>{isSelected ? 'Reading Now' : 'Read Briefing'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsightsAndCompliance;
