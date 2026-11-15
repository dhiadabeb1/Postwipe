import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Sparkles,
  Scale,
  EyeOff,
  Check,
  ExternalLink,
  PhoneCall,
  Video,
  Mail,
} from 'lucide-react';
import { buildDirectEmailUrl } from '../services/formSubmission';
import {
  buildWhatsAppUrl,
  WEB3FORMS_ACCESS_KEY,
  type SubmittedCaseDetails,
} from '../types/caseDetails';

interface NewsRemovalPageProps {
  onScheduleCall: () => void;
  onCaseSubmitted: (details: SubmittedCaseDetails) => void;
}

export function NewsRemovalPage({
  onScheduleCall,
  onCaseSubmitted,
}: NewsRemovalPageProps) {
  const [newsPreviewMode, setNewsPreviewMode] = useState<'after' | 'before'>('after');
  const [newsName, setNewsName] = useState('');
  const [newsEmail, setNewsEmail] = useState('');
  const [newsArticleUrl, setNewsArticleUrl] = useState('');
  const [newsKeywords, setNewsKeywords] = useState('');
  const [newsNotes, setNewsNotes] = useState('');
  const [isNewsSubmitting, setIsNewsSubmitting] = useState(false);
  const [newsError, setNewsError] = useState('');
  const [submittedNewsCase, setSubmittedNewsCase] = useState<SubmittedCaseDetails | null>(null);

  const handleNewsAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsName.trim() || !newsEmail.trim() || !newsArticleUrl.trim()) return;

    setIsNewsSubmitting(true);
    setNewsError('');

    const generatedCaseId = `PW-NEWS-${Math.floor(100000 + Math.random() * 900000)}`;
    const cleanName = newsName.trim();
    const cleanEmail = newsEmail.trim();
    const cleanUrl = newsArticleUrl.trim();
    const cleanKeywords = newsKeywords.trim();
    const cleanNotes = newsNotes.trim();

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New PostWipe News & Media Removal Audit (${generatedCaseId}) - ${cleanName}`,
          from_name: 'PostWipe News Desk',
          case_reference: generatedCaseId,
          service_type: 'News & Media Article Removal',
          name: cleanName,
          email: cleanEmail,
          article_url_to_audit: cleanUrl,
          target_keywords: cleanKeywords || 'Not provided',
          additional_notes: cleanNotes || 'Not provided',
          botcheck: '',
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        const newsDetails: SubmittedCaseDetails = {
          caseId: generatedCaseId,
          name: cleanName,
          email: cleanEmail,
          url: cleanUrl,
          company: cleanKeywords ? `Target Keywords: ${cleanKeywords}` : 'News & Media Article Removal',
          context: cleanNotes,
        };
        setSubmittedNewsCase(newsDetails);
        onCaseSubmitted(newsDetails);
      } else {
        setNewsError(
          data.message ||
            'Submission was not accepted by Web3Forms. Please check your access key or use WhatsApp.'
        );
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Network error while sending article audit request';
      setNewsError(
        `${errorMsg}. Please verify your connection or reach out directly on WhatsApp.`
      );
    } finally {
      setIsNewsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 bg-[#090D16] text-[#F8FAFC]">
      {/* 1. HERO SECTION: HEADLINE, SUBHEADLINE & MEDIA DE-INDEXING CONSOLE */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#090D16] via-[#0B0F19] to-[#090D16] pw-grid-bg border-b border-slate-800">
        <div
          className="pointer-events-none absolute -top-28 right-1/4 w-[560px] h-[560px] rounded-full bg-blue-600/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide uppercase shadow-2xs">
                  <Globe className="w-4 h-4 text-[#60A5FA] shrink-0" />
                  <span>News &amp; Media Article Removal • Legal &amp; Publisher Escalation</span>
                </div>

                <a
                  href="https://www.trustpilot.com/review/postwipe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all shadow-sm group"
                >
                  <span className="text-emerald-400 font-extrabold text-xs">★ Trustpilot</span>
                  <span className="text-white font-mono text-[11px]">4.9/5</span>
                  <span className="text-slate-400 text-[10px] hidden sm:inline">• Read Verified Client Reviews</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.06] mb-6">
                Complete Removal of Damaging <span className="pw-hl">News Articles</span> &amp; Online Media Publications.
              </h1>

              <div className="space-y-3.5 text-[16px] sm:text-[17.5px] text-slate-300 leading-relaxed max-w-2xl mb-8">
                <p>
                  We handle direct <strong className="text-white font-semibold">publisher outreach, legal and editorial compliance pathways, and complete Google de-indexing</strong> to permanently eliminate defamatory press, outdated news coverage, and digital media articles at the source.
                </p>
                <p>
                  Every case is backed by <strong className="text-white font-semibold">100% Escrow.com protection</strong>, our <strong className="text-white font-semibold">Free-Fix Guarantee</strong>, and strict <span className="underline decoration-[#2563EB] decoration-2 underline-offset-4 font-semibold text-white">NDA confidentiality</span> with zero secondary media exposure.
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                  <a
                    href="#news-audit-form"
                    className="pw-btn-primary inline-flex items-center justify-center gap-3 text-white font-extrabold text-[15.5px] px-7 py-4 rounded-xl border border-blue-500/40 cursor-pointer shrink-0"
                  >
                    <span>Request Link Audit &amp; Quote</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </a>

                  <button
                    type="button"
                    onClick={onScheduleCall}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-[15px] px-6 py-4 rounded-xl border border-slate-700 hover:border-blue-400 shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    <Video className="w-5 h-5 text-[#60A5FA]" />
                    <span>Schedule a Call (Google Meet)</span>
                  </button>
                </div>

                <div className="inline-flex items-center gap-3.5 bg-[#0F172A] px-4 py-3 rounded-xl border border-slate-800 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-[15px] text-white">
                        100% Escrow Protected
                      </span>
                      <span className="text-[11px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300">
                        Escrow.com
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Payment released only after verified source removal &amp; Google de-indexing
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white">100% Escrow Protected</div>
                    <p className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                      Funds held in third-party escrow until verified removal.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white">Free-Fix Guarantee</div>
                    <p className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                      Ongoing monitoring &amp; automatic remediation if content resurfaces.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white">Complete Confidentiality</div>
                    <p className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                      Zero publicity or media exposure under strict NDA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                <div className="px-5 py-3.5 bg-[#0B0F19] text-white border-b border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                    <span className="font-mono text-[11px] text-slate-200 font-semibold tracking-wide">
                      MEDIA VERIFICATION DASHBOARD
                    </span>
                  </div>

                  <div className="inline-flex rounded-lg bg-[#0F172A] p-0.5 border border-slate-700 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setNewsPreviewMode('before')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        newsPreviewMode === 'before'
                          ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-400/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewsPreviewMode('after')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        newsPreviewMode === 'after'
                          ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      After Removal
                    </button>
                  </div>
                </div>

                <div className="px-5 py-3 bg-[#0B0F19]/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10.5px] font-bold border transition-all ${
                        newsPreviewMode === 'after'
                          ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                          : 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>{newsPreviewMode === 'after' ? 'De-Indexed' : 'Page 1 News'}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10.5px] font-bold border transition-all ${
                        newsPreviewMode === 'after'
                          ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                          : 'bg-amber-950/70 text-amber-300 border-amber-800/60'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span>{newsPreviewMode === 'after' ? 'Cache Purged' : 'Syndicated'}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 font-mono text-[10.5px] font-bold border border-blue-500/30">
                      <Lock className="w-3 h-3 text-[#60A5FA] shrink-0" />
                      <span>Escrow Protected</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div
                    className={`rounded-xl p-4 border transition-all ${
                      newsPreviewMode === 'after'
                        ? 'bg-blue-950/40 border-blue-500/30'
                        : 'bg-rose-950/30 border-rose-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-[11px] text-slate-400 truncate">
                        digitalpressdaily.com/business/executive-inquiry-report...
                      </span>
                      {newsPreviewMode === 'after' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2563EB] text-white font-mono text-[10px] font-bold shrink-0">
                          UNPUBLISHED &amp; DELETED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 font-mono text-[10px] font-bold shrink-0">
                          PAGE 1 GOOGLE NEWS
                        </span>
                      )}
                    </div>

                    {newsPreviewMode === 'after' ? (
                      <div className="space-y-2.5">
                        <p className="text-sm font-semibold text-slate-500 line-through">
                          Investigation into Former Biotech Executive Raises Governance Questions
                        </p>
                        <div className="flex items-center gap-2 text-xs text-blue-300 font-mono bg-blue-950/70 border border-blue-500/30 rounded-lg px-3 py-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#60A5FA]" />
                          <span>[Article permanently removed via publisher legal compliance]</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-white">
                          Investigation into Former Biotech Executive Raises Governance Questions
                        </p>
                        <p className="text-xs text-rose-400">
                          Indexed in Google Search, Google News &amp; AI summaries for executive name search
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl bg-[#0B0F19] border border-slate-800 p-4">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                      <span>Publisher &amp; Search De-Indexing Status</span>
                      <span className="text-[#60A5FA] font-bold">
                        {newsPreviewMode === 'after' ? 'VERIFIED CLEAN' : 'ACTIVE EXPOSURE'}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                        <span className="text-slate-300 font-medium flex items-center gap-2">
                          <Scale className="w-3.5 h-3.5 text-[#60A5FA]" />
                          Publisher Source URL
                        </span>
                        {newsPreviewMode === 'after' ? (
                          <span className="font-mono text-[11px] text-[#60A5FA] font-bold">
                            Removed at Source
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-rose-400 font-bold">
                            Live Publication
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                        <span className="text-slate-300 font-medium flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-[#60A5FA]" />
                          Google Search &amp; News Cache
                        </span>
                        {newsPreviewMode === 'after' ? (
                          <span className="font-mono text-[11px] text-[#60A5FA] font-bold">
                            De-Indexed &amp; Cache Purged
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-rose-400 font-bold">
                            Ranking for Target Keywords
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-slate-300 font-medium flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-[#60A5FA]" />
                          Escrow.com Protection
                        </span>
                        {newsPreviewMode === 'after' ? (
                          <span className="font-mono text-[11px] bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40 font-bold">
                            ESCROW PROTECTED • RELEASED
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-800/60 font-bold">
                            ESCROW PROTECTED • LOCKED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                      Free-Fix Guarantee Included
                    </span>
                    <a href="#news-audit-form" className="text-[#60A5FA] hover:underline font-bold">
                      Audit Article URL →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROCESS BREAKDOWN SECTION */}
      <section id="news-process" className="py-24 bg-[#0B0F19] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
              01. PROCESS BREAKDOWN
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              How We Remove News Articles &amp; Clear Search Indices
            </h2>
            <p className="text-slate-300 text-[16.5px] leading-relaxed">
              Every media removal engagement follows a structured three-stage protocol combining editorial compliance, legal takedown filings, and search engine cache clearing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="pw-card bg-[#0F172A] rounded-2xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-[#2563EB] text-white font-mono text-base font-extrabold flex items-center justify-center shadow-sm shadow-blue-600/30">
                    01
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-500/40 px-3 py-1 rounded-full">
                    Step 1
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-3">
                  Case Evaluation &amp; Scope Mapping
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We audit the target publication, editorial standards, syndication network, and search indexing status to determine the most viable editorial, privacy, or legal removal pathway before any outreach begins.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 font-mono text-[11px] font-bold text-slate-400 uppercase">
                Deliverable: Feasibility &amp; Scope Assessment
              </div>
            </div>

            <div className="pw-card bg-[#0F172A] rounded-2xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-[#2563EB] text-white font-mono text-base font-extrabold flex items-center justify-center shadow-sm shadow-blue-600/30">
                    02
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-500/40 px-3 py-1 rounded-full">
                    Step 2
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-3">
                  Source Removal &amp; Legal / Privacy Takedowns
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our team executes direct publisher representation and submits formal editorial standards reviews, defamation notices, copyright claims, and privacy compliance filings to unpublish or delete the article at the source.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 font-mono text-[11px] font-bold text-slate-400 uppercase">
                Deliverable: Source Article Deletion
              </div>
            </div>

            <div className="pw-card bg-[#0F172A] rounded-2xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-[#2563EB] text-white font-mono text-base font-extrabold flex items-center justify-center shadow-sm shadow-blue-600/30">
                    03
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-500/40 px-3 py-1 rounded-full">
                    Step 3
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-3">
                  Google Search Engine De-indexing &amp; Cache Clearing
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Once the source publication removes or retracts the article, we file expedited search engine de-indexing and cache-clearing requests across Google, Bing, and AI search indices so residual snippets are completely wiped.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 font-mono text-[11px] font-bold text-slate-400 uppercase">
                Deliverable: Complete SERP &amp; Cache Purge
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES & RISK-FREE MODEL SECTION */}
      <section id="news-features" className="py-24 bg-[#090D16] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
              02. KEY FEATURES &amp; RISK-FREE MODEL
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Built on Verified Results, Escrow Security &amp; Strict Discretion
            </h2>
            <p className="text-slate-300 text-[16.5px] leading-relaxed">
              We eliminate the financial and reputational risk of traditional PR retainers with performance-locked escrow protection and ongoing post-removal monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="pw-card bg-[#0F172A] rounded-2xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center mb-5">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-3">
                  100% Escrow Protected
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Payment is held by a third-party escrow service and released only after successful removal and verification. If we do not remove the target article within the agreed scope, your deposit is refunded in full.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs font-bold text-[#60A5FA]">
                <span>ESCROW.COM VERIFIED</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="pw-card bg-[#0F172A] rounded-2xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-3">
                  Free-Fix Guarantee
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Post-removal monitoring with automatic remediation if the content resurfaces. Our system tracks search indices and syndicated mirrors to ensure deleted articles stay permanently offline.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs font-bold text-[#60A5FA]">
                <span>AUTOMATIC REMEDIATION</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="pw-card bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-blue-950 text-white rounded-2xl p-8 border border-blue-500/30 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center mb-5">
                  <EyeOff className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white mb-3">
                  Complete Confidentiality
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  High privacy standards without publicity or media exposure. Every case is handled under strict mutual NDA through private legal and editorial channels.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between font-mono text-xs font-bold text-blue-200">
                <span>ZERO MEDIA EXPOSURE</span>
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORM / CTA COMPONENT SECTION */}
      <section id="news-audit-form" className="py-24 bg-[#0B0F19] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
                03. CONFIDENTIAL LINK AUDIT
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Submit Your Article URL for a Feasibility Audit &amp; Quote
              </h2>
              <p className="text-slate-300 text-[16px] leading-relaxed">
                Provide the publication URL and target search keywords below. Our media compliance team will evaluate the publisher, map the removal pathway, and deliver a fixed-fee Escrow quote within 12 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Direct Publisher &amp; Legal Assessment</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      We verify editorial jurisdiction, syndication copies, and de-indexing eligibility before quoting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">100% Escrow.com Protection</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Zero upfront agency retainers. Funds remain locked in escrow until verified article removal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Strict NDA Confidentiality</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your identity, brand, and submitted URLs are never shared outside our compliance team.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Prefer a Live Consultation First?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Book a confidential 15-minute call with our senior media removal specialists via Google Meet.
                </p>
                <button
                  type="button"
                  onClick={onScheduleCall}
                  className="inline-flex items-center gap-2 bg-[#0B0F19] hover:bg-slate-800 text-blue-300 font-extrabold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  <Video className="w-4 h-4 text-[#60A5FA]" />
                  <span>Schedule a Call (Google Meet)</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                <div className="px-6 py-4 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#60A5FA] block">
                      NEWS &amp; MEDIA ARTICLE REMOVAL
                    </span>
                    <h3 className="font-display text-lg font-extrabold text-white">
                      Request Link Audit &amp; Quote
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-500/40 font-mono text-[11px] font-bold text-blue-300">
                    <Lock className="w-3.5 h-3.5 text-[#60A5FA]" />
                    100% Escrow Protected
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  {submittedNewsCase ? (
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-500/40 text-[#60A5FA] flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-mono text-xs font-bold uppercase text-[#60A5FA]">
                            Article Audit Logged
                          </div>
                          <h4 className="font-display text-xl font-extrabold text-white">
                            Case ID: {submittedNewsCase.caseId}
                          </h4>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 text-slate-300 text-sm leading-relaxed font-medium">
                        Thank you for your submission. If you do not see our email reply within a few hours or if it lands in your spam folder, click below to chat with us instantly on WhatsApp.
                      </div>

                      <div className="rounded-xl bg-[#0B0F19] border border-slate-800 p-4 font-mono text-xs space-y-1.5 text-slate-400">
                        <div>
                          <span className="text-slate-500">Client:</span>{' '}
                          <strong className="text-white">{submittedNewsCase.name}</strong> ({submittedNewsCase.email})
                        </div>
                        <div className="truncate">
                          <span className="text-slate-500">Article URL:</span>{' '}
                          <strong className="text-white">{submittedNewsCase.url}</strong>
                        </div>
                      </div>

                      <a
                        href={buildWhatsAppUrl(submittedNewsCase)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pw-btn-primary w-full inline-flex items-center justify-center gap-2.5 text-white font-extrabold text-[15px] py-4 px-6 rounded-xl cursor-pointer"
                      >
                        <PhoneCall className="w-5 h-5" />
                        <span>WhatsApp</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <a
                        href={buildDirectEmailUrl(submittedNewsCase)}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0B0F19] hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-5 rounded-xl border border-slate-700 transition-all cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-[#60A5FA]" />
                        <span>Dispatch Direct Email Copy</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedNewsCase(null);
                          setNewsArticleUrl('');
                          setNewsKeywords('');
                          setNewsNotes('');
                        }}
                        className="w-full text-center text-xs text-slate-400 hover:text-white underline cursor-pointer pt-1"
                      >
                        Submit another article URL for evaluation
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsAuditSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="news-full-name"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
                          >
                            Full Name *
                          </label>
                          <input
                            id="news-full-name"
                            type="text"
                            required
                            value={newsName}
                            onChange={(e) => setNewsName(e.target.value)}
                            placeholder="Jordan Vance"
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="news-email"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
                          >
                            Email *
                          </label>
                          <input
                            id="news-email"
                            type="email"
                            required
                            value={newsEmail}
                            onChange={(e) => setNewsEmail(e.target.value)}
                            placeholder="jordan@organization.com"
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="news-article-url"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Article URL to Audit *
                        </label>
                        <input
                          id="news-article-url"
                          type="url"
                          required
                          value={newsArticleUrl}
                          onChange={(e) => setNewsArticleUrl(e.target.value)}
                          placeholder="https://publication.com/article-slug..."
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm font-mono transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="news-keywords"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Target Keywords
                        </label>
                        <input
                          id="news-keywords"
                          type="text"
                          value={newsKeywords}
                          onChange={(e) => setNewsKeywords(e.target.value)}
                          placeholder="Full Name, Brand Name, Executive Title"
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="news-notes"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Additional Notes
                        </label>
                        <textarea
                          id="news-notes"
                          rows={3}
                          value={newsNotes}
                          onChange={(e) => setNewsNotes(e.target.value)}
                          placeholder="Factual inaccuracies, outdated claims, or syndication details..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all resize-none"
                        />
                      </div>

                      {newsError && (
                        <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{newsError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isNewsSubmitting}
                        className="pw-btn-primary w-full inline-flex items-center justify-center gap-2.5 disabled:opacity-60 text-white font-extrabold text-[15.5px] py-4 px-6 rounded-xl cursor-pointer"
                      >
                        <span>
                          {isNewsSubmitting ? 'Submitting Article Audit...' : 'Request Link Audit & Quote'}
                        </span>
                        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                      </button>

                      <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-slate-800">
                          <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[11.5px] font-extrabold text-white leading-tight">
                              Escrow.com Security Verified
                            </div>
                            <div className="text-[10.5px] text-slate-400 leading-tight mt-0.5">
                              Released only post-deindexing
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-slate-800">
                          <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[11.5px] font-extrabold text-white leading-tight">
                              Mutual NDA Guaranteed
                            </div>
                            <div className="text-[10.5px] text-slate-400 leading-tight mt-0.5">
                              Zero secondary media exposure
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NewsRemovalPage;
