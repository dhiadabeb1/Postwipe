import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Lock,
  ShieldCheck,
  X,
} from 'lucide-react';

export interface AeoComparisonRow {
  criterion: string;
  diyOrTraditional: string;
  traditionalAgency: string;
  postWipe: string;
}

export interface AeoArticleSection {
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

export interface AeoArticleFaq {
  q: string;
  a: string;
}

export interface AeoBlogPostData {
  id: string;
  slug: string;
  publicationType: string;
  title: string;
  subheadline: string;
  quickAnswer: string;
  publishedDate: string;
  publishedDateIso: string;
  updatedDate: string;
  updatedDateIso: string;
  readTime: string;
  docketRef: string;
  tags: string[];
  sections: AeoArticleSection[];
  comparisonRows?: AeoComparisonRow[];
  faqs: AeoArticleFaq[];
}

export const DEFAULT_AEO_COMPARISON_ROWS: AeoComparisonRow[] = [
  {
    criterion: 'Payment & Risk Model',
    diyOrTraditional: 'Unpredictable legal fees or internal hours',
    traditionalAgency: 'Upfront monthly retainers ($3,000 to $15,000/mo)',
    postWipe: '100% Pay-on-Success ($0 upfront fee)',
  },
  {
    criterion: 'Escrow Protection',
    diyOrTraditional: 'None (paid regardless of result)',
    traditionalAgency: 'None (non-refundable billing cycles)',
    postWipe: 'Escrow.com custody until verified deletion',
  },
  {
    criterion: 'Lifetime Guarantee',
    diyOrTraditional: 'No re-posting remediation',
    traditionalAgency: 'Coverage ends when monthly payments stop',
    postWipe: 'Lifetime Re-Deletion Guarantee included',
  },
  {
    criterion: 'Removal Methodology',
    diyOrTraditional: 'Moderator modmail or public comments',
    traditionalAgency: 'Slow SEO microsites and press releases',
    postWipe: 'Direct Trust & Safety, IP & legal takedowns',
  },
  {
    criterion: 'Google & AI Search Purge',
    diyOrTraditional: 'Waits weeks for natural crawler updates',
    traditionalAgency: 'Source URL remains live in AI answers',
    postWipe: 'Expedited 24 to 72h Google & AI cache wipe',
  },
  {
    criterion: 'NDA Confidentiality',
    diyOrTraditional: 'High risk of public moderator screenshots',
    traditionalAgency: 'Broad third-party PR publishing footprint',
    postWipe: 'Strict Mutual NDA with zero public trace',
  },
];

interface AeoQuickAnswerBoxProps {
  quickAnswer: string;
  label?: string;
}

export function AeoQuickAnswerBox({
  quickAnswer,
  label = 'Quick Answer',
}: AeoQuickAnswerBoxProps) {
  return (
    <section
      aria-label={label}
      className="rounded-xl border border-blue-500/35 bg-blue-950/20 p-6 sm:p-7 space-y-2.5"
    >
      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#60A5FA]">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>{label}</span>
      </div>
      <p className="text-[15.5px] sm:text-base text-slate-100 leading-[1.7] font-medium max-w-[70ch]">
        {quickAnswer}
      </p>
    </section>
  );
}

interface AeoComparisonTableProps {
  heading?: string;
  subheading?: string;
  rows?: AeoComparisonRow[];
}

export function AeoComparisonTable({
  heading = 'How does PostWipe compare to DIY outreach and traditional ORM agencies?',
  subheading = 'Side-by-side breakdown across escrow protection, pay-on-success pricing, source removal, and lifetime guarantees.',
  rows = DEFAULT_AEO_COMPARISON_ROWS,
}: AeoComparisonTableProps) {
  return (
    <section className="space-y-4 pt-2" aria-label="Service comparison">
      <div className="space-y-2">
        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-snug text-balance">
          {heading}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-[68ch]">
          {subheading}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0B0F19]">
        <table className="w-full min-w-[680px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-[#0F172A] text-xs font-mono uppercase tracking-wider text-slate-300">
              <th scope="col" className="py-3.5 px-4 sm:px-5 font-bold w-[22%]">
                Evaluation Factor
              </th>
              <th scope="col" className="py-3.5 px-4 sm:px-5 font-semibold text-slate-400 w-[25%]">
                DIY / Internal Outreach
              </th>
              <th scope="col" className="py-3.5 px-4 sm:px-5 font-semibold text-slate-400 w-[25%]">
                Traditional Agencies
              </th>
              <th scope="col" className="py-3.5 px-4 sm:px-5 font-bold text-[#60A5FA] bg-blue-950/25 w-[28%]">
                PostWipe Compliance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs sm:text-[13.5px]">
            {rows.map((row) => (
              <tr key={row.criterion} className="hover:bg-slate-900/40 transition-colors">
                <th
                  scope="row"
                  className="py-3.5 px-4 sm:px-5 font-bold text-white align-top"
                >
                  {row.criterion}
                </th>
                <td className="py-3.5 px-4 sm:px-5 text-slate-400 align-top">
                  <span className="inline-flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{row.diyOrTraditional}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 sm:px-5 text-slate-400 align-top">
                  <span className="inline-flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{row.traditionalAgency}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 sm:px-5 text-slate-100 font-semibold bg-blue-950/15 align-top tabular-nums">
                  <span className="inline-flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{row.postWipe}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

interface AeoQuoteCtaBannerProps {
  articleTitle?: string;
  ctaHref?: string;
  onRequestQuote?: (articleTitle?: string) => void;
}

export function AeoQuoteCtaBanner({
  articleTitle,
  ctaHref = '/#audit-form',
  onRequestQuote,
}: AeoQuoteCtaBannerProps) {
  return (
    <aside
      aria-label="Request a confidential removal quote"
      className="rounded-2xl bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-blue-950 text-white p-7 sm:p-9 border border-blue-500/30 shadow-xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#60A5FA]">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>Confidential 12-Hour Feasibility Audit</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight text-balance">
            Need a Permanent Takedown Quote Protected by Escrow.com?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Submit the offending URL to our compliance intake desk. We verify policy removal eligibility within 12 hours and provide a fixed Pay-on-Success quote backed by Escrow.com and a lifetime re-deletion guarantee.
          </p>
        </div>

        <div className="flex flex-col gap-3 shrink-0">
          <a
            href={ctaHref}
            onClick={(e) => {
              if (onRequestQuote) {
                e.preventDefault();
                onRequestQuote(articleTitle);
              }
            }}
            className="pw-btn-primary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-white font-bold text-sm border border-blue-500/40 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Request Free Quote &amp; Audit</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
            <span>0% Upfront Risk · Mutual NDA Included</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface AeoBlogPostTemplateProps {
  post: AeoBlogPostData;
  sidebar?: React.ReactNode;
  ctaHref?: string;
  onRequestQuote?: (articleTitle?: string) => void;
}

export function AeoBlogPostTemplate({
  post,
  sidebar,
  ctaHref = '/#audit-form',
  onRequestQuote,
}: AeoBlogPostTemplateProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden">
      {/* Unboxed Clean Publication Metadata Header */}
      <header className="px-6 sm:px-10 py-4 bg-[#0B0F19] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-300">
          <span className="inline-flex items-center gap-1.5 font-bold text-[#60A5FA] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{post.publicationType}</span>
          </span>
          <span className="text-slate-600" aria-hidden="true">/</span>
          <time dateTime={post.publishedDateIso} className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Published {post.publishedDate}</span>
          </time>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{post.readTime}</span>
          </span>
          <span className="text-slate-600 hidden md:inline" aria-hidden="true">·</span>
          <span className="text-slate-400 hidden md:inline tabular-nums">
            Ref: {post.docketRef}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
          {post.tags.map((tag, idx) => (
            <React.Fragment key={tag}>
              {idx > 0 && <span className="text-slate-600" aria-hidden="true">·</span>}
              <span className="text-slate-300">{tag}</span>
            </React.Fragment>
          ))}
        </div>
      </header>

      <div className="p-6 sm:p-10 lg:p-12">
        {/* Primary Article Headline & Deck */}
        <div className="max-w-4xl border-b border-slate-800 pb-8 mb-10 space-y-4">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-white leading-[1.16] tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-[70ch]">
            {post.subheadline}
          </p>
        </div>

        {/* Content Grid: Optional Sidebar + Structured AEO Reading Body */}
        <div
          className={
            sidebar
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start'
              : 'max-w-4xl mx-auto'
          }
        >
          {sidebar && (
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {sidebar}
            </aside>
          )}

          <div className={sidebar ? 'lg:col-span-8 space-y-10' : 'space-y-10'}>
            {/* 1. Highlighted Quick Answer Box (40-60 words) at the very top */}
            <AeoQuickAnswerBox quickAnswer={post.quickAnswer} />

            {/* 2. Question-Based H2 Sections */}
            <div className="space-y-10">
              {post.sections.map((sec, idx) => (
                <section
                  key={idx}
                  className="space-y-4 border-b border-slate-800 pb-8 last:border-b-0 last:pb-0"
                >
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-snug text-balance">
                    {sec.heading}
                  </h2>

                  <div className="space-y-4 max-w-[72ch]">
                    {sec.paragraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[15.5px] sm:text-[16.5px] text-slate-300 leading-[1.8]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {sec.calloutQuote && (
                    <blockquote className="my-6 p-6 rounded-xl bg-[#0B0F19] border border-slate-800 shadow-md space-y-2.5">
                      <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#60A5FA]">
                        {sec.calloutQuote.label}
                      </div>
                      <p className="font-display text-base sm:text-[17px] font-bold text-white leading-relaxed">
                        &ldquo;{sec.calloutQuote.quote}&rdquo;
                      </p>
                      <footer className="font-mono text-xs text-slate-400 pt-1">
                        Source: {sec.calloutQuote.citation}
                      </footer>
                    </blockquote>
                  )}

                  {sec.frameworkPoints && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {sec.frameworkPoints.map((fp, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                            <h3 className="font-display text-sm font-extrabold text-white">
                              {fp.title}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed pl-6">
                            {fp.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* 3. Comparison Table (DIY / Traditional Agencies vs. PostWipe) */}
            <AeoComparisonTable rows={post.comparisonRows} />

            {/* 4. Structured FAQ Q&A Section */}
            {post.faqs.length > 0 && (
              <section className="space-y-4 border-t border-slate-800 pt-8" aria-label="Frequently Asked Questions">
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-snug text-balance">
                  What else do legal and executive teams ask before starting?
                </h2>
                <div className="divide-y divide-slate-800 rounded-xl bg-[#0B0F19] border border-slate-800 px-6">
                  {post.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="py-4 space-y-1.5">
                      <h3 className="font-display text-sm sm:text-base font-bold text-white">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Internal CTA Banner Linking Directly to Quote Request Form */}
            <AeoQuoteCtaBanner
              articleTitle={post.title}
              ctaHref={ctaHref}
              onRequestQuote={onRequestQuote}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default AeoBlogPostTemplate;
