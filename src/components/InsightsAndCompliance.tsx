import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Calendar,
  Scale,
  ShieldCheck,
  ArrowRight,
  Lock,
  FileText,
  ExternalLink,
  CheckCircle2,
  UserCheck,
  Bookmark,
} from 'lucide-react';

export type InsightTopicTag =
  | 'Reddit Compliance'
  | 'Google De-indexing'
  | 'DMCA Policy'
  | 'Brand Protection';

export interface AuthorProfile {
  name: string;
  role: string;
  credentials: string;
  practiceArea: string;
  bio: string;
  directContactUrl: string;
  directContactLabel: string;
  location: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  calloutQuote?: {
    label: string;
    quote: string;
    citation: string;
  };
  frameworkPoints?: {
    title: string;
    detail: string;
  }[];
}

export interface InsightArticle {
  id: string;
  slug: string;
  publicationType: string;
  title: string;
  subheadline: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  docketRef: string;
  tags: InsightTopicTag[];
  executiveSummary: string;
  author: AuthorProfile;
  sections: ArticleSection[];
}

export const INSIGHTS_ARTICLES_DATA: InsightArticle[] = [
  {
    id: 'art-01',
    slug: 'how-organizations-should-handle-false-defamatory-reddit-threads',
    publicationType: 'Authored Article',
    title: 'How Organizations Should Handle False, Defamatory Reddit Threads',
    subheadline:
      'An institutional compliance framework for general counsel, founders, and corporate communications teams navigating high-ranking Reddit defamation without triggering secondary amplification.',
    publishedDate: 'October 18, 2026',
    updatedDate: 'October 25, 2026',
    readTime: '7 Min Read',
    docketRef: 'PW-PUB-401',
    tags: ['Reddit Compliance', 'Brand Protection', 'DMCA Policy'],
    executiveSummary:
      'When an unverified Reddit thread accusing an enterprise of fraud, price manipulation, or workplace misconduct reaches Page 1 of Google, instinctive corporate responses such as public rebuttals or direct moderator outreach routinely backfire. Effective remediation requires a non-public forensic audit tied strictly to sitewide platform policy violations.',
    author: {
      name: 'Marcus Vance, CIPP/E',
      role: 'Managing Director, Platform Policy & Escalations',
      credentials: 'Certified Information Privacy Professional • Former Trust & Safety Counsel',
      practiceArea: 'Platform Governance, Defamation Remediation & Search De-Indexing',
      bio: 'Marcus leads PostWipe’s corporate escalations practice, advising venture-backed founders, direct-to-consumer brands, and legal teams on non-public content removal across Reddit, digital publications, and Google Search.',
      directContactUrl: 'https://wa.me/21695022973',
      directContactLabel: 'Direct Compliance Desk (WhatsApp)',
      location: 'Global Compliance Operations',
    },
    sections: [
      {
        heading: '1. The Structural Risk of Public Engagement and Moderator Outreach',
        paragraphs: [
          'Corporate leadership teams frequently miscalculate the governance structure of Reddit. Unlike traditional media outlets governed by editorial standards boards, individual subreddits are operated by unpaid community volunteers who owe no fiduciary or legal duty to verify commercial claims.',
          'When an organization’s communications team or external PR agency posts a public rebuttal inside a hostile thread, community members routinely downvote the statement and accuse the brand of astroturfing. Worse still, contacting subreddit moderators directly via Modmail often results in the private correspondence being screenshotted and pinned to the top of the thread, compounding search engine visibility.',
        ],
        calloutQuote: {
          label: 'COMPLIANCE ADVISORY // STREISAND EFFECT MITIGATION',
          quote:
            'Never contact volunteer subreddit moderators to dispute commercial allegations. Any communication sent to community moderators lacks confidentiality protection and frequently serves as a catalyst for secondary viral escalation.',
          citation: 'PostWipe Institutional Escalation Protocol, Section 2.1',
        },
      },
      {
        heading: '2. Distinguishing Commercial Opinion from Actionable Policy Violations',
        paragraphs: [
          'Platform Trust and Safety teams do not arbitrate factual business disputes or customer dissatisfaction. Consequently, cease-and-desist letters that merely argue a poster’s claims are factually inaccurate rarely succeed through standard legal intake channels unless accompanied by a binding court order.',
          'Instead, successful administrative removal requires mapping the offending thread and its comment tree against specific, non-negotiable violations of Reddit’s sitewide Content Policy, Terms of Service, and statutory frameworks:',
        ],
        frameworkPoints: [
          {
            title: 'Rule 1 & Targeted Commercial Harassment',
            detail:
              'Identifying coordinated brigading, off-platform harassment campaigns, and malicious incitement directed at named company executives or employees.',
          },
          {
            title: 'Rule 2 & Platform / Vote Manipulation',
            detail:
              'Documenting artificial upvote velocity, sockpuppet account clusters, or competitor-driven astroturfing designed to manipulate search rankings.',
          },
          {
            title: 'Rule 3 & Unauthorized PII / Confidential Disclosures',
            detail:
              'Isolating non-public personal information, private employee records, internal contract excerpts, or doxxing markers embedded within replies.',
          },
          {
            title: 'Intellectual Property & Unlawful Trademark Misuse',
            detail:
              'Enforcing statutory takedown pathways where proprietary visual assets, internal documentation, or protected brand identifiers are unlawfully reproduced.',
          },
        ],
      },
      {
        heading: '3. Executing the Removal Pipeline Under Escrow Protection',
        paragraphs: [
          'Once a forensic audit establishes actionable policy violations, the escalation must be routed exclusively through corporate administrative and legal compliance channels. This bypasses community-level bias and ensures the removal leaves zero public footprint linking back to the targeted organization.',
          'Immediately following source deletion, the thread URL must be submitted for expedited search engine cache clearing so Google, Bing, and AI answer engines purge the cached title and snippet within 24 to 72 hours.',
        ],
      },
    ],
  },
  {
    id: 'art-02',
    slug: 'why-seo-suppression-fails-against-reddit-high-domain-authority',
    publicationType: 'Authored Article',
    title: 'Why SEO Suppression Fails Against Reddit High Domain Authority',
    subheadline:
      'A technical and economic analysis of Google’s algorithmic preference for user-generated forum discussions and why traditional reputation agencies can no longer bury Page-1 Reddit results.',
    publishedDate: 'October 11, 2026',
    updatedDate: 'October 24, 2026',
    readTime: '6 Min Read',
    docketRef: 'PW-PUB-402',
    tags: ['Google De-indexing', 'Brand Protection', 'Reddit Compliance'],
    executiveSummary:
      'Following Google’s Helpful Content and Hidden Gems algorithmic updates, Reddit.com holds unprecedented ranking authority for branded commercial queries. Spending $5,000 to $15,000 per month on legacy SEO suppression to publish low-authority microsites cannot displace an active Reddit thread on Page 1. Permanent source deletion is the only mathematically viable solution.',
    author: {
      name: 'Elena Rostova, JD',
      role: 'Senior Director, Search Compliance & De-Indexing',
      credentials: 'J.D., Intellectual Property & Digital Governance • Search Architecture Specialist',
      practiceArea: 'Search Engine De-Indexing, Algorithmic Risk & Generative AI Remediation',
      bio: 'Elena oversees PostWipe’s search engine de-indexing and Generative Engine Optimization (GEO) remediation division, ensuring deleted source URLs are permanently purged from Google SERPs and LLM training caches.',
      directContactUrl: 'https://wa.me/21695022973',
      directContactLabel: 'Direct Compliance Desk (WhatsApp)',
      location: 'Global Compliance Operations',
    },
    sections: [
      {
        heading: '1. The Algorithmic Shift: Google’s Structural Partnership with Reddit',
        paragraphs: [
          'Over the past twenty-four months, Google fundamentally re-engineered how it evaluates branded search intent. When prospective buyers, enterprise procurement officers, or job candidates search for "[Brand Name] reviews," "[Brand Name] legit," or "[Company] scam," Google explicitly prioritizes user-generated forum discussions over corporate-controlled web properties.',
          'Furthermore, Google’s dedicated "Discussions and Forums" SERP feature reserves permanent Page-1 real estate specifically for Reddit threads. Even if a brand owns ten high-authority press releases, those assets compete in standard organic slots while the offending Reddit thread remains locked inside the dedicated forum carousel.',
        ],
        calloutQuote: {
          label: 'SEARCH ARCHITECTURE REALITY // DOMAIN AUTHORITY ASYMMETRY',
          quote:
            'Publishing Medium articles, press releases, and satellite websites to outrank Reddit.com for a high-intent "[Brand] + scam/legit" query is structurally obsolete. Google treats fresh comment activity on a DR-92 forum URL as an overriding relevance signal.',
          citation: 'PostWipe Search Visibility & SERP Forensics Report, Q4 2026',
        },
      },
      {
        heading: '2. Why Monthly Retainer Suppression Wastes Capital',
        paragraphs: [
          'Legacy Online Reputation Management (ORM) agencies operate on open-ended monthly retainers. Their business model relies on billing clients $3,000 to $10,000+ per month over twelve months to publish filler content, with zero contractual guarantee that the damaging Reddit link will ever leave Page 1.',
          'Worse, every time a new user adds a comment to an existing Reddit thread, Google registers a content freshness update, instantly boosting the thread back above months of paid suppression articles.',
        ],
        frameworkPoints: [
          {
            title: 'Zero Impact on the "Discussions & Forums" Box',
            detail:
              'Standard press releases and Web 2.0 profiles cannot occupy forum SERP slots, leaving the Reddit thread unchallenged in its dedicated visual block.',
          },
          {
            title: 'AI Overview & LLM Contamination',
            detail:
              'ChatGPT, Perplexity, and Google AI Overviews directly ingest live Reddit threads via real-time retrieval. Suppressing a link to position #6 still allows AI models to cite the accusations verbatim.',
          },
          {
            title: 'Permanent Source Elimination vs. Temporary Dilution',
            detail:
              'Deleting the root Reddit thread or comment tree severing the source URL eliminates both the organic ranking and the underlying data feed for AI search engines.',
          },
        ],
      },
      {
        heading: '3. Transitioning from Retainer Risk to Escrow-Protected Deletion',
        paragraphs: [
          'Corporate decision-makers should never assume upfront financial risk for uncertain reputation outcomes. By replacing monthly suppression retainers with success-based source removal held in neutral Escrow.com custody, organizations pay only after verifying that the offending Reddit URL has been permanently removed.',
        ],
      },
    ],
  },
  {
    id: 'art-03',
    slug: 'complete-guide-to-google-de-indexing-for-high-ticket-brand-founders',
    publicationType: 'Authored Article',
    title: 'Complete Guide to Google De-indexing for High Ticket Brand Founders',
    subheadline:
      'Step-by-step technical and legal protocols for purging deleted Reddit threads, defamatory media articles, and outdated cache snippets from Google Search and AI engines.',
    publishedDate: 'October 04, 2026',
    updatedDate: 'October 22, 2026',
    readTime: '8 Min Read',
    docketRef: 'PW-PUB-403',
    tags: ['Google De-indexing', 'DMCA Policy', 'Brand Protection'],
    executiveSummary:
      'Removing a damaging Reddit post or news article at the publisher level is only half of the remediation lifecycle. Without immediate search index purge filings, cached titles and defamatory meta descriptions can linger on Page 1 of Google for weeks. This guide outlines the exact two-phase protocol for permanent source removal and rapid Google de-indexing.',
    author: {
      name: 'Marcus Vance, CIPP/E',
      role: 'Managing Director, Platform Policy & Escalations',
      credentials: 'Certified Information Privacy Professional • Former Trust & Safety Counsel',
      practiceArea: 'Platform Governance, Defamation Remediation & Search De-Indexing',
      bio: 'Marcus leads PostWipe’s corporate escalations practice, advising venture-backed founders, direct-to-consumer brands, and legal teams on non-public content removal across Reddit, digital publications, and Google Search.',
      directContactUrl: 'https://wa.me/21695022973',
      directContactLabel: 'Direct Compliance Desk (WhatsApp)',
      location: 'Global Compliance Operations',
    },
    sections: [
      {
        heading: '1. Why Deleted Content Continues to Rank on Google Search',
        paragraphs: [
          'A common misconception among executives is that once a Reddit thread or online article is deleted by the host platform, it vanishes from Google Search instantaneously. In reality, Google’s search index operates asynchronously from live web servers.',
          'Until Googlebot recrawls the dead or modified URL and processes the updated HTTP status or content replacement marker, the cached headline and defamatory snippet remain visible to anyone searching your brand name.',
        ],
        calloutQuote: {
          label: 'DE-INDEXING PROTOCOL // TWO-STAGE VERIFICATION',
          quote:
            'True reputation remediation requires two distinct verifications: first, confirming permanent unpublishing at the host platform; second, forcing an immediate index and snippet purge across Google Search, Bing, and generative AI retrieval indexes.',
          citation: 'PostWipe Technical De-Indexing Standard, Rev. 4.2',
        },
      },
      {
        heading: '2. The Three Pathways for Permanent Google De-Indexing',
        paragraphs: [
          'Depending on whether the target URL is a Reddit discussion thread, a digital news publication, or an unauthorized third-party aggregator, PostWipe deploys one of three structured de-indexing workflows:',
        ],
        frameworkPoints: [
          {
            title: 'Pathway A: Source Unpublishing + Outdated Content Purge',
            detail:
              'Once the root Reddit thread or media article is removed at the source, we submit verified outdated-content cache clearing requests to force Google to drop the dead title and snippet within 24 to 72 hours.',
          },
          {
            title: 'Pathway B: Publisher No-Index & Archival Tagging',
            detail:
              'In news and media settlements where an outlet retains an internal archive record for legal continuity, we negotiate the insertion of a strict robots noindex, noarchive meta directive, compelling Google to drop the URL from public search results.',
          },
          {
            title: 'Pathway C: Statutory DMCA, Privacy & Doxxing De-Indexing',
            detail:
              'When an unresponsive offshore host publishes protected intellectual property, personal contact records, or unlawful defamation, we file formal legal removal notices directly with Google’s Legal Removal Requests division.',
          },
        ],
      },
      {
        heading: '3. Protecting Brand Sentiment Across Generative AI Search (GEO)',
        paragraphs: [
          'High-net-worth buyers and enterprise partners increasingly rely on ChatGPT Search, Perplexity, and Google Gemini to conduct due diligence on founders and companies. These AI systems synthesize answers directly from indexed search snippets.',
          'By executing a coordinated source takedown followed by an immediate Google and Bing cache purge, PostWipe severs the citation pipeline that feeds large language models, restoring clean, authoritative search results across both traditional and AI-driven discovery channels.',
        ],
      },
    ],
  },
];

const TOPIC_TAGS: ('All Publications' | InsightTopicTag)[] = [
  'All Publications',
  'Reddit Compliance',
  'Google De-indexing',
  'DMCA Policy',
  'Brand Protection',
];

interface InsightsAndComplianceProps {
  onRequestAudit?: (prefillContext?: string) => void;
}

export function InsightsAndCompliance({ onRequestAudit }: InsightsAndComplianceProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    INSIGHTS_ARTICLES_DATA[0].id
  );
  const [activeTagFilter, setActiveTagFilter] = useState<'All Publications' | InsightTopicTag>(
    'All Publications'
  );

  const activeArticle =
    INSIGHTS_ARTICLES_DATA.find((art) => art.id === selectedArticleId) ||
    INSIGHTS_ARTICLES_DATA[0];

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

  return (
    <section
      id="insights-compliance"
      className="py-20 bg-[#090D16] border-b border-slate-800 text-[#F8FAFC]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            INSTITUTIONAL SECTION HEADER (VORYS / ENTERPRISE LEGAL STYLE - DARK)
           ========================================================= */}
        <div className="border-b border-slate-800 pb-6 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
              <Scale className="w-3.5 h-3.5" />
              <span>PUBLICATIONS • INSIGHTS, COMPLIANCE &amp; CASE BRIEFS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Insights &amp; Compliance Briefings
            </h2>
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

        {/* =========================================================
            MAIN HERO ARTICLE VIEW (EDITORIAL PUBLICATION + AUTHOR SIDEBAR)
           ========================================================= */}
        <article className="rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden mb-14">
          {/* Minimalist Publication Metadata Bar */}
          <div className="px-6 sm:px-10 py-4 bg-[#0B0F19] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2563EB] text-white font-mono font-bold uppercase tracking-wider">
                <BookOpen className="w-3 h-3 text-white" />
                {activeArticle.publicationType}
              </span>
              <span className="text-slate-700">|</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-slate-300 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" />
                Published: {activeArticle.publishedDate}
              </span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-slate-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
                {activeArticle.readTime}
              </span>
              <span className="text-slate-700 hidden md:inline">|</span>
              <span className="font-mono text-slate-400 hidden md:inline">
                Ref: {activeArticle.docketRef}
              </span>
            </div>

            {/* Topic Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {activeArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 font-mono text-[11px] font-semibold text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Hero Article Header & 12-Column Institutional Layout */}
          <div className="p-6 sm:p-10 lg:p-12">
            {/* Article Title & Subheadline */}
            <div className="max-w-4xl border-b border-slate-800 pb-8 mb-10 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-[1.18] tracking-tight">
                {activeArticle.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {activeArticle.subheadline}
              </p>
            </div>

            {/* 12-Column Split: Left Author / Practice Sidebar (4 Cols) + Right Main Article Body (8 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* LEFT SIDEBAR: AUTHOR / COMPLIANCE SPECIALIST CARD & KEY METADATA */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* Author / Compliance Specialist Card */}
                <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-6 space-y-5 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#60A5FA]">
                      AUTHOR &amp; PRACTICE LEAD
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

                  <div className="pt-2 space-y-2.5 border-t border-slate-800">
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
                    <button
                      type="button"
                      onClick={() => handleTriggerAudit(activeArticle.title)}
                      className="pw-btn-primary w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg text-white font-semibold text-xs cursor-pointer"
                    >
                      <span>Submit URL for 12-Hour Audit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Publication Switcher in Sidebar */}
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
                          onClick={() => setSelectedArticleId(item.id)}
                          className={`w-full text-left py-3 first:pt-1 last:pb-1 transition-colors cursor-pointer group ${
                            isCurrent ? 'text-[#60A5FA]' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <div className="font-mono text-[10px] text-slate-400 mb-0.5">
                            BRIEFING 0{idx + 1} • {item.readTime}
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
              </aside>

              {/* RIGHT MAIN COLUMN: EXECUTIVE SUMMARY, BODY TEXT, QUOTE CALLOUTS & FRAMEWORKS */}
              <div className="lg:col-span-8 space-y-8">
                {/* Executive Summary Box */}
                <div className="p-6 rounded-xl bg-[#0B0F19] border border-slate-800 border-l-4 border-l-[#2563EB] space-y-2">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                    Executive Summary
                  </div>
                  <p className="text-sm sm:text-[15.5px] text-slate-200 leading-[1.75] font-medium">
                    {activeArticle.executiveSummary}
                  </p>
                </div>

                {/* Main Article Sections */}
                <div className="space-y-10">
                  {activeArticle.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="space-y-4 border-b border-slate-800 pb-8 last:border-b-0 last:pb-0"
                    >
                      <h4 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-snug">
                        {sec.heading}
                      </h4>

                      <div className="space-y-4">
                        {sec.paragraphs.map((para, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-[15.5px] sm:text-[16.5px] text-slate-300 leading-[1.8]"
                          >
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Structured Quote Callout Box */}
                      {sec.calloutQuote && (
                        <blockquote className="my-6 p-6 rounded-xl bg-[#0B0F19] border border-slate-800 shadow-md relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2563EB]" />
                          <div className="pl-3 space-y-2.5">
                            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#60A5FA]">
                              {sec.calloutQuote.label}
                            </div>
                            <p className="font-display text-base sm:text-[17px] font-bold text-white leading-relaxed">
                              &ldquo;{sec.calloutQuote.quote}&rdquo;
                            </p>
                            <footer className="font-mono text-xs text-slate-400 pt-1">
                              Source: {sec.calloutQuote.citation}
                            </footer>
                          </div>
                        </blockquote>
                      )}

                      {/* Compliance Framework Points Grid */}
                      {sec.frameworkPoints && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                          {sec.frameworkPoints.map((fp, fIdx) => (
                            <div
                              key={fIdx}
                              className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1.5"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                                <h5 className="font-display text-sm font-extrabold text-white">
                                  {fp.title}
                                </h5>
                              </div>
                              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed pl-6">
                                {fp.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* =========================================================
                    PRIMARY FULL-WIDTH CTA BANNER AT END OF ARTICLE
                   ========================================================= */}
                <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-blue-950 text-white p-7 sm:p-9 border border-blue-500/30 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2.5 max-w-xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 font-mono text-[11px] font-semibold text-blue-300">
                        <Lock className="w-3.5 h-3.5 text-blue-400" />
                        <span>CONFIDENTIAL 12-HOUR FEASIBILITY AUDIT</span>
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight">
                        Facing an Active Defamatory Reddit Thread or Page-1 Search Result?
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Submit the offending URL for a confidential 12-hour policy audit. Our
                        compliance specialists will verify removal eligibility and provide a fixed
                        Escrow.com quote with zero upfront financial risk.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleTriggerAudit(activeArticle.title)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>Request Confidential 12-Hour Audit</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA]" />
                        <span>100% Pay-on-Success • NDA Protected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* =========================================================
            GRID VIEW FOR RECENT ARTICLES (WITH CATEGORY TAG FILTERS)
           ========================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                Recent Compliance Publications &amp; Guides
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Select any briefing below to load the full compliance analysis above.
              </p>
            </div>

            {/* Topic Tag Filter Bar */}
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

          {/* 3-Column Institutional Publication Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const isSelected = article.id === activeArticle.id;
              return (
                <div
                  key={article.id}
                  onClick={() => {
                    setSelectedArticleId(article.id);
                    const sectionEl = document.getElementById('insights-compliance');
                    if (sectionEl) {
                      sectionEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`pw-card rounded-2xl border p-6 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2563EB] ring-1 ring-blue-500/30 bg-[#0F172A]'
                      : 'border-slate-800 bg-[#0B0F19] hover:bg-[#0F172A] hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Meta & Category Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#090D16] border border-slate-800 text-slate-300">
                        {article.publicationType}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {article.readTime}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 font-mono text-[10px] font-bold text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-display text-lg font-extrabold text-white leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {article.executiveSummary}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <div className="font-bold text-white">{article.author.name}</div>
                      <div className="font-mono text-[10px] text-slate-400">
                        {article.publishedDate}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#60A5FA]">
                      <span>{isSelected ? 'Reading Now' : 'Read Briefing'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
