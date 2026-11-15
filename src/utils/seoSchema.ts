export interface SchemaFaqItem {
  q: string;
  a: string;
}

export interface ArticleSchemaInput {
  id: string;
  slug: string;
  title: string;
  subheadline: string;
  executiveSummary: string;
  publishedDateIso: string;
  updatedDateIso: string;
  tags: string[];
  author: {
    name: string;
    role: string;
  };
  wordCount?: number;
  sections?: {
    heading: string;
    paragraphs: string[];
  }[];
  faqs: SchemaFaqItem[];
}

export const HOMEPAGE_ORGANIZATION_SCHEMA = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': 'https://postwipe.com/#organization',
  name: 'PostWipe',
  alternateName: 'PostWipe Content Removal & Search De-Indexing',
  url: 'https://postwipe.com/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://postwipe.com/favicon-96x96.png',
    width: 96,
    height: 96,
  },
  image: 'https://postwipe.com/og-image.png',
  description:
    'Corporate online reputation compliance firm specializing in permanent Reddit thread deletion, review takedowns, news article removal, and Google/AI search de-indexing backed by Escrow.com.',
  email: 'support@postwipe.com',
  sameAs: [
    'https://www.trustpilot.com/review/postwipe.com',
    'https://wa.me/21695022973',
  ],
  priceRange: 'From $300',
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Compliance & Audit Desk',
    email: 'support@postwipe.com',
    availableLanguage: ['English'],
  },
  knowsAbout: [
    'Reddit Post & Comment Removal',
    'Google Search Engine De-Indexing',
    'News & Media Article Removal',
    'Review Management & Suppression',
    'Defamation & Editorial Compliance',
    'DMCA & Privacy Takedowns',
    'Escrow-Protected Reputation Management',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pay-on-Success Content Removal Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': 'https://postwipe.com/#reddit-service',
          name: 'Reddit Post & Comment Removal',
          serviceType: 'Reddit Content Removal & AI Search Cache Clearing',
          provider: { '@id': 'https://postwipe.com/#organization' },
          url: 'https://postwipe.com/',
          description:
            'Permanent source deletion of defamatory Reddit threads and comments via corporate policy compliance, followed by Google, Bing, ChatGPT, and Perplexity cache de-indexing.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': 'https://postwipe.com/news-removal#service',
          name: 'News & Media Article Removal',
          serviceType: 'Online Media Takedown & Google Search De-Indexing',
          provider: { '@id': 'https://postwipe.com/#organization' },
          url: 'https://postwipe.com/news-removal',
          description:
            'Complete source removal of damaging news articles, online publications, and digital press coverage paired with Google search de-indexing on a 100% Escrow-protected Pay-on-Success basis.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': 'https://postwipe.com/reviews#service',
          name: 'Review Management & Suppression Services',
          serviceType: 'Review Removal & Brand Rating Recovery',
          provider: { '@id': 'https://postwipe.com/#organization' },
          url: 'https://postwipe.com/reviews',
          description:
            'Removal of fake, defamatory, or policy-violating reviews across Google Maps, Trustpilot, Glassdoor, and Sitejabber backed by Escrow.com protection.',
        },
      },
    ],
  },
};

export const HOMEPAGE_FIVE_FAQS: SchemaFaqItem[] = [
  {
    q: 'What if the subreddit moderators already ignored or rejected our takedown request?',
    a: 'Subreddit moderators are unpaid community volunteers who frequently reject business requests, or worse, publicly screenshot your message to mock your brand. PostWipe never contacts volunteer subreddit moderators. Our specialists escalate directly through corporate Trust & Safety, intellectual property, and sitewide Content Policy compliance channels.',
  },
  {
    q: 'How does the Escrow.com payment protection work?',
    a: 'After our free 12-hour audit confirms your link is actionable, we provide a fixed quote starting from $300. Your payment is deposited into a regulated Escrow.com transaction. Funds remain locked in escrow while we execute the removal and are released to PostWipe only after you verify the target content is permanently deleted. If we do not remove it within the agreed timeframe, Escrow.com refunds 100% of your deposit.',
  },
  {
    q: 'Should we choose a Targeted Comment Wipe or a Full Thread Deletion?',
    a: 'If the main Reddit post is neutral and only one or two replies contain false allegations, a Targeted Comment Wipe removes those specific replies cleanly. If the thread title itself contains damaging keywords or false accusations ranking on Google, we recommend a Full Thread Deletion so the entire URL can be de-indexed from Google, Bing, ChatGPT, and Perplexity.',
  },
  {
    q: 'How fast do Google, ChatGPT, and Perplexity stop showing the deleted Reddit thread?',
    a: 'Once a Reddit thread or article is permanently deleted at the source, Google and Bing normally take weeks to recrawl it naturally. PostWipe accelerates this immediately by submitting verified dead-link cache purge requests across search engines, clearing the snippet from Google search results and AI answer engines within 24 to 72 hours.',
  },
  {
    q: 'Will the original poster or competitors know our company hired PostWipe?',
    a: 'No. Every audit and policy escalation is conducted under strict Mutual NDA. Because removals are executed through formal platform policy enforcement rather than public replies or mass-reporting bots, there is zero public footprint linking the removal back to your brand.',
  },
];

export function buildHomepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      HOMEPAGE_ORGANIZATION_SCHEMA,
      {
        '@type': 'FAQPage',
        '@id': 'https://postwipe.com/#faq',
        mainEntity: HOMEPAGE_FIVE_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };
}

export function buildAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      HOMEPAGE_ORGANIZATION_SCHEMA,
      {
        '@type': 'AboutPage',
        '@id': 'https://postwipe.com/about#webpage',
        url: 'https://postwipe.com/about',
        name: 'About PostWipe | Enterprise Reputation & Content Removal Agency',
        description:
          'Learn how PostWipe removes defamatory Reddit threads, damaging news articles, fake reviews, and Google search results on a 100% Pay-on-Success model via Escrow.com.',
        inLanguage: 'en-US',
        about: { '@id': 'https://postwipe.com/#organization' },
        mainEntity: { '@id': 'https://postwipe.com/#organization' },
        publisher: { '@id': 'https://postwipe.com/#organization' },
      },
    ],
  };
}

export function buildArticlePageSchema(article: ArticleSchemaInput) {
  const articleUrl = `https://postwipe.com/insights/${article.slug}`;
  const bodyWords =
    article.wordCount ??
    (article.sections || [])
      .flatMap((sec) => sec.paragraphs)
      .join(' ')
      .trim()
      .split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      HOMEPAGE_ORGANIZATION_SCHEMA,
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        url: articleUrl,
        headline: article.title,
        description: article.executiveSummary,
        image: 'https://postwipe.com/og-image.png',
        datePublished: article.publishedDateIso,
        dateModified: article.updatedDateIso,
        articleSection: article.tags[0] || 'Compliance & Reputation',
        keywords: article.tags.join(', '),
        wordCount: bodyWords,
        author: {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role,
          worksFor: { '@id': 'https://postwipe.com/#organization' },
        },
        publisher: { '@id': 'https://postwipe.com/#organization' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: article.faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };
}

export function buildServicePageSchema(page: 'news' | 'reviews') {
  const isNews = page === 'news';
  const pageUrl = isNews ? 'https://postwipe.com/news-removal' : 'https://postwipe.com/reviews';
  const pageTitle = isNews
    ? 'News & Media Article Removal | PostWipe'
    : 'Review Management & Suppression Services | PostWipe';
  const pageDescription = isNews
    ? 'Complete removal of damaging news articles and online media publications paired with Google search de-indexing on a Pay-on-Success model via Escrow.com.'
    : 'Removal and suppression of defamatory reviews on Google Maps, Trustpilot, Glassdoor, and Sitejabber protected by Escrow.com.';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      HOMEPAGE_ORGANIZATION_SCHEMA,
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        about: { '@id': 'https://postwipe.com/#organization' },
        publisher: { '@id': 'https://postwipe.com/#organization' },
      },
    ],
  };
}

const MANAGED_SCHEMA_SCRIPT_ID = 'postwipe-jsonld';

/**
 * Guarantees exactly one <script type="application/ld+json"> element exists in document.head
 * by reusing the SSR/static placeholder script tag (#postwipe-jsonld) and removing any duplicates.
 */
export function syncJsonLdSchema(schemaPayload: Record<string, unknown>): void {
  if (typeof document === 'undefined') return;

  const allJsonLdScripts = Array.from(
    document.querySelectorAll('script[type="application/ld+json"]')
  ) as HTMLScriptElement[];

  let primaryScript = document.getElementById(
    MANAGED_SCHEMA_SCRIPT_ID
  ) as HTMLScriptElement | null;

  for (const scriptEl of allJsonLdScripts) {
    if (scriptEl !== primaryScript) {
      if (!primaryScript) {
        scriptEl.id = MANAGED_SCHEMA_SCRIPT_ID;
        primaryScript = scriptEl;
      } else {
        scriptEl.remove();
      }
    }
  }

  if (!primaryScript) {
    primaryScript = document.createElement('script');
    primaryScript.id = MANAGED_SCHEMA_SCRIPT_ID;
    primaryScript.type = 'application/ld+json';
    document.head.appendChild(primaryScript);
  }

  primaryScript.textContent = JSON.stringify(schemaPayload, null, 2);
}
