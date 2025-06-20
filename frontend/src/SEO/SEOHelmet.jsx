import { Helmet } from "react-helmet-async";
import { defaultMeta } from "./meta-data";

const defaultSEO = { ...defaultMeta };

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
      {/* <meta name="robots" content={metaRobots} /> */}

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

      {/* Google Analytics (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-BHE36TTB31"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BHE36TTB31');
          `,
        }}
      />
      {/* Facebook Meta Pixel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1340546800369580');
        fbq('track', 'PageView');
      `,
        }}
      />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
