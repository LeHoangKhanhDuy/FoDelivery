import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeoConfig } from '@/app/seo/seoConfig';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://fodelivery.ai').replace(/\/$/, '');

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
};

export const SeoManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getRouteSeoConfig(pathname);
    const pageUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    document.title = seo.title;
    document.documentElement.lang = 'vi';

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.robots);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
  }, [pathname]);

  return null;
};
