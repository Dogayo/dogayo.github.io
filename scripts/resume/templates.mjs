// Три варианта оформления резюме. Каждый получает одно и то же содержание из content.mjs.
const root = new URL('../../', import.meta.url);
const asset = (path) => new URL(path, root).href;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const list = (items, cls = '') => `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
const link = (c) => `<a href="${esc(c.url)}">${esc(c.label)}</a>`;

// Палитра светлой темы сайта (global.css).
const base = `
@import url('${asset('node_modules/@fontsource-variable/inter/index.css')}');
@import url('${asset('node_modules/@fontsource-variable/jetbrains-mono/index.css')}');
:root { --text: #111412; --muted: #4b544e; --accent: #0b7a50; --accent-soft: #e3f3eb; --border: #dce2dd; --surface-2: #f1f3f0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Inter Variable', sans-serif; color: var(--text); font-size: 9.6pt; line-height: 1.45; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
.mono { font-family: 'JetBrains Mono Variable', monospace; }
.muted { color: var(--muted); }
.accent { color: var(--accent); }
h2, h3, li, p { break-inside: avoid; }
`;

const page = (title, css, body, locale) => `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>${base}${css}</style></head><body>${body}</body></html>`;

const skillLine = (group) => group.items.map((s) => s.name).join(', ');
// Решения в данных — короткие фразы с заглавной буквы, поэтому склеиваются в предложения.
const sentences = (items) => items.map((i) => (/[.!?]$/.test(i) ? i : `${i}.`)).join(' ');

/* ---------- A. Классика: одна колонка, без фото, удобно для ATS ---------- */
function classic(c) {
	const { profile: p, labels: l } = c;
	const job = (pos, extra = '') => `
		<div class="job">
			<div class="row"><h3>${esc(pos.title)} · ${esc(pos.organization)}</h3><span class="mono muted">${esc(pos.period)} · ${esc(pos.duration)}</span></div>
			${list(pos.responsibilities, 'bullets')}
			${extra}
		</div>`;
	const project = (pr) => `
		<li class="project">
			<div class="row"><b>${esc(pr.title)}</b><span class="mono muted">${esc(pr.period)}</span></div>
			<p>${esc(pr.task)} ${esc(sentences(pr.solutions))}</p>
			${pr.results.length ? `<p class="accent">${esc(pr.results.join('; '))}</p>` : ''}
			<p class="mono muted small">${esc(pr.tags.join(' · '))}</p>
		</li>`;
	const css = `
		@page { size: A4; margin: 12mm 15mm 11mm; }
		header { padding-bottom: 10px; border-bottom: 2px solid var(--accent); margin-bottom: 4px; }
		h1 { font-size: 22pt; line-height: 1.1; letter-spacing: -0.02em; }
		.role { font-size: 12pt; font-weight: 600; color: var(--accent); margin-top: 2px; }
		.meta { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 2px 14px; font-size: 9pt; }
		h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin: 11px 0 5px; padding-bottom: 3px; border-bottom: 1px solid var(--border); break-after: avoid; }
		h3 { font-size: 10.5pt; }
		h4 { font-size: 9.6pt; margin: 8px 0 4px; color: var(--muted); }
		.row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
		.row .mono { font-size: 8.4pt; white-space: nowrap; }
		.bullets li { position: relative; padding-left: 15px; margin-top: 1px; }
		.bullets li::before { content: '—'; position: absolute; left: 0; color: var(--muted); }
		.job + .job { margin-top: 10px; }
		.projects { display: grid; gap: 5px; }
		.project p { margin-top: 1px; }
		.small { font-size: 8.2pt; }
		.skills { display: grid; grid-template-columns: 150px 1fr; gap: 3px 12px; }
		.skills dt { font-weight: 600; }
		footer { margin-top: 10px; font-size: 8pt; }
	`;
	const body = `
		<header>
			<h1>${esc(p.fullName)}</h1>
			<p class="role">${esc(p.role)}</p>
			<p class="meta"><span>${esc(p.location)} · ${esc(p.workFormat)}</span>${c.contacts.map((x) => `<span>${link(x)}</span>`).join('')}</p>
		</header>
		<h2>${l.summary}</h2><p>${esc(c.summary)}</p>
		<h2>${l.highlights}</h2>${list(c.highlights, 'bullets')}
		<h2>${l.experience}</h2>
		${job(p.experience.lastPosition, `<h4>${l.commercialProjects}</h4><ul class="projects">${c.commercial.map(project).join('')}</ul>`)}
		${job(p.experience.earlyCareer)}
		<h2>${l.personalProject}</h2>
		<ul class="projects">${c.personal.map((pr) => project({ ...pr, title: `${pr.title} — ${pr.repoUrl.replace('https://', '')}` })).join('')}</ul>
		<h2>${l.skills}</h2>
		<dl class="skills">${p.skills.map((g) => `<dt>${esc(g.title)}</dt><dd>${esc(skillLine(g))}</dd>`).join('')}</dl>
		<h2>${l.education}</h2>
		<div class="row"><h3>${esc(p.education.institution)}</h3><span class="mono muted">${esc(p.education.period)}</span></div>
		<p>${esc(p.education.program)}</p>
		${list(p.education.achievements, 'bullets')}
		<h2>${l.courses}</h2>${list(p.courses, 'bullets')}
		<h2>${l.languages}</h2><p>${esc(c.languages.join(' · '))}</p>
		<footer class="muted">${l.nda} ${l.updated}: ${c.updated}.</footer>`;
	return page(`${p.fullName} — ${p.role}`, css, body, c.locale);
}

/* ---------- B. Две колонки: боковая панель с фото, контактами и навыками ---------- */
function sidebar(c) {
	const { profile: p, labels: l } = c;
	const css = `
		@page { size: A4; margin: 0; }
		/* Фон боковой панели повторяется на каждой странице. */
		.stripe { position: fixed; top: 0; bottom: 0; left: 0; width: 68mm; background: var(--surface-2); z-index: -1; }
		.layout { display: grid; grid-template-columns: 68mm 1fr; }
		aside { padding: 14mm 7mm 12mm 9mm; display: flex; flex-direction: column; gap: 13px; }
		main { padding: 14mm 14mm 12mm 9mm; }
		.photo { width: 34mm; height: 34mm; border-radius: 10px; object-fit: cover; }
		aside h2, main h2 { font-size: 9pt; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 6px; break-after: avoid; }
		main h2 { margin-top: 14px; padding-bottom: 3px; border-bottom: 1px solid var(--border); }
		aside li { margin-top: 3px; font-size: 8.8pt; word-break: break-word; }
		.stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
		.stats b { display: block; font-size: 15pt; color: var(--accent); line-height: 1.1; }
		.stats span { font-size: 8pt; color: var(--muted); }
		.tags { display: flex; flex-wrap: wrap; gap: 3px; }
		.tags li { margin: 0; padding: 1px 5px; border-radius: 4px; background: #fff; border: 1px solid var(--border); font-size: 7.8pt; }
		.group + .group { margin-top: 8px; }
		.group p { font-weight: 600; font-size: 8.6pt; margin-bottom: 3px; }
		h1 { font-size: 24pt; line-height: 1.05; letter-spacing: -0.02em; }
		.role { font-size: 12pt; font-weight: 600; color: var(--accent); margin: 4px 0 2px; }
		.row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
		.row .mono { font-size: 8.2pt; white-space: nowrap; }
		h3 { font-size: 10.5pt; }
		.org { color: var(--accent); font-weight: 600; }
		.bullets li { position: relative; padding-left: 12px; margin-top: 2px; }
		.bullets li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-family: 'JetBrains Mono Variable', monospace; font-size: 8pt; top: 1px; }
		.job + .job { margin-top: 10px; }
		.project { padding: 6px 0; border-top: 1px solid var(--border); }
		.project:first-child { border-top: 0; padding-top: 0; }
		.result { display: inline-block; margin-top: 2px; padding: 1px 6px; border-radius: 4px; background: var(--accent-soft); color: var(--accent); font-weight: 600; font-size: 8.6pt; }
		.small { font-size: 8.2pt; }
		footer { margin-top: 12px; font-size: 8pt; }
	`;
	const stats = [...p.stats, { value: '60+', label: c.fpsStat }];
	const body = `
		<div class="stripe"></div>
		<div class="layout">
			<aside>
				<img class="photo" src="${asset('src/assets/photo.jpg')}" alt="${esc(p.fullName)}">
				<div><h2>${l.contacts}</h2><ul>
					<li>${esc(p.location)} · ${esc(p.workFormat)}</li>
					${c.contacts.map((x) => `<li class="mono">${link(x)}</li>`).join('')}
				</ul></div>
				<div class="stats">${stats.map((s) => `<div><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>
				<div><h2>${l.languages}</h2>${list(c.languages)}</div>
				<div><h2>${l.skills}</h2>${p.skills
					.map((g) => `<div class="group"><p>${esc(g.title)}</p><ul class="tags">${g.items.map((s) => `<li>${esc(s.name)}</li>`).join('')}</ul></div>`)
					.join('')}</div>
				<div><h2>${l.education}</h2><ul>
					<li><b>${esc(p.education.institution)}</b></li>
					<li>${esc(p.education.program)} · ${esc(p.education.period)}</li>
					${p.education.achievements.slice(0, 1).map((a) => `<li class="accent">${esc(a)}</li>`).join('')}
				</ul></div>
			</aside>
			<main>
				<h1>${esc(p.fullName)}</h1>
				<p class="role">${esc(p.role)}</p>
				<p>${esc(c.summary)}</p>
				<h2>${l.highlights}</h2>${list(c.highlights, 'bullets')}
				<h2>${l.experience}</h2>
				${[p.experience.lastPosition, p.experience.earlyCareer]
					.map(
						(pos) => `<div class="job">
							<div class="row"><h3>${esc(pos.title)}</h3><span class="mono muted">${esc(pos.period)} · ${esc(pos.duration)}</span></div>
							<p class="org">${esc(pos.organization)}</p>
							${list(pos.responsibilities, 'bullets')}
						</div>`,
					)
					.join('')}
				<h2>${l.projects}</h2>
				<ul>${[...c.commercial, ...c.personal]
					.map(
						(pr) => `<li class="project">
							<div class="row"><h3>${esc(pr.title)}${pr.openSource ? ' <span class="mono small accent">open source</span>' : ''}</h3><span class="mono muted">${esc(pr.period)}</span></div>
							<p>${esc(pr.task)} ${esc(sentences(pr.solutions))}</p>
							${pr.results.map((r) => `<span class="result">${esc(r)}</span>`).join(' ')}
							<p class="mono muted small">${esc(pr.tags.join(' · '))}${pr.repoUrl ? ` · ${esc(pr.repoUrl.replace('https://', ''))}` : ''}</p>
						</li>`,
					)
					.join('')}</ul>
				<footer class="muted">${l.nda} ${l.updated}: ${c.updated}.</footer>
			</main>
		</div>`;
	return page(`${p.fullName} — ${p.role}`, css, body, c.locale);
}

/* ---------- C. Одна страница: всё главное на одном листе, в стиле сайта ---------- */
function onePage(c) {
	const { profile: p, labels: l } = c;
	const css = `
		@page { size: A4; margin: 9mm 12mm 8mm; }
		body { font-size: 8.5pt; line-height: 1.32; }
		header { display: grid; grid-template-columns: 26mm 1fr; gap: 14px; align-items: center; padding: 10px 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface-2); }
		.photo { width: 26mm; height: 26mm; border-radius: 8px; object-fit: cover; }
		.prompt { font-size: 8.4pt; color: var(--accent); }
		h1 { font-size: 20pt; line-height: 1.1; letter-spacing: -0.02em; }
		dl { display: grid; grid-template-columns: 44px 1fr; gap: 1px 8px; margin-top: 5px; font-family: 'JetBrains Mono Variable', monospace; font-size: 8pt; }
		dt { color: var(--accent); }
		.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 8px 0 0; }
		.stats div { padding: 4px 10px; border-radius: 8px; background: var(--accent-soft); }
		.stats b { display: block; font-size: 14pt; color: var(--accent); line-height: 1.1; }
		.stats span { font-size: 7.8pt; color: var(--muted); }
		h2 { font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin: 8px 0 4px; font-family: 'JetBrains Mono Variable', monospace; font-weight: 500; }
		h2::before { content: '// '; }
		h3 { font-size: 9.6pt; }
		.row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
		.row .mono { font-size: 7.8pt; white-space: nowrap; }
		.bullets li { position: relative; padding-left: 11px; margin-top: 1px; }
		.bullets li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-family: 'JetBrains Mono Variable', monospace; font-size: 7.4pt; top: 1px; }
		.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 12px; }
		.card { padding: 4px 0 4px 9px; border-left: 2px solid var(--border); }
		.card p { margin-top: 1px; }
		.result { color: var(--accent); font-weight: 600; }
		.small { font-size: 7.6pt; }
		.two { display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; }
		.skills li { margin-top: 2px; }
		.skills b { font-weight: 600; }
		footer { margin-top: 6px; font-size: 7.4pt; }
	`;
	const stats = [...p.stats, { value: '60+', label: c.fpsStat }];
	const crypton = p.experience.lastPosition;
	const mirball = p.experience.earlyCareer;
	const body = `
		<header>
			<img class="photo" src="${asset('src/assets/photo.jpg')}" alt="${esc(p.fullName)}">
			<div>
				<p class="mono prompt">$ whoami</p>
				<h1>${esc(p.fullName)}</h1>
				<dl>
					<dt>role</dt><dd>${esc(p.role)}</dd>
					<dt>loc</dt><dd>${esc(p.location)} · ${esc(p.workFormat)}</dd>
					<dt>mail</dt><dd>${c.contacts.map(link).join(' · ')}</dd>
				</dl>
			</div>
		</header>
		<div class="stats">${stats.map((s) => `<div><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>
		<h2>${l.summary}</h2><p>${esc(c.summary)}</p>
		<h2>${l.experience}</h2>
		<div class="row"><h3>${esc(crypton.title)} · <span class="accent">${esc(crypton.organization)}</span></h3><span class="mono muted">${esc(crypton.period)} · ${esc(crypton.duration)}</span></div>
		${list(c.highlights.slice(0, 3).concat(crypton.responsibilities[1], crypton.responsibilities[3]), 'bullets')}
		<div class="row" style="margin-top:6px"><h3>${esc(mirball.title)} · <span class="accent">${esc(mirball.organization)}</span></h3><span class="mono muted">${esc(mirball.period)} · ${esc(mirball.duration)}</span></div>
		<p>${esc(sentences(mirball.responsibilities))}</p>
		<h2>${l.projects}</h2>
		<div class="grid">${[...c.commercial, ...c.personal]
			.map(
				(pr) => `<div class="card">
					<div class="row"><h3>${esc(pr.title)}</h3><span class="mono muted">${esc(pr.period.split(',')[0])}</span></div>
					<p>${esc(pr.task)}</p>
					${pr.results.length ? `<p class="result">${esc(pr.results[0])}</p>` : ''}
					<p class="mono muted small">${esc(pr.tags.join(' · '))}</p>
				</div>`,
			)
			.join('')}</div>
		<div class="two">
			<div><h2>${l.skills}</h2><ul class="skills">${p.skills.slice(0, 3).map((g) => `<li><b>${esc(g.title)}:</b> ${esc(skillLine(g))}</li>`).join('')}</ul></div>
			<div>
				<h2>${l.education}</h2>
				<p><b>${esc(p.education.institution)}</b>, ${esc(p.education.period)}</p>
				<p>${esc(p.education.program)}</p>
				<p class="accent">${esc(p.education.achievements[0])}</p>
				<h2>${l.languages}</h2><p>${esc(c.languages.join(' · '))}</p>
				<footer class="muted">${l.nda} ${l.updated}: ${c.updated}.</footer>
			</div>
		</div>`;
	return page(`${p.fullName} — ${p.role}`, css, body, c.locale);
}

export const templates = { classic, sidebar, 'one-page': onePage };
