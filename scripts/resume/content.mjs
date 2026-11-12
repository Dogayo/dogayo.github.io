// Содержание резюме. Факты (опыт, проекты, навыки, образование, контакты) берутся из profile.ts,
// здесь — только то, чего нет на сайте: выжимка для HR, ключевые достижения, языки и подписи.
import { profiles } from '../../src/data/profile.ts';

const extra = {
	ru: {
		summary:
			'Flutter-разработчик с 5+ годами коммерческой разработки на Flutter, до этого 1,5 года на Java. 4,5 года в Crypton Studio делал крипто- и финтех-приложения: биржи, кошельки, необанки. Веду приложения от архитектуры до релиза в App Store и Google Play: проектирую архитектуру и дизайн-системы, провожу код-ревью, планирую задачи команды.',
		highlights: [
			'Ведущий разработчик мобильной криптобиржи: графики и стакан держат 60+ FPS при потоке котировок по WebSocket',
			'Собрал Starter Kit компании (Clean Architecture, шаблоны Mason, генерация кода по Swagger) — на нём стартовали 3+ проекта',
			'Спортивное приложение для прогнозов: 50K+ установок и 4,2★ в Google Play',
			'1-е место на региональном чемпионате WorldSkills «Мобильная разработка» (2020)',
		],
		languages: ['Русский — родной', 'Английский — A2, читаю техническую документацию'],
		labels: {
			summary: 'О себе',
			highlights: 'Ключевые достижения',
			experience: 'Опыт работы',
			projects: 'Проекты',
			commercialProjects: 'Проекты в Crypton Studio',
			personalProject: 'Личный проект',
			skills: 'Навыки',
			education: 'Образование',
			courses: 'Курсы',
			languages: 'Языки',
			contacts: 'Контакты',
			site: 'Портфолио',
			nda: 'Коммерческие проекты под NDA описаны без названий.',
			updated: 'Обновлено',
		},
		fpsStat: 'FPS на графиках',
		months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
	},
	en: {
		summary:
			'Flutter developer with 5+ years of commercial Flutter experience, after 1.5 years of Java development. At Crypton Studio I spent 4.5 years building crypto and fintech apps: exchanges, wallets and neobanks. I take apps from architecture to release on the App Store and Google Play: I design architecture and design systems, review code and plan the team’s work.',
		highlights: [
			'Lead developer of a mobile crypto exchange: charts and order book hold 60+ FPS under a live WebSocket quote stream',
			'Built the company Starter Kit (Clean Architecture, Mason templates, code generation from Swagger) — 3+ projects started on it',
			'Sports prediction app: 50K+ installs and 4.2★ on Google Play',
			'1st place at the regional WorldSkills championship, Mobile Applications Development (2020)',
		],
		languages: ['Russian — native', 'English — A2, reading technical documentation'],
		labels: {
			summary: 'Summary',
			highlights: 'Key achievements',
			experience: 'Experience',
			projects: 'Projects',
			commercialProjects: 'Projects at Crypton Studio',
			personalProject: 'Personal project',
			skills: 'Skills',
			education: 'Education',
			courses: 'Courses',
			languages: 'Languages',
			contacts: 'Contacts',
			site: 'Portfolio',
			nda: 'Commercial projects are under NDA and described without names.',
			updated: 'Updated',
		},
		fpsStat: 'FPS on charts',
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	},
};

export const site = 'dogayo.github.io';

/** Всё, что нужно шаблонам, для одного языка. */
export function resumeContent(locale) {
	const profile = profiles[locale];
	const commercial = profile.projects.filter((p) => !p.openSource);
	const personal = profile.projects.filter((p) => p.openSource);
	const now = new Date();
	const text = extra[locale];
	return {
		locale,
		profile,
		...text,
		commercial,
		personal,
		updated: `${text.months[now.getMonth()]} ${now.getFullYear()}`,
		contacts: [
			...profile.contacts.map((c) => ({ kind: c.kind, label: c.kind === 'email' ? c.label : c.url.replace('https://', ''), url: c.url })),
			{ kind: 'site', label: site, url: `https://${site}${locale === 'ru' ? '/' : `/${locale}/`}` },
		],
	};
}
