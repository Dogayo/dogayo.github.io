// Карта сайта: обе языковые версии со ссылками друг на друга.
import type { APIRoute } from 'astro';
import { localePaths, type Locale } from '../data/profile';

export const GET: APIRoute = ({ site }) => {
	const pages = (Object.entries(localePaths) as [Locale, string][]).map(([lang, path]) => ({
		lang,
		href: new URL(path, site).href,
	}));
	const alternates = pages
		.map(({ lang, href }) => `\t\t<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
		.join('\n');
	const urls = pages.map(({ href }) => `\t<url>\n\t\t<loc>${href}</loc>\n${alternates}\n\t</url>`).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
