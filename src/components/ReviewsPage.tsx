import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Scale,
  MapPin,
  Store,
  Briefcase,
  TrendingUp,
  Sparkles,
  Check,
  AlertTriangle,
  ExternalLink,
  EyeOff,
  Video,
  Clock,
  ChevronDown,
  Mail,
  XCircle,
  HelpCircle,
  BadgeCheck,
} from 'lucide-react';
import { buildDirectEmailUrl } from '../services/formSubmission';

interface SubmittedCaseDetails {
  caseId: string;
  name: string;
  email: string;
  url: string;
  company: string;
  context: string;
}

interface ReviewsPageProps {
  onScheduleCall: () => void;
  web3FormsKey: string;
  whatsAppUrl: string;
}

export function ReviewsPage({
  onScheduleCall,
  web3FormsKey,
  whatsAppUrl,
}: ReviewsPageProps) {
  // Live console preview mode: before vs after
  const [reviewPreviewMode, setReviewPreviewMode] = useState<'after' | 'before'>('after');

  // Intake form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [platform, setPlatform] = useState<'Trustpilot' | 'Google Maps' | 'Glassdoor' | 'Sitejabber' | 'Other'>('Google Maps');
  const [scope, setScope] = useState<'direct-takedown' | 'suppression' | 'full-strategy'>('direct-takedown');
  const [context, setContext] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedCase, setSubmittedCase] = useState<SubmittedCaseDetails | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !targetUrl.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const generatedCaseId = `PW-REV-${Math.floor(100000 + Math.random() * 900000)}`;
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanUrl = targetUrl.trim();
    const cleanCompany = company.trim();
    const cleanContext = context.trim();

    const scopeLabel =
      scope === 'direct-takedown'
        ? 'Direct Review Removal & Legal Takedown'
        : scope === 'suppression'
        ? 'Organic Review Suppression (Push-Down)'
        : 'Combined Takedown & Review Suppression Strategy';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `New PostWipe Review Audit Request (${generatedCaseId}) - ${cleanName}`,
          from_name: 'PostWipe Review Audit Desk',
          case_reference: generatedCaseId,
          service_type: 'Review Management & Suppression Services',
          platform: platform,
          name: cleanName,
          email: cleanEmail,
          company: cleanCompany || 'Not provided',
          target_review_url: cleanUrl,
          target_url: cleanUrl,
          service_scope: scopeLabel,
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
            'Submission rejected by gateway. Please check your details or reach out via WhatsApp.'
        );
      }
    } catch {
      setSubmitError(
        'Network error while submitting your review audit request. Please check your connection or contact our team directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const platforms = [
    {
      name: 'Google Maps & Business Profiles',
      badge: 'Google Local Policy Enforcement',
      icon: MapPin,
      accentColor: 'text-[#60A5FA]',
      borderColor: 'border-blue-500/30',
      description:
        'Targeted takedown of 1-star review spikes, disgruntled ex-employee sabotage, competitor smear campaigns, and non-customer spam violating Google Maps policy.',
      violations: [
        'Conflict of interest & competitor reviews',
        'Hate speech, personal slander, or harassment',
        'Coordinated review-bombing & off-topic spam',
        'Fabricated visit or non-customer claims',
      ],
      escalationType: 'GBP Legal Escalation & Merchant Compliance',
    },
    {
      name: 'Trustpilot Business Profiles',
      badge: 'Content Integrity Escalation',
      icon: Star,
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      description:
        'Formal arbitration of defamatory ratings, extortion reviews, and fabricated claims submitted without authentic proof of purchase or verified merchant interaction.',
      violations: [
        'Failure to provide valid proof of purchase',
        'Extortion demands and competitor astroturfing',
        'Unverified third-party claims & defamatory allegations',
        'Personal employee names & private data leaks',
      ],
      escalationType: 'Whistleblower & Proof-of-Purchase Dossiers',
    },
    {
      name: 'Glassdoor & Employer Portals',
      badge: 'NDA & Terms of Use Enforcement',
      icon: Briefcase,
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      description:
        'Rapid de-listing of retaliatory ex-employee reviews disclosing proprietary trade secrets, breach of confidential exit agreements, or executive defamation.',
      violations: [
        'Proprietary trade secrets & NDA violations',
        'Named executive slander & false criminal claims',
        'Misrepresented internal compensation structures',
        'Malicious termination retaliation',
      ],
      escalationType: 'Corporate Counsel Compliance & Legal Takedowns',
    },
    {
      name: 'Sitejabber & Consumer Hubs',
      badge: 'Direct Platform Arbitration',
      icon: Store,
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      description:
        'Comprehensive resolution of unverified transactional disputes, syndicated smear pages, and scraping syndicates holding your brand rating hostage.',
      violations: [
        'Unverifiable transaction records',
        'Scraped duplicate defamatory content',
        'Fraudulent chargeback & merchant extortion',
        'Competitor-sponsored libelous testimonials',
      ],
      escalationType: 'Dispute Arbitration & Search Snippet Purges',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Forensic Review Audit & Policy Mapping',
      tag: 'Turnaround: Under 12 Hours',
      description:
        'Our compliance analysts inspect each damaging review, cross-reference customer transaction logs, and match the content against specific platform terms of service clauses.',
      details: [
        'Full cataloging of target review URLs and reviewer IDs',
        'Forensic analysis of policy breaches and defamation risks',
        'Fixed price quote backed by neutral Escrow.com protection',
      ],
    },
    {
      step: '02',
      title: 'Dual Escalation: Legal Notice & Push Strategy',
      tag: 'Direct Platform Portals',
      description:
        'We file formal, evidence-backed takedown notices through verified platform legal channels while initiating compliant organic review generation to displace low ratings.',
      details: [
        'Submission of verified proof dossiers to integrity desks',
        'Suppression workflows that push older negative reviews below fold',
        '100% compliant with FTC and platform review guidelines',
      ],
    },
    {
      step: '03',
      title: 'Verification, Cache Purge & Escrow Release',
      tag: 'Zero Financial Risk',
      description:
        'You verify that the offending reviews are permanently deleted or suppressed. Search engine snippet caches are submitted for expedited re-indexing before funds release.',
      details: [
        'Live verification on Google, Trustpilot, Glassdoor, or Sitejabber',
        'Expedited Google search cache purge and snippet refresh',
        'Funds released from Escrow.com only upon confirmed success',
      ],
    },
  ];

  const faqItems = [
    {
      q: 'How does PostWipe remove reviews if platforms claim they never arbitrate disputes?',
      a: 'Platforms like Google, Trustpilot, and Glassdoor employ automated filters that routinely ignore regular user flag buttons. Our team works through specialized legal, content integrity, and terms-of-service compliance channels. We assemble forensic dossiers demonstrating concrete violations: competitor conflict of interest, lack of proof of purchase, harassment, defamatory falsehoods, or breach of employee non-disclosure agreements.',
    },
    {
      q: 'What is the difference between direct review removal and review suppression?',
      a: 'Direct removal permanently deletes the offending review at the source code level of the platform, immediately triggering search snippet cache updates. Review suppression (push-down strategy) is applied when a review does not violate terms but damages your overall star rating. We implement verified, FTC-compliant customer generation flows that push negative ratings deep below the fold where prospective buyers rarely look.',
    },
    {
      q: 'Is this process fully compliant with the FTC and platform guidelines?',
      a: 'Yes, 100%. We never use fake bot accounts, incentivized misleading reviews, or artificial rating manipulation. Every takedown is rooted in verifiable platform policy violations, and every suppression workflow generates authentic, genuine feedback from your real customers in strict compliance with federal consumer protection standards.',
    },
    {
      q: 'How does the Pay-on-Success Escrow.com protection work for reviews?',
      a: 'You never pay upfront retainers to PostWipe. Once your audit is approved, funds are deposited into neutral Escrow.com escrow. We execute the takedown and submit search cache purge requests. Only after you independently verify that the target review is removed or de-indexed are funds released.',
    },
    {
      q: 'What if a competitor or malicious user posts another fake review later?',
      a: 'Every completed direct removal includes our 90-day re-post protection warranty. Because the previous post established a precedent of malicious harassment or policy breach, any identical subsequent attacks violate platform repeat-offender rules, enabling us to expedite immediate removal at zero added cost.',
    },
  ];

  return (
    <main className="flex-1 bg-[#090D16] text-[#F8FAFC]">
      {/* =========================================================
          1. HERO SECTION: REVIEW MANAGEMENT & LIVE VERIFICATION CONSOLE
         ========================================================= */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#090D16] via-[#0B0F19] to-[#090D16] pw-grid-bg border-b border-slate-800">
        <div
          className="pointer-events-none absolute -top-28 right-1/4 w-[560px] h-[560px] rounded-full bg-blue-600/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline, Subheadline, CTAs */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide uppercase shadow-2xs">
                  <Star className="w-4 h-4 text-[#60A5FA] fill-[#60A5FA]/20 shrink-0" />
                  <span>TRUSTPILOT • GOOGLE MAPS • GLASSDOOR • SITEJABBER</span>
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
                Review Management &amp; <span className="pw-hl">Suppression</span> Services.
              </h1>

              <div className="space-y-3.5 text-[16px] sm:text-[17.5px] text-slate-300 leading-relaxed max-w-2xl mb-8">
                <p>
                  Surgical takedown of fake, defamatory, or policy-violating customer reviews across major rating platforms, combined with algorithmic suppression to permanently restore brand trust.
                </p>
                <p className="text-slate-400 text-sm">
                  Protected by <strong className="text-white">Escrow.com Pay-on-Success settlement</strong>: funds are released only after confirmed removal or suppression.
                </p>
              </div>

              {/* Target Audience Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs font-mono font-medium text-slate-400 mr-1">Engineered For:</span>
                <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-200 text-xs font-medium">
                  B2B SaaS Enterprises
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-200 text-xs font-medium">
                  E-Commerce &amp; D2C Brands
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-200 text-xs font-medium">
                  Local Service Chains
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-200 text-xs font-medium">
                  Digital PR &amp; Reputation Agencies
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="#review-audit-form"
                  className="pw-btn-primary inline-flex items-center justify-center gap-2.5 text-white font-extrabold text-[15px] px-7 py-4 rounded-xl border border-blue-500/40 text-center shadow-lg shadow-blue-500/25"
                >
                  <span>Request Free 12h Review Audit</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                <button
                  type="button"
                  onClick={onScheduleCall}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0F172A] hover:bg-slate-800 text-slate-200 font-bold text-[14.5px] px-6 py-4 rounded-xl border border-slate-700 transition-all cursor-pointer shadow-md"
                >
                  <Video className="w-4 h-4 text-[#60A5FA]" />
                  <span>Book Strategy Call</span>
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60A5FA]" />
                  Zero Upfront Retainer
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60A5FA]" />
                  Neutral Escrow.com Holding
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60A5FA]" />
                  Strict Non-Disclosure Guarantee
                </span>
              </div>
            </div>

            {/* Right Column: Live Review Verification Dashboard Widget */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-blue-500/40 via-slate-800 to-slate-800 shadow-2xl">
                <div className="rounded-[15px] bg-[#0F172A] p-6 text-white overflow-hidden">
                  {/* Console Header & Toggle Switch */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <div className="font-mono text-[11px] font-bold tracking-widest text-[#60A5FA] uppercase">
                        LIVE REVIEW VERIFICATION CONSOLE
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Trustpilot &amp; Google Maps Escalation Audit
                      </div>
                    </div>

                    <div className="inline-flex items-center p-1 rounded-lg bg-[#0B0F19] border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setReviewPreviewMode('before')}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                          reviewPreviewMode === 'before'
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewPreviewMode('after')}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                          reviewPreviewMode === 'after'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        After
                      </button>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="py-4 flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-400">Audit Status:</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          reviewPreviewMode === 'after'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                            : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        {reviewPreviewMode === 'after' ? 'De-Indexed & Expunged' : 'Active 1-Star Exposure'}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          reviewPreviewMode === 'after'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                            : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {reviewPreviewMode === 'after' ? 'Cache Purged' : 'Ranking on SERP'}
                      </span>
                    </div>
                  </div>

                  {/* Preview Content Card */}
                  <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800/90 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          ★
                        </div>
                        <span className="font-bold text-sm text-white">Trustpilot &amp; Google Maps</span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">Verified Listing</span>
                    </div>

                    {reviewPreviewMode === 'before' ? (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-1.5 text-rose-400 text-sm">
                          <span>★☆☆☆☆</span>
                          <span className="font-mono text-xs font-bold text-rose-300 ml-1">1.2 / 5.0 (Defamatory Smear)</span>
                        </div>
                        <p className="text-xs text-slate-300 italic leading-relaxed bg-rose-950/20 p-3 rounded-lg border border-rose-500/30">
                          &ldquo;Complete scam company! Do not trust them with your money. Disgruntled customer warning everybody...&rdquo;
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-amber-300 font-mono">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Appearing in Google SERP Page 1 &amp; AI Answer Summaries</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                          <span>★★★★★</span>
                          <span className="font-mono text-xs font-bold text-emerald-300 ml-1">4.9 / 5.0 (Restored Rating)</span>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed font-medium">
                          Defamatory review permanently removed for lack of verified proof of purchase and TOS violation. Google cache purged.
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Clean SERP • Escrow Funds Safely Released</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Console Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Protocol: TOS Compliance Notice</span>
                    <span className="text-[#60A5FA]">Escrow.com Neutral Hold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. TWO-PILLAR METHODOLOGY: REMOVAL VS SUPPRESSION
         ========================================================= */}
      <section className="py-24 bg-[#0B0F19] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
              STRATEGIC ARCHITECTURE
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Two-Pillar Framework for Complete Rating Recovery
            </h2>
            <p className="text-slate-300 text-[16px] leading-relaxed">
              We combine direct policy-backed legal removals with proactive organic review suppression so your brand rating remains pristine from every angle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pillar 1: Direct Removal */}
            <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-xl relative group">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 text-[#60A5FA] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold">Pillar 01</span>
                  <h3 className="text-xl font-bold text-white">Direct Review Removal &amp; Legal Takedowns</h3>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                When a negative review breaches platform policies, contains factual defamation, or originates from a competitor, we invoke official compliance mechanisms to trigger complete source deletion.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 mb-6">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Pay-on-Success Guarantee:</strong> Funds locked safely in Escrow.com until live deletion is independently verified.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Search Snippet Purge:</strong> Google SERP stars and cached text are promptly submitted for expedited re-indexing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">No Public Drama:</strong> Zero defensive comments or public disputes that highlight the review to onlookers.</span>
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 text-xs text-slate-400 font-mono">
                Best For: Fake 1-star reviews, competitor attacks, extortion, non-customers, NDA violations.
              </div>
            </div>

            {/* Pillar 2: Organic Review Suppression */}
            <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative group">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">Pillar 02</span>
                  <h3 className="text-xl font-bold text-white">Organic Review Suppression &amp; Generation</h3>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                For older legacy reviews where platforms are slow to act, we engineer compliant customer feedback workflows that displace low ratings beneath high-converting positive customer feedback.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 mb-6">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Below-the-Fold Push:</strong> Offending negative reviews get pushed to page 2 and beyond, out of sight.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Authentic Client Feedback:</strong> Verified activation sequences targeting your happiest past buyers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Zero Bot Penalties:</strong> 100% compliant with FTC, Google, Trustpilot, and Glassdoor integrity rules.</span>
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 text-xs text-slate-400 font-mono">
                Best For: Unfair but technically policy-compliant reviews, low volume profiles, overall star score rehabilitation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. PLATFORM COVERAGE GRID
         ========================================================= */}
      <section className="py-24 bg-[#090D16] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-2">
                PLATFORM ARBITRATION DESK
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Specialized Escalation Across Major Review Hubs
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Official legal &amp; compliance channels</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform) => {
              const IconComp = platform.icon;
              return (
                <div
                  key={platform.name}
                  className={`p-7 sm:p-8 rounded-2xl bg-[#0F172A] border ${platform.borderColor} shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                          <IconComp className={`w-5 h-5 ${platform.accentColor}`} />
                        </div>
                        <h3 className="font-display text-xl font-bold text-white">{platform.name}</h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px] font-semibold border border-slate-700">
                        {platform.badge}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {platform.description}
                    </p>

                    <div className="bg-[#090D16] rounded-xl p-4 border border-slate-800/80 mb-6">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Common Policy Violations Resolved
                      </div>
                      <ul className="space-y-2">
                        {platform.violations.map((violation, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            <span>{violation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">Arbitration Channel:</span>
                    <span className="text-slate-200 font-semibold">{platform.escalationType}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. 3-STAGE EXECUTION PROCESS
         ========================================================= */}
      <section className="py-24 bg-[#0B0F19] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
              03. TRANSPARENT PROTOCOL
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Our 3-Stage Review Resolution Process
            </h2>
            <p className="text-slate-300 text-[16px]">
              No retainers, no vague suppression promises, and zero upfront risk. You only release payment once the target review is provably deleted or suppressed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-3xl font-black text-blue-400">{step.step}</span>
                    <span className="px-2.5 py-1 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-semibold">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{step.description}</p>
                </div>

                <div className="space-y-2.5 pt-5 border-t border-slate-800">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. COMPARISON SECTION: POSTWIPE VS ALTERNATIVES
         ========================================================= */}
      <section className="py-24 bg-[#090D16] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
              COMPETITIVE BENCHMARK
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              PostWipe Corporate Escalation vs Traditional Options
            </h2>
            <p className="text-slate-300 text-[16px]">
              Why standard PR agencies and DIY reporting consistently fail to protect corporate reputations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6 font-semibold">Evaluation Criteria</th>
                  <th className="py-4 px-6 font-bold text-blue-400 bg-blue-950/30 rounded-t-xl">
                    PostWipe Corporate Escalation
                  </th>
                  <th className="py-4 px-6 font-semibold">Traditional PR Agencies</th>
                  <th className="py-4 px-6 font-semibold">DIY Platform Flagging</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Financial Structure</td>
                  <td className="py-4 px-6 font-bold text-emerald-400 bg-blue-950/20">
                    Pay-on-Success via Escrow.com
                  </td>
                  <td className="py-4 px-6 text-slate-400">$3,000 to $8,000 monthly retainers</td>
                  <td className="py-4 px-6 text-slate-400">Free but zero success rate</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Escalation Channel</td>
                  <td className="py-4 px-6 font-bold text-emerald-400 bg-blue-950/20">
                    Platform Legal &amp; Integrity Desks
                  </td>
                  <td className="py-4 px-6 text-slate-400">Automated press releases &amp; blog posts</td>
                  <td className="py-4 px-6 text-slate-400">Generic public &ldquo;Report&rdquo; button</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Turnaround Speed</td>
                  <td className="py-4 px-6 font-bold text-emerald-400 bg-blue-950/20">
                    12-Hour Audit • 48-72h Escalation
                  </td>
                  <td className="py-4 px-6 text-slate-400">6 to 12 months with no guarantee</td>
                  <td className="py-4 px-6 text-slate-400">Ignored or automated bot rejection</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Search Engine Purge</td>
                  <td className="py-4 px-6 font-bold text-emerald-400 bg-blue-950/20">
                    Expedited Google SERP Snippet Refresh
                  </td>
                  <td className="py-4 px-6 text-slate-400">Passive waiting for natural crawl</td>
                  <td className="py-4 px-6 text-slate-400">None</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Confidentiality</td>
                  <td className="py-4 px-6 font-bold text-emerald-400 bg-blue-950/20">
                    Strict Mutual Non-Disclosure Agreement
                  </td>
                  <td className="py-4 px-6 text-slate-400">Often publicized in agency case studies</td>
                  <td className="py-4 px-6 text-slate-400">Public disputes visible to all customers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. DEDICATED REVIEW AUDIT INTAKE FORM SECTION
         ========================================================= */}
      <section id="review-audit-form" className="py-24 bg-[#0B0F19] text-white border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Guarantees and What Happens Next */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-300 font-mono text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>CONFIDENTIAL 12-HOUR REVIEW AUDIT</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Submit Target Review Profile or Specific Link for Evaluation
              </h2>

              <p className="text-slate-300 text-[15.5px] leading-relaxed">
                Paste the URL of your profile or the offending review from Trustpilot, Google Maps, Glassdoor, or Sitejabber. Our policy specialists will review its eligibility for removal within 12 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A] border border-slate-800 shadow-md">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/70 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      From $300 • Held Safely in Escrow.com
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Zero upfront retainer risk. Funds are released only after you verify the review is provably removed or pushed down.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A] border border-slate-800 shadow-md">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/70 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Strict Mutual Non-Disclosure Agreement
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Your identity, brand name, and submitted review URLs are protected under mutual NDA from the moment you submit this form.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onScheduleCall}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#0F172A] hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm transition-all cursor-pointer shadow-md"
                  >
                    <Video className="w-4 h-4 text-[#60A5FA]" />
                    <span>Schedule a Google Meet / Strategy Call</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Review Intake Form */}
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

                    <div className="p-5 rounded-xl bg-[#0B0F19] border border-slate-800 text-slate-200 text-[15px] leading-relaxed font-medium">
                      Thank you for your submission. If you do not see our email reply within a few hours or if it lands in your spam folder, click below to chat with us instantly on WhatsApp.
                    </div>

                    <div className="space-y-3 font-mono text-xs p-4 rounded-xl bg-[#0B0F19] border border-slate-800">
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Client Contact:</span>
                        <span className="text-white font-sans font-semibold">{submittedCase.name} ({submittedCase.email})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Target URL:</span>
                        <span className="text-blue-300 truncate max-w-[280px]">{submittedCase.url}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Escrow Settlement:</span>
                        <span className="text-emerald-400 font-bold">Neutral Escrow.com Holding</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm py-4 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        <span>Chat With Review Analyst on WhatsApp</span>
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
                          setTargetUrl('');
                          setContext('');
                        }}
                        className="w-full text-center text-xs font-mono text-slate-400 hover:text-white py-2 cursor-pointer"
                      >
                        Submit another review link for evaluation
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="font-display text-xl font-extrabold text-white">
                          Request Your 12-Hour Review Feasibility Audit
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          No upfront payment required • Protected by Mutual NDA
                        </p>
                      </div>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-500/40">
                        From $300
                      </span>
                    </div>

                    {/* Platform Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Target Platform *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['Google Maps', 'Trustpilot', 'Glassdoor', 'Sitejabber'] as const).map((plat) => (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => setPlatform(plat)}
                            className={`p-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer text-center ${
                              platform === plat
                                ? 'bg-blue-950/80 text-white border-blue-500/50 shadow-xs'
                                : 'bg-[#0B0F19] text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {plat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Link */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Target Review Profile or Direct Review URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        placeholder="https://www.trustpilot.com/review/... or Google Maps URL"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:bg-[#0D1527] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm font-mono transition-all"
                      />
                    </div>

                    {/* Preferred Scope */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Preferred Service Objective
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setScope('direct-takedown')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            scope === 'direct-takedown'
                              ? 'border-[#2563EB] ring-2 ring-blue-500/25 bg-blue-950/60 text-white font-semibold'
                              : 'border-slate-800 bg-[#0B0F19] text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">Direct Removal</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Permanent delete via TOS breach
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setScope('suppression')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            scope === 'suppression'
                              ? 'border-[#2563EB] ring-2 ring-blue-500/25 bg-blue-950/60 text-white font-semibold'
                              : 'border-slate-800 bg-[#0B0F19] text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">Push-Down</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Organic suppression below fold
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setScope('full-strategy')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            scope === 'full-strategy'
                              ? 'border-[#2563EB] ring-2 ring-blue-500/25 bg-blue-950/60 text-white font-semibold'
                              : 'border-slate-800 bg-[#0B0F19] text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">Full Strategy</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Dual removal + rating recovery
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jordan Bennett"
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jordan@company.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Company or Brand Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Enterprise Inc."
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm transition-all"
                      />
                    </div>

                    {/* Additional Context */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Context (Why is this review fake, defamatory, or in breach of policy?)
                      </label>
                      <textarea
                        rows={3}
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="e.g. Disgruntled ex-contractor posted false accusations, no purchase history found, extortion attempt made over email..."
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/20 outline-none text-sm resize-none transition-all"
                      />
                    </div>

                    {submitError && (
                      <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="pw-btn-primary w-full py-4 px-6 rounded-xl text-white font-extrabold text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing to Policy Desk...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Review URL for Confidential 12h Feasibility Audit</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </>
                      )}
                    </button>

                    {/* Trust Badges Bar */}
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#60A5FA]" />
                        <span>Escrow.com Pay-on-Success</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Strict Mutual NDA</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>FTC Compliant</span>
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
          7. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================= */}
      <section className="py-24 bg-[#090D16] border-b border-slate-800">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-3">
              KNOWLEDGE BASE
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-[16px]">
              Direct answers to legal, escrow, and operational questions regarding review removal.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
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
                    <span className="font-display text-[16.5px] font-bold text-white">
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

      {/* =========================================================
          8. BOTTOM CALL TO ACTION
         ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#090D16] to-[#0B0F19] text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Stop Losing High-Value Deals to Unfair 1-Star Defamation.
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Submit your target review profile now for an authoritative, confidential 12-hour feasibility audit with zero financial risk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#review-audit-form"
              className="pw-btn-primary inline-flex items-center justify-center gap-2.5 text-white font-extrabold text-[15px] px-8 py-4 rounded-xl border border-blue-500/40 shadow-lg shadow-blue-500/25"
            >
              <span>Submit Review URL for Audit</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#0F172A] hover:bg-slate-800 text-slate-200 font-bold text-[14.5px] px-7 py-4 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <span>Instant Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
