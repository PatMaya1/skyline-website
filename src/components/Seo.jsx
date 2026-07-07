import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../seo/siteConfig';

/**
 * Componente de SEO por página. Aprovecha el soporte nativo de metadata de
 * React 19: los <title>, <meta> y <link> renderizados aquí se elevan al <head>
 * y sobreescriben los valores por defecto de index.html en cada navegación.
 *
 * Props:
 *  - title:        título de la pestaña/SERP (se le añade " | Skyline IT" salvo la home)
 *  - description:  meta description (~150-160 caracteres)
 *  - path:         ruta de la página (para canonical y og:url). Ej: "/planes"
 *  - image:        URL absoluta de la imagen OG (opcional)
 *  - type:         og:type ("website" | "article"). Default "website"
 *  - noindex:      si true, evita indexación de la página
 *  - jsonLd:       objeto u array de objetos JSON-LD específicos de la página
 *  - keywords:     string de keywords específicas (opcional)
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
  keywords,
}) {
  const url = absoluteUrl(path);
  const fullTitle =
    !title || title === SITE_NAME
      ? title || SITE_NAME
      : `${title} | ${SITE_NAME}`;
  const ogImage = /^https?:\/\//i.test(image) ? image : absoluteUrl(image);
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* JSON-LD específico de la página */}
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
