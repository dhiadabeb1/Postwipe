import React, { useState } from 'react';
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
  Calendar,
  X,
  Video,
} from 'lucide-react';

interface SubmittedCaseDetails {
  caseId: string;
  name: string;
  email: string;
  url: string;
  company: string;
  context: string;
}

const WHATSAPP_BASE_URL = 'https://wa.me/21695022973';

function buildWhatsAppUrl(details: SubmittedCaseDetails | null): string {
  if (!details) {
    return WHATSAPP_BASE_URL;
  }
  const lines = [
    `Hi PostWipe team, I just submitted my Reddit link for a removal audit.`,
    ``,
    `• Client Name: ${details.name}`,
    `• Case Reference: ${details.caseId}`,
    `• Email: ${details.email}`,
    `• Target Reddit URL: ${details.url}`,
    details.company ? `• Brand / Company: ${details.company}` : null,
    details.context ? `• Additional Details: ${details.context}` : null,
    ``,
    `Please confirm receipt of my submission and let me know the next steps.`,
  ].filter(Boolean);

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
}

interface UpcomingDay {
  isoDate: string;
  dayName: string;
  monthShort: string;
  dayNum: string;
  fullLabel: string;
}

function getUpcomingBusinessDays(count = 8): UpcomingDay[] {
  const days: UpcomingDay[] = [];
  const cursor = new Date();
  while (days.length < count) {
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const yyyy = cursor.getFullYear();
      const mm = String(cursor.getMonth() + 1).padStart(2, '0');
      const dd = String(cursor.getDate()).padStart(2, '0');
      days.push({
        isoDate: `${yyyy}-${mm}-${dd}`,
        dayName: cursor.toLocaleDateString('en-US', { weekday: 'short' }),
        monthShort: cursor.toLocaleDateString('en-US', { month: 'short' }),
        dayNum: String(cursor.getDate()),
        fullLabel: cursor.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:30 PM',
  '04:30 PM',
];

function buildGoogleCalendarUrl(params: {
  caseId: string;
  name: string;
  email: string;
  isoDate: string;
  timeSlot: string;
  platform: string;
  redditUrl: string;
}): string {
  const [timePart, meridiem] = params.timeSlot.split(' ');
  const [rawHours, rawMinutes] = timePart.split(':').map(Number);
  let hours = rawHours;
  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  const [year, month, day] = params.isoDate.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, hours, rawMinutes, 0);
  const endDate = new Date(startDate.getTime() + 15 * 60 * 1000);

  const formatGCalDate = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  };

  const datesParam = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;
  const title = `PostWipe Strategy Call (${params.caseId}) (${params.name})`;
  const details = [
    `15-Minute Confidential Reddit Removal & Escrow Consultation`,
    `Case Reference: ${params.caseId}`,
    `Client: ${params.name} (${params.email})`,
    `Call Service: ${params.platform}`,
    `Target Reddit URL: ${params.redditUrl}`,
    `WhatsApp Direct Support: https://wa.me/21695022973`,
  ].join('\n');

  const query = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: datesParam,
    details,
    location: params.platform,
    add: 'xboxdhia089@gmail.com',
  });

  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

/**
 * PostWipe Shield + Checkmark Logo Mark in the new Royal Cobalt Blue palette
 */
function PostWipeLogoMark({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pw-cobalt-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="pw-cobalt-shield" x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#pw-cobalt-bg)" />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="14"
        stroke="#93C5FD"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <path
        d="M32 11L15 18.5V30.5C15 41.8 22.2 51.9 32 55C41.8 51.9 49 41.8 49 30.5V18.5L32 11Z"
        fill="#FFFFFF"
        fillOpacity="0.14"
        stroke="url(#pw-cobalt-shield)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 27.5H34.5"
        stroke="#BFDBFE"
        strokeOpacity="0.85"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeDasharray="3 4"
      />
      <path
        d="M24 34.5L29.5 40L41 26.5"
        stroke="#FFFFFF"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CASE_STUDIES = [
  {
    id: 'PW-941',
    sector: 'B2B SaaS Platform (Series A)',
    subreddit: 'r/SaaS & r/entrepreneur',
    issue: 'Viral competitor smear thread ranking #2 on Google for "[Brand] reviews" and cited by ChatGPT.',
    scope: 'Full Thread Removal + Google & AI De-Index',
    timeline: '8 Business Days',
    escrowStatus: 'Escrow Released Post-Removal',
    metrics: 'Page-1 Google snippet & ChatGPT citation purged within 48h of Reddit deletion.',
  },
  {
    id: 'PW-884',
    sector: 'DTC Health & Supplement Brand',
    subreddit: 'r/Supplements',
    issue: '3-year-old thread with unverified product safety claims driving a 28% drop in branded checkout conversion.',
    scope: 'Complete Root Thread Deletion',
    timeline: '11 Business Days',
    escrowStatus: 'Escrow Released Post-Removal',
    metrics: 'Root post permanently removed at source; Google URL removal completed in 36 hours.',
  },
  {
    id: 'PW-917',
    sector: 'Fintech Founder & Executive',
    subreddit: 'r/fintech & r/startups',
    issue: 'Doxxing and defamatory commentary by a former contractor appearing on page 1 for the founder’s full name.',
    scope: 'Targeted Comment Tree Wipe + Search Cache Purge',
    timeline: '5 Business Days',
    escrowStatus: 'Escrow Released Post-Removal',
    metrics: '14 defamatory comments wiped under harassment & PII policy without alerting the thread author.',
  },
];

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
  const [removalScope, setRemovalScope] = useState<'full-thread' | 'comment-only'>('full-thread');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedCase, setSubmittedCase] = useState<SubmittedCaseDetails | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [previewMode, setPreviewMode] = useState<'after' | 'before'>('after');

  // Schedule a Call (Google Calendar / Meet) Modal State
  const upcomingDays = getUpcomingBusinessDays(8);
  const detectedTimezone =
    typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callStep, setCallStep] = useState<'slot' | 'details'>('slot');
  const [callPlatform, setCallPlatform] = useState<'Google Meet' | 'WhatsApp Call' | 'Phone Call'>('Google Meet');
  const [callDate, setCallDate] = useState(upcomingDays[0]?.isoDate || '');
  const [callTimeSlot, setCallTimeSlot] = useState('10:00 AM');
  const [callName, setCallName] = useState('');
  const [callEmail, setCallEmail] = useState('');
  const [callPhone, setCallPhone] = useState('');
  const [callUrl, setCallUrl] = useState('');
  const [isCallSubmitting, setIsCallSubmitting] = useState(false);
  const [callError, setCallError] = useState('');
  const [callBookedCase, setCallBookedCase] = useState<SubmittedCaseDetails | null>(null);
  const [bookedCalendarUrl, setBookedCalendarUrl] = useState('');

  const selectedDayObj = upcomingDays.find((d) => d.isoDate === callDate) || upcomingDays[0];

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callName.trim() || !callEmail.trim() || !callDate.trim()) return;

    setIsCallSubmitting(true);
    setCallError('');

    const generatedCaseId = `PW-CALL-${Math.floor(10000 + Math.random() * 90000)}`;
    const cleanName = callName.trim();
    const cleanEmail = callEmail.trim();
    const cleanPhone = callPhone.trim();
    const cleanUrl = callUrl.trim() || 'To be discussed on call';
    const slotSummary = `${selectedDayObj?.fullLabel || callDate} at ${callTimeSlot} (${detectedTimezone}) via ${callPlatform}`;

    const gcalUrl = buildGoogleCalendarUrl({
      caseId: generatedCaseId,
      name: cleanName,
      email: cleanEmail,
      isoDate: callDate,
      timeSlot: callTimeSlot,
      platform: callPlatform,
      redditUrl: cleanUrl,
    });

    try {
      const response = await fetch('https://formsubmit.co/ajax/xboxdhia089@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New PostWipe ${callPlatform} Scheduled (${generatedCaseId}) - ${cleanName}`,
          Request_Type: `15-Minute Strategy Call (${callPlatform})`,
          Case_Reference: generatedCaseId,
          Client_Name: cleanName,
          Work_Email: cleanEmail,
          Phone_Or_WhatsApp: cleanPhone || 'Not provided',
          Scheduled_Slot: slotSummary,
          Target_Reddit_URL: cleanUrl,
          Google_Calendar_Link: gcalUrl,
          _template: 'table',
        }),
      });

      if (response.ok) {
        const bookedDetails: SubmittedCaseDetails = {
          caseId: generatedCaseId,
          name: cleanName,
          email: cleanEmail,
          url: cleanUrl,
          company: cleanPhone ? `${callPlatform} • ${cleanPhone}` : callPlatform,
          context: slotSummary,
        };
        setBookedCalendarUrl(gcalUrl);
        setCallBookedCase(bookedDetails);
      } else {
        setCallError('Unable to schedule your call right now. Please try again.');
      }
    } catch {
      setCallError('Network error while scheduling your call. Please check your connection.');
    } finally {
      setIsCallSubmitting(false);
    }
  };

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

    try {
      const response = await fetch('https://formsubmit.co/ajax/xboxdhia089@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New PostWipe Audit Request (${generatedCaseId}) - ${cleanName}`,
          Case_Reference: generatedCaseId,
          Client_Name: cleanName,
          Work_Email: cleanEmail,
          Target_Reddit_URL: cleanUrl,
          Removal_Scope_Preference:
            removalScope === 'full-thread' ? 'Full Thread Deletion + Search De-Index' : 'Targeted Comment / Mention Wipe',
          Company_Or_Brand: cleanCompany || 'Not provided',
          Context_Details: cleanContext || 'Not provided',
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmittedCase({
          caseId: generatedCaseId,
          name: cleanName,
          email: cleanEmail,
          url: cleanUrl,
          company: cleanCompany,
          context: cleanContext,
        });
      } else {
        setSubmitError('Something went wrong submitting your request. Please try again or reach out via support@postwipe.com.');
      }
    } catch {
      setSubmitError('Network error while submitting your request. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeWhatsAppUrl = buildWhatsAppUrl(submittedCase);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827] selection:bg-blue-600/15 selection:text-blue-950">
      {/* Sticky Header with User's PostWipe Logo */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* PostWipe Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <PostWipeLogoMark className="w-10 h-10 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-extrabold tracking-tight text-[#111827] leading-none">
                Post<span className="text-[#2563EB]">Wipe</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">
                Reddit Removal &amp; De-Indexing
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-gray-600">
            <a href="#why-postwipe" className="hover:text-[#2563EB] transition-colors">
              Why Reddit Hurts
            </a>
            <a href="#removal-options" className="hover:text-[#2563EB] transition-colors">
              Removal Scope
            </a>
            <a href="#escrow-workflow" className="hover:text-[#2563EB] transition-colors">
              Escrow Process
            </a>
            <a href="#case-results" className="hover:text-[#2563EB] transition-colors">
              Case Studies
            </a>
            <a href="#faq" className="hover:text-[#2563EB] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Header Action Area */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="#audit-form"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[14px] px-5 py-2.5 rounded-xl shadow-sm shadow-blue-600/20 hover:shadow-md transition-all cursor-pointer"
            >
              <span>Free 12h Link Audit</span>
              <ArrowRight className="w-4 h-4 text-blue-100" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* =========================================================
            SECTION 1: HERO — CLEAR VALUE PROPOSITION + ESCROW + LIVE 404 CONSOLE
           ========================================================= */}
        <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F4F6FB] to-white pw-grid-bg border-b border-gray-200">
          {/* Soft ambient cobalt-indigo glow */}
          <div
            className="pointer-events-none absolute -top-24 right-1/4 w-[520px] h-[520px] rounded-full bg-blue-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Core Pitch, Pricing + Escrow, 3 Trust Pillars */}
              <div className="lg:col-span-7">
                {/* Category Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold tracking-wide uppercase mb-6 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>Corporate Policy Escalation • No Moderator Begging</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display text-[38px] sm:text-[50px] lg:text-[56px] font-extrabold text-[#111827] tracking-tight leading-[1.05] mb-6">
                  Permanently Erase Defamatory <span className="pw-hl">Reddit Threads</span> &amp; Google Search Snippets.
                </h1>

                {/* Two concise supporting lines explaining who it's for, what is removed/de-indexed, and Escrow terms */}
                <div className="space-y-3 text-[16px] sm:text-[17.5px] text-gray-600 leading-relaxed max-w-2xl mb-8">
                  <p>
                    Built for <strong className="text-[#111827] font-semibold">founders, SaaS operators, and executives</strong>: we remove damaging Reddit posts and comments at the source and de-index dead links from <strong className="text-[#111827] font-semibold">Google, Bing, ChatGPT, and Perplexity</strong>.
                  </p>
                  <p>
                    Every engagement is protected by <strong className="text-[#111827] font-semibold">Escrow.com</strong>, where your deposit stays locked and is <span className="underline decoration-[#2563EB] decoration-2 underline-offset-4 font-semibold text-[#111827]">released only after delete verification</span>.
                  </p>
                </div>

                {/* Primary CTA + Schedule a Call + Pricing & Escrow Terms */}
                <div className="space-y-4 mb-9">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                    <a
                      href="#audit-form"
                      className="inline-flex items-center justify-center gap-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-[16px] px-7 py-4 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all cursor-pointer shrink-0"
                    >
                      <span>Submit Reddit Link for Audit</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setCallBookedCase(null);
                        setCallStep('slot');
                        setIsCallModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-blue-50/60 text-[#111827] font-extrabold text-[15.5px] px-6 py-4 rounded-xl border-2 border-blue-200 hover:border-[#2563EB] shadow-2xs transition-all cursor-pointer shrink-0"
                    >
                      <Video className="w-5 h-5 text-[#2563EB]" />
                      <span>Schedule a Call (Google Meet)</span>
                    </button>
                  </div>

                  {/* Pricing + Escrow Badge directly beneath/beside CTA */}
                  <div className="inline-flex items-center gap-3.5 bg-white px-4 py-3 rounded-xl border border-blue-200/90 shadow-2xs">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-[15px] text-[#111827]">
                          Starts from $300
                        </span>
                        <span className="text-[11px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          Escrow.com
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        Released only after delete verification • $0 if unsuccessful
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 First-Screen Trust Elements */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-gray-200">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#111827]">Escrow.com Protected</div>
                      <p className="text-[11.5px] text-gray-500 leading-snug mt-0.5">
                        Funds held safely until target URL is permanently deleted.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#111827]">Source + SERP Wipe</div>
                      <p className="text-[11.5px] text-gray-500 leading-snug mt-0.5">
                        Deletes Reddit source &amp; purges Google / AI search cache.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#111827]">Direct Policy Escalation</div>
                      <p className="text-[11.5px] text-gray-500 leading-snug mt-0.5">
                        100% NDA compliance via internal Trust &amp; Safety filings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Light-Mode Interactive 404 & SERP Verification Console */}
              <div className="lg:col-span-5">
                <div className="bg-white text-[#111827] rounded-2xl border-2 border-blue-100 shadow-xl shadow-blue-900/5 overflow-hidden">
                  {/* Console Top Bar */}
                  <div className="px-5 py-3.5 bg-[#F4F6FB] border-b border-gray-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="ml-2 font-mono text-[11px] text-gray-500 font-semibold">
                        postwipe://live-verification
                      </span>
                    </div>

                    {/* Interactive Before / After State Toggle */}
                    <div className="inline-flex rounded-lg bg-white p-0.5 border border-gray-200 text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setPreviewMode('before')}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          previewMode === 'before'
                            ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode('after')}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          previewMode === 'after'
                            ? 'bg-[#2563EB] text-white font-bold'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        After Removal
                      </button>
                    </div>
                  </div>

                  {/* Console Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* 1. Target Reddit Thread Card */}
                    <div
                      className={`rounded-xl p-4 border transition-all ${
                        previewMode === 'after'
                          ? 'bg-blue-50/50 border-blue-200'
                          : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-mono text-[11px] text-gray-500 truncate">
                          reddit.com/r/SaaS/comments/1x9k2a/avoid_acme_software...
                        </span>
                        {previewMode === 'after' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2563EB] text-white font-mono text-[10px] font-bold shrink-0">
                            PERMANENTLY DELETED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 font-mono text-[10px] font-bold shrink-0">
                            RANKING #2 ON GOOGLE
                          </span>
                        )}
                      </div>

                      {previewMode === 'after' ? (
                        <div className="space-y-2">
                          <div className="relative inline-block">
                            <p className="text-sm font-semibold text-gray-400 line-through">
                              Avoid AcmeCloud: deceptive billing &amp; terrible support [248 upvotes]
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-blue-900 font-mono bg-blue-100/80 border border-blue-200 rounded-lg px-3 py-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2563EB]" />
                            <span>[removed by Reddit in response to policy violation]</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-900">
                            Avoid AcmeCloud: deceptive billing &amp; terrible support [248 upvotes]
                          </p>
                          <p className="text-xs text-rose-700">
                            89 comments • Appearing in Google page-1 search &amp; AI summaries for &ldquo;AcmeCloud reviews&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 2. Search Engine & AI Citation Status */}
                    <div className="rounded-xl bg-[#F4F6FB] border border-gray-200 p-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-3 flex items-center justify-between">
                        <span>Search &amp; AI Index Propagation</span>
                        <span className="text-[#2563EB] font-bold">
                          {previewMode === 'after' ? '3 / 3 PURGED' : 'EXPOSED'}
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex items-center justify-between py-1.5 border-b border-gray-200">
                          <span className="text-gray-700 font-medium flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
                            Google Search &amp; Cached Snippet
                          </span>
                          {previewMode === 'after' ? (
                            <span className="font-mono text-[11px] text-[#2563EB] font-bold">
                              De-Indexed (Cache Purged)
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-rose-600 font-bold">
                              Indexed on Page 1
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between py-1.5 border-b border-gray-200">
                          <span className="text-gray-700 font-medium flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                            ChatGPT &amp; Perplexity Brand Summary
                          </span>
                          {previewMode === 'after' ? (
                            <span className="font-mono text-[11px] text-[#2563EB] font-bold">
                              Citation Cleared
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-rose-600 font-bold">
                              Actively Cited
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-gray-700 font-medium flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-[#2563EB]" />
                            Escrow.com Milestone Status
                          </span>
                          {previewMode === 'after' ? (
                            <span className="font-mono text-[11px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200 font-bold">
                              VERIFIED &amp; RELEASED
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-bold">
                              LOCKED IN ESCROW
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Console Bottom Status Strip */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                        90-Day Re-Post Protection Included
                      </span>
                      <a href="#audit-form" className="text-[#2563EB] hover:underline font-bold">
                        Check Your URL →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: WHY NEGATIVE REDDIT THREADS HURT FOUNDERS & SAAS
           ========================================================= */}
        <section id="why-postwipe" className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-3">
                01 // THE REPUTATION BOTTLENECK
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4">
                Why One Hostile Reddit Thread Quietly Destroys High-Intent Deals
              </h2>
              <p className="text-gray-600 text-[16.5px] leading-relaxed">
                Google’s search algorithm now prioritizes Reddit discussions above review sites, while AI engines scrape those exact threads to answer buyer due-diligence queries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="pw-card bg-[#F4F6FB] rounded-2xl p-7 border border-gray-200">
                <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center mb-5">
                  <Search className="w-5 h-5" />
                </div>
                <div className="font-mono text-xs font-bold text-rose-600 uppercase mb-1.5">
                  Google SERP Priority
                </div>
                <h3 className="font-display text-xl font-bold text-[#111827] mb-3">
                  Pinned to Page 1 for “[Brand] Reviews”
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Because Google treats Reddit as high-authority user-generated content, a single thread from an angry ex-employee, competitor, or troll often outranks your own website and G2/Trustpilot profiles.
                </p>
              </div>

              <div className="pw-card bg-[#F4F6FB] rounded-2xl p-7 border border-gray-200">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="font-mono text-xs font-bold text-indigo-600 uppercase mb-1.5">
                  AI Search Contamination
                </div>
                <h3 className="font-display text-xl font-bold text-[#111827] mb-3">
                  Repeated as “Fact” by ChatGPT &amp; Perplexity
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  When prospects ask ChatGPT, Gemini, or Perplexity whether your company is trustworthy, LLMs synthesize unverified Reddit accusations directly into their buying recommendations.
                </p>
              </div>

              <div className="pw-card bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white rounded-2xl p-7 border border-blue-700 shadow-lg">
                <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 text-white flex items-center justify-center mb-5">
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
            SECTION 3: TWO REMOVAL SCOPES (COMMENT WIPE VS FULL THREAD 404)
           ========================================================= */}
        <section id="removal-options" className="py-20 bg-[#F4F6FB] border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-3">
                  02 // SURGICAL SCOPE SELECTION
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827]">
                  Choose the Right Removal Scope for Your Situation
                </h2>
              </div>
              <p className="text-gray-600 text-sm max-w-md">
                Not every thread needs the same intervention. During your free 12-hour audit, we map out whether surgical comment deletion or full thread removal will best protect your search footprint.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Scope A: Targeted Comment / Mention Wipe */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-800 font-mono text-xs font-bold">
                      <MessageSquareOff className="w-4 h-4 text-[#2563EB]" />
                      OPTION A • TARGETED COMMENT WIPE
                    </span>
                    <span className="font-mono text-xs font-semibold text-gray-500">
                      Starts from $300
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-[#111827] mb-3">
                    Surgical Comment &amp; Brand Mention Removal
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Ideal when the main Reddit post is a general industry discussion (e.g., <em>&ldquo;What CRM do you use?&rdquo;</em>) and a specific reply attacks your company, leaks confidential info, or spreads false claims.
                  </p>

                  {/* Visual Mockup of Comment Wipe */}
                  <div className="bg-[#F4F6FB] rounded-xl p-4 border border-gray-200 mb-6 space-y-2.5 font-mono text-xs">
                    <div className="text-gray-500 flex items-center justify-between">
                      <span>Root Thread: &ldquo;Best tools for Q4?&rdquo;</span>
                      <span className="text-gray-400">Remains Intact</span>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 flex items-center justify-between">
                      <span className="line-through text-gray-400">
                        u/competitor_bot: &ldquo;Stay away from [Your Brand]...&rdquo;
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#2563EB] text-white text-[10px] font-bold">
                        WIPED
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-gray-700 mb-8">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" />
                      <span>Eliminates specific defamatory comments or nested reply chains</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" />
                      <span>Zero disruption to neutral community threads</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" />
                      <span>Protected by Escrow.com and released only after comment deletion</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#audit-form"
                  onClick={() => setRemovalScope('comment-only')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm transition-colors"
                >
                  <span>Audit a Specific Reddit Comment</span>
                  <ArrowRight className="w-4 h-4 text-blue-300" />
                </a>
              </div>

              {/* Scope B: Full Thread Wipe + Google & AI De-Index */}
              <div className="bg-white rounded-2xl border-2 border-[#2563EB] p-8 shadow-xl shadow-blue-600/10 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200 font-mono text-xs font-bold">
                      <Zap className="w-4 h-4 text-[#2563EB]" />
                      OPTION B • FULL THREAD + SERP WIPE
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white font-mono text-[11px] font-extrabold uppercase">
                      Most Requested
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-[#111827] mb-3">
                    Complete Thread Deletion + Google &amp; AI De-Indexing
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Required when the Reddit thread title itself contains your brand or executive name alongside damaging keywords and ranks on Page 1 of Google or appears in ChatGPT/Perplexity answers.
                  </p>

                  {/* Visual Mockup of Full Thread Wipe */}
                  <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-200 mb-6 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#1E3A8A]">
                      <span className="font-semibold">Root Thread URL Status:</span>
                      <span className="px-2 py-0.5 rounded bg-[#2563EB] text-white font-bold">
                        PERMANENTLY DELETED
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-blue-200 text-gray-700 flex items-center justify-between">
                      <span>Google SERP &amp; AI Search Cache:</span>
                      <span className="text-[#2563EB] font-bold">DE-INDEXED IN 24 TO 72H</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-gray-700 mb-8">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" />
                      <span>Permanently deletes the entire root Reddit thread &amp; all comments</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" />
                      <span>Expedited Google &amp; Bing dead-link cache purge included</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" />
                      <span>Escrow.com funds released only after delete verification + 90-day warranty</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#audit-form"
                  onClick={() => setRemovalScope('full-thread')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-colors shadow-lg shadow-blue-600/20"
                >
                  <span>Audit a Full Reddit Thread for Removal</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: 4-STEP ESCROW.COM WORKFLOW
           ========================================================= */}
        <section id="escrow-workflow" className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-3">
                03 // ZERO-RISK EXECUTION PROTOCOL
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4">
                How PostWipe’s Escrow-Protected Removal Process Works
              </h2>
              <p className="text-gray-600 text-[16px]">
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
                  className="pw-card bg-[#F4F6FB] rounded-2xl p-6 border border-gray-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded bg-[#2563EB] text-white">
                        {item.step}
                      </span>
                      <span className="font-mono text-[11px] text-gray-500 font-semibold">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#111827] mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200/80 flex items-center justify-between text-xs font-mono text-[#2563EB] font-semibold">
                    <span>NDA Protected</span>
                    <span>✓ Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: COMPARISON — POSTWIPE VS DIY MOD APPEALS VS PR AGENCIES
           ========================================================= */}
        <section className="py-20 bg-[#F4F6FB] border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-3">
                04 // WHY TRADITIONAL METHODS BACKFIRE
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3">
                PostWipe Corporate Escalation vs. Alternatives
              </h2>
              <p className="text-gray-600 text-[16px]">
                Replying in the thread or buying upvotes only boosts engagement velocity, locking the negative post even higher on Google.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs font-mono uppercase text-gray-500">
                      <th className="py-4 px-6">Evaluation Criteria</th>
                      <th className="py-4 px-6 bg-blue-50/80 text-blue-950 font-extrabold border-x border-blue-200">
                        <div className="flex items-center gap-2">
                          <PostWipeLogoMark className="w-5 h-5" />
                          <span>PostWipe Direct Escalation</span>
                        </div>
                      </th>
                      <th className="py-4 px-6">Messaging Subreddit Mods</th>
                      <th className="py-4 px-6">Traditional ORM / PR Agencies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm">
                    <tr>
                      <td className="py-4 px-6 font-semibold text-[#111827]">Outcome on Target URL</td>
                      <td className="py-4 px-6 bg-blue-50/30 border-x border-blue-200/70 font-bold text-[#1E3A8A]">
                        Permanent Source Deletion + Google De-Index
                      </td>
                      <td className="py-4 px-6 text-gray-600">Ignored or publicly mocked by mods</td>
                      <td className="py-4 px-6 text-gray-600">Leaves thread live; publishes fluff blog posts</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-[#111827]">Payment Structure</td>
                      <td className="py-4 px-6 bg-blue-50/30 border-x border-blue-200/70 font-bold text-[#1E3A8A]">
                        Starts from $300 • Held in Escrow.com until verified deletion
                      </td>
                      <td className="py-4 px-6 text-gray-600">Free, but high brand backfire risk</td>
                      <td className="py-4 px-6 text-gray-600">$3,000 to $10,000/mo upfront retainers</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-[#111827]">Streisand / Backlash Risk</td>
                      <td className="py-4 px-6 bg-blue-50/30 border-x border-blue-200/70 font-bold text-[#1E3A8A]">
                        Zero, executed via confidential corporate filings
                      </td>
                      <td className="py-4 px-6 text-rose-600 font-medium">
                        Extreme, mods often pin your DM to the thread
                      </td>
                      <td className="py-4 px-6 text-amber-700 font-medium">
                        High if using fake accounts or downvote bots
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-[#111827]">ChatGPT &amp; Perplexity Cleanup</td>
                      <td className="py-4 px-6 bg-blue-50/30 border-x border-blue-200/70 font-bold text-[#1E3A8A]">
                        Included via expedited search cache purge
                      </td>
                      <td className="py-4 px-6 text-gray-600">None</td>
                      <td className="py-4 px-6 text-gray-600">Does not remove source citation</td>
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
        <section id="case-results" className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-3">
                  05 // VERIFIED REMOVAL LEDGER
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827]">
                  Recent Anonymized Reddit Removals
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>All cases settled via Escrow.com post-verification</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {CASE_STUDIES.map((cs) => (
                <div
                  key={cs.id}
                  className="pw-card bg-[#F4F6FB] rounded-2xl p-7 border border-gray-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1E3A8A] text-white">
                        CASE {cs.id}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#2563EB] bg-blue-100/80 px-2.5 py-1 rounded">
                        {cs.timeline}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-gray-500 mb-1">{cs.subreddit}</div>
                    <h3 className="font-display text-lg font-extrabold text-[#111827] mb-3">
                      {cs.sector}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">{cs.issue}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium">Action Executed:</span>
                      <span className="font-mono font-bold text-[#111827]">{cs.scope}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-950 font-medium">
                      {cs.metrics}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: FREE 12-HOUR CASE AUDIT FORM + INSTANT WHATSAPP FOLLOW-UP
           ========================================================= */}
        <section id="audit-form" className="py-20 bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#312E81] text-white border-b border-blue-900">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Audit Guarantee & What Happens Next */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white font-mono text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>FREE 12-HOUR FEASIBILITY AUDIT</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Submit Your Target Reddit Link for a Confidential Audit
                </h2>

                <p className="text-blue-100 text-[15.5px] leading-relaxed">
                  Paste the offending Reddit thread or comment URL. Within 12 hours, our policy specialists will confirm whether it qualifies for permanent removal and send your fixed Escrow.com quote.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
                    <div className="w-9 h-9 rounded-lg bg-white/15 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Starts from $300 • Held in Escrow.com
                      </h3>
                      <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                        You never pay upfront retainers. Funds are held in Escrow.com and released only after delete verification confirms the link is permanently removed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
                    <div className="w-9 h-9 rounded-lg bg-white/15 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <EyeOff className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Strict Non-Disclosure Protection
                      </h3>
                      <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                        Your identity, brand name, and submitted URLs are protected under mutual NDA from the moment you submit this form.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCallBookedCase(null);
                        setCallStep('slot');
                        setIsCallModalOpen(true);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white hover:bg-blue-50 text-[#1E3A8A] font-extrabold text-sm shadow-lg transition-all cursor-pointer"
                    >
                      <Video className="w-4 h-4 text-[#2563EB]" />
                      <span>Schedule a Google Meet / Strategy Call</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Form or Post-Submission Confirmation + WhatsApp Action */}
              <div className="lg:col-span-7">
                <div className="bg-white text-[#111827] rounded-2xl p-6 sm:p-9 shadow-2xl border border-blue-100">
                  {submittedCase ? (
                    <div className="py-4 space-y-6">
                      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="font-mono text-xs uppercase font-bold text-[#2563EB]">
                              Audit Request Logged
                            </span>
                            <h3 className="font-display text-2xl font-extrabold text-[#111827]">
                              Case Reference: {submittedCase.caseId}
                            </h3>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 font-mono text-xs font-semibold text-blue-900">
                          Status: Assigned to Policy Analyst
                        </span>
                      </div>

                      {/* Mandatory Exact Confirmation Message */}
                      <div className="p-5 rounded-xl bg-[#F4F6FB] border border-gray-200 text-gray-700 text-[15px] leading-relaxed font-medium">
                        Thank you for your submission. If you do not see our email reply within a few hours or if it lands in your spam folder, click below to chat with us instantly on WhatsApp.
                      </div>

                      {/* Case Summary Box */}
                      <div className="rounded-xl bg-[#F4F6FB] border border-blue-200 text-gray-800 p-4 font-mono text-xs space-y-1.5">
                        <div>
                          <span className="text-gray-500">Client Name:</span>{' '}
                          <span className="text-[#111827] font-semibold">{submittedCase.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Case ID:</span>{' '}
                          <span className="text-[#2563EB] font-bold">{submittedCase.caseId}</span>
                        </div>
                        <div className="truncate">
                          <span className="text-gray-500">Target URL:</span>{' '}
                          <span className="text-gray-800">{submittedCase.url}</span>
                        </div>
                      </div>

                      {/* Direct WhatsApp Button with Pre-Filled Client Name & Case Reference */}
                      <div className="space-y-3">
                        <a
                          href={activeWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-base py-4 px-6 rounded-xl shadow-lg transition-all cursor-pointer"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.124.556 4.119 1.528 5.847l-1.528 5.583 5.714-1.499c1.688.918 3.621 1.442 5.686 1.442 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span>WhatsApp</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setSubmittedCase(null);
                            setUrlInput('');
                            setContextInput('');
                          }}
                          className="w-full text-center text-xs font-mono text-gray-500 hover:text-gray-800 py-2 cursor-pointer"
                        >
                          Submit another Reddit URL for review
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleAuditSubmit} className="space-y-5">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <div>
                          <h3 className="font-display text-xl font-extrabold text-[#111827]">
                            Request Your Free 12-Hour Case Review
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            No upfront payment required • Protected by NDA
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                          From $300
                        </span>
                      </div>

                      {/* Target Reddit URL */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Target Reddit Post or Comment URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="https://www.reddit.com/r/..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-mono bg-[#F4F6FB]"
                        />
                      </div>

                      {/* Scope Selector */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Preferred Removal Scope
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRemovalScope('full-thread')}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              removalScope === 'full-thread'
                                ? 'border-[#2563EB] bg-blue-50/70 text-blue-950 font-semibold'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-xs font-bold">Full Thread + SERP Wipe</div>
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              Erase entire post &amp; Google/AI cache
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRemovalScope('comment-only')}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              removalScope === 'comment-only'
                                ? 'border-[#2563EB] bg-blue-50/70 text-blue-950 font-semibold'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-xs font-bold">Targeted Comment Wipe</div>
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              Remove specific reply or brand mention
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Name & Work Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Alex Rivera"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                          />
                        </div>
                      </div>

                      {/* Company & Context */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Brand / Company Name
                          </label>
                          <input
                            type="text"
                            value={companyInput}
                            onChange={(e) => setCompanyInput(e.target.value)}
                            placeholder="Acme Inc."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Brief Context (Optional)
                          </label>
                          <input
                            type="text"
                            value={contextInput}
                            onChange={(e) => setContextInput(e.target.value)}
                            placeholder="e.g. False claims by competitor / ex-employee"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                          />
                        </div>
                      </div>

                      {submitError && (
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white font-extrabold text-[15.5px] py-4 px-6 rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
                      >
                        <span>
                          {isSubmitting
                            ? 'Encrypting & Submitting Case...'
                            : 'Submit Link for Free 12-Hour Audit'}
                        </span>
                        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                      </button>

                      <p className="text-center text-xs text-gray-500">
                        Protected by Escrow.com • Payment is released only after delete verification.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 8: FREQUENTLY ASKED QUESTIONS
           ========================================================= */}
        <section id="faq" className="py-20 bg-[#F4F6FB] border-b border-gray-200">
          <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-3">
                06 // DUE DILIGENCE &amp; ESCROW FAQ
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {FAQS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors"
                    >
                      <span className="font-display text-[17px] font-bold text-[#111827]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#2563EB] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
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

      {/* =========================================================
          FOOTER WITH POSTWIPE SHIELD LOGO (CLEAN LIGHT PALETTE)
         ========================================================= */}
      <footer className="bg-white text-gray-600 py-14 border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-gray-200">
            <div className="space-y-3 max-w-md">
              <a href="#" className="flex items-center gap-3">
                <PostWipeLogoMark className="w-9 h-9" />
                <span className="font-display text-2xl font-extrabold tracking-tight text-[#111827]">
                  Post<span className="text-[#2563EB]">Wipe</span>
                </span>
              </a>
              <p className="text-xs text-gray-500 leading-relaxed">
                Specialized Reddit post removal and Google/AI search de-indexing for founders, SaaS operators, and executives. Protected by Escrow.com and released only after delete verification.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs font-semibold text-gray-700">
              <a href="#why-postwipe" className="hover:text-[#2563EB] transition-colors">
                Why Reddit Hurts
              </a>
              <a href="#removal-options" className="hover:text-[#2563EB] transition-colors">
                Removal Scope
              </a>
              <a href="#escrow-workflow" className="hover:text-[#2563EB] transition-colors">
                Escrow Process
              </a>
              <a href="#case-results" className="hover:text-[#2563EB] transition-colors">
                Case Studies
              </a>
              <a href="#audit-form" className="hover:text-[#2563EB] transition-colors">
                12-Hour Audit
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} PostWipe (postwipe.com). All rights reserved.</p>
            <p className="font-mono text-[11px]">
              Independent compliance &amp; reputation firm • Not affiliated with Reddit, Inc.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget — Styled in Cobalt Blue to remove all old green colors */}
      <aside className="fixed bottom-5 right-5 z-50">
        <a
          href={activeWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PostWipe on WhatsApp"
          className="group flex items-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-4 py-3 rounded-full shadow-xl shadow-blue-900/20 border border-white/20 transition-all hover:scale-105"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.124.556 4.119 1.528 5.847l-1.528 5.583 5.714-1.499c1.688.918 3.621 1.442 5.686 1.442 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </aside>

      {/* Interactive Google Calendar / Google Meet Appointment Scheduler Modal */}
      {isCallModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/65 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-call-title"
        >
          <div className="bg-white text-[#111827] w-full max-w-3xl rounded-2xl shadow-2xl border border-blue-100 overflow-hidden my-8">
            {/* Top Bar */}
            <div className="px-6 py-4 bg-[#F4F6FB] border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="schedule-call-title" className="font-display text-lg font-extrabold text-[#111827]">
                      PostWipe Appointment Scheduler
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-[#2563EB] font-mono text-[10px] font-bold">
                      GOOGLE CALENDAR &amp; MEET
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Book a confidential 15-minute Reddit removal &amp; Escrow consultation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCallModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2-Column Google Calendar Appointment Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left Column: Host & Meeting Info */}
              <div className="md:col-span-5 bg-[#F4F6FB]/70 p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PostWipeLogoMark className="w-9 h-9" />
                    <div>
                      <div className="text-xs font-mono text-gray-500 uppercase font-bold">Host</div>
                      <div className="font-display font-extrabold text-sm text-[#111827]">
                        PostWipe Senior Policy Team
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-extrabold text-[#111827] leading-snug">
                      15-Min Reddit Removal Strategy Call
                    </h4>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Live feasibility review of your target Reddit URL, Google/AI cache purge timeline, and Escrow.com milestone setup.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 text-xs text-gray-700 font-medium">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>15 Minutes • 1-on-1 Confidential</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Video className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>Google Meet / WhatsApp / Phone</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span className="truncate">Timezone: {detectedTimezone}</span>
                    </div>
                  </div>

                  {/* Call Service Selector */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold mb-2">
                      Select Call Service
                    </label>
                    <div className="space-y-1.5">
                      {(['Google Meet', 'WhatsApp Call', 'Phone Call'] as const).map((plat) => (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => setCallPlatform(plat)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            callPlatform === plat
                              ? 'bg-blue-50 border-[#2563EB] text-[#1E3A8A]'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {plat === 'Google Meet' ? (
                              <Video className="w-3.5 h-3.5 text-[#2563EB]" />
                            ) : (
                              <PhoneCall className="w-3.5 h-3.5 text-[#2563EB]" />
                            )}
                            {plat}
                          </span>
                          {callPlatform === plat && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-gray-200 text-[11px] text-gray-500 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span>Protected by Mutual NDA &amp; Escrow.com</span>
                </div>
              </div>

              {/* Right Column: Interactive Date/Slot Picker -> Details -> Confirmation */}
              <div className="md:col-span-7 p-6">
                {callBookedCase ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase font-bold text-[#2563EB]">
                          Appointment Scheduled
                        </span>
                        <h4 className="font-display text-xl font-extrabold text-[#111827]">
                          Reference: {callBookedCase.caseId}
                        </h4>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F4F6FB] border border-gray-200 text-gray-700 text-sm leading-relaxed font-medium">
                      Thank you for your submission. If you do not see our email reply within a few hours or if it lands in your spam folder, click below to chat with us instantly on WhatsApp.
                    </div>

                    <div className="rounded-xl bg-blue-50/60 border border-blue-200 p-4 font-mono text-xs space-y-1.5 text-gray-700">
                      <div>
                        <span className="text-gray-500">Attendee:</span>{' '}
                        <strong className="text-[#111827]">{callBookedCase.name}</strong> ({callBookedCase.email})
                      </div>
                      <div>
                        <span className="text-gray-500">When:</span>{' '}
                        <strong className="text-[#2563EB]">{callBookedCase.context}</strong>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {/* 1-Click Add to Google Calendar */}
                      <a
                        href={bookedCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm py-3.5 px-5 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Add Appointment to Google Calendar</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      {/* Instant WhatsApp Follow-Up */}
                      <a
                        href={buildWhatsAppUrl(callBookedCase)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-white hover:bg-blue-50 text-[#1E3A8A] border-2 border-blue-200 font-extrabold text-sm py-3 px-5 rounded-xl transition-all cursor-pointer"
                      >
                        <PhoneCall className="w-4 h-4 text-[#2563EB]" />
                        <span>WhatsApp</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ) : callStep === 'slot' ? (
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                        1. Select a Date
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {upcomingDays.map((d) => {
                          const isSelected = d.isoDate === callDate;
                          return (
                            <button
                              key={d.isoDate}
                              type="button"
                              onClick={() => setCallDate(d.isoDate)}
                              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                                  : 'bg-white border-gray-200 hover:border-blue-300 text-gray-700'
                              }`}
                            >
                              <div className={`text-[10px] font-mono uppercase ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                {d.dayName}
                              </div>
                              <div className="font-display font-extrabold text-base leading-tight my-0.5">
                                {d.dayNum}
                              </div>
                              <div className={`text-[10px] font-semibold ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                                {d.monthShort}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                          2. Select an Available Time ({selectedDayObj?.fullLabel})
                        </span>
                        <span className="text-[11px] font-mono text-[#2563EB] font-semibold">
                          15-min slots
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = slot === callTimeSlot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setCallTimeSlot(slot)}
                              className={`py-2.5 px-3 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50 border-2 border-[#2563EB] text-[#1E3A8A]'
                                  : 'bg-white border-gray-200 hover:border-blue-300 text-gray-700'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setCallStep('details')}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                      >
                        <span>
                          Continue with {selectedDayObj?.fullLabel} at {callTimeSlot}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCallSubmit} className="space-y-4">
                    {/* Selected Slot Pill */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                      <div className="flex items-center gap-2 font-semibold text-[#1E3A8A]">
                        <Calendar className="w-4 h-4 text-[#2563EB]" />
                        <span>
                          {selectedDayObj?.fullLabel} • {callTimeSlot} ({callPlatform})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCallStep('slot')}
                        className="text-[#2563EB] hover:underline font-bold cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={callName}
                          onChange={(e) => setCallName(e.target.value)}
                          placeholder="Alex Rivera"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Email for Calendar Invite *
                        </label>
                        <input
                          type="email"
                          required
                          value={callEmail}
                          onChange={(e) => setCallEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={callPhone}
                          onChange={(e) => setCallPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Target Reddit URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={callUrl}
                          onChange={(e) => setCallUrl(e.target.value)}
                          placeholder="https://www.reddit.com/r/..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-mono"
                        />
                      </div>
                    </div>

                    {callError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{callError}</span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setCallStep('slot')}
                        className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:text-gray-900 text-xs font-bold cursor-pointer"
                      >
                        ← Back to Calendar
                      </button>
                      <button
                        type="submit"
                        disabled={isCallSubmitting}
                        className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{isCallSubmitting ? 'Scheduling...' : 'Confirm & Create Invite'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
