import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, image, url, schema }) => {
    const siteUrl = 'https://evolvedacademy.co.in';
    const currentUrl = url ? `${siteUrl}${url}` : siteUrl;
    const defaultImage = `${siteUrl}/logo.png`;
    const metaImage = image ? `${siteUrl}${image}` : defaultImage;

    // JSON-LD Structured Data
    const structuredData = schema || {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "EvolvEd Academy",
        "url": siteUrl,
        "logo": defaultImage,
        "description": "Empowering students with Academic Excellence, Tech Skills, and AI mastery.",
        "sameAs": [
            "https://www.instagram.com/evolved_academy",
            "https://www.linkedin.com/company/evolved-academy"
        ]
    };

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href={currentUrl} />
            <meta name="robots" content="index, follow" />

            {/* End standard metadata tags */}

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="EvolvEd Academy" />
            {/* End Facebook tags */}

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />
            {/* End Twitter tags */}

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}

// Default props in case they aren't passed
SEO.defaultProps = {
    title: 'EvolvEd Academy | Future of Education | AI & Tech Skills',
    description: 'Join EvolvEd Academy to master AI, Tech Skills, and Academic Excellence. We offer comprehensive courses for students to become future innovators.',
    name: 'EvolvEd Academy',
    type: 'website',
    image: '/logo.png',
    url: ''
};

export default SEO;
