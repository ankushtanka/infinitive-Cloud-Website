import { Helmet } from "react-helmet";

interface PageSEOProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  noindex?: boolean;
  ogImage?: string;
}

const PageSEO = ({
  title,
  description,
  canonical,
  keywords,
  noindex,
  ogImage = "https://infinitivecloud.com/og-image.png",
}: PageSEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <link rel="canonical" href={canonical} />
    {noindex ? (
      <meta name="robots" content="noindex, nofollow" />
    ) : (
      <meta name="robots" content="index, follow" />
    )}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content="Infinitive Cloud" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@infinitivecloud" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
  </Helmet>
);

export default PageSEO;
