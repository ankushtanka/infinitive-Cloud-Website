import { Helmet } from "react-helmet";

interface StructuredDataProps {
  data: object;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Infinitive Cloud",
  "alternateName": "Infinitive Cloud Private Limited",
  "url": "https://infinitivecloud.com",
  "logo": "https://infinitivecloud.com/og-image.png",
  "description": "Premium cloud hosting, VPS, dedicated servers, and domain services in India. 99.99% uptime SLA, 24×7 support, and 15-day free trial.",
  "email": "info@infinitivecloud.com",
  "telephone": "+91-7737393087",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.linkedin.com/company/infinitive-cloud",
    "https://twitter.com/infinitivecloud"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "287",
    "bestRating": "5"
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Infinitive Cloud",
  "url": "https://infinitivecloud.com",
  "description": "Premium cloud hosting, VPS, dedicated servers & domain services in India.",
  "publisher": {
    "@type": "Organization",
    "name": "Infinitive Cloud"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://infinitivecloud.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const createServiceSchema = (
  serviceName: string,
  description: string,
  url: string,
  serviceType: string,
  priceRange?: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceType,
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "Infinitive Cloud",
    "url": "https://infinitivecloud.com",
    "telephone": "+91-7737393087",
    "email": "info@infinitivecloud.com"
  },
  "url": url,
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  ...(priceRange && {
    "offers": {
      "@type": "Offer",
      "priceRange": priceRange,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  })
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createArticleSchema = (
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  image?: string
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "url": url,
  "datePublished": datePublished,
  "dateModified": dateModified,
  "author": {
    "@type": "Organization",
    "name": "Infinitive Cloud"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Infinitive Cloud",
    "logo": {
      "@type": "ImageObject",
      "url": "https://infinitivecloud.com/og-image.png"
    }
  },
  ...(image && { "image": { "@type": "ImageObject", "url": image } })
});
