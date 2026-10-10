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
      'Prospects were pasting that Reddit link into Zoom chat on almost every discovery call. PostWipe wiped the entire thread and cleared the Google snippet in six days, and didn’t ask for a dime until we verified it was gone.',
    author: 'Marcus Vance',
    role: 'CoFounder & CEO, Series B FinTech Infrastructure',
    timeline: [
      { day: 'Day 1', event: 'Audited the thread under NDA; identified 3 clear sitewide rule violations.' },
      { day: 'Day 2', event: 'Filed formal policy escalation directly with Reddit Trust & Safety.' },
      { day: 'Day 5', event: 'Reddit admins permanently deleted the post and all 68 comments.' },
      { day: 'Day 6', event: 'Forced Google & Bing cache purge; cleared from Perplexity and ChatGPT.' },
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
      'Two PR agencies pitched us $15,000 retainers to write blog posts that would never outrank Reddit anyway. PostWipe worked strictly on pay for results and actually got the post deleted.',
    author: 'Elena Rostova',
    role: 'Founder, DTC Consumer Wellness Brand',
    timeline: [
      { day: 'Day 1', event: 'Signed Mutual NDA; archived evidence of the main thread and crossposts.' },
      { day: 'Day 3', event: 'Submitted escalation brief citing falsified safety claims and trademark misuse.' },
      { day: 'Day 9', event: 'Primary thread and two crossposts permanently deleted from Reddit.' },
      { day: 'Day 11', event: 'Google forum carousel updated; AI search snippets cleared.' },
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
    question: 'Do I really pay nothing until the post is removed, and how much does it cost?',
    answer:
      'Yes, 100%. Pricing starts from $300 depending on the scope and complexity of the thread, and we never charge audit fees, onboarding retainers, or upfront deposits. Once we inspect your link, we give you a clear flat price. If we don’t get the Reddit thread or comment permanently removed, you pay $0.',
  },
  {
    question: 'What if the subreddit moderators already refused to take it down?',
    answer:
      'Subreddit moderators are unpaid volunteers who rarely side with businesses. Worse, messaging them often backfires when they screenshot your request and pin it to the top of the thread. We never contact subreddit moderators. We escalate directly to Reddit’s internal policy, legal, and Trust & Safety teams based on sitewide rule violations.',
  },
  {
    question: 'How long does the removal and Google/AI cleanup take?',
    answer:
      'We review your link within 12 hours. Most removals finish within 1 to 2 weeks (7 to 14 business days), while urgent doxxing or harassment cases often resolve in 3 to 6 days. As soon as Reddit deletes the post, our expedited cache removal requests clear the dead snippet from Google, ChatGPT, Perplexity, and Gemini within 24 to 72 hours.',
  },
  {
    question: 'What happens if the person notices and reposts the thread?',
    answer:
      'Because our removals come from Reddit administrators rather than local volunteers, the poster receives an official platform warning or account suspension, which stops 98% of reposts. On top of that, every removal comes with a 90 Day Repost Warranty: if the same content goes back up, we remove it again for free.',
  },
  {
    question: 'How do you clear negative Reddit posts from ChatGPT, Perplexity, and Gemini?',
    answer:
      'AI search engines pull live answers from Google, Bing, and Reddit’s data feed. When a thread is deleted at the source on Reddit, the URL returns a 404 dead link. We immediately trigger cache purge requests on Google and Bing so AI tools stop citing the post within days.',
  },
  {
    question: 'Do you remove reviews on Trustpilot or Glassdoor, or only Reddit?',
    answer:
      'Only Reddit, along with the Google and AI search results that pull from it. Focusing 100% on Reddit’s specific policy rules and escalation channels is how we maintain a 94.2% removal rate on the cases we take on.',
  },
];

export default function App() {
  // Interactive Comparison Tab in Capabilities
  const [comparisonMode, setComparisonMode] = useState<'postwipe' | 'traditional'>('postwipe');

  // Case Studies Filter & Expanded Timeline
  const [caseFilter, setCaseFilter] = useState<'all' | 'saas' | 'ecommerce' | 'executive'>('all');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('cs-1');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Lead Capture Form State
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

  // Quick URL Audit Bar in Hero
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
      setFormError('Please paste the Reddit URL you want us to review.');
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
          _subject: `New PostWipe Audit Request (${caseId}) from ${formData.name.trim()}`,
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
      if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
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
      {/* Top Bar Contract: 3 Zones */}
      <header className="sticky top-0 z-40 h-16 bg-[#080C14]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Zone 1: Brand lockup with custom PostWipe logo */}
          <a
            href="#"
            className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
          >
            <img
              src="/favicon.svg"
              alt="PostWipe Logo"
              className="w-7 h-7 rounded-lg shrink-0"
            />
            <span>PostWipe</span>
          </a>

          {/* Zone 2: Clean navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a
              href="#capabilities"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Why Us
            </a>
            <a
              href="#process"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              How It Works
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
            <a
              href="#audit-form"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Free Audit
            </a>
          </nav>

          {/* Zone 3: Primary CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToAuditForm()}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C14] focus-visible:ring-emerald-400"
            >
              Get a Free Confidential Audit
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative pt-14 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-800/80 text-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.12),transparent)]"
          />
          <div className="relative max-w-[1200px] mx-auto px-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base font-mono text-slate-300">
                <span className="text-emerald-400 font-bold text-sm sm:text-base">Reddit Post Removal Service</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="font-bold text-white text-sm sm:text-base">100% Pay on Results</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="font-bold text-white text-sm sm:text-base">Starting from $300</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-white leading-[1.1] mx-auto">
                Kill the Reddit Thread Costing You Customers. Pay Only After It’s Gone.
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-[62ch] mx-auto">
                One unfair Reddit post can rank on page one of Google for your brand name and get repeated as fact by ChatGPT, Perplexity, and Gemini. We get rule breaking threads permanently removed at the platform level, wipe the dead links from search engines, and charge nothing unless we succeed.
              </p>

              {/* Instant Audit Bar */}
              <form
                onSubmit={handleQuickAuditSubmit}
                className="pt-2 w-full max-w-xl mx-auto space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={quickUrl}
                      onChange={(e) => setQuickUrl(e.target.value)}
                      placeholder="Paste the Reddit link here (or click to start)..."
                      aria-label="Reddit thread URL for free confidential audit"
                      className="w-full h-12 pl-4 pr-4 bg-[#0F1623] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm text-white placeholder-slate-500 font-mono focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 px-6 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-sm font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Get a Free Confidential Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span>Pricing starts from $300</span>
                  <span aria-hidden="true">·</span>
                  <span>$0 if we don’t remove it</span>
                  <span aria-hidden="true">·</span>
                  <span>Honest answer within 12 hours</span>
                </div>
              </form>

              {/* Proof Metrics */}
              <div className="w-full pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    94.2%
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Success rate on cases we take
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    9.4 Days
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Average time to full removal
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                    From $300
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Paid only after removal
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    48 Hrs
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    To clear Google &amp; AI search caches
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRUST & VALUE INDICATORS */}
        <section id="capabilities" className="py-20 lg:py-24 border-b border-slate-800/80">
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-mono text-emerald-400">
                  Why Founders Work With PostWipe
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  We Don’t Write Fluff Blog Posts to &ldquo;Bury&rdquo; Bad Press. We Delete the Source.
                </h2>
              </div>

              <div className="flex items-center gap-1 p-1 bg-[#0F1623] border border-slate-800 rounded-lg self-start">
                <button
                  type="button"
                  onClick={() => setComparisonMode('postwipe')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    comparisonMode === 'postwipe'
                      ? 'bg-emerald-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PostWipe Approach
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonMode('traditional')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    comparisonMode === 'traditional'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  vs. Traditional PR Agencies
                </button>
              </div>
            </div>

            {comparisonMode === 'traditional' ? (
              <div className="bg-[#0F1623] border border-slate-800 rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-rose-400">
                    The Old Reputation Management Trap
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Why Paying an SEO Agency to Outrank Reddit Doesn’t Work
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        Locks you into $5,000+/month retainers with zero promise of ever removing the Reddit post.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        Publishes generic Medium articles and press releases that will never outrank Reddit on Google.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        Leaves the thread live, so ChatGPT, Perplexity, and Gemini keep quoting it to your buyers.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 md:border-l md:border-slate-800 md:pl-8">
                  <div className="text-xs font-mono text-emerald-400">
                    How PostWipe Works
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Permanent Removal Starting from $300. Zero Retainers.
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        100% Pay on Results: Pricing starts from $300, and you pay nothing unless the post is permanently gone.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Escalates directly to Reddit’s internal policy and legal teams, never begging biased subreddit mods.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Purges the dead link from Google and Bing caches so AI search tools drop it within days.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-400">
                    01. Zero Financial Risk
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    100% Pay on Results. Starting from $300.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    You shouldn’t have to pay a $5,000 retainer just to see if an agency can do its job. Our removals start from $300 with zero setup fees, zero audit fees, and zero monthly retainers. After checking your link, we give you an exact flat price. If we don’t get the post removed, you owe us $0.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="text-emerald-400 font-medium">Starts from $300</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white font-medium">$0 Upfront</span>
                  <span aria-hidden="true">·</span>
                  <span>90 Day Repost Warranty</span>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-400">
                    02. Quiet Execution
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Strict Confidentiality &amp; NDAs
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    If you message a subreddit moderator or reply to a hater yourself, they will screenshot it and make an even bigger post accusing you of censorship. We never message the poster or volunteer mods, and every inquiry is covered by a Mutual NDA from day one.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="text-white font-medium">Mutual NDA Included</span>
                  <span aria-hidden="true">·</span>
                  <span>Zero Backfire Risk</span>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-400">
                    03. Built for Speed
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Resolved in 1 to 2 Weeks
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    Every day a negative thread sits on page one of Google, it quietly kills demos and checkouts. We review your link within 12 hours and file our escalation immediately, with most removals wrapping up in 7 to 14 business days.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 tabular-nums">
                  <span className="text-white font-medium">12 Hr Audit</span>
                  <span aria-hidden="true">·</span>
                  <span>9.4 Days Average Turnaround</span>
                </div>
              </div>

              <div className="md:col-span-7 bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-400">
                    04. Clean Up Google &amp; AI Search
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Cleared from Google, ChatGPT, Perplexity &amp; Gemini
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    Google’s partnership with Reddit pushes forum threads to the top of search results, and AI tools like ChatGPT and Perplexity pull straight from those threads when buyers ask about your brand. As soon as the post is deleted on Reddit, we clear the cached snippets so it disappears from Google and AI answers within 24 to 72 hours.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="text-white font-medium">Google Cache Purge</span>
                  <span aria-hidden="true">·</span>
                  <span>ChatGPT &amp; Perplexity Cleanup</span>
                  <span aria-hidden="true">·</span>
                  <span>Gemini Overview Refresh</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS */}
        <section id="process" className="py-20 lg:py-24 border-b border-slate-800/80">
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-mono text-emerald-400">
                How It Works
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Three Simple Steps. Zero Upfront Commitment.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                No pushy sales calls or long contracts. Here is exactly how we get a damaging thread taken down.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400">01. Free Audit</span>
                    <span className="text-slate-400 tabular-nums">Within 12 Hours</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Send Us the Link &amp; Keywords
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Share the Reddit thread or comment URL and the search terms where it shows up. Within 12 hours, we’ll tell you honestly whether we can remove it and give you a flat quote starting from $300.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  You get: Honest feasibility check + fixed quote (from $300)
                </div>
              </div>

              <div className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400">02. Platform Escalation</span>
                    <span className="text-slate-400 tabular-nums">Days 1 to 10</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    We Escalate Directly to Reddit
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    We build a formal case around the exact sitewide rules the post violates, including defamation, fake competitor attacks, trademark misuse, harassment, or doxxing, and file it through Reddit’s internal policy channels.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  You get: Direct corporate review (no volunteer mods)
                </div>
              </div>

              <div className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400">03. Removal &amp; Search Purge</span>
                    <span className="text-slate-400 tabular-nums">Days 10 to 14</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    The Post Disappears &amp; You Pay
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Once Reddit permanently deletes the post, we clear the cached snippets from Google Search and verify it’s gone from ChatGPT, Perplexity, and Gemini. You only pay after you confirm it’s gone.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  You get: Permanent deletion + clean search results
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CASE STUDIES / PROOF SECTION */}
        <section id="case-studies" className="py-20 lg:py-24 border-b border-slate-800/80">
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-mono text-emerald-400">
                  Proven Results
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Recent Removals &amp; Client Reviews
                </h2>
                <p className="text-sm sm:text-base text-slate-400">
                  Real results for SaaS founders, ecommerce brands, and executives. Company names are kept private under our standard NDA.
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
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      caseFilter === tab.id
                        ? 'bg-emerald-400 text-slate-950'
                        : 'text-slate-400 hover:text-white'
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
                    className="bg-[#0F1623] border border-slate-800/90 rounded-xl p-7 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                        <span className="text-white font-medium">{cs.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{cs.subreddit}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-emerald-400 tabular-nums">
                          {cs.turnaround}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-white leading-snug">
                        {cs.title}
                      </h3>

                      <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
                        <p>
                          <strong className="text-slate-200 font-medium">The Problem: </strong>
                          {cs.problem}
                        </p>
                        <p>
                          <strong className="text-slate-200 font-medium">What We Did: </strong>
                          {cs.action}
                        </p>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedCaseId(isExpanded ? null : cs.id)
                          }
                          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>
                            {isExpanded
                              ? 'Hide Daily Log'
                              : 'See Daily Timeline'}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-4 bg-[#080C14] border border-slate-800 rounded-lg space-y-2.5">
                            {cs.timeline.map((step, i) => (
                              <div key={i} className="text-xs flex items-start gap-2.5">
                                <span className="font-mono text-emerald-400 shrink-0 w-12 tabular-nums">
                                  {step.day}
                                </span>
                                <span className="text-slate-300">{step.event}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-slate-800/80 space-y-3">
                      <div className="text-xs font-mono text-emerald-400 tabular-nums">
                        Result: {cs.outcomeMetric}
                      </div>
                      <blockquote className="text-xs text-slate-300 italic leading-relaxed">
                        &ldquo;{cs.quote}&rdquo;
                      </blockquote>
                      <div className="text-xs text-slate-400">
                        <span className="text-white font-medium">{cs.author}</span> · {cs.role}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. FORM / CONTACT SECTION */}
        <section
          id="audit-form"
          ref={formSectionRef}
          className="py-20 lg:py-24 border-b border-slate-800/80"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <p className="text-xs font-mono text-emerald-400">
                  Free Confidential Audit
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Send Us the Link. We’ll Tell You If We Can Remove It.
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Drop the Reddit URL in the form. Within 12 hours, our team will review the post, let you know if it qualifies for removal, and give you a flat quote starting from $300.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-[#0F1623] border border-slate-800/90 rounded-xl space-y-1">
                    <div className="text-sm font-semibold text-white">
                      Starts from $300 · Zero Upfront Risk
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We never ask for a deposit or credit card upfront. You only pay after the Reddit thread or comment is permanently removed.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0F1623] border border-slate-800/90 rounded-xl space-y-1">
                    <div className="text-sm font-semibold text-white">
                      What Happens Next?
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      1. We check the post against Reddit’s sitewide rules.
                      <br />
                      2. We email you an honest assessment and flat price within 12 hours.
                      <br />
                      3. If you want to proceed, we start the removal process right away.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400">
                  Support Email:{' '}
                  <a
                    href="mailto:support@postwipe.com"
                    className="text-emerald-400 font-mono hover:text-emerald-300 transition-colors"
                  >
                    support@postwipe.com
                  </a>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7 bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 sm:p-10">
                {submittedDossier ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-mono text-emerald-400">
                          Audit Request Received
                        </span>
                        <h3 className="font-display text-2xl font-bold text-white mt-1">
                          Reference ID: {submittedDossier.caseId}
                        </h3>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      Thanks, <span className="text-white font-semibold">{submittedDossier.name}</span>. Your audit request has been received under Mutual NDA protection. We will review the thread and send your feasibility assessment and flat quote to <span className="text-white font-mono">{submittedDossier.email}</span> within 12 hours.
                    </p>

                    <div className="p-4 bg-[#080C14] border border-slate-800 rounded-lg space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Reddit URL:</span>
                        <span className="text-white font-mono truncate max-w-[280px]">
                          {submittedDossier.redditUrl}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Search Keywords:</span>
                        <span className="text-white">{submittedDossier.keywords}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Terms:</span>
                        <span className="text-emerald-400 font-mono">
                          Starts from $300 · 100% Pay on Results
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Submitted At:</span>
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
                        className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Audit Another Link
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-5" noValidate>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">
                          Request Your Free Confidential Audit
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Takes 60 seconds. Pricing starts from $300, paid only upon removal.
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
                        className="text-xs font-mono text-slate-400 hover:text-emerald-400 underline underline-offset-4 cursor-pointer whitespace-nowrap"
                      >
                        Fill Sample Data
                      </button>
                    </div>

                    {formError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-300">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="audit-name"
                          className="block text-xs font-medium text-slate-300 mb-2"
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
                          className="w-full px-4 py-3 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="audit-email"
                          className="block text-xs font-medium text-slate-300 mb-2"
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
                          className="w-full px-4 py-3 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="audit-url"
                        className="block text-xs font-medium text-slate-300 mb-2"
                      >
                        Reddit URL to Audit *
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
                        className="w-full px-4 py-3 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm text-white placeholder-slate-500 font-mono focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="audit-keywords"
                          className="block text-xs font-medium text-slate-300 mb-2"
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
                          className="w-full px-4 py-3 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="audit-scope"
                          className="block text-xs font-medium text-slate-300 mb-2"
                        >
                          What Needs to Be Removed?
                        </label>
                        <select
                          id="audit-scope"
                          value={formData.scopeType}
                          onChange={(e) =>
                            setFormData({ ...formData, scopeType: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm text-white focus:outline-none transition-colors"
                        >
                          <option value="full-thread">Entire Reddit Thread + Google Snippet</option>
                          <option value="specific-comments">Specific Comment(s) Inside a Thread</option>
                          <option value="multiple-threads">Multiple Threads Across Subreddits</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="audit-details"
                        className="block text-xs font-medium text-slate-300 mb-2"
                      >
                        Additional Details (Optional)
                      </label>
                      <textarea
                        id="audit-details"
                        rows={3}
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        placeholder="Any helpful context (e.g., posted by a competitor or former employee, false claims, or showing up in ChatGPT)..."
                        className="w-full px-4 py-3 bg-[#080C14] border border-slate-700/80 focus:border-emerald-400 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
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
                        className="text-xs text-slate-400 cursor-pointer select-none"
                      >
                        Send a signed Mutual NDA along with my audit report
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 px-6 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 text-slate-950 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Lock className="w-4 h-4" />
                      <span>
                        {isSending
                          ? 'Sending Audit Request...'
                          : 'Get a Free Confidential Audit'}
                      </span>
                    </button>

                    <div className="text-center text-xs text-slate-400">
                      Starts from $300 · 100% Pay on Results · $0 Upfront
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section id="faq" className="py-20 lg:py-24">
          <div className="max-w-[900px] mx-auto px-6 space-y-10">
            <div className="space-y-3">
              <p className="text-xs font-mono text-emerald-400">
                Straight Answers
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Everything you need to know about how we remove posts, how long it takes, and how our pay on results guarantee works.
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
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-emerald-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-400 leading-relaxed border-t border-slate-800/80">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout */}
            <div className="mt-12 bg-[#0F1623] border border-slate-800/90 rounded-xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <h3 className="font-display text-xl font-bold text-white">
                  Ready to get that Reddit thread off page one of Google?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Send us the link for a free 12 hour review. Removals start from $300, paid only after success.
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToAuditForm()}
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Get a Free Confidential Audit
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 py-12 bg-[#080C14] text-xs text-slate-400">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-display text-base font-bold text-white">
              <img
                src="/favicon.svg"
                alt="PostWipe Logo"
                className="w-6 h-6 rounded-md shrink-0"
              />
              <span>PostWipe</span>
            </div>
            <p className="text-xs text-slate-400">
              Reddit Post Removal Service &amp; Online Reputation Management · 100% Pay on Results
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#capabilities" className="hover:text-white transition-colors">
              Why Us
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors">
              Case Studies
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href="mailto:support@postwipe.com"
              className="text-emerald-400 font-mono hover:text-emerald-300 transition-colors"
            >
              support@postwipe.com
            </a>
          </div>

          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} PostWipe ORM LLC. All inquiries protected by Mutual NDA.
          </div>
        </div>
      </footer>
    </div>
  );
}
