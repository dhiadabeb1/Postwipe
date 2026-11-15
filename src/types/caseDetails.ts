export interface SubmittedCaseDetails {
  caseId: string;
  name: string;
  email: string;
  url: string;
  company: string;
  context: string;
}

export const WHATSAPP_BASE_URL = 'https://wa.me/21695022973';

export const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
  'e78de3f1-0676-470e-b5a1-092bb88eeccf';

export function buildWhatsAppUrl(details: SubmittedCaseDetails | null): string {
  if (!details) {
    return WHATSAPP_BASE_URL;
  }
  const lines = [
    `Hi PostWipe team, I just submitted my link for a removal audit.`,
    ``,
    `• Client Name: ${details.name}`,
    `• Case Reference: ${details.caseId}`,
    `• Email: ${details.email}`,
    `• Target URL: ${details.url}`,
    details.company ? `• Brand / Company: ${details.company}` : null,
    details.context ? `• Additional Details: ${details.context}` : null,
    ``,
    `Please confirm receipt of my submission and let me know the next steps.`,
  ].filter(Boolean);

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
}
