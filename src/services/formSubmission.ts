/**
 * Resilient Multi-Tier Form Submission Service for PostWipe
 *
 * Supports:
 * 1. Custom backend / API endpoint (VITE_AUDIT_ENDPOINT or VITE_API_URL)
 * 2. Web3Forms (VITE_WEB3FORMS_ACCESS_KEY)
 * 3. Formspree (VITE_FORMSPREE_ID)
 * 4. FormSubmit.co AJAX with AbortController timeout
 * 5. FormSubmit.co no-cors fallback (bypasses CORS preflight)
 * 6. Local lead queue + instant WhatsApp / mailto fallback
 */

export interface FormSubmissionPayload {
  subject: string;
  caseId: string;
  name: string;
  email: string;
  url?: string;
  serviceType?: string;
  scope?: string;
  company?: string;
  context?: string;
  scheduledSlot?: string;
  phone?: string;
  calendarLink?: string;
  [key: string]: unknown;
}

export interface SubmissionResult {
  success: boolean;
  method: 'custom-api' | 'web3forms' | 'formspree' | 'formsubmit-ajax' | 'formsubmit-nocors' | 'local-queued';
  message?: string;
}

const DEFAULT_TARGET_EMAIL = 'xboxdhia089@gmail.com';

export async function submitAuditLead(payload: FormSubmissionPayload): Promise<SubmissionResult> {
  const customEndpoint =
    (import.meta.env.VITE_AUDIT_ENDPOINT as string | undefined) ||
    (import.meta.env.VITE_API_URL as string | undefined);

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

  // 1. Try Custom API Endpoint if configured in environment
  if (customEndpoint && customEndpoint.trim() !== '') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(customEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (res.ok) {
        return { success: true, method: 'custom-api' };
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 2. Try Web3Forms if access key is provided
  if (web3FormsKey && web3FormsKey.trim() !== '') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          ...payload,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (res.ok) {
        return { success: true, method: 'web3forms' };
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 3. Try Formspree if ID is provided
  if (formspreeId && formspreeId.trim() !== '') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (res.ok) {
        return { success: true, method: 'formspree' };
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 4. Try FormSubmit AJAX with short 5s timeout to prevent UI freeze
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://formsubmit.co/ajax/${DEFAULT_TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: payload.subject,
        Case_Reference: payload.caseId,
        Client_Name: payload.name,
        Work_Email: payload.email,
        Target_URL: payload.url || 'N/A',
        Service_Type: payload.serviceType || 'Reddit / Media Removal',
        Removal_Scope: payload.scope || 'N/A',
        Company_Or_Brand: payload.company || 'N/A',
        Context_Details: payload.context || 'N/A',
        Scheduled_Slot: payload.scheduledSlot || 'N/A',
        Phone_Or_WhatsApp: payload.phone || 'N/A',
        Calendar_Link: payload.calendarLink || 'N/A',
        _template: 'table',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (res.ok) {
      return { success: true, method: 'formsubmit-ajax' };
    }
  } catch {
    // Continue to next fallback
  }

  // 5. Try FormSubmit simple FormData in no-cors mode (bypasses browser CORS preflight entirely)
  try {
    const formData = new FormData();
    formData.append('_subject', payload.subject);
    formData.append('Case_Reference', payload.caseId);
    formData.append('Client_Name', payload.name);
    formData.append('Work_Email', payload.email);
    formData.append('Target_URL', payload.url || 'N/A');
    if (payload.serviceType) formData.append('Service_Type', payload.serviceType);
    if (payload.scope) formData.append('Removal_Scope', payload.scope);
    if (payload.company) formData.append('Company_Or_Brand', payload.company);
    if (payload.context) formData.append('Context_Details', payload.context);
    if (payload.scheduledSlot) formData.append('Scheduled_Slot', payload.scheduledSlot);
    if (payload.phone) formData.append('Phone_Or_WhatsApp', payload.phone);
    if (payload.calendarLink) formData.append('Calendar_Link', payload.calendarLink);
    formData.append('_captcha', 'false');

    await fetch(`https://formsubmit.co/${DEFAULT_TARGET_EMAIL}`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });

    return { success: true, method: 'formsubmit-nocors' };
  } catch {
    // If ad-blocker or offline, proceed to fallback queue
  }

  // 6. Graceful Local Queue & Instant Direct Dispatch Backup
  try {
    const queueKey = 'postwipe_audit_queue';
    const existingRaw = localStorage.getItem(queueKey);
    const queue = existingRaw ? JSON.parse(existingRaw) : [];
    queue.push({ ...payload, queuedAt: new Date().toISOString() });
    localStorage.setItem(queueKey, JSON.stringify(queue.slice(-20)));
  } catch {
    // Ignore localStorage storage quota errors
  }

  // Return success with local queue fallback so the user seamlessly sees their case ID and WhatsApp dispatch
  return {
    success: true,
    method: 'local-queued',
    message: 'Case details recorded. Please confirm directly via WhatsApp or Email below.',
  };
}

export function buildDirectEmailUrl(details: {
  caseId: string;
  name: string;
  email: string;
  url?: string;
  company?: string;
  context?: string;
}): string {
  const subject = `[${details.caseId}] PostWipe Removal Audit Request - ${details.name}`;
  const body = [
    `Hello PostWipe Compliance Team,`,
    ``,
    `I would like to request an audit for the following target link:`,
    ``,
    `• Case Reference: ${details.caseId}`,
    `• Name: ${details.name}`,
    `• Email: ${details.email}`,
    details.url ? `• Target URL: ${details.url}` : null,
    details.company ? `• Brand / Organization: ${details.company}` : null,
    details.context ? `• Additional Details: ${details.context}` : null,
    ``,
    `Please confirm receipt and provide feasibility and Escrow terms.`,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:${DEFAULT_TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
