/**
 * useSEO.js
 * Dynamic SEO utility for Mysore Homestays (MDHOA)
 *
 * Usage:
 *   import { setPageSEO, setPropertySEO } from '../utils/useSEO';
 *
 *   // In a page component's useEffect:
 *   useEffect(() => { setPageSEO('explore'); }, []);
 *
 *   // For a specific property detail:
 *   useEffect(() => { if (detail) setPropertySEO(detail); }, [detail]);
 */

const BASE_URL   = 'https://www.mysorestayhomes.com';
const SITE_NAME  = 'Mysore Homestays — MDHOA';
const OG_IMAGE   = `${BASE_URL}/og-image.jpg`;

/* ─── helpers ─────────────────────────────────────────────────────────── */
function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectSchema(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id   = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data, null, 2);
}

/* ─── PAGE SEO configs ─────────────────────────────────────────────────── */
const PAGE_SEO = {
  home: {
    title: 'Best Homestays in Mysore | Book Rooms near Mysore Palace, Kabini & Coorg | MDHOA',
    description: 'Book 100+ verified, government-approved homestays across Mysore, Coorg, Kabini, Chikmagalur and Karnataka. Direct WhatsApp booking. Best prices guaranteed.',
    canonical: `${BASE_URL}/`,
    keywords: 'mysore homestay booking, rooms near mysore palace, kabini resort, coorg homestay, karnataka stays, nature resort mysore, weekend getaway mysore bangalore',
  },
  explore: {
    title: 'Explore All Homestays in Mysore & Karnataka | Filter by Region, Price & Amenities | MDHOA',
    description: 'Browse and filter 100+ verified homestays in Mysore, Coorg, Kabini, Chikmagalur, Sakleshpur and more. Sort by price, rating or distance from tourist places.',
    canonical: `${BASE_URL}/explore`,
    keywords: 'explore mysore homestays, book rooms karnataka, filter homestays by price, stays near kabini, coorg coffee estate stay, chikmagalur nature resort',
  },
  'our-story': {
    title: 'About MDHOA — Mysore District Homestay Owners Association | Verified Stays Karnataka',
    description: 'MDHOA is the official registered body for homestay owners in Mysore. Government-approved by the Department of Tourism, Karnataka since 2010.',
    canonical: `${BASE_URL}/our-story`,
    keywords: 'MDHOA, mysore homestay association, government approved homestay karnataka, about mysore stays',
  },
  contact: {
    title: 'Contact MDHOA | Book a Homestay in Mysore | Direct WhatsApp Booking Karnataka',
    description: 'Contact the Mysore District Homestay Owners Association to list or book a verified homestay. Direct WhatsApp and email enquiries welcome.',
    canonical: `${BASE_URL}/contact`,
    keywords: 'contact mysore homestay, book homestay karnataka, mdhoa contact, whatsapp room booking mysore',
  },
};

/* ─── setPageSEO ───────────────────────────────────────────────────────── */
export function setPageSEO(page = 'home') {
  const cfg = PAGE_SEO[page] || PAGE_SEO.home;

  document.title = cfg.title;

  setMeta('description',             cfg.description);
  setMeta('keywords',                cfg.keywords);
  setLink('canonical',               cfg.canonical);

  // Open Graph
  setMeta('og:title',       cfg.title,       'property');
  setMeta('og:description', cfg.description, 'property');
  setMeta('og:url',         cfg.canonical,   'property');
  setMeta('og:image',       OG_IMAGE,         'property');
  setMeta('og:site_name',   SITE_NAME,        'property');
  setMeta('og:type',        'website',        'property');

  // Twitter
  setMeta('twitter:title',       cfg.title);
  setMeta('twitter:description', cfg.description);
  setMeta('twitter:image',       OG_IMAGE);
  setMeta('twitter:card',        'summary_large_image');
}

/* ─── setPropertySEO ───────────────────────────────────────────────────── */
export function setPropertySEO(property) {
  const {
    name, taluk, district, type, price, rating, reviews,
    desc, img, lat, lng, amenities = [], hasWebsite, phone,
  } = property;

  const slug   = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const url    = `${BASE_URL}/property/${slug}`;
  const title  = `${name} | ${type} in ${taluk}, ${district} | Book Direct | MDHOA`;
  const desc_  = `${name} — ${type} in ${taluk}, ${district}, Karnataka. Starting from ₹${price.toLocaleString('en-IN')}/night. ${desc.slice(0, 120)}...`;
  const kw     = `${name}, ${type} ${taluk}, homestay ${district}, rooms in ${taluk}, stay near ${district}, ${amenities.slice(0,4).join(', ')}, book homestay karnataka`;

  document.title = title;

  setMeta('description',             desc_);
  setMeta('keywords',                kw);
  setLink('canonical',               url);

  setMeta('og:title',       title,  'property');
  setMeta('og:description', desc_,  'property');
  setMeta('og:url',         url,    'property');
  setMeta('og:image',       img,    'property');
  setMeta('og:type',        'place','property');

  setMeta('twitter:title',       title);
  setMeta('twitter:description', desc_);
  setMeta('twitter:image',       img);

  // Hotel JSON-LD
  injectSchema('ld-property', {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name,
    description: desc,
    url,
    image: img,
    address: {
      '@type': 'PostalAddress',
      addressLocality: taluk,
      addressRegion: district,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    priceRange: `₹${price.toLocaleString('en-IN')} per night`,
    starRating: {
      '@type': 'Rating',
      ratingValue: rating,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviews,
      bestRating: 5,
    },
    telephone: `+91${phone}`,
    amenityFeature: amenities.map(a => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    hasMap: `https://maps.google.com/?q=${lat},${lng}`,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    touristType: ['Nature Lovers', 'Family', 'Wildlife', 'Heritage'],
  });

  // Breadcrumb JSON-LD
  injectSchema('ld-breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',              item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Explore Homestays', item: `${BASE_URL}/explore` },
      { '@type': 'ListItem', position: 3, name,                      item: url },
    ],
  });
}

/* ─── resetToDefault ───────────────────────────────────────────────────── */
export function resetToDefault() {
  setPageSEO('home');
  // Remove dynamic schemas
  ['ld-property', 'ld-breadcrumb'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
}