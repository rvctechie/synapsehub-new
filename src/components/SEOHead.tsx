import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({
  title = 'SynapseHub — AI-Native Business Operating System',
  description = 'Automate your sales, operations, and customer engagement with intelligent AI agents. The all-in-one platform that replaces your CRM, booking system, and automation tools.',
  image = '/og-image.png',
  url = 'https://synapsehub.net',
  type = 'website',
}: SEOHeadProps) {
  const fullTitle = title.includes('SynapseHub') ? title : `${title} | SynapseHub`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="SynapseHub" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
