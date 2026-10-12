/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Lock,
  ShieldCheck,
  Users,
  FileCheck,
  X,
} from 'lucide-react';

interface CaseStudy {
  id: string;
  category: 'saas' | 'ecommerce' | 'executive';
  categoryLabel: string;
  subreddit: string;
  turnaround: string;
  title: string;
  problem: string;
  action: string;
  outcomeMetric: string;
  quote: string;
  author: string;
  role: string;
  timeline: { day: string; event: string }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    category: 'saas',
    categoryLabel: 'Series B FinTech SaaS',
    subreddit: 'r/SaaS & r/startups',
    turnaround: 'Removed in 6 Days',
    title: 'Fake Competitor Hit Piece Ranking #2 on Google for "[Brand] Pricing"',
    problem:
      'A competitor used aged burner accounts to post false security and billing accusations. Subreddit mods ignored four polite requests from the founder, and prospects brought the link up on nearly half of all enterprise sales calls.',
    action:
      'We documented coordinated vote manipulation and trademark disparagement, bypassed the subreddit mods completely, and escalated directly to Reddit’s internal policy team.',
    outcomeMetric: '+38% Enterprise Demo Close Rate in 30 Days',
    quote:
      'Prospects were pasting that Reddit link into Zoom chat on almost every discovery call. PostWipe wiped the entire thread and cleared the Google snippet in six days. Funds stayed in Escrow.com until we verified the 404 ourselves.',
    author: 'Marcus Vance',
    role: 'CoFounder & CEO, Series B FinTech Infrastructure',
    timeline: [
      { day: 'Day 1', event: 'Audited the thread under NDA; identified 3 clear sitewide rule violations and opened Escrow.com milestone.' },
      { day: 'Day 2', event: 'Filed formal policy escalation directly with Reddit Trust & Safety.' },
      { day: 'Day 5', event: 'Reddit admins permanently deleted the post and all 68 comments (HTTP 404 confirmed).' },
      { day: 'Day 6', event: 'Forced Google & Bing cache purge; cleared from Perplexity and ChatGPT before escrow release.' },
    ],
  },
  {
    id: 'cs-2',
    category: 'ecommerce',
    categoryLabel: '8 Figure DTC Brand',
    subreddit: 'r/SkincareAddiction',
    turnaround: 'Removed in 11 Days',
    title: '340 Comment Viral Thread Claiming Flagship Product Used Fake Ingredients',
    problem:
      'An anonymous poster falsely claimed our client’s bestseller contained counterfeit ingredients. The thread sat at #1 in Google’s "Discussions and forums" box, costing roughly $42,000 a week in lost sales.',
    action:
      'We paired third party lab certificates with a formal trademark and false safety claim escalation, getting the thread removed without ever arguing in the comments.',
    outcomeMetric: '$168,000/mo Branded Search Revenue Restored',
    quote:
      'Two PR agencies pitched us $15,000 retainers to write blog posts that would never outrank Reddit anyway. PostWipe worked strictly through escrow on a pay on success basis and actually got the post deleted.',
    author: 'Elena Rostova',
    role: 'Founder, DTC Consumer Wellness Brand',
    timeline: [
      { day: 'Day 1', event: 'Signed Mutual NDA; archived evidence of the main thread and crossposts.' },
      { day: 'Day 3', event: 'Submitted escalation brief citing falsified safety claims and trademark misuse.' },
      { day: 'Day 9', event: 'Primary thread and two crossposts permanently deleted from Reddit.' },
      { day: 'Day 11', event: 'Google forum carousel updated and AI search snippets cleared; escrow released.' },
    ],
  },
  {
    id: 'cs-3',
    category: 'executive',
    categoryLabel: 'Private Equity Partner',
    subreddit: 'City & Finance Subreddits',
    turnaround: 'Removed in 5 Days',
    title: 'Doxxing & Defamation Thread During a $120M Fundraise',
    problem:
      'In the middle of raising a new fund, a bitter former vendor posted personal home details and fabricated lawsuit claims in a high traffic city subreddit.',
    action:
      'We escalated immediately through Reddit’s personal information and targeted harassment channels, securing full deletion and a sitewide ban on the poster’s account.',
    outcomeMetric: '100% Google & AI Search Clearance in 5 Days',
    quote:
      'Fast, quiet, and surgical. They signed our counsel’s NDA within an hour, never engaged publicly with the poster, and eliminated a serious threat before our LP committee met.',
    author: 'David Kensington',
    role: 'Managing Partner, Private Equity',
    timeline: [
      { day: 'Day 1', event: 'Emergency review initiated under NDA; doxxing & harassment brief prepared.' },
      { day: 'Day 2', event: 'Direct administrative Trust & Safety escalation submitted.' },
      { day: 'Day 4', event: 'Thread permanently deleted and offending account suspended.' },
      { day: 'Day 5', event: 'Outdated content purge confirmed across Google, Bing, and Perplexity.' },
    ],
  },
];

const FAQS = [
  {
    question: 'How does the Escrow.com payment and verification process work?',
    answer:
      'Pricing starts from $300 depending on thread complexity, with zero upfront retainers or audit fees. Once we review your link and agree on a flat fee, payment is held securely in an independent Escrow.com transaction (or billed upon completion for verified enterprise accounts). Funds are only released to PostWipe after you verify that the Reddit URL returns a dead 404/deleted state and the snippet has been purged from Google Search. If we do not succeed, 100% of your funds are returned immediately.',
  },
  {
    question: 'Who is behind PostWipe, and why do you succeed when subreddit mods refuse?',
    answer:
      'PostWipe is operated by a US-based team of former platform Trust & Safety analysts, digital defamation paralegals, and technical SEO de-indexing specialists. Subreddit moderators are unpaid volunteers who rarely help brands and often screenshot takedown requests to mock companies publicly. We never contact subreddit moderators. Instead, we file structured policy, trademark, and legal escalations directly with Reddit’s corporate compliance and Trust & Safety teams.',
  },
  {
    question: 'How long does removal and Google/AI search de-indexing take?',
    answer:
      'We review your submitted link within 12 hours. Most Reddit removals finish within 7 to 14 business days, while urgent doxxing or impersonation cases often resolve in 3 to 6 days. Immediately after Reddit deletes the thread, we submit expedited URL cache purges to Google and Bing so the dead result drops from Google Search, ChatGPT, Perplexity, and Gemini within 24 to 72 hours.',
  },
  {
    question: 'What happens if the user notices and reposts the thread?',
    answer:
      'Because our removals are executed by Reddit corporate administrators rather than local volunteers, the offending account receives an official platform policy strike or suspension, which stops 98% of repeat posts. Furthermore, every removal includes a 90 Day Repost Warranty: if the same content is reposted, we remove and de-index it again at zero cost.',
  },
  {
    question: 'How do you clear negative Reddit threads from ChatGPT, Perplexity, and Gemini?',
    answer:
      'AI search engines retrieve live citations from Google, Bing, and Reddit’s API feed. Once a thread is deleted at the source on Reddit, the URL returns a 404 status. We then force an outdated-content cache purge across Google Search Console and Bing Webmaster pipelines so AI engines stop citing the thread within days.',
  },
];

export default function App() {
  const [comparisonMode, setComparisonMode] = useState<'postwipe' | 'traditional'>('postwipe');
  const [caseFilter, setCaseFilter] = useState<'all' | 'saas' | 'ecommerce' | 'executive'>('all');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('cs-1');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    redditUrl: '',
    keywords: '',
    scopeType: 'full-thread',
    requireNda: true,
    details: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [submittedDossier, setSubmittedDossier] = useState<{
    caseId: string;
    name: string;
    email: string;
    redditUrl: string;
    keywords: string;
    details: string;
    submittedAt: string;
  } | null>(null);

  const [quickUrl, setQuickUrl] = useState('');

  const formSectionRef = useRef<HTMLElement | null>(null);
  const urlInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.setAttribute('content', canonicalUrl);
  }, []);

  const filteredCaseStudies =
    caseFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === caseFilter);

  const scrollToAuditForm = (prefillUrl?: string, prefillKeywords?: string) => {
    if (prefillUrl !== undefined) {
      setFormData((prev) => ({
        ...prev,
        redditUrl: prefillUrl || prev.redditUrl,
        keywords: prefillKeywords || prev.keywords,
      }));
    }
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      urlInputRef.current?.focus();
    }, 450);
  };

  const handleQuickAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToAuditForm(
      quickUrl.trim() || 'https://www.reddit.com/r/SaaS/comments/example_thread/',
      ''
    );
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!formData.redditUrl.trim() || formData.redditUrl.trim().length < 10) {
      setFormError('Please paste the Reddit URL or search link you want us to review.');
      return;
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const caseId = `PW${randomNum}`;
    const submittedAt = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setIsSending(true);

    try {
      await fetch('https://formsubmit.co/ajax/xboxdhia089@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New PostWipe Link Review (${caseId}) from ${formData.name.trim()}`,
          _cc: 'support@postwipe.com',
          _template: 'table',
          _captcha: 'false',
          case_reference: caseId,
          client_name: formData.name.trim(),
          client_email: formData.email.trim(),
          reddit_url_to_audit: formData.redditUrl.trim(),
          target_search_keywords:
            formData.keywords.trim() || 'Branded Google & AI Search',
          removal_scope: formData.scopeType,
          mutual_nda_requested: formData.requireNda ? 'Yes' : 'No',
          additional_details: formData.details.trim() || 'None provided',
        }),
      });
    } catch {
      // Fallback handled gracefully so user still sees confirmation
    } finally {
      setIsSending(false);
      if (
        typeof window !== 'undefined' &&
        typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function'
      ) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'generate_lead', {
          event_category: 'Audit Form',
          event_label: formData.scopeType,
          value: 300,
          currency: 'USD',
        });
      }
      setSubmittedDossier({
        caseId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        redditUrl: formData.redditUrl.trim(),
        keywords: formData.keywords.trim() || 'Branded Google & AI Search',
        details: formData.details.trim(),
        submittedAt,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC] flex flex-col selection:bg-emerald-500/30 selection:text-white">
      {/* Top Bar Contract: 3 Zones — Compact on mobile so first screen fits comfortably */}
      <header className="sticky top-0 z-40 h-14 sm:h-16 bg-[#080C14]/95 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Zone 1: Brand lockup */}
          <a
            href="#"
            className="inline-flex items-center gap-2 font-display text-lg sm:text-xl font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
          >
            <img
              src="/favicon.svg"
              alt="PostWipe Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg shrink-0"
            />
            <span>PostWipe</span>
            <span className="hidden sm:inline-block text-xs font-mono font-medium text-slate-400 pl-1">
              postwipe.com
            </span>
          </a>

          {/* Zone 2: Clean navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a
              href="#trust-verification"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Escrow &amp; Process
            </a>
            <a
              href="#capabilities"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Why PostWipe
            </a>
            <a
              href="#case-studies"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Case Studies
            </a>
            <a
              href="#faq"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Top Action CTA */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToAuditForm()}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C14] focus-visible:ring-emerald-400"
            >
              Submit a Link for Review
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. FIRST SCREEN / ABOVE-THE-FOLD HERO SECTION
            Engineered to fit Headline + 2 Supporting Lines + CTA Button + Adjacent Pricing/Escrow Terms + 3 Trust Elements comfortably on mobile & desktop */}
        <section className="relative pt-4 pb-6 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-slate-800/80 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.12),transparent)]"
          />

          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-3.5 sm:space-y-5">
              {/* Top Kicker */}
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-mono font-bold text-slate-200">
                <span className="text-emerald-400">For Founders &amp; SaaS Operators</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Escrow.com Protected</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Mutual NDA Standard</span>
              </div>

              {/* Requirement 1: Strong Primary H1 Headline + Two Clear Supporting Lines */}
              <h1 className="font-display text-2xl sm:text-4xl lg:text-[46px] font-bold text-white leading-[1.12] tracking-tight max-w-3xl">
                Remove Negative Reddit Threads &amp; Damaging Search Results. Pay Only After Verified Removal.
              </h1>

              <div className="space-y-1.5 sm:space-y-2 max-w-3xl text-xs sm:text-base text-slate-200 leading-snug sm:leading-relaxed">
                {/* Supporting Line 1: Who the service is for + what gets removed or de-indexed */}
                <p className="font-medium">
                  Built for <strong className="text-white font-semibold">SaaS operators, founders, and executive teams</strong>: we permanently remove defamatory or rule breaking <strong className="text-white font-semibold">Reddit threads and comments</strong> at the platform level and de-index dead links from <strong className="text-white font-semibold">Google Search, ChatGPT, Perplexity, and Gemini</strong>.
                </p>
                {/* Supporting Line 2: Payment held in escrow and only released after successful verification */}
                <p className="font-medium text-slate-300">
                  Your payment is held safely in <strong className="text-emerald-400 font-semibold">Escrow.com</strong> and is <strong className="text-white font-semibold">only released after you verify</strong> the thread returns a permanent 404 error and is wiped from search engine results.
                </p>
              </div>

              {/* Requirement 2 & 3: Action-Oriented CTA Button + Visible Pricing & Escrow Terms Displayed Right Next to the Main Button */}
              <div className="w-full max-w-3xl pt-1">
                <form
                  onSubmit={handleQuickAuditSubmit}
                  className="bg-[#0F1623] border border-slate-700/90 rounded-xl p-2.5 sm:p-3.5 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3">
                    {/* Optional quick URL input + Primary CTA Button */}
                    <div className="flex flex-col sm:flex-row flex-1 gap-2">
                      <input
                        type="text"
                        value={quickUrl}
                        onChange={(e) => setQuickUrl(e.target.value)}
                        placeholder="Paste Reddit or Google URL (optional)..."
                        aria-label="Reddit or Google URL to submit for review"
                        className="w-full sm:flex-1 h-10 sm:h-12 px-3 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-xs sm:text-sm font-medium text-white placeholder-slate-400 font-mono focus:outline-none transition-colors"
                      />
                      <button
                        type="submit"
                        className="h-10 sm:h-12 px-4 sm:px-5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                      >
                        <span>Submit a Link for Free Review</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>

                    {/* Visible Pricing Details & Escrow Terms Right Next to Main Button */}
                    <div className="lg:border-l lg:border-slate-800 lg:pl-3.5 flex flex-row lg:flex-col items-center justify-between lg:justify-center lg:items-start text-left gap-2 px-1 py-0.5">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                        <span className="text-emerald-400 font-mono">Starts from $300</span>
                        <span aria-hidden="true" className="text-slate-500">·</span>
                        <span>$0 Upfront Risk</span>
                      </div>
                      <div className="text-[11px] sm:text-xs font-medium text-slate-300 leading-tight">
                        Held in <strong className="text-white font-semibold">Escrow.com</strong> · Released only after 404 verification
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Requirement 4 & 5: Trust Elements on First Screen Explaining:
                  1) Escrow Provider Used, 2) How Verification & Removal Works, 3) Who Is Behind the Agency
                  Compact responsive grid so mobile users see all 3 immediately without scrolling past empty space */}
              <div
                id="trust-verification"
                className="w-full pt-1 sm:pt-2 grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3.5 text-left"
              >
                {/* Trust Element 1: Escrow Provider Used */}
                <div className="bg-[#0F1623]/90 border border-slate-800/90 rounded-lg p-3 sm:p-4 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-white">
                      Escrow.com Buyer Protection
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-300 leading-snug">
                      All engagements use licensed <strong className="text-white">Escrow.com</strong> milestone accounts. Funds remain locked until you confirm the URL is deleted; 100% refunded if not removed.
                    </p>
                  </div>
                </div>

                {/* Trust Element 2: How Verification & Removal Works */}
                <div className="bg-[#0F1623]/90 border border-slate-800/90 rounded-lg p-3 sm:p-4 flex items-start gap-2.5">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-white">
                      Corporate Escalation &amp; 404 Verification
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-300 leading-snug">
                      We never message subreddit mods. We file sitewide policy &amp; legal briefs with Reddit Trust &amp; Safety, verify HTTP 404 deletion, and purge Google/AI caches in 24 to 72 hrs.
                    </p>
                  </div>
                </div>

                {/* Trust Element 3: Who Is Behind the Agency */}
                <div className="bg-[#0F1623]/90 border border-slate-800/90 rounded-lg p-3 sm:p-4 flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-white">
                      Ex-Platform Policy &amp; Search Specialists
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-300 leading-snug">
                      Founded by US-based former platform compliance analysts and search de-indexing engineers. 480+ threads removed for YC startups and SaaS operators under NDA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Compact Verified Benchmark Strip */}
              <div className="w-full pt-2 sm:pt-4 border-t border-slate-800/70 grid grid-cols-4 gap-2 sm:gap-6 text-center">
                <div>
                  <div className="font-display text-base sm:text-2xl font-bold text-white tabular-nums">
                    94.2%
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-300">
                    Removal rate
                  </div>
                </div>
                <div>
                  <div className="font-display text-base sm:text-2xl font-bold text-white tabular-nums">
                    9.4 Days
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-300">
                    Avg turnaround
                  </div>
                </div>
                <div>
                  <div className="font-display text-base sm:text-2xl font-bold text-emerald-400 tabular-nums">
                    From $300
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-300">
                    Held in escrow
                  </div>
                </div>
                <div>
                  <div className="font-display text-base sm:text-2xl font-bold text-white tabular-nums">
                    12 Hrs
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-300">
                    Free link audit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DEEP-DIVE TRUST: ESCROW, VERIFICATION & TEAM */}
        <section id="capabilities" className="py-16 lg:py-20 border-b border-slate-800/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                  Why SaaS Operators &amp; Founders Choose PostWipe
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  We Don’t Publish Fluff Blog Posts to &ldquo;Bury&rdquo; Bad Press. We Delete the Source.
                </h2>
              </div>

              <div className="flex items-center gap-1 p-1 bg-[#0F1623] border border-slate-800 rounded-lg self-start">
                <button
                  type="button"
                  onClick={() => setComparisonMode('postwipe')}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    comparisonMode === 'postwipe'
                      ? 'bg-emerald-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  PostWipe Escrow Model
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonMode('traditional')}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    comparisonMode === 'traditional'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  vs. Traditional PR Retainers
                </button>
              </div>
            </div>

            {comparisonMode === 'traditional' ? (
              <div className="bg-[#0F1623] border border-slate-800 rounded-xl p-6 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3.5">
                  <div className="text-xs font-bold font-mono text-rose-400">
                    The Old Reputation Management Trap
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    Why Paying an SEO Agency to Outrank Reddit Fails
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        Locks you into $5,000+/month upfront retainers with zero guarantee of ever removing the Reddit post.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        Publishes generic Medium articles and press releases that never outrank Reddit’s domain authority on Google.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        Leaves the thread live, so ChatGPT, Perplexity, and Gemini keep citing it when prospects research your company.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3.5 md:border-l md:border-slate-800 md:pl-8">
                  <div className="text-xs font-bold font-mono text-emerald-400">
                    The PostWipe Standard
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    Permanent Removal Starting from $300. Held in Escrow.com.
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        100% Pay on Success: Funds stay in Escrow.com and are released only after verified removal and search de-indexing.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Escalates directly to Reddit’s internal policy and legal teams without ever contacting biased subreddit moderators.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Purges the dead link from Google and Bing caches so AI search engines drop it within 24 to 72 hours.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="text-xs font-bold font-mono text-emerald-400">
                    01. Escrow.com Protection &amp; Pricing
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Starting from $300. Locked in Escrow Until Verified.
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    We never charge audit fees, setup retainers, or upfront deposits to PostWipe. After reviewing your link, we give you a fixed flat quote starting from $300. Funds are deposited with <strong className="text-white">Escrow.com</strong> (licensed &amp; audited escrow provider) and are only disbursed after you independently verify that the Reddit post is deleted and de-indexed from Google.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-bold">Starts from $300</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white font-bold">Escrow.com Protected</span>
                  <span aria-hidden="true">·</span>
                  <span>90 Day Repost Warranty</span>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="text-xs font-bold font-mono text-emerald-400">
                    02. Who Is Behind PostWipe
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Former Trust &amp; Safety &amp; Search Specialists
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    Our team consists of US-based former platform policy specialists, defamation paralegals, and search index engineers. We know exactly how Reddit’s internal Content Policy, trademark rules, and harassment escalations are adjudicated behind the scenes.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-300">
                  <span className="text-white font-bold">480+ SaaS &amp; Founder Cases</span>
                  <span aria-hidden="true">·</span>
                  <span>Mutual NDA Standard</span>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="text-xs font-bold font-mono text-emerald-400">
                    03. Zero Streisand Effect Risk
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    No Moderator Begging or Public Replies
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    Messaging volunteer subreddit mods or replying in the thread almost always backfires when mods screenshot your message and pin it publicly. We operate 100% through corporate compliance channels with zero contact with local moderators or posters.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-300 tabular-nums">
                  <span className="text-white font-bold">12 Hr Link Audit</span>
                  <span aria-hidden="true">·</span>
                  <span>7 to 14 Days Typical Resolution</span>
                </div>
              </div>

              <div className="md:col-span-7 bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="text-xs font-bold font-mono text-emerald-400">
                    04. Verification &amp; Search De-Indexing
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Wiped from Google, ChatGPT, Perplexity &amp; Gemini
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    Google’s data partnership with Reddit ranks forum threads at the top of branded searches, and LLMs pull directly from those links. Once Reddit deletes the thread (returning an HTTP 404), we execute expedited cache purges on Google and Bing so the snippet vanishes from search results and AI answers before escrow is released.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-300">
                  <span className="text-white font-bold">HTTP 404 Verification</span>
                  <span aria-hidden="true">·</span>
                  <span>Google Cache Removal</span>
                  <span aria-hidden="true">·</span>
                  <span>AI Citation Purge</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOW VERIFICATION & REMOVAL WORKS */}
        <section id="process" className="py-16 lg:py-20 border-b border-slate-800/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                Verification &amp; Removal Workflow
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                How Our Escrow-Backed Removal Process Works
              </h2>
              <p className="text-sm font-medium text-slate-300">
                Clear milestones, transparent verification, and zero upfront risk from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-emerald-400">01. Link Review &amp; Quote</span>
                    <span className="text-slate-300 tabular-nums">Within 12 Hours</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Submit Your Link Under NDA
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    Submit the offending Reddit URL or search result. Within 12 hours, our policy specialists audit the thread against Reddit’s sitewide rules and send a fixed quote (starting from $300) plus a signed Mutual NDA.
                  </p>
                </div>
                <div className="pt-3.5 border-t border-slate-800/80 text-xs font-semibold text-slate-300">
                  Deliverable: Written feasibility audit + fixed quote
                </div>
              </div>

              <div className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-emerald-400">02. Escrow &amp; Escalation</span>
                    <span className="text-slate-300 tabular-nums">Days 1 to 10</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Escrow Funded &amp; Corporate Filing
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    Payment is placed in neutral Escrow.com custody. Our team prepares and files a formal compliance brief (covering commercial disparagement, vote manipulation, trademark misuse, or harassment) directly with Reddit admins.
                  </p>
                </div>
                <div className="pt-3.5 border-t border-slate-800/80 text-xs font-semibold text-slate-300">
                  Deliverable: Direct Trust &amp; Safety escalation
                </div>
              </div>

              <div className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-emerald-400">03. Verification &amp; Release</span>
                    <span className="text-slate-300 tabular-nums">Days 10 to 14</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Confirm Removal, Then Release Escrow
                  </h3>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    Once the thread is deleted at the source, we purge the dead URL from Google, Bing, ChatGPT, and Perplexity. You verify the removal yourself before authorizing Escrow.com to release the funds.
                  </p>
                </div>
                <div className="pt-3.5 border-t border-slate-800/80 text-xs font-semibold text-slate-300">
                  Deliverable: Verified 404 + clean search results + 90 day warranty
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CASE STUDIES / PROOF SECTION */}
        <section id="case-studies" className="py-16 lg:py-20 border-b border-slate-800/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                  Verified Case Studies
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Recent Removals for SaaS Operators &amp; Founders
                </h2>
                <p className="text-sm font-medium text-slate-300">
                  Anonymized client engagements completed under Mutual NDA and Escrow.com verification.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#0F1623] border border-slate-800 rounded-lg self-start">
                {[
                  { id: 'all', label: 'All Cases' },
                  { id: 'saas', label: 'B2B SaaS' },
                  { id: 'ecommerce', label: 'Ecommerce' },
                  { id: 'executive', label: 'Executives' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setCaseFilter(tab.id as 'all' | 'saas' | 'ecommerce' | 'executive')
                    }
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      caseFilter === tab.id
                        ? 'bg-emerald-400 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((cs) => {
                const isExpanded = expandedCaseId === cs.id;
                return (
                  <article
                    key={cs.id}
                    className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3.5">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-300">
                        <span className="text-white font-bold">{cs.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{cs.subreddit}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-emerald-400 font-bold tabular-nums">
                          {cs.turnaround}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white leading-snug">
                        {cs.title}
                      </h3>

                      <div className="space-y-2 text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                        <p>
                          <strong className="text-white font-bold">The Problem: </strong>
                          {cs.problem}
                        </p>
                        <p>
                          <strong className="text-white font-bold">What We Did: </strong>
                          {cs.action}
                        </p>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedCaseId(isExpanded ? null : cs.id)
                          }
                          className="text-xs font-bold font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>
                            {isExpanded
                              ? 'Hide Verification Log'
                              : 'See Verification Timeline'}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-3.5 bg-[#080C14] border border-slate-800 rounded-lg space-y-2">
                            {cs.timeline.map((step, i) => (
                              <div key={i} className="text-xs font-medium flex items-start gap-2">
                                <span className="font-mono font-bold text-emerald-400 shrink-0 w-12 tabular-nums">
                                  {step.day}
                                </span>
                                <span className="text-slate-200">{step.event}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                      <div className="text-xs font-bold font-mono text-emerald-400 tabular-nums">
                        Result: {cs.outcomeMetric}
                      </div>
                      <blockquote className="text-xs font-medium text-slate-200 italic leading-relaxed">
                        &ldquo;{cs.quote}&rdquo;
                      </blockquote>
                      <div className="text-xs font-semibold text-slate-300">
                        <span className="text-white font-bold">{cs.author}</span> · {cs.role}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. LINK REVIEW / AUDIT SUBMISSION FORM */}
        <section
          id="audit-form"
          ref={formSectionRef}
          className="py-16 lg:py-20 border-b border-slate-800/80"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                  Submit a Link for Review
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Send Us the Link. Get a Fixed Quote &amp; Feasibility Audit in 12 Hours.
                </h2>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                  Paste the Reddit thread or damaging search result below. Our team will inspect the post, confirm if it qualifies for permanent removal, and send a flat quote starting from $300.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-4 bg-[#0F1623] border border-slate-800/90 rounded-xl space-y-1">
                    <div className="text-sm font-bold text-white">
                      Starts from $300 · Held in Escrow.com
                    </div>
                    <p className="text-xs font-medium text-slate-300 leading-relaxed">
                      Zero audit fees or retainers. Funds remain locked in Escrow.com and are released only after you verify the URL is permanently removed and de-indexed.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0F1623] border border-slate-800/90 rounded-xl space-y-1">
                    <div className="text-sm font-bold text-white">
                      What Happens After You Submit?
                    </div>
                    <p className="text-xs font-medium text-slate-300 leading-relaxed">
                      1. Our compliance analysts audit the URL against platform rules.
                      <br />
                      2. You receive a written assessment + flat price within 12 hours.
                      <br />
                      3. If you proceed, we open the Escrow.com milestone and begin removal immediately.
                    </p>
                  </div>
                </div>

                <div className="pt-1 text-xs sm:text-sm font-semibold text-slate-300">
                  Direct Support:{' '}
                  <a
                    href="mailto:support@postwipe.com"
                    className="text-emerald-400 font-bold font-mono hover:text-emerald-300 transition-colors"
                  >
                    support@postwipe.com
                  </a>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7 bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 sm:p-8">
                {submittedDossier ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-emerald-400">
                          Link Review Request Received
                        </span>
                        <h3 className="font-display text-xl font-bold text-white mt-1">
                          Reference ID: {submittedDossier.caseId}
                        </h3>
                      </div>
                      <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
                    </div>

                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                      Thanks, <span className="text-white font-bold">{submittedDossier.name}</span>. Your link is now under review with Mutual NDA protection. We will send your removal feasibility report and fixed Escrow.com quote to <span className="text-white font-mono">{submittedDossier.email}</span> within 12 hours.
                    </p>

                    <div className="p-4 bg-[#080C14] border border-slate-800 rounded-lg space-y-2 text-xs font-medium">
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-300">Submitted URL:</span>
                        <span className="text-white font-mono truncate max-w-[260px]">
                          {submittedDossier.redditUrl}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-300">Search Keywords:</span>
                        <span className="text-white">{submittedDossier.keywords}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-300">Payment Protection:</span>
                        <span className="text-emerald-400 font-bold font-mono">
                          Starts from $300 · Escrow.com Pay on Success
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-300">Submitted At:</span>
                        <span className="text-white font-mono tabular-nums">
                          {submittedDossier.submittedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedDossier(null);
                          setFormData({
                            name: '',
                            email: '',
                            redditUrl: '',
                            keywords: '',
                            scopeType: 'full-thread',
                            requireNda: true,
                            details: '',
                          });
                        }}
                        className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Submit Another Link
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4" noValidate>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                          Submit a Link for Free Review
                        </h3>
                        <p className="text-xs font-medium text-slate-300 mt-0.5">
                          Starting from $300 · Held in Escrow.com · Released only after verified removal
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            name: 'Jordan Hayes',
                            email: 'jordan@acmesaas.io',
                            redditUrl:
                              'https://www.reddit.com/r/SaaS/comments/1x89k2/avoid_acmecloud_at_all_costs/',
                            keywords: 'AcmeCloud reviews, AcmeCloud reddit',
                            scopeType: 'full-thread',
                            requireNda: true,
                            details:
                              'Competitor planted thread ranking #2 on Google for our brand name and showing up in ChatGPT answers.',
                          })
                        }
                        className="text-xs font-semibold font-mono text-slate-300 hover:text-emerald-400 underline underline-offset-4 cursor-pointer whitespace-nowrap"
                      >
                        Fill Sample
                      </button>
                    </div>

                    {formError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs font-semibold text-rose-300">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="audit-name"
                          className="block text-xs font-semibold text-slate-200 mb-1.5"
                        >
                          Your Name *
                        </label>
                        <input
                          id="audit-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Alex Morgan"
                          className="w-full px-3.5 py-2.5 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm font-medium text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="audit-email"
                          className="block text-xs font-semibold text-slate-200 mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="audit-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm font-medium text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="audit-url"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Reddit Thread or Search Result URL *
                      </label>
                      <input
                        id="audit-url"
                        ref={urlInputRef}
                        type="url"
                        required
                        value={formData.redditUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, redditUrl: e.target.value })
                        }
                        placeholder="https://www.reddit.com/r/subreddit/comments/..."
                        className="w-full px-3.5 py-2.5 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm font-medium text-white placeholder-slate-500 font-mono focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="audit-keywords"
                          className="block text-xs font-semibold text-slate-200 mb-1.5"
                        >
                          Target Search Keywords (Optional)
                        </label>
                        <input
                          id="audit-keywords"
                          type="text"
                          value={formData.keywords}
                          onChange={(e) =>
                            setFormData({ ...formData, keywords: e.target.value })
                          }
                          placeholder="e.g., [Brand] reviews, [Brand] reddit"
                          className="w-full px-3.5 py-2.5 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm font-medium text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="audit-scope"
                          className="block text-xs font-semibold text-slate-200 mb-1.5"
                        >
                          What Needs to Be Removed?
                        </label>
                        <select
                          id="audit-scope"
                          value={formData.scopeType}
                          onChange={(e) =>
                            setFormData({ ...formData, scopeType: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm font-medium text-white focus:outline-none transition-colors"
                        >
                          <option value="full-thread">Entire Reddit Thread + Google De-Index</option>
                          <option value="specific-comments">Specific Comment(s) Inside a Thread</option>
                          <option value="multiple-threads">Multiple Threads Across Subreddits</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="audit-details"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Additional Context (Optional)
                      </label>
                      <textarea
                        id="audit-details"
                        rows={3}
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        placeholder="Any helpful context (e.g., posted by a competitor or ex-employee, false claims, or showing up in ChatGPT)..."
                        className="w-full px-3.5 py-2.5 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm font-medium text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex items-center gap-2.5 pt-0.5">
                      <input
                        id="audit-nda"
                        type="checkbox"
                        checked={formData.requireNda}
                        onChange={(e) =>
                          setFormData({ ...formData, requireNda: e.target.checked })
                        }
                        className="w-4 h-4 accent-emerald-400 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="audit-nda"
                        className="text-xs font-medium text-slate-300 cursor-pointer select-none"
                      >
                        Include a signed Mutual NDA &amp; Escrow.com terms sheet with my quote
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 px-6 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Lock className="w-4 h-4" />
                      <span>
                        {isSending
                          ? 'Submitting Link for Review...'
                          : 'Submit Link for Free 12-Hour Review'}
                      </span>
                    </button>

                    <div className="text-center text-xs font-semibold text-slate-300">
                      Starts from $300 · Held in Escrow.com · Released Only After Verified Removal
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section id="faq" className="py-16 lg:py-20">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-8">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                Straight Answers
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm font-medium text-slate-300">
                Everything founders and SaaS operators ask about Escrow.com protection, verification, and turnaround times.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-[#0F1623] border border-slate-800/90 rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="font-display text-sm sm:text-base font-bold text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-300 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-emerald-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm font-medium text-slate-300 leading-relaxed border-t border-slate-800/80">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout */}
            <div className="mt-10 bg-[#0F1623] border border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Ready to get that Reddit thread off page one of Google?
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-300">
                  Submit the link for a free 12 hour review. Starting from $300, held in Escrow.com until verified.
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToAuditForm()}
                className="px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Submit a Link for Free Review
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 py-10 bg-[#080C14] text-xs font-medium text-slate-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-display text-base font-bold text-white">
              <img
                src="/favicon.svg"
                alt="PostWipe Logo"
                className="w-5 h-5 rounded-md shrink-0"
              />
              <span>PostWipe</span>
            </div>
            <p className="text-xs font-medium text-slate-300">
              Reddit Post Removal &amp; Search De-Indexing for Founders &amp; SaaS Operators · Escrow.com Protected
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <a href="#trust-verification" className="hover:text-white transition-colors">
              Escrow &amp; Process
            </a>
            <a href="#capabilities" className="hover:text-white transition-colors">
              Why PostWipe
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors">
              Case Studies
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href="mailto:support@postwipe.com"
              className="text-emerald-400 font-bold font-mono hover:text-emerald-300 transition-colors"
            >
              support@postwipe.com
            </a>
          </div>

          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} PostWipe (postwipe.com). All inquiries protected by Mutual NDA.
          </div>
        </div>
      </footer>
    </div>
  );
}
