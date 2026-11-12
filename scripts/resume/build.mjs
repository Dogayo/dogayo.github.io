// Собирает PDF-резюме: HTML из шаблона → печать в PDF через headless Chrome.
// Черновики всех вариантов: node scripts/resume/build.mjs
// PDF для сайта: npm run resume (вариант sidebar, оба языка, в public/).
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { resumeContent } from './content.mjs';
import { templates } from './templates.mjs';

const { values } = parseArgs({
	options: {
		out: { type: 'string', default: 'resume/05_PDF_резюме' },
		variant: { type: 'string', multiple: true },
		locale: { type: 'string', multiple: true, default: ['ru'] },
		/** Имя файла; {locale} и {variant} подставляются. */
		name: { type: 'string', default: 'Dogaev_Flutter_{locale}_{variant}' },
	},
});

const chrome = process.env.CHROME_PATH ?? 'google-chrome';
const outDir = resolve(values.out);
mkdirSync(outDir, { recursive: true });
const work = join(tmpdir(), 'resume-build');
mkdirSync(work, { recursive: true });

for (const locale of values.locale) {
	const content = resumeContent(locale);
	for (const name of values.variant ?? Object.keys(templates)) {
		const html = join(work, `${name}-${locale}.html`);
		const pdf = join(outDir, `${values.name.replace('{locale}', locale).replace('{variant}', name)}.pdf`);
		writeFileSync(html, templates[name](content));
		execFileSync(chrome, ['--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, html], { stdio: 'ignore' });
		console.log(pdf);
	}
}
