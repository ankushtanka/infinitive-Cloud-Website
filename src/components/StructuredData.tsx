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

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Infinitive Cloud",
  "alternateName": "Infinitive Cloud Solutions",
  "url": "https://infinitivecloud.com",
  "logo": "https://infinitivecloud.com/logo.png",
  "description": "Enterprise-grade IT infrastructure, cloud hosting, web development, AI solutions, and mobile app development company in India. 99.99% uptime, 24×7 support, zero-downtime commitment.",
  "email": "ankush@infinitivecloud.com",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "India"
  },
  "sameAs": [
    "https://www.linkedin.com/company/infinitive-cloud",
    "https://twitter.com/infinitivecloud",
    "https://www.facebook.com/infinitivecloud"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "287",
    "bestRating": "5"
  },
  "founders": [{
    "@type": "Person",
    "name": "Ankush"
  }]
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Infinitive Cloud",
  "url": "https://infinitivecloud.com",
  "description": "Enterprise-grade IT solutions including cloud hosting, VPS, web development, AI solutions, and mobile app development.",
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

// Service Schema Generator
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
    "telephone": "+91-XXXXXXXXXX",
    "email": "ankush@infinitivecloud.com"
  },
  "url": url,
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": url,
    "servicePhone": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
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

// BreadcrumbList Schema Generator
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

// FAQ Schema Generator
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

// Article Schema Generator
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
      "url": "https://infinitivecloud.com/logo.png"
    }
  },
  ...(image && {
    "image": {
      "@type": "ImageObject",
      "url": image
    }
  })
});
