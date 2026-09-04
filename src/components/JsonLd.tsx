import React, { useEffect } from 'react';
import { PageRoute } from '../types';
import { SEO_PAGES } from '../data/seoContent';

interface JsonLdProps {
  route: PageRoute;
}

export const JsonLd: React.FC<JsonLdProps> = ({ route }) => {
  const page = SEO_PAGES[route] || SEO_PAGES.home;

  useEffect(() => {
    // Dynamic updates of document title and meta description
    document.title = page.title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', page.metaDescription);
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', page.title);
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', page.metaDescription);
    }

    // Build JSON-LD structured data
    const schemas: object[] = [];

    // 1. BreadcrumbList
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.label,
        item: `https://calculaenergia.vercel.app/${crumb.route || ''}`
      }))
    });

    // 2. WebApplication schema for Home
    if (route === 'home') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Calculadora de Conta de Energia Elétrica',
        url: 'https://calculaenergia.vercel.app/',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL'
        },
        description: page.metaDescription,
        featureList: [
          'Cálculo de valor estimado de conta de luz por kWh',
          'Conferência de fatura real com detecção de inconsistências',
          'Simulador de medidor analógico de ponteiros e digital LCD',
          'Calculadora de consumo de eletrodomésticos'
        ]
      });
    }

    // 3. FAQPage schema
    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      });
    }

    // 4. HowTo schema for meter readers
    if (page.schemaType === 'HowTo') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: page.h1,
        description: page.subheadline,
        step: page.contentSections[0]?.bulletList?.map((bullet, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: `Passo ${idx + 1}`,
          text: bullet
        })) || [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Localize o mostrador',
            text: 'Identifique se o medidor é analógico com ponteiros ou digital LCD.'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Registre os algarismos',
            text: 'Anote sempre da esquerda para a direita registrando o menor número.'
          }
        ]
      });
    }

    // Inject script tag
    const scriptId = 'json-ld-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemas);

    return () => {
      // clean up if needed
    };
  }, [route, page]);

  return null;
};
