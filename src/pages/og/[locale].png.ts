// Картинка превью ссылки 1200×630 для каждого языка: окно терминала как в шапке сайта.
// Собирается при сборке из profile.ts, поэтому не отстаёт от текста на странице.
import { readFile } from 'node:fs/promises';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { profiles, type Locale } from '../../data/profile';

export const getStaticPaths = (() =>
	(Object.keys(profiles) as Locale[]).map((locale) => ({ params: { locale } }))) satisfies GetStaticPaths;

// Тёмная палитра из global.css: в лентах мессенджеров она контрастнее светлой.
const color = {
	bg: '#0a0c0b',
	surface: '#121513',
	surface2: '#1a1e1b',
	border: '#262b28',
	text: '#e8ede9',
	muted: '#9aa59e',
	accent: '#3ddc97',
	accentSoft: '#10261c',
};

// Satori не читает woff2, поэтому шрифты берутся из статических пакетов Fontsource (woff).
// У кириллицы своё имя: подмножества с одинаковым именем Satori не объединяет.
const fontFiles = [
	{ name: 'Inter', weight: 700, file: '@fontsource/inter/files/inter-latin-700-normal.woff' },
	{ name: 'Inter Cyrillic', weight: 700, file: '@fontsource/inter/files/inter-cyrillic-700-normal.woff' },
	{ name: 'Mono', weight: 400, file: '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff' },
	{ name: 'Mono Cyrillic', weight: 400, file: '@fontsource/jetbrains-mono/files/jetbrains-mono-cyrillic-400-normal.woff' },
] as const;
const sans = 'Inter, Inter Cyrillic';
const mono = 'Mono, Mono Cyrillic';

type Node = { type: string; props: Record<string, unknown> };

const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
	type,
	props: { style: { display: 'flex', ...style }, children },
});

export const GET: APIRoute = async ({ params }) => {
	const profile = profiles[params.locale as Locale];

	const fonts = await Promise.all(
		fontFiles.map(async ({ name, weight, file }) => ({
			name,
			weight,
			style: 'normal' as const,
			data: await readFile(`node_modules/${file}`),
		})),
	);
	const photo = await sharp('src/assets/photo.jpg').resize(480, 480).jpeg({ quality: 85 }).toBuffer();

	const rows = [
		['role', profile.role],
		['exp', profile.stats.map((s) => `${s.value} ${s.label}`).join(' · ')],
		['stack', profile.stack.join(', ')],
		['loc', `${profile.location} · ${profile.workFormat}`],
		['status', profile.status],
	];
	const palette = [color.text, color.muted, color.border, color.surface2, color.accentSoft, color.accent];

	const tree = h(
		'div',
		{ width: 1200, height: 630, padding: 48, background: color.bg, fontFamily: mono, color: color.text },
		h(
			'div',
			{ width: 1104, height: 534, flexDirection: 'column', borderRadius: 24, border: `2px solid ${color.border}`, background: color.surface, overflow: 'hidden' },
			h(
				'div',
				{ alignItems: 'center', gap: 10, padding: '16px 24px', background: color.surface2 },
				...[0, 1, 2].map(() => h('div', { width: 14, height: 14, borderRadius: 7, background: color.border })),
				h('div', { marginLeft: 10, flexGrow: 1, fontSize: 20, color: color.muted }, 'dogayo@portfolio: ~'),
				h('div', { fontSize: 20, color: color.accent }, 'dogayo.github.io'),
			),
			h(
				'div',
				{ flexGrow: 1, gap: 48, padding: 40, alignItems: 'center' },
				{ type: 'img', props: { src: `data:image/jpeg;base64,${photo.toString('base64')}`, width: 240, height: 240, style: { borderRadius: 20 } } },
				h(
					'div',
					{ width: 732, flexDirection: 'column', gap: 14 },
					h('div', { fontSize: 22, color: color.accent }, '$ neofetch'),
					h('div', { fontFamily: sans, fontWeight: 700, fontSize: 60, letterSpacing: -1.2, lineHeight: 1.1 }, profile.fullName),
					h('div', { height: 2, background: color.border, margin: '6px 0' }),
					...rows.map(([key, value], i) =>
						h(
							'div',
							{ fontSize: 21, lineHeight: 1.35 },
							h('div', { width: 92, flexShrink: 0, color: color.accent }, key),
							h('div', { width: 640, color: i === rows.length - 1 ? color.accent : color.text }, value),
						),
					),
					h('div', { marginTop: 6 }, ...palette.map((c) => h('div', { width: 28, height: 14, background: c }))),
				),
			),
		),
	);

	const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
