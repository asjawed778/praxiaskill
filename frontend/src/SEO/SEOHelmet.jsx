import { Helmet } from "react-helmet-async";
import { detailedSEO } from "./data";

const defaultSEO = { ...detailedSEO }

const SEOHelmet = ({
  title,
  description,
  keywords,
  image,
  url,
  robots,
  schema,
  lang = "en",
  favicon = "/favicon.ico",
}) => {
  const metaTitle = title || defaultSEO.title;
  const metaDescription = description || defaultSEO.description;
  const metaKeywords = keywords || defaultSEO.keywords;
  const metaImage = image || defaultSEO.image;
  const metaUrl = url || defaultSEO.url;
  const metaRobots = robots || defaultSEO.robots;

  return (
    <Helmet>
      {/* HTML Language Attribute */}
      <html lang={lang} />

      {/* Title and Meta */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={metaRobots} />

      {/* Viewport for responsive SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      <link rel="canonical" href={metaUrl} />

      {/* Favicon */}
      <link rel="icon" href={favicon} />

      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-43PRGD2MHL"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-43PRGD2MHL');
          `,
        }}
      />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
