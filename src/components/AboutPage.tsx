import React from 'react';
import {
  ShieldCheck,
  Lock,
  Scale,
  Globe,
  CheckCircle2,
  ArrowRight,
  Video,
  EyeOff,
  Award,
  Building2,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';

interface AboutPageProps {
  onRequestAudit: () => void;
  onScheduleCall: () => void;
  whatsAppUrl: string;
}

export function AboutPage({
  onRequestAudit,
  onScheduleCall,
  whatsAppUrl,
}: AboutPageProps) {
  const leadershipPillars = [
    {
      icon: Scale,
      title: 'Corporate Policy & Legal Escalation',
      description:
        'Instead of begging unpaid subreddit moderators or filing automated support tickets, PostWipe escalates verified evidence dossiers directly through platform Trust & Safety, intellectual property, and publisher compliance desks.',
    },
    {
      icon: Lock,
      title: 'Zero-Risk Escrow.com Settlement',
      description:
        'Traditional PR agencies bill thousands monthly with no deletion guarantee. Every PostWipe removal engagement operates on a 100% Pay-on-Success structure held in neutral Escrow.com custody until permanent deletion is verified.',
    },
    {
      icon: Globe,
      title: 'Full Search & AI Cache Remediation',
      description:
        'Removing a link at the source is only half the job. We immediately process dead-link cache purges across Google, Bing, ChatGPT Search, and Perplexity so defamatory snippets disappear rapidly across search and AI answer engines.',
    },
    {
      icon: EyeOff,
      title: 'Strict Mutual Non-Disclosure',
      description:
        'Every audit, strategy call, and takedown filing is protected under binding Mutual NDA from first submission, leaving zero public trace or Streisand-effect risk.',
    },
  ];

  const practiceAreas = [
    {
      name: 'Reddit Thread & Comment Deletion',
      detail: 'Sitewide policy compliance takedowns for defamatory threads, smear comments, and hijacked brand queries.',
    },
    {
      name: 'News & Media Article Removal',
      detail: 'Editorial compliance outreach, privacy retractions, and Google News de-indexing across online media outlets.',
    },
    {
      name: 'Review Management & Suppression',
      detail: 'Legal and Terms of Service removals across Google Maps, Trustpilot, Glassdoor, and Sitejabber.',
    },
    {
      name: 'Agency White-Label Partnerships',
      detail: 'Confidential back-end compliance execution for digital PR firms, legal counsel, and reputation agencies.',
    },
  ];

  return (
    <main className="flex-1 bg-[#090D16] text-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative pt-14 pb-20 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#090D16] via-[#0B0F19] to-[#090D16] pw-grid-bg border-b border-slate-800">
        <div
          className="pointer-events-none absolute -top-28 left-1/3 w-[520px] h-[520px] rounded-full bg-blue-600/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
              <Building2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
              <span>About PostWipe • Corporate Reputation Compliance</span>
            </div>

            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.06] mb-6">
              Permanent <span className="pw-hl">Content Removal</span> Built on Legal Compliance &amp; Escrow Accountability.
            </h1>

            <p className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed mb-8">
              PostWipe is an institutional online reputation management and digital compliance firm serving B2B founders, SaaS enterprises, public figures, and corporate legal teams. We eliminate defamatory Reddit discussions, hostile consumer reviews, and damaging media publications at the source, with zero upfront financial exposure.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onRequestAudit}
                className="pw-btn-primary inline-flex items-center justify-center gap-2.5 text-white font-extrabold text-[15px] px-7 py-4 rounded-xl border border-blue-500/40 cursor-pointer shadow-lg shadow-blue-500/25"
              >
                <span>Request Free 12-Hour Audit</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onScheduleCall}
                className="inline-flex items-center justify-center gap-2.5 bg-[#0F172A] hover:bg-slate-800 text-slate-200 font-bold text-[14.5px] px-6 py-4 rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                <Video className="w-4 h-4 text-[#60A5FA]" />
                <span>Schedule Strategy Call</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Overview & Verified Trust Card */}
      <section className="py-20 bg-[#0B0F19] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 text-slate-300 text-[15.5px] leading-relaxed">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
                ENTITY MANDATE &amp; METHODOLOGY
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white">
                Why PostWipe Replaced Monthly Retainers With Verified Source Deletion
              </h2>
              <p>
                Modern search architecture changed permanently when Google prioritized user-generated Reddit threads, review portals, and AI answer summaries on Page 1 for branded commercial queries. Legacy PR agencies responded by selling expensive $5,000/month suppression campaigns that fail to displace high-authority platforms.
              </p>
              <p>
                PostWipe was established to solve that structural gap. Our analysts combine deep knowledge of platform Terms of Service, privacy statutes, intellectual property protections, and search engine cache protocols to achieve permanent removals without relying on public comment wars or moderator appeals.
              </p>
              <p>
                Every qualified removal engagement is governed by a formal Mutual Non-Disclosure Agreement, includes a lifetime re-deletion warranty on covered takedowns, and settles exclusively through neutral Escrow.com protection.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-7 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-[#60A5FA]" />
                    <span className="font-display font-bold text-white text-base">
                      Entity Verification &amp; Credentials
                    </span>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/40 font-bold">
                    postwipe.com
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-white">Escrow.com Protected Settlement</div>
                      <p className="text-xs text-slate-400">100% Pay-on-Success model with zero upfront retainer risk.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-white">Lifetime Re-Deletion Guarantee</div>
                      <p className="text-xs text-slate-400">Ongoing protection against repeat uploads of resolved violations.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-white">Direct Compliance Desk</div>
                      <p className="text-xs text-slate-400 font-mono">support@postwipe.com</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.trustpilot.com/review/postwipe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-[#0B0F19] hover:bg-slate-800/70 border border-emerald-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span className="text-emerald-400">★</span> Verified on Trustpilot
                    </span>
                    <span className="text-emerald-300 font-mono text-xs font-bold">4.9 / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
                    <span>Read independent verified client reviews</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Operational Pillars */}
      <section className="py-20 bg-[#090D16] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-2">
              OPERATIONAL STANDARDS
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white">
              Core Principles Governing Every Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadershipPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-7 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-blue-500/40 transition-all shadow-lg space-y-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-950/70 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{pillar.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-[#0B0F19] border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-2">
                PRACTICE DIVISIONS
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white">
                Specialized Content Removal Divisions
              </h2>
            </div>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>Direct Compliance Desk on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {practiceAreas.map((area) => (
              <div
                key={area.name}
                className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-2.5"
              >
                <FileCheck2 className="w-5 h-5 text-[#60A5FA]" />
                <h3 className="font-display text-base font-bold text-white">{area.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{area.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
