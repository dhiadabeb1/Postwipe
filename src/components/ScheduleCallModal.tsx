import React, { useState } from 'react';
import {
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Globe,
  Check,
  ExternalLink,
  PhoneCall,
  Calendar,
  X,
  Video,
  Mail,
} from 'lucide-react';
import { PostWipeLogoMark } from './PostWipeLogoMark';
import { buildDirectEmailUrl } from '../services/formSubmission';
import {
  buildWhatsAppUrl,
  WEB3FORMS_ACCESS_KEY,
  type SubmittedCaseDetails,
} from '../types/caseDetails';

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

interface ScheduleCallModalProps {
  onClose: () => void;
}

export function ScheduleCallModal({ onClose }: ScheduleCallModalProps) {
  const upcomingDays = getUpcomingBusinessDays(8);
  const detectedTimezone =
    typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New PostWipe Strategy Call Scheduled (${generatedCaseId}) - ${cleanName}`,
          from_name: 'PostWipe Calendar Desk',
          case_reference: generatedCaseId,
          service_type: `15-Minute Strategy Call (${callPlatform})`,
          name: cleanName,
          email: cleanEmail,
          phone_or_whatsapp: cleanPhone || 'Not provided',
          scheduled_slot: slotSummary,
          target_reddit_url: cleanUrl,
          google_calendar_link: gcalUrl,
          botcheck: '',
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
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
        setCallError(
          data.message ||
            'Unable to schedule call. Please verify your Web3Forms access key or reach out on WhatsApp.'
        );
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Network error while scheduling call';
      setCallError(`${errorMsg}. Please connect directly via WhatsApp.`);
    } finally {
      setIsCallSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-call-title"
    >
      <div className="bg-[#0F172A] text-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden my-8">
        <div className="px-6 py-4 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="schedule-call-title" className="font-display text-lg font-extrabold text-white">
                  PostWipe Appointment Scheduler
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300 font-mono text-[10px] font-bold">
                  GOOGLE CALENDAR &amp; MEET
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Book a confidential 15-minute Reddit removal &amp; Escrow consultation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 bg-[#0B0F19]/90 p-6 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <PostWipeLogoMark className="w-9 h-9" />
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Host</div>
                  <div className="font-display font-extrabold text-sm text-white">
                    PostWipe Senior Policy Team
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-display text-xl font-extrabold text-white leading-snug">
                  15-Min Reddit Removal Strategy Call
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Live feasibility review of your target Reddit URL, Google/AI cache purge timeline, and Escrow.com milestone setup.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#60A5FA] shrink-0" />
                  <span>15 Minutes • 1-on-1 Confidential</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-[#60A5FA] shrink-0" />
                  <span>Google Meet / WhatsApp / Phone</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#60A5FA] shrink-0" />
                  <span className="truncate">Timezone: {detectedTimezone}</span>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
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
                          ? 'bg-blue-950/80 border-[#2563EB] text-blue-200 shadow-xs'
                          : 'bg-[#0F172A] border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {plat === 'Google Meet' ? (
                          <Video className="w-3.5 h-3.5 text-[#60A5FA]" />
                        ) : (
                          <PhoneCall className="w-3.5 h-3.5 text-[#60A5FA]" />
                        )}
                        {plat}
                      </span>
                      {callPlatform === plat && <Check className="w-3.5 h-3.5 text-[#60A5FA]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0F172A] border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
              <span>Protected by Mutual NDA &amp; Escrow.com</span>
            </div>
          </div>

          <div className="md:col-span-7 p-6">
            {callBookedCase ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 text-[#60A5FA] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase font-bold text-[#60A5FA]">
                      Appointment Scheduled
                    </span>
                    <h4 className="font-display text-xl font-extrabold text-white">
                      Reference: {callBookedCase.caseId}
                    </h4>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 text-slate-300 text-sm leading-relaxed font-medium">
                  Thank you for your submission. If you do not see our email reply within a few hours or if it lands in your spam folder, click below to chat with us instantly on WhatsApp.
                </div>

                <div className="rounded-xl bg-blue-950/40 border border-blue-500/30 p-4 font-mono text-xs space-y-1.5 text-slate-300">
                  <div>
                    <span className="text-slate-400">Attendee:</span>{' '}
                    <strong className="text-white">{callBookedCase.name}</strong> ({callBookedCase.email})
                  </div>
                  <div>
                    <span className="text-slate-400">When:</span>{' '}
                    <strong className="text-[#60A5FA]">{callBookedCase.context}</strong>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={bookedCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm py-3.5 px-5 rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Add Appointment to Google Calendar</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={buildWhatsAppUrl(callBookedCase)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0B0F19] hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-sm py-3 px-5 rounded-xl transition-all cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-[#60A5FA]" />
                    <span>WhatsApp</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={buildDirectEmailUrl(callBookedCase)}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0B0F19] hover:bg-slate-800 text-slate-200 border border-slate-700 font-extrabold text-xs py-3 px-5 rounded-xl transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#60A5FA]" />
                    <span>Dispatch Direct Email Copy</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            ) : callStep === 'slot' ? (
              <div className="space-y-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
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
                              : 'bg-[#0B0F19] border-slate-700 hover:border-blue-500 text-slate-300'
                          }`}
                        >
                          <div className={`text-[10px] font-mono uppercase ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            {d.dayName}
                          </div>
                          <div className="font-display font-extrabold text-base leading-tight my-0.5">
                            {d.dayNum}
                          </div>
                          <div className={`text-[10px] font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            {d.monthShort}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      2. Select an Available Time ({selectedDayObj?.fullLabel})
                    </span>
                    <span className="text-[11px] font-mono text-[#60A5FA] font-semibold">
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
                              ? 'bg-blue-950/90 border-2 border-[#2563EB] text-blue-300'
                              : 'bg-[#0B0F19] border-slate-700 hover:border-blue-500 text-slate-300'
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
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer"
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
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-950/50 border border-blue-500/30 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-blue-200">
                    <Calendar className="w-4 h-4 text-[#60A5FA]" />
                    <span>
                      {selectedDayObj?.fullLabel} • {callTimeSlot} ({callPlatform})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCallStep('slot')}
                    className="text-[#60A5FA] hover:underline font-bold cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={callName}
                      onChange={(e) => setCallName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Email for Calendar Invite *
                    </label>
                    <input
                      type="email"
                      required
                      value={callEmail}
                      onChange={(e) => setCallEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={callPhone}
                      onChange={(e) => setCallPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Target Reddit URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={callUrl}
                      onChange={(e) => setCallUrl(e.target.value)}
                      placeholder="https://www.reddit.com/r/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0B0F19] text-white placeholder:text-slate-500 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-mono"
                    />
                  </div>
                </div>

                {callError && (
                  <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{callError}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCallStep('slot')}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                  >
                    ← Back to Calendar
                  </button>
                  <button
                    type="submit"
                    disabled={isCallSubmitting}
                    className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer"
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
  );
}

export default ScheduleCallModal;
