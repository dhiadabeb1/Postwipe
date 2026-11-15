import React, { Suspense, lazy, useState, useEffect } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Search,
  FileCheck2,
  Clock,
  ChevronDown,
  Globe,
  Sparkles,
  Scale,
  EyeOff,
  Check,
  ExternalLink,
  Zap,
  MessageSquareOff,
  PhoneCall,
  Video,
  ChevronLeft,
  ChevronRight,
  XCircle,
  Mail,
  Menu,
} from 'lucide-react';
import { PostWipeLogoMark } from './components/PostWipeLogoMark';
import { INSIGHTS_ARTICLES_META } from './data/insightsMeta';
import { buildDirectEmailUrl } from './services/formSubmission';
import {
  buildWhatsAppUrl,
  WEB3FORMS_ACCESS_KEY,
  WHATSAPP_BASE_URL,
  type SubmittedCaseDetails,
} from './types/caseDetails';
import {
  buildHomepageSchema,
  buildAboutPageSchema,
  buildArticlePageSchema,
  buildServicePageSchema,
  syncJsonLdSchema,
  syncPageHeadMetadata,
} from './utils/seoSchema';

const InsightsAndCompliance = lazy(() => import('./components/InsightsAndCompliance'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const NewsRemovalPage = lazy(() => import('./components/NewsRemovalPage'));
const ScheduleCallModal = lazy(() => import('./components/ScheduleCallModal'));
const MobileMenuDrawer = lazy(() => import('./components/MobileMenuDrawer'));
const SolutionsDropdown = lazy(() =>
  import('./components/NavDropdownMenu').then((m) => ({ default: m.SolutionsDropdown }))
);
const ProtocolDropdown = lazy(() =>
  import('./components/NavDropdownMenu').then((m) => ({ default: m.ProtocolDropdown }))
);

function RouteLoadingFallback() {
  return (
    <div className="flex-1 min-h-[60vh] bg-[#090D16] flex items-center justify-center px-4">
      <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs font-mono text-slate-300">
        <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
        <span>Loading PostWipe workspace...</span>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: 'What if the subreddit moderators already ignored or rejected our takedown request?',
    a: 'Subreddit moderators are unpaid community volunteers who frequently reject business requests, or worse, publicly screenshot your message to mock your brand. PostWipe never contacts volunteer subreddit moderators. Our specialists escalate directly through corporate Trust & Safety, intellectual property, and sitewide Content Policy compliance channels.',
  },
  {
    q: 'How does the Escrow.com payment protection work?',
    a: 'After our free 12-hour audit confirms your link is actionable, we provide a fixed quote starting from $300. Your payment is deposited into a regulated Escrow.com transaction. Funds remain locked in escrow while we execute the removal and are released to PostWipe only after you verify the target Reddit post or comment is permanently deleted. If we do not remove it within the agreed timeframe, Escrow.com refunds 100% of your deposit.',
  },
  {
    q: 'Should we choose a Targeted Comment Wipe or a Full Thread Deletion?',
    a: 'If the main Reddit post is neutral (e.g., "Has anyone tried [Brand]?") and only one or two replies contain false allegations, a Targeted Comment Wipe removes those specific replies cleanly. However, if the thread title itself contains keywords like "scam," "avoid," or false accusations ranking on Google, we recommend a Full Thread Deletion so the entire URL can be de-indexed from Google, Bing, ChatGPT, and Perplexity.',
  },
  {
    q: 'How fast do Google, ChatGPT, and Perplexity stop showing the deleted Reddit thread?',
    a: 'Once a Reddit thread is permanently deleted at the source, Google and Bing normally take weeks to recrawl it naturally. PostWipe accelerates this immediately by submitting verified dead-link cache purge requests across search engines, clearing the snippet from Google search results and AI answer engines within 24 to 72 hours.',
  },
  {
    q: 'Will the original poster or competitors know our company hired PostWipe?',
    a: 'No. Every audit and policy escalation is conducted under strict NDA. Because removals are executed through formal platform policy enforcement rather than public replies or mass-reporting bots, there is zero public footprint linking the removal back to your brand.',
  },
  {
    q: 'What if the deleted Reddit post gets re-posted later?',
    a: 'Every completed removal includes a 90-day re-post protection warranty. Once a post is removed for a sitewide policy violation, any attempt by the same user to re-post identical defamatory content violates platform ban-evasion and repeat-harassment rules, allowing us to fast-track a secondary takedown at no extra charge.',
  },
];

export function App() {
  const [urlInput, setUrlInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [contextInput, setContextInput] = useState('');
  const [removalScope, setRemovalScope] = useState<'full-thread' | 'comment-only' | 'review-audit'>('full-thread');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedCase, setSubmittedCase] = useState<SubmittedCaseDetails | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [previewMode, setPreviewMode] = useState<'after' | 'before'>('after');
  const [activeProofIndex, setActiveProofIndex] = useState<number>(0);

  const clientProofSlides = [
    {
      id: 'PW-LGT-204',
      subreddit: 'r/Lighting (45K Weekly Visitors)',
      sector: 'D2C E-Commerce & Architectural Lighting',
      metrics: '53 Upvotes • 35 Replies',
      status: 'Removed by Reddit Filters',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_02.55.40_4bfa1df0.webp',
    },
    {
      id: 'PW-ENG-201',
      subreddit: 'r/IndianEngineers (31K+ Members)',
      sector: 'Engineering & Industrial Recruitment',
      metrics: '2,000+ Upvotes • 22 Replies • 463 Shares',
      status: 'Removed by Reddit Filters',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_03.24.49_b07a1d32.webp',
    },
    {
      id: 'PW-CAR-202',
      subreddit: 'r/IndiaCareers (92K Weekly Visitors)',
      sector: 'Enterprise Hiring & HR Tech',
      metrics: '935 Upvotes • 33 Replies • 88 Shares',
      status: 'Removed by Moderator & Locked',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_03.24.43_6ad6a35b.webp',
    },
    {
      id: 'PW-CSC-203',
      subreddit: 'r/cscareerquestions (544K Weekly Visitors)',
      sector: 'Software Training & EdTech Platform',
      metrics: '10 Upvotes • 56 Replies • 32 Shares',
      status: 'Removed by Moderators',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_03.24.56_496a2012.webp',
    },
    {
      id: 'PW-GMB-205',
      subreddit: 'r/gambling (182K Members)',
      sector: 'Regulated iGaming & Digital Entertainment',
      metrics: '14 Upvotes • 21 Replies • 310 Shares',
      status: 'Removed by Moderator & Archived',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_03.23.27_a3d91ed2.webp',
    },
    {
      id: 'PW-MED-206',
      subreddit: 'r/PiratingWebsites (346K Weekly Visitors)',
      sector: 'Sports Media & Digital Broadcasting',
      metrics: '7 Upvotes • 2 Replies • 17 Shares',
      status: 'Removed by Reddit Filters',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_03.24.30_ebca3f99.webp',
    },
    {
      id: 'PW-ARC-207',
      subreddit: 'r/PiracyArchive (278K Weekly Visitors)',
      sector: 'Digital Media & Content Protection',
      metrics: '17 Replies • 12 Shares',
      status: 'Removed by Reddit Filters',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_03.24.19_e5af89ad.webp',
    },
    {
      id: 'PW-WEB-208',
      subreddit: 'r/website (20K Members)',
      sector: 'Digital Platform & Brand Protection',
      metrics: '1 Upvote • 2 Replies',
      status: 'Removed by Reddit Filters',
      image: '/assets/aistudio/Screenshot_2026-10-26_at_03.24.08_848815a3.webp',
    },
  ];
  const currentProofSlide = clientProofSlides[activeProofIndex] || clientProofSlides[0];

  const [activePage, setActivePage] = useState<'reddit' | 'news' | 'insights' | 'reviews' | 'about'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('about') || hash.includes('about')) {
        return 'about';
      }
      if (path.includes('insights') || path.includes('blog') || hash.includes('insights') || hash.includes('blog')) {
        return 'insights';
      }
      if (path.includes('news') || hash.includes('news')) {
        return 'news';
      }
      if (path.includes('review') || hash.includes('review')) {
        return 'reviews';
      }
    }
    return 'reddit';
  });

  const [selectedInsightId, setSelectedInsightId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const matched = INSIGHTS_ARTICLES_META.find((art) => path.includes(art.slug));
      if (matched) return matched.id;
    }
    return INSIGHTS_ARTICLES_META[0].id;
  });

  const [hasInsightSlug, setHasInsightSlug] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      return INSIGHTS_ARTICLES_META.some((art) => path.includes(art.slug));
    }
    return false;
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('about') || hash.includes('about')) {
        setActivePage('about');
        setHasInsightSlug(false);
      } else if (path.includes('insights') || path.includes('blog') || hash.includes('insights') || hash.includes('blog')) {
        setActivePage('insights');
        const matched = INSIGHTS_ARTICLES_META.find((art) => path.includes(art.slug));
        if (matched) {
          setSelectedInsightId(matched.id);
          setHasInsightSlug(true);
        } else {
          setHasInsightSlug(false);
        }
      } else if (path.includes('news') || hash.includes('news')) {
        setActivePage('news');
        setHasInsightSlug(false);
      } else if (path.includes('review') || hash.includes('review')) {
        setActivePage('reviews');
        setHasInsightSlug(false);
      } else {
        setActivePage('reddit');
        setHasInsightSlug(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const switchPage = (
    page: 'reddit' | 'news' | 'insights' | 'reviews' | 'about',
    targetHash?: string,
    articleSlug?: string
  ) => {
    setActivePage(page);
    setHasInsightSlug(page === 'insights' && Boolean(articleSlug));
    if (typeof window !== 'undefined') {
      const newUrl =
        page === 'news'
          ? `/news-removal${targetHash ? targetHash : ''}`
          : page === 'insights'
          ? `/insights${articleSlug ? `/${articleSlug}` : ''}${targetHash ? targetHash : ''}`
          : page === 'reviews'
          ? `/reviews${targetHash ? targetHash : ''}`
          : page === 'about'
          ? `/about${targetHash ? targetHash : ''}`
          : `/${targetHash ? targetHash : ''}`;
      try {
        window.history.pushState({ page }, '', newUrl);
      } catch {
        // Ignore history pushState restrictions in sandboxed environments
      }
      if (targetHash) {
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (activePage === 'about') {
      syncPageHeadMetadata({
        title: 'About PostWipe | Enterprise Reputation & Content Removal Agency',
        description:
          'Learn how PostWipe permanently removes defamatory Reddit threads, damaging news articles, fake reviews, and Google search results on a 100% Pay-on-Success model via Escrow.com.',
        canonicalUrl: 'https://postwipe.com/about',
        ogType: 'website',
      });
      syncJsonLdSchema(buildAboutPageSchema());
    } else if (activePage === 'insights') {
      const activeArticle =
        INSIGHTS_ARTICLES_META.find((art) => art.id === selectedInsightId) ||
        INSIGHTS_ARTICLES_META[0];
      if (hasInsightSlug) {
        syncPageHeadMetadata({
          title: `${activeArticle.title} | PostWipe Insights`,
          description: activeArticle.executiveSummary,
          canonicalUrl: `https://postwipe.com/insights/${activeArticle.slug}`,
          ogType: 'article',
        });
      } else {
        syncPageHeadMetadata({
          title: 'Reddit Removal & Google De-Indexing Guides | PostWipe Insights',
          description:
            'Compliance guides on removing negative Reddit posts, why SEO suppression fails, and clearing Google & AI search caches within 24 to 72 hours.',
          canonicalUrl: 'https://postwipe.com/insights',
          ogType: 'website',
        });
      }
      syncJsonLdSchema(buildArticlePageSchema(activeArticle));
    } else if (activePage === 'news') {
      syncPageHeadMetadata({
        title: 'News & Media Article Removal Service | Pay on Success | PostWipe',
        description:
          'Permanently remove negative news articles and de-index press coverage from Google & AI search. 100% Escrow.com protected with $0 upfront risk.',
        canonicalUrl: 'https://postwipe.com/news-removal',
        ogType: 'website',
      });
      syncJsonLdSchema(buildServicePageSchema('news'));
    } else if (activePage === 'reviews') {
      syncPageHeadMetadata({
        title: 'Remove Fake Google, Trustpilot & Glassdoor Reviews | PostWipe',
        description:
          'Compliant takedown and suppression for fake or defamatory reviews on Google Maps, Trustpilot, Glassdoor, and Sitejabber. Backed by Escrow.com.',
        canonicalUrl: 'https://postwipe.com/reviews',
        ogType: 'website',
      });
      syncJsonLdSchema(buildServicePageSchema('reviews'));
    } else {
      syncPageHeadMetadata({
        title: 'Reddit Post Removal Service | Pay on Success via Escrow | PostWipe',
        description:
          'Need a service to remove a negative Reddit post or comment? PostWipe permanently deletes threads and de-indexes Google links. $0 upfront, Escrow.com protected.',
        canonicalUrl: 'https://postwipe.com/',
        ogType: 'website',
      });
      syncJsonLdSchema(buildHomepageSchema());
    }
  }, [activePage, selectedInsightId, hasInsightSlug]);

  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openNavDropdown, setOpenNavDropdown] = useState<'solutions' | 'protocol' | null>(null);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() || !nameInput.trim() || !emailInput.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const generatedCaseId = `PW-${Math.floor(100000 + Math.random() * 900000)}`;
    const cleanName = nameInput.trim();
    const cleanEmail = emailInput.trim();
    const cleanUrl = urlInput.trim();
    const cleanCompany = companyInput.trim();
    const cleanContext = contextInput.trim();
    const cleanScope =
      removalScope === 'full-thread'
        ? 'Full Thread Deletion + Search De-Index'
        : removalScope === 'comment-only'
        ? 'Targeted Comment / Mention Wipe'
        : 'Review Platform Removal & Suppression Audit';

    const isReviewScope = removalScope === 'review-audit';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New PostWipe ${isReviewScope ? 'Review' : 'Reddit'} Audit Request (${generatedCaseId}) - ${cleanName}`,
          from_name: 'PostWipe Audit Desk',
          case_reference: generatedCaseId,
          service_type: isReviewScope ? 'Review Management & Suppression' : 'Reddit Post & Comment Removal',
          name: cleanName,
          email: cleanEmail,
          company: cleanCompany || 'Not provided',
          target_url: cleanUrl,
          target_reddit_url: cleanUrl,
          audit_scope: cleanScope,
          context: cleanContext || 'Not provided',
          botcheck: '',
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        setSubmittedCase({
          caseId: generatedCaseId,
          name: cleanName,
          email: cleanEmail,
          url: cleanUrl,
          company: cleanCompany,
          context: cleanContext,
        });
      } else {
        setSubmitError(
          data.message ||
            'Submission was not accepted by Web3Forms. Please check your access key or use WhatsApp.'
        );
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Network error while sending audit request';
      setSubmitError(
        `${errorMsg}. Please verify your connection or reach out directly on WhatsApp.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeWhatsAppUrl = buildWhatsAppUrl(submittedCase);

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-[#F8FAFC] selection:bg-blue-600/30 selection:text-white">
      {/* Sticky Enterprise Header with Streamlined Navigation & Dropdowns (Dark) */}
      <header
        className="sticky top-0 z-50 bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-md"
        onMouseLeave={() => setOpenNavDropdown(null)}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
          {/* PostWipe Brand Lockup */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setOpenNavDropdown(null);
              switchPage('reddit');
            }}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <PostWipeLogoMark className="w-9 h-9 shadow-sm shadow-blue-600/20 group-hover:scale-[1.03] transition-transform duration-200" />
            <span className="font-display text-[22px] font-extrabold tracking-tight text-white leading-none">
              Post<span className="text-[#60A5FA]">Wipe</span>
            </span>
          </a>

          {/* Streamlined Primary Navigation with Clean Dropdown Menus */}
          <nav className="hidden lg:flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-300">
            {/* Solutions Dropdown (Reddit Removal & News Removal) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenNavDropdown('solutions')}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenNavDropdown(openNavDropdown === 'solutions' ? null : 'solutions')
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activePage === 'reddit' || activePage === 'news' || activePage === 'reviews'
                    ? 'text-white bg-slate-800/90 border border-slate-700/60'
                    : 'hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Solutions</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold">
                  {activePage === 'news' ? 'News & Media' : activePage === 'reviews' ? 'Reviews' : 'Reddit'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    openNavDropdown === 'solutions' ? 'rotate-180 text-blue-400' : ''
                  }`}
                />
              </button>

              {openNavDropdown === 'solutions' && (
                <Suspense fallback={null}>
                  <SolutionsDropdown
                    activePage={activePage}
                    onSelectPage={(page) => {
                      setOpenNavDropdown(null);
                      switchPage(page);
                    }}
                  />
                </Suspense>
              )}
            </div>

            {/* Secondary Section Links Grouped into Clean Protocol Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenNavDropdown('protocol')}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenNavDropdown(openNavDropdown === 'protocol' ? null : 'protocol')
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
              >
                <span>Platform &amp; Protocol</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    openNavDropdown === 'protocol' ? 'rotate-180 text-blue-400' : ''
                  }`}
                />
              </button>

              {openNavDropdown === 'protocol' && (
                <Suspense fallback={null}>
                  <ProtocolDropdown
                    activePage={activePage}
                    onClose={() => setOpenNavDropdown(null)}
                    onSwitchPage={(page, targetHash) => {
                      setOpenNavDropdown(null);
                      switchPage(page, targetHash);
                    }}
                  />
                </Suspense>
              )}
            </div>

            {/* Direct Top-Level Links */}
            <button
              type="button"
              onClick={() => {
                setOpenNavDropdown(null);
                switchPage('reddit', '#case-results');
              }}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
            >
              Case Studies
            </button>

            <button
              type="button"
              onClick={() => {
                setOpenNavDropdown(null);
                switchPage('insights');
              }}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activePage === 'insights'
                  ? 'text-blue-400 bg-blue-950/60 font-bold border border-blue-500/30'
                  : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Insights &amp; Blog
            </button>

            <button
              type="button"
              onClick={() => {
                setOpenNavDropdown(null);
                switchPage('about');
              }}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activePage === 'about'
                  ? 'text-blue-400 bg-blue-950/60 font-bold border border-blue-500/30'
                  : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Header Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                switchPage(
                  activePage === 'news'
                    ? 'news'
                    : activePage === 'reviews'
                    ? 'reviews'
                    : 'reddit',
                  activePage === 'news'
                    ? '#news-audit-form'
                    : activePage === 'reviews'
                    ? '#review-audit-form'
                    : '#audit-form'
                )
              }
              className="pw-btn-primary inline-flex items-center gap-2 text-white font-bold text-[13px] sm:text-[13.5px] px-4 sm:px-5 py-2.5 rounded-xl border border-blue-500/40 cursor-pointer"
            >
              <span>
                {activePage === 'news'
                  ? 'Request Link Audit'
                  : activePage === 'reviews'
                  ? 'Request Review Audit'
                  : 'Free 12h Link Audit'}
              </span>
              <ArrowRight className="w-4 h-4 text-blue-100 hidden sm:inline" />
            </button>
          </div>
        </div>
      </header>

      {activePage === 'reddit' ? (
      <main className="flex-1">
        {/* =========================================================
            SECTION 1: HERO - CLEAR VALUE PROPOSITION + ESCROW + LIVE VERIFICATION DASHBOARD (DARK)
           ========================================================= */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-[#090D16] pw-grid-bg border-b border-slate-800">
          {/* Soft ambient cobalt-indigo glow */}
          <div
            className="pointer-events-none absolute -top-28 right-1/4 w-[560px] h-[560px] rounded-full bg-blue-600/12 blur-3xl"
            aria-hidden="true"
          />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
              {/* Left Column: Core Pitch, Pricing + Escrow, 3 Trust Pillars */}
              <div className="lg:col-span-7">
                {/* Category Pill & Trustpilot Rating Pill */}
                <div className="flex flex-wrap items-center gap-2.5 mb-6">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide uppercase shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <span>Corporate Policy Escalation • No Moderator Begging</span>
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

                {/* Main Headline */}
                <h1 className="font-display text-[38px] sm:text-[50px] lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                  Permanently Erase Defamatory <span className="pw-hl">Reddit Threads</span> &amp; Google Search Snippets.
                </h1>

                {/* Two concise supporting lines explaining who it's for, what is removed/de-indexed, and Escrow terms */}
                <div className="space-y-3.5 text-[16px] sm:text-[17.5px] text-slate-300 leading-relaxed max-w-2xl mb-8">
                  <p>
                    Built for <strong className="text-white font-semibold">founders, SaaS operators, and executives</strong>: we remove damaging Reddit posts and comments at the source and de-index dead links from <strong className="text-white font-semibold">Google, Bing, ChatGPT, and Perplexity</strong>.
                  </p>
                  <p>
                    Every engagement is protected by <strong className="text-white font-semibold">Escrow.com</strong>, where your deposit stays locked and is <span className="underline decoration-[#2563EB] decoration-2 underline-offset-4 font-semibold text-white">released only after delete verification</span>.
                  </p>
                </div>

                {/* Primary CTA + Schedule a Call + Pricing & Escrow Terms */}
                <div className="space-y-4 mb-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                    <a
                      href="#audit-form"
                      className="pw-btn-primary inline-flex items-center justify-center gap-3 text-white font-extrabold text-[15.5px] px-7 py-4 rounded-xl border border-blue-500/40 cursor-pointer shrink-0"
                    >
                      <span>Submit Reddit Link for Audit</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsCallModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-[15px] px-6 py-4 rounded-xl border border-slate-700 hover:border-slate-600 shadow-sm transition-all cursor-pointer shrink-0"
                    >
                      <Video className="w-5 h-5 text-[#60A5FA]" />
                      <span>Schedule a Call (Google Meet)</span>
                    </button>
                  </div>

                  {/* Pricing + Escrow Badge directly beneath/beside CTA */}
                  <div className="inline-flex items-center gap-3.5 bg-[#0F172A] px-4 py-3 rounded-xl border border-slate-800 shadow-md">
                    <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-[#60A5FA]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-[15px] text-white">
                          Starts from $300
                        </span>
                        <span className="text-[11px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300">
                          Escrow.com
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        Released only after delete verification • $0 if unsuccessful
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 First-Screen Trust Elements */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                  <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-sm flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-[#60A5FA] border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white">Escrow.com Protected</div>
                      <p className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                        Funds held safely until target URL is permanently deleted.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-sm flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-[#60A5FA] border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white">Source + SERP Wipe</div>
                      <p className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                        Deletes Reddit source &amp; purges Google / AI search cache.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-sm flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-[#60A5FA] border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white">Direct Policy Escalation</div>
                      <p className="text-[11.5px] text-slate-400 leading-snug mt-0.5">
                        100% NDA compliance via internal Trust &amp; Safety filings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Sleek Live Verification Dashboard with Crisp Status Badges */}
              <div className="lg:col-span-5">
                <div className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                  {/* Dashboard Top Header Bar */}
                  <div className="px-5 py-3.5 bg-[#0B0F19] text-white border-b border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                      <span className="font-mono text-[11px] text-slate-200 font-semibold tracking-wide">
                        LIVE VERIFICATION DASHBOARD
                      </span>
                    </div>

                    {/* Interactive Before / After State Toggle */}
                    <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-700/80 text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setPreviewMode('before')}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          previewMode === 'before'
                            ? 'bg-rose-500/25 text-rose-300 font-bold border border-rose-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode('after')}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          previewMode === 'after'
                            ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        After Removal
                      </button>
                    </div>
                  </div>

                  {/* Crisp Verification Status Badges Bar */}
                  <div className="px-5 py-3 bg-[#0B0F19]/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10.5px] font-bold border transition-all ${
                          previewMode === 'after'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
                            : 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>{previewMode === 'after' ? 'De-Indexed' : 'Indexed Page 1'}</span>
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10.5px] font-bold border transition-all ${
                          previewMode === 'after'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
                            : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>{previewMode === 'after' ? 'Cache Purged' : 'AI Cited'}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#090D16] text-white font-mono text-[10.5px] font-bold border border-slate-700">
                        <Lock className="w-3 h-3 text-blue-400 shrink-0" />
                        <span>Escrow Protected</span>
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* 1. Target Reddit Thread Card */}
                    <div
                      className={`rounded-xl p-4 border transition-all ${
                        previewMode === 'after'
                          ? 'bg-blue-950/30 border-blue-500/30'
                          : 'bg-rose-950/30 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-mono text-[11px] text-slate-400 truncate">
                          reddit.com/r/SaaS/comments/1x9k2a/avoid_acme_software...
                        </span>
                        {previewMode === 'after' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2563EB] text-white font-mono text-[10px] font-bold shrink-0">
                            PERMANENTLY DELETED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/40 font-mono text-[10px] font-bold shrink-0">
                            RANKING #2 ON GOOGLE
                          </span>
                        )}
                      </div>

                      {previewMode === 'after' ? (
                        <div className="space-y-2.5">
                          <div className="relative inline-block">
                            <p className="text-sm font-semibold text-slate-500 line-through">
                              Avoid AcmeCloud: deceptive billing &amp; terrible support [248 upvotes]
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-blue-200 font-mono bg-blue-950/60 border border-blue-500/30 rounded-lg px-3 py-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#60A5FA]" />
                            <span>[removed by Reddit in response to policy violation]</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-white">
                            Avoid AcmeCloud: deceptive billing &amp; terrible support [248 upvotes]
                          </p>
                          <p className="text-xs text-rose-300">
                            89 comments • Appearing in Google page-1 search &amp; AI summaries for &ldquo;AcmeCloud reviews&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 2. Search Engine & AI Citation Telemetry */}
                    <div className="rounded-xl bg-[#0B0F19] border border-slate-800 p-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                        <span>Search &amp; AI Index Verification</span>
                        <span className="text-[#60A5FA] font-bold">
                          {previewMode === 'after' ? '3 / 3 VERIFIED CLEAN' : 'EXPOSED'}
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                          <span className="text-slate-300 font-medium flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-[#60A5FA]" />
                            Google Search &amp; SERP Snippet
                          </span>
                          {previewMode === 'after' ? (
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#60A5FA] font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              De-Indexed
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-rose-400 font-bold">
                              Indexed on Page 1
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                          <span className="text-slate-300 font-medium flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
                            Google Cache &amp; AI Overview
                          </span>
                          {previewMode === 'after' ? (
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#60A5FA] font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Cache Purged
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-rose-400 font-bold">
                              Actively Cited
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-slate-300 font-medium flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-[#60A5FA]" />
                            Escrow.com Settlement Status
                          </span>
                          {previewMode === 'after' ? (
                            <span className="font-mono text-[11px] bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40 font-bold">
                              ESCROW PROTECTED • RELEASED
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-bold">
                              ESCROW PROTECTED • LOCKED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Console Bottom Status Strip */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                        90-Day Re-Post Warranty Included
                      </span>
                      <a href="#audit-form" className="text-[#60A5FA] hover:underline font-bold">
                        Audit Your URL →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: WHY NEGATIVE REDDIT THREADS HURT FOUNDERS & SAAS (DARK)
           ========================================================= */}
        <section id="why-postwipe" className="py-24 bg-[#0B0F19] border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
                01. THE REPUTATION BOTTLENECK
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Why One Hostile Reddit Thread Quietly Destroys High-Intent Deals
              </h2>
              <p className="text-slate-300 text-[16.5px] leading-relaxed">
                Google’s search algorithm now prioritizes Reddit discussions above review sites, while AI engines scrape those exact threads to answer buyer due-diligence queries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="pw-card bg-[#0F172A] rounded-2xl p-8 border border-slate-800 shadow-md">
                <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/25 text-rose-400 flex items-center justify-center mb-5">
                  <Search className="w-5 h-5" />
                </div>
                <div className="font-mono text-xs font-bold text-rose-400 uppercase mb-1.5">
                  Google SERP Priority
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Pinned to Page 1 for “[Brand] Reviews”
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Because Google treats Reddit as high-authority user-generated content, a single thread from an angry ex-employee, competitor, or troll often outranks your own website and G2/Trustpilot profiles.
                </p>
              </div>

              <div className="pw-card bg-[#0F172A] rounded-2xl p-8 border border-slate-800 shadow-md">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/25 text-[#60A5FA] flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="font-mono text-xs font-bold text-[#60A5FA] uppercase mb-1.5">
                  AI Search Contamination
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Repeated as “Fact” by ChatGPT &amp; Perplexity
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  When prospects ask ChatGPT, Gemini, or Perplexity whether your company is trustworthy, LLMs synthesize unverified Reddit accusations directly into their buying recommendations.
                </p>
              </div>

              <div className="pw-card bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#2563EB] text-white rounded-2xl p-8 border border-blue-500/30 shadow-xl">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="font-mono text-xs font-bold text-blue-200 uppercase mb-1.5">
                  The PostWipe Solution
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Corporate Escalation with Zero Streisand Effect
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Messaging volunteer subreddit mods often gets your DM screenshotted and pinned to the top of the thread. We bypass moderators entirely and file directly through corporate policy &amp; legal channels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: TWO REMOVAL SCOPES (COMMENT WIPE VS FULL THREAD - DARK)
           ========================================================= */}
        <section id="removal-options" className="py-24 bg-[#090D16] border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
                  02. SURGICAL SCOPE SELECTION
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  Choose the Right Removal Scope for Your Situation
                </h2>
              </div>
              <p className="text-slate-300 text-sm max-w-md">
                Not every thread needs the same intervention. During your free 12-hour audit, we map out whether surgical comment deletion or full thread removal will best protect your search footprint.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Scope A: Targeted Comment / Mention Wipe */}
              <div className="pw-card bg-[#0F172A] rounded-2xl border border-slate-800 p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0B0F19] text-slate-200 border border-slate-700 font-mono text-xs font-bold">
                      <MessageSquareOff className="w-4 h-4 text-[#60A5FA]" />
                      OPTION A • TARGETED COMMENT WIPE
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      Starts from $300
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-white mb-3">
                    Surgical Comment &amp; Brand Mention Removal
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Ideal when the main Reddit post is a general industry discussion (e.g., <em>&ldquo;What CRM do you use?&rdquo;</em>) and a specific reply attacks your company, leaks confidential info, or spreads false claims.
                  </p>

                  {/* Visual Mockup of Comment Wipe */}
                  <div className="bg-[#0B0F19] rounded-xl p-4 border border-slate-800 mb-6 space-y-2.5 font-mono text-xs">
                    <div className="text-slate-400 flex items-center justify-between">
                      <span>Root Thread: &ldquo;Best tools for Q4?&rdquo;</span>
                      <span className="text-slate-500">Remains Intact</span>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-500/30 text-blue-200 flex items-center justify-between">
                      <span className="line-through text-slate-500">
                        u/competitor_bot: &ldquo;Stay away from [Your Brand]...&rdquo;
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#2563EB] text-white text-[10px] font-bold">
                        WIPED
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-1" />
                      <span>Eliminates specific defamatory comments or nested reply chains</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-1" />
                      <span>Zero disruption to neutral community threads</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-1" />
                      <span>Protected by Escrow.com and released only after comment deletion</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#audit-form"
                  onClick={() => setRemovalScope('comment-only')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#0B0F19] hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm transition-all"
                >
                  <span>Audit a Specific Reddit Comment</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </a>
              </div>

              {/* Scope B: Full Thread Wipe + Google & AI De-Index */}
              <div className="pw-card bg-[#0F172A] rounded-2xl border border-blue-500/40 ring-1 ring-blue-500/30 p-8 relative flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-950/70 text-blue-300 border border-blue-500/40 font-mono text-xs font-bold">
                      <Zap className="w-4 h-4 text-[#60A5FA]" />
                      OPTION B • FULL THREAD + SERP WIPE
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white font-mono text-[11px] font-extrabold uppercase">
                      Most Requested
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-white mb-3">
                    Complete Thread Deletion + Google &amp; AI De-Indexing
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Required when the Reddit thread title itself contains your brand or executive name alongside damaging keywords and ranks on Page 1 of Google or appears in ChatGPT/Perplexity answers.
                  </p>

                  {/* Visual Mockup of Full Thread Wipe */}
                  <div className="bg-blue-950/40 rounded-xl p-4 border border-blue-500/30 mb-6 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-blue-200">
                      <span className="font-semibold">Root Thread URL Status:</span>
                      <span className="px-2 py-0.5 rounded bg-[#2563EB] text-white font-bold">
                        PERMANENTLY DELETED
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0B0F19] border border-blue-500/30 text-slate-300 flex items-center justify-between">
                      <span>Google SERP &amp; AI Search Cache:</span>
                      <span className="text-[#60A5FA] font-bold">DE-INDEXED IN 24 TO 72H</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-1" />
                      <span>Permanently deletes the entire root Reddit thread &amp; all comments</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-1" />
                      <span>Expedited Google &amp; Bing dead-link cache purge included</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-1" />
                      <span>Escrow.com funds released only after delete verification + 90-day warranty</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#audit-form"
                  onClick={() => setRemovalScope('full-thread')}
                  className="pw-btn-primary w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-white font-extrabold text-sm"
                >
                  <span>Audit a Full Reddit Thread for Removal</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: 4-STEP ESCROW.COM WORKFLOW (DARK)
           ========================================================= */}
        <section id="escrow-workflow" className="py-24 bg-[#0B0F19] border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
                03. ZERO-RISK EXECUTION PROTOCOL
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
                How PostWipe’s Escrow-Protected Removal Process Works
              </h2>
              <p className="text-slate-300 text-[16px]">
                No retainers, no vague “suppression” promises, and zero upfront risk. You only release payment once the target URL is provably gone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: 'STEP 01',
                  time: 'Within 12 Hours',
                  title: 'Confidential Policy Audit',
                  desc: 'Submit your offending Reddit URL below. Our former platform policy specialists analyze the thread against sitewide harassment, defamation, trademark, and PII rules.',
                },
                {
                  step: 'STEP 02',
                  time: 'Starts from $300',
                  title: 'Escrow.com Lock-In',
                  desc: 'Once confirmed actionable, you receive a fixed price quote. Funds are deposited into Escrow.com where they remain locked until deletion is verified.',
                },
                {
                  step: 'STEP 03',
                  time: 'Days 2 to 10',
                  title: 'Corporate Policy Escalation',
                  desc: 'We file formal compliance documentation directly with corporate Trust & Safety and legal teams without ever contacting subreddit moderators.',
                },
                {
                  step: 'STEP 04',
                  time: '24 to 72h Post-Wipe',
                  title: 'Delete Verification & De-Index',
                  desc: 'Once the Reddit URL is permanently deleted, we trigger Google & Bing cache purge requests so AI engines drop the citation, and you authorize Escrow release.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="pw-card bg-[#0F172A] rounded-2xl p-7 border border-slate-800 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded bg-[#2563EB] text-white">
                        {item.step}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 font-semibold">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-[#60A5FA] font-semibold">
                    <span>NDA Protected</span>
                    <span>✓ Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: COMPARISON - POSTWIPE VS DIY MOD APPEALS VS PR AGENCIES (DARK)
           ========================================================= */}
        <section className="py-24 bg-[#090D16] border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
                04. WHY TRADITIONAL METHODS BACKFIRE
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
                PostWipe Corporate Escalation vs. Alternatives
              </h2>
              <p className="text-slate-300 text-[16px]">
                Replying in the thread or buying upvotes only boosts engagement velocity, locking the negative post even higher on Google.
              </p>
            </div>

            <div className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#0B0F19] text-xs font-mono uppercase text-slate-400">
                      <th className="py-4 px-6 w-1/5">Evaluation Criteria</th>
                      <th className="py-4 px-6 bg-blue-950/80 text-white font-extrabold border-x border-blue-500/40 w-1/3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <PostWipeLogoMark className="w-5 h-5" />
                            <span>PostWipe Corporate Escalation</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-[#2563EB] text-white text-[10px] font-mono">
                            RECOMMENDED
                          </span>
                        </div>
                      </th>
                      <th className="py-4 px-6 text-slate-400">Messaging Subreddit Mods</th>
                      <th className="py-4 px-6 text-slate-400">Traditional ORM / PR Agencies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-5 px-6 font-bold text-white">Outcome on Target URL</td>
                      <td className="py-5 px-6 bg-blue-950/40 border-x border-blue-500/30 font-bold text-white">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                          <span>Permanent Source Deletion + Google De-Index</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-300">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          <span>Ignored or publicly mocked by mods</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-300">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                          <span>Leaves thread live; publishes fluff blog posts</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-5 px-6 font-bold text-white">Payment Structure</td>
                      <td className="py-5 px-6 bg-blue-950/40 border-x border-blue-500/30 font-bold text-white">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                          <span>Starts from $300 • Held in Escrow.com until verified deletion</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-300">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          <span>Free, but severe brand backfire risk</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-300">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                          <span>$3,000 to $10,000/mo upfront retainers</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-5 px-6 font-bold text-white">Streisand / Backlash Risk</td>
                      <td className="py-5 px-6 bg-blue-950/40 border-x border-blue-500/30 font-bold text-white">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                          <span>Zero, executed via confidential corporate filings</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-rose-400 font-medium">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          <span>Extreme, mods often pin your DM to the thread</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-amber-300 font-medium">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <span>High if using fake accounts or downvote bots</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-5 px-6 font-bold text-white">ChatGPT &amp; Perplexity Cleanup</td>
                      <td className="py-5 px-6 bg-blue-950/40 border-x border-blue-500/30 font-bold text-white">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                          <span>Included via expedited search cache purge</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-300">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          <span>None</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-300">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                          <span>Does not remove source citation</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: VERIFIED CASE STUDIES (FOUNDERS & SAAS)
           ========================================================= */}
        <section id="case-results" className="py-24 bg-[#0B0F19] border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
                  05. VERIFIED REMOVAL LEDGER &amp; CASE DOSSIER
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  Verified Reddit Crisis Removals
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-950/70 border border-blue-500/40 text-xs font-mono text-blue-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#60A5FA]" />
                <span>100% Pay-on-Success via Escrow.com</span>
              </div>
            </div>

            {/* MULTI-CLIENT VERIFIED REMOVAL PORTFOLIO & CASE DOSSIER (DARK) */}
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden">
              {/* Dossier Top Header Bar */}
              <div className="px-6 py-4 bg-[#0B0F19] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-md bg-[#2563EB] text-white">
                    VERIFIED CLIENT PORTFOLIO // LIVE REMOVAL PROOFS
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-semibold">
                    Communities up to 544K+ Weekly Visitors • Brand Identities Redacted Under NDA
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-500/40 font-mono text-xs font-bold text-blue-300">
                    <Lock className="w-3.5 h-3.5 text-[#60A5FA]" />
                    Escrow.com Settled Post-Verification
                  </span>
                </div>
              </div>

              {/* Dossier Main Content Grid */}
              <div className="p-6 sm:p-8 lg:p-10 space-y-10">
                {/* Multi-Client Overview & Coverflow Proof Slider Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#60A5FA] font-bold">
                      Previous Clients Across E-Commerce, Tech &amp; Engineering, EdTech, Digital Media &amp; iGaming
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      Eliminating Page-1 Google Defamation &amp; Viral Crisis Threads Across High-Authority Subreddits
                    </h3>
                    <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                      Our previous clients faced severe commercial and reputational damage from high-ranking Reddit threads dominating Page 1 of Google for branded searches, ranging from <strong className="text-white">2,000+ upvote viral scam alerts</strong> in engineering communities and <strong className="text-white">935+ upvote recruitment disputes</strong> to D2C e-commerce legitimacy attacks, career platform accusations, and unauthorized media threads. PostWipe executed forensic policy audits, official administrative escalations, and rapid search cache purges across every engagement under a 100% Pay-on-Success escrow structure.
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800">
                        <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">Thread Scale</div>
                        <div className="font-display font-extrabold text-sm sm:text-base text-white mt-0.5">
                          Up to 2K+ Upvotes
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800">
                        <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">Outcome</div>
                        <div className="font-display font-extrabold text-sm sm:text-base text-[#60A5FA] mt-0.5">
                          Removed at Source
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800">
                        <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">Financial Risk</div>
                        <div className="font-display font-extrabold text-sm sm:text-base text-white mt-0.5">
                          $0 Upfront (Escrow)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Layered Coverflow Slide Showcase (Optimized WebP + Preloaded Primary Visual + Lazy Adjacent Loading) */}
                  <div className="lg:col-span-7">
                    <div className="relative rounded-2xl overflow-hidden bg-[#090D16] px-4 sm:px-6 py-4 sm:py-5 shadow-2xl border border-slate-800 select-none">
                      {/* Ambient Backdrop Reusing Cached Active WebP */}
                      <img
                        src={currentProofSlide.image}
                        alt=""
                        aria-hidden="true"
                        width={1470}
                        height={804}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-2xl scale-110 transition-all duration-1000 ease-in-out pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/60 via-[#090D16]/40 to-[#090D16]/85 pointer-events-none" />

                      {/* Layered 3-Card Stage (Prev Peeking Left, Active Centered, Next Peeking Right) */}
                      <div className="relative w-full aspect-[2940/1608] flex items-center justify-center">
                        {clientProofSlides.map((slide, idx) => {
                          const total = clientProofSlides.length;
                          const prevIdx = (activeProofIndex - 1 + total) % total;
                          const nextIdx = (activeProofIndex + 1) % total;
                          const isVisibleSlide =
                            idx === activeProofIndex || idx === prevIdx || idx === nextIdx;

                          let positionClasses =
                            'opacity-0 scale-75 translate-x-0 z-0 pointer-events-none';
                          if (idx === activeProofIndex) {
                            positionClasses =
                              'opacity-100 scale-100 translate-x-0 z-20 shadow-[0_22px_55px_rgba(0,0,0,0.85)] ring-1 ring-white/15';
                          } else if (idx === prevIdx) {
                            positionClasses =
                              'opacity-55 scale-[0.88] -translate-x-[10%] z-10 brightness-75 shadow-xl cursor-pointer';
                          } else if (idx === nextIdx) {
                            positionClasses =
                              'opacity-55 scale-[0.88] translate-x-[10%] z-10 brightness-75 shadow-xl cursor-pointer';
                          }

                          return (
                            <div
                              key={slide.id}
                              onClick={() => {
                                if (idx === prevIdx || idx === nextIdx) {
                                  setActiveProofIndex(idx);
                                }
                              }}
                              className={`absolute inset-0 rounded-lg overflow-hidden bg-[#0B0F19] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${positionClasses}`}
                            >
                              {isVisibleSlide && (
                                <img
                                  src={slide.image}
                                  alt={`Verified Reddit removal proof for ${slide.subreddit}`}
                                  width={1470}
                                  height={804}
                                  loading={idx === activeProofIndex ? 'eager' : 'lazy'}
                                  fetchPriority={idx === activeProofIndex ? 'high' : 'low'}
                                  decoding="async"
                                  className="w-full h-full object-cover"
                                  draggable={false}
                                />
                              )}
                            </div>
                          );
                        })}

                        {/* Compact Gold-Bordered Left Button (As in User Picture) */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveProofIndex((prev) =>
                              prev === 0 ? clientProofSlides.length - 1 : prev - 1
                            )
                          }
                          aria-label="Previous slide"
                          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-7 h-8 sm:w-8 sm:h-9 border border-[#F59E0B] bg-black/60 hover:bg-[#F59E0B]/20 backdrop-blur-xs text-amber-300 flex items-center justify-center transition-all duration-300 cursor-pointer z-30 shadow-md"
                        >
                          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                        </button>

                        {/* Compact Gold-Bordered Right Button (As in User Picture) */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveProofIndex((prev) =>
                              prev === clientProofSlides.length - 1 ? 0 : prev + 1
                            )
                          }
                          aria-label="Next slide"
                          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-7 h-8 sm:w-8 sm:h-9 border border-[#F59E0B] bg-black/60 hover:bg-[#F59E0B]/20 backdrop-blur-xs text-amber-300 flex items-center justify-center transition-all duration-300 cursor-pointer z-30 shadow-md"
                        >
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4-Stage Institutional Multi-Client Execution Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  {/* 01. Executive Summary & Challenge */}
                  <div className="pw-card p-6 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-2.5">
                    <div className="font-mono text-xs font-bold uppercase text-[#60A5FA]">
                      01. Multi-Client Challenge &amp; Search Impact
                    </div>
                    <h4 className="font-display text-lg font-extrabold text-white">
                      High-Intent Search Contamination Across Buyer &amp; Candidate Funnels
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Across our previous client engagements, hostile Reddit threads ranging from 50+ upvote e-commerce legitimacy debates to 2,000+ upvote viral scam accusations ranked on Page 1 of Google for exact brand names. Prospects, enterprise partners, and job applicants researching these companies encountered unverified allegations prior to checkout or contract signing.
                    </p>
                  </div>

                  {/* 02. Forensic Audit & Platform Policy Analysis */}
                  <div className="pw-card p-6 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-2.5">
                    <div className="font-mono text-xs font-bold uppercase text-[#60A5FA]">
                      02. Forensic Audit &amp; Platform Policy Analysis
                    </div>
                    <h4 className="font-display text-lg font-extrabold text-white">
                      Identifying Actionable Sitewide Policy Violations
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      PostWipe’s compliance analysts performed forensic audits of each root submission and its comment tree. Rather than arguing commercial opinions, our team isolated concrete violations of Reddit’s sitewide Content Policy, including targeted commercial harassment, coordinated brigading, vote manipulation, and unauthorized intellectual property or data sharing.
                    </p>
                  </div>

                  {/* 03. Strategic Escalation & Execution */}
                  <div className="pw-card p-6 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-2.5">
                    <div className="font-mono text-xs font-bold uppercase text-[#60A5FA]">
                      03. Strategic Escalation &amp; Execution
                    </div>
                    <h4 className="font-display text-lg font-extrabold text-white">
                      Administrative Takedowns Without Triggering the Streisand Effect
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Publicly replying or messaging hostile volunteer moderators frequently backfires and triggers secondary threads. PostWipe executed structured compliance filings through official administrative and policy channels, achieving permanent filter and moderator removals across every client engagement with zero public blowback.
                    </p>
                  </div>

                  {/* 04. Outcome & Business Impact */}
                  <div className="pw-card p-6 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-2.5">
                    <div className="font-mono text-xs font-bold uppercase text-[#60A5FA]">
                      04. Outcome &amp; Business Impact
                    </div>
                    <h4 className="font-display text-lg font-extrabold text-white">
                      Permanent Thread Removal, Google De-Indexing &amp; Escrow Settlement
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Every offending thread was permanently removed from public view at the source and immediately submitted for expedited Google search cache clearing. Only after each client independently verified source deletion and search de-indexing were funds released from neutral Escrow.com protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: FREE 12-HOUR CASE AUDIT FORM + INSTANT WHATSAPP FOLLOW-UP (DARK)
           ========================================================= */}
        <section id="audit-form" className="py-24 bg-[#090D16] text-white border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Audit Guarantee & What Happens Next */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-300 font-mono text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span>FREE 12-HOUR FEASIBILITY AUDIT</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Submit Your Target Reddit Link for a Confidential Audit
                </h2>

                <p className="text-slate-300 text-[15.5px] leading-relaxed">
                  Paste the offending Reddit thread or comment URL. Within 12 hours, our policy specialists will confirm whether it qualifies for permanent removal and send your fixed Escrow.com quote.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A] border border-slate-800 shadow-md">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/70 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Starts from $300 • Held in Escrow.com
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        You never pay upfront retainers. Funds are held in Escrow.com and released only after delete verification confirms the link is permanently removed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A] border border-slate-800 shadow-md">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/70 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                      <EyeOff className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Strict Non-Disclosure Protection
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Your identity, brand name, and submitted URLs are protected under mutual NDA from the moment you submit this form.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCallModalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#0F172A] hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm transition-all cursor-pointer shadow-md"
                    >
                      <Video className="w-4 h-4 text-[#60A5FA]" />
                      <span>Schedule a Google Meet / Strategy Call</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Converting Audit Form Card with Official Trust Badges */}
              <div className="lg:col-span-7">
                <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-9 shadow-2xl border border-slate-800">
                  {submittedCase ? (
                    <div className="py-4 space-y-6">
                      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-blue-950/70 border border-blue-500/40 text-[#60A5FA] flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="font-mono text-xs uppercase font-bold text-[#60A5FA]">
                              Audit Request Logged
                            </span>
                            <h3 className="font-display text-2xl font-extrabold text-white">
                              Case Reference: {submittedCase.caseId}
                            </h3>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 font-mono text-xs font-semibold text-blue-200">
                          Status: Assigned to Policy Analyst
                        </span>
                      </div>

                      {/* Mandatory Exact Confirmation Message */}
                      <div className="p-5 rounded-xl bg-[#0B0F19] border border-slate-800 text-slate-200 text-[15px] leading-relaxed font-medium">
                        Thank you for your submission. If you do not see our email reply within a few hours or if it lands in your spam folder, click below to chat with us instantly on WhatsApp.
                      </div>

                      {/* Case Summary Box */}
                      <div className="rounded-xl bg-[#0B0F19] border border-blue-500/30 text-slate-300 p-4 font-mono text-xs space-y-1.5">
                        <div>
                          <span className="text-slate-400">Client Name:</span>{' '}
                          <span className="text-white font-semibold">{submittedCase.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Case ID:</span>{' '}
                          <span className="text-[#60A5FA] font-bold">{submittedCase.caseId}</span>
                        </div>
                        <div className="truncate">
                          <span className="text-slate-400">Target URL:</span>{' '}
                          <span className="text-slate-300">{submittedCase.url}</span>
                        </div>
                      </div>

                      {/* Direct WhatsApp Button with Pre-Filled Client Name & Case Reference */}
                      <div className="space-y-3">
                        <a
                          href={activeWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pw-btn-primary w-full inline-flex items-center justify-center gap-3 text-white font-extrabold text-base py-4 px-6 rounded-xl cursor-pointer"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.124.556 4.119 1.528 5.847l-1.528 5.583 5.714-1.499c1.688.918 3.621 1.442 5.686 1.442 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span>WhatsApp</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <a
                          href={buildDirectEmailUrl(submittedCase)}
                          className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0B0F19] hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-5 rounded-xl border border-slate-700 transition-all cursor-pointer"
                        >
                          <Mail className="w-4 h-4 text-[#60A5FA]" />
                          <span>Dispatch Direct Email Copy</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setSubmittedCase(null);
                            setUrlInput('');
                            setContextInput('');
                          }}
                          className="w-full text-center text-xs font-mono text-slate-400 hover:text-white py-2 cursor-pointer"
                        >
                          Submit another URL for confidential review
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleAuditSubmit} className="space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="font-display text-xl font-extrabold text-white">
                            Request Your Free 12-Hour Case Review
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            No upfront payment required • Protected by Mutual NDA
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-500/40">
                          From $300
                        </span>
                      </div>

                      {/* Target Link */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Target URL (Reddit, Trustpilot, Google Maps, Glassdoor) *
                        </label>
                        <input
                          type="url"
                          required
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="https://... (Reddit post, Trustpilot review, or Google Maps listing)"
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:bg-[#0D1527] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm font-mono transition-all"
                        />
                      </div>

                      {/* Scope Selector */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Preferred Service Scope
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setRemovalScope('full-thread')}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              removalScope === 'full-thread'
                                ? 'border-[#2563EB] ring-2 ring-blue-500/25 bg-blue-950/60 text-white font-semibold'
                                : 'border-slate-800 bg-[#0B0F19] text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-xs font-bold text-white">Full Reddit Thread</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Erase entire post &amp; search cache
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRemovalScope('comment-only')}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              removalScope === 'comment-only'
                                ? 'border-[#2563EB] ring-2 ring-blue-500/25 bg-blue-950/60 text-white font-semibold'
                                : 'border-slate-800 bg-[#0B0F19] text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-xs font-bold text-white">Targeted Comment</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Remove specific reply / mention
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRemovalScope('review-audit')}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              removalScope === 'review-audit'
                                ? 'border-[#2563EB] ring-2 ring-blue-500/25 bg-blue-950/60 text-white font-semibold'
                                : 'border-slate-800 bg-[#0B0F19] text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-xs font-bold text-white">Review Takedown</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Trustpilot, Maps, Glassdoor
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Name & Work Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Alex Rivera"
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                          />
                        </div>
                      </div>

                      {/* Company & Context */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Brand / Company Name
                          </label>
                          <input
                            type="text"
                            value={companyInput}
                            onChange={(e) => setCompanyInput(e.target.value)}
                            placeholder="Acme Inc."
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Brief Context (Optional)
                          </label>
                          <input
                            type="text"
                            value={contextInput}
                            onChange={(e) => setContextInput(e.target.value)}
                            placeholder="e.g. False claims by competitor / ex-employee"
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                          />
                        </div>
                      </div>

                      {submitError && (
                        <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="pw-btn-primary w-full inline-flex items-center justify-center gap-2.5 disabled:opacity-60 text-white font-extrabold text-[15.5px] py-4 px-6 rounded-xl cursor-pointer"
                      >
                        <span>
                          {isSubmitting
                            ? 'Encrypting & Submitting Case...'
                            : 'Submit Link for Free 12-Hour Audit'}
                        </span>
                        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                      </button>

                      {/* Official Trust Badges Directly Under Submit Button */}
                      <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-slate-800">
                          <div className="w-7 h-7 rounded-lg bg-blue-950/70 border border-blue-500/40 text-[#60A5FA] flex items-center justify-center shrink-0">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[11.5px] font-extrabold text-white leading-tight">
                              Escrow.com Security Verified
                            </div>
                            <div className="text-[10.5px] text-slate-400 leading-tight mt-0.5">
                              Payment released only post-deletion
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-slate-800">
                          <div className="w-7 h-7 rounded-lg bg-blue-950/70 border border-blue-500/40 text-[#60A5FA] flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[11.5px] font-extrabold text-white leading-tight">
                              Mutual NDA Guaranteed
                            </div>
                            <div className="text-[10.5px] text-slate-400 leading-tight mt-0.5">
                              100% confidential case handling
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
        </section>

        {/* =========================================================
            SECTION 8: FREQUENTLY ASKED QUESTIONS (DARK)
           ========================================================= */}
        <section id="faq" className="py-24 bg-[#0B0F19] border-b border-slate-800">
          <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
                06. DUE DILIGENCE &amp; ESCROW FAQ
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {FAQS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-md overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                    >
                      <span className="font-display text-[17px] font-bold text-white">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#60A5FA] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3.5">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      ) : activePage === 'news' ? (
      <Suspense fallback={<RouteLoadingFallback />}>
        <NewsRemovalPage
          onScheduleCall={() => setIsCallModalOpen(true)}
          onCaseSubmitted={(details) => setSubmittedCase(details)}
        />
      </Suspense>
      ) : activePage === 'reviews' ? (
      <Suspense fallback={<RouteLoadingFallback />}>
        <ReviewsPage
          onScheduleCall={() => setIsCallModalOpen(true)}
          web3FormsKey={WEB3FORMS_ACCESS_KEY}
          whatsAppUrl={WHATSAPP_BASE_URL}
        />
      </Suspense>
      ) : activePage === 'about' ? (
      <Suspense fallback={<RouteLoadingFallback />}>
        <AboutPage
          onRequestAudit={() => switchPage('reddit', '#audit-form')}
          onScheduleCall={() => setIsCallModalOpen(true)}
          whatsAppUrl={WHATSAPP_BASE_URL}
        />
      </Suspense>
      ) : (
      <main className="flex-1 bg-[#090D16]">
        <Suspense fallback={<RouteLoadingFallback />}>
          <InsightsAndCompliance
            selectedArticleId={selectedInsightId}
            onSelectArticle={(article) => {
              setSelectedInsightId(article.id);
              switchPage('insights', undefined, article.slug);
            }}
            onRequestAudit={(articleTitle) => {
              if (articleTitle && !contextInput) {
                setContextInput(`Compliance Briefing Inquiry: ${articleTitle}`);
              }
              switchPage('reddit', '#audit-form');
            }}
            onNavigatePath={(href) => {
              if (href.startsWith('/news-removal')) {
                switchPage('news');
              } else if (href.startsWith('/reviews')) {
                switchPage('reviews');
              } else if (href.startsWith('/about')) {
                switchPage('about');
              } else if (href.startsWith('/#')) {
                switchPage('reddit', href.slice(1));
              } else {
                switchPage('reddit');
              }
            }}
          />
        </Suspense>
      </main>
      )}

      {/* =========================================================
          FOOTER WITH POSTWIPE SHIELD LOGO (CORPORATE DARK PALETTE)
         ========================================================= */}
      <footer className="bg-[#050811] text-slate-400 py-14 border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-800">
            <div className="space-y-4 max-w-xl">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  switchPage('reddit');
                }}
                className="flex items-center gap-3"
              >
                <PostWipeLogoMark className="w-9 h-9" />
                <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                  Post<span className="text-[#60A5FA]">Wipe</span>
                </span>
              </a>

              <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed font-normal">
                <p>
                  PostWipe is a premier corporate online reputation management firm specializing in the permanent removal and search de-indexing of hostile Reddit threads, defamatory forum discussions, and damaging search results. Modern search engines and AI answer engines routinely index unverified forum discussions on page one, directly contaminating executive due diligence, customer acquisition, and enterprise sales pipelines. PostWipe neutralizes this vulnerability through direct compliance pathways, terms-of-service enforcement, and expedited search engine cache purges, eliminating defamatory material at the source rather than relying on slow, temporary suppression tactics.
                </p>
                <p>
                  Serving B2B tech companies, high-profile founders, and global consumer brands, PostWipe operates under strict mutual non-disclosure agreements with a zero-risk, pay-on-success model backed by neutral Escrow.com settlement. Clients retain total financial protection: funds are released only after source deletion and Google search cache clearing are independently verified.
                </p>
              </div>

              {/* Verified Trustpilot Badge Card */}
              <div className="pt-2">
                <a
                  href="https://www.trustpilot.com/review/postwipe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3.5 rounded-xl bg-[#0B0F19] hover:bg-[#0F172A] border border-emerald-500/40 text-slate-200 transition-all text-xs group cursor-pointer shadow-md max-w-lg"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        <span className="text-emerald-400">★</span> Trustpilot
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/30">
                        TrustScore 4.9 / 5.0
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 text-emerald-400 text-sm">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-slate-400 group-hover:text-slate-300">
                    <span>Rated Excellent • Read our verified client reviews on Trustpilot</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                  </div>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs font-semibold text-slate-300">
              <button
                type="button"
                onClick={() => switchPage('reddit')}
                className={`hover:text-white transition-colors cursor-pointer ${
                  activePage === 'reddit' ? 'text-[#60A5FA] font-extrabold' : ''
                }`}
              >
                Reddit Removal Page
              </button>
              <button
                type="button"
                onClick={() => switchPage('news')}
                className={`hover:text-white transition-colors cursor-pointer ${
                  activePage === 'news' ? 'text-[#60A5FA] font-extrabold' : ''
                }`}
              >
                News &amp; Media Removal Page
              </button>
              <button
                type="button"
                onClick={() => switchPage('reviews')}
                className={`hover:text-white transition-colors cursor-pointer ${
                  activePage === 'reviews' ? 'text-[#60A5FA] font-extrabold' : ''
                }`}
              >
                Review Management Page
              </button>
              <button
                type="button"
                onClick={() => switchPage('insights')}
                className={`hover:text-white transition-colors cursor-pointer ${
                  activePage === 'insights' ? 'text-[#60A5FA] font-extrabold' : ''
                }`}
              >
                Insights &amp; Compliance Blog
              </button>
              <button
                type="button"
                onClick={() => switchPage('about')}
                className={`hover:text-white transition-colors cursor-pointer ${
                  activePage === 'about' ? 'text-[#60A5FA] font-extrabold' : ''
                }`}
              >
                About PostWipe
              </button>
              <button
                type="button"
                onClick={() => switchPage('reddit', '#escrow-workflow')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Escrow Process
              </button>
              <button
                type="button"
                onClick={() => switchPage('reddit', '#case-results')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Case Studies
              </button>
              <button
                type="button"
                onClick={() => switchPage(activePage === 'news' ? 'news' : 'reddit', activePage === 'news' ? '#news-audit-form' : '#audit-form')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                12-Hour Audit
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} PostWipe (postwipe.com). All rights reserved.</p>
            <p className="font-mono text-[11px]">
              Independent compliance &amp; reputation firm • Not affiliated with Reddit, Inc.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget - Styled in Cobalt Blue */}
      <aside className="fixed bottom-5 right-5 z-50">
        <a
          href={activeWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PostWipe on WhatsApp"
          className="group flex items-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-4 py-3 rounded-full shadow-xl shadow-blue-900/30 border border-blue-400/30 transition-all hover:scale-105"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.124.556 4.119 1.528 5.847l-1.528 5.583 5.714-1.499c1.688.918 3.621 1.442 5.686 1.442 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </aside>

      {/* Lazy-Loaded Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <Suspense fallback={null}>
          <MobileMenuDrawer
            activePage={activePage}
            onClose={() => setIsMobileMenuOpen(false)}
            onSelectPage={(page, targetHash) => switchPage(page, targetHash)}
          />
        </Suspense>
      )}

      {/* Lazy-Loaded Google Calendar / Google Meet Appointment Scheduler Modal */}
      {isCallModalOpen && (
        <Suspense fallback={null}>
          <ScheduleCallModal onClose={() => setIsCallModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
