import type { AgeWords, Born } from '../lib/age';

// Весь текст сайта. Разметка только читает эти данные, при сборке они превращаются в HTML.
// Чтобы добавить язык, расширьте Locale, добавьте объект в profiles и путь в localePaths: TypeScript потребует все поля.

export type Locale = 'ru' | 'en';

export type SkillLevel = 'expert' | 'intermediate' | 'basic';

export interface Skill {
	name: string;
	level?: SkillLevel;
}

export interface SkillGroup {
	title: string;
	items: Skill[];
}

export interface Stat {
	value: string;
	label: string;
}

export interface Contact {
	kind: 'email' | 'github' | 'telegram' | 'linkedin';
	label: string;
	url: string;
}

export interface Position {
	title: string;
	organization: string;
	period: string;
	duration: string;
	responsibilities: string[];
}

export interface Project {
	title: string;
	period: string;
	task: string;
	role: string;
	solutions: string[];
	/** Только измеримые или публичные итоги; пусто, если цифр нет. */
	results: string[];
	tags: string[];
	openSource?: boolean;
	repoUrl?: string;
	demoUrl?: string;
	/** Последний релиз со сборкой APK. */
	apkUrl?: string;
	license?: string;
}

export interface Education {
	institution: string;
	program: string;
	period: string;
	duration: string;
	disciplines: string[];
	achievements: string[];
}

export interface SelfEducation {
	title: string;
	period: string;
	description: string;
}

export interface Interest {
	title: string;
	text: string;
}

export interface SectionTitles {
	about: string;
	experience: string;
	lastPosition: string;
	earlyCareer: string;
	projects: string;
	education: string;
	disciplines: string;
	achievements: string;
	selfEducation: string;
	courses: string;
	skills: string;
	contacts: string;
	personal: string;
	interests: string;
	learning: string;
	task: string;
	role: string;
	solutions: string;
	results: string;
}

/** Подписи интерфейса: навигация, кнопки, aria-метки. */
export interface UiStrings {
	nav: {
		experience: string;
		projects: string;
		skills: string;
		contacts: string;
	};
	navLabel: string;
	theme: {
		label: string;
		light: string;
		dark: string;
	};
	language: string;
	downloadResume: string;
	stack: string;
	apk: string;
	demo: string;
	levels: Record<SkillLevel, string>;
	ageWords: AgeWords;
	notFound: {
		title: string;
		error: string;
		home: string;
	};
}

export interface Profile {
	fullName: string;
	role: string;
	tagline: string;
	/** Описание для поиска и превью ссылки, до ~160 символов. */
	description: string;
	stack: string[];
	location: string;
	workFormat: string;
	status: string;
	/** Ссылка на PDF-резюме; без неё кнопка не показывается. */
	resumeUrl?: string;
	about: string;
	contactsLead: string;
	stats: Stat[];
	contacts: Contact[];
	experience: {
		lastPosition: Position;
		earlyCareer: Position;
	};
	projects: Project[];
	education: Education;
	selfEducation: SelfEducation;
	courses: string[];
	skills: SkillGroup[];
	/** Пустой список скрывает блок. */
	interests: Interest[];
	learning: string[];
	titles: SectionTitles;
	ui: UiStrings;
}

const ru: Profile = {
	fullName: 'Александр Догаев',
	role: 'Flutter-разработчик · Middle+',
	tagline: 'Веду Flutter-приложения от архитектуры до релиза в App Store и Google Play.',
	description: 'Flutter-разработчик, 5+ лет. Финтех и крипто: биржи, кошельки, необанки. Архитектура, дизайн-системы, релизы в App Store и Google Play.',
	stack: [
		'Flutter',
		'Dart',
		'BLoC',
		'Clean Architecture',
		'WebSocket',
		'Web3',
		'CI/CD',
	],
	location: 'Томск',
	workFormat: 'удалённо или переезд',
	status: 'открыт к предложениям',
	// Собирается командой npm run resume из этих же данных.
	resumeUrl: '/Dogaev_Flutter_Developer_ru.pdf',
	about: 'Пишу на Flutter с 2021 года, до этого полтора года разрабатывал на Java. 4,5 года в Crypton Studio делал крипто- и финтех-приложения: биржи, кошельки, необанки. Проектирую архитектуру и дизайн-системы, провожу код-ревью, собрал внутренний Starter Kit компании. В 2020 году занял первое место на региональном WorldSkills по мобильной разработке.',
	contactsLead: 'Открыт к предложениям: удалённо или с переездом. Быстрее всего отвечаю в Telegram.',
	stats: [
		{ value: '5+', label: 'лет во Flutter' },
		{ value: '7', label: 'проектов' },
		{ value: '50К+', label: 'установок' },
	],
	contacts: [
		{ kind: 'email', label: 'dogaev2518@gmail.com', url: 'mailto:dogaev2518@gmail.com' },
		{ kind: 'github', label: 'GitHub', url: 'https://github.com/Dogayo' },
		{ kind: 'telegram', label: 'Telegram', url: 'https://t.me/Dogayo' },
	],
	experience: {
		lastPosition: {
			title: 'Flutter-разработчик (Middle+)',
			organization: 'Crypton Studio',
			period: '07.21 – 01.26',
			duration: '4,5 года',
			responsibilities: [
				'Разработка мобильных приложений в крипто- и финтех-тематике: биржи, кошельки, необанки',
				'Проектирование архитектуры (BLoC, clean architecture, модульная структура из внутренних пакетов) и дизайн-систем, код-ревью',
				'Торговые модули, котировки по WebSocket, точные денежные расчёты (decimal), 2FA и биометрия',
				'Web3-интеграции: web3dart, WalletConnect (MetaMask, Trust Wallet), подпись транзакций ECDSA/secp256k1',
				'Внутренние инструменты: Starter Kit компании (на нём стартовали 3+ проекта), генерация кода по Swagger API, шаблоны Mason, пакет инструментов рисования на графиках',
				'Оптимизация производительности до 60+ FPS',
				'Руководство проектными циклами: планирование, распределение задач, контроль и отчётность',
				'Сборка, тестирование и публикация в App Store и Google Play',
			],
		},
		earlyCareer: {
			title: 'Java-разработчик',
			organization: 'Mirball',
			period: '02.20 – 06.21',
			duration: '1 год 5 месяцев',
			responsibilities: [
				'Десктопные приложения для управления и мониторинга нод (вычислительных узлов) и ферм',
				'Работа с PostgreSQL и проектирование структуры данных',
				'Построение UI на JavaFX',
			],
		},
	},
	projects: [
		{
			title: 'Криптобиржа и обменный сервис',
			period: '10.2024 – 01.2026',
			task: 'Мобильное приложение биржи: торговля, наблюдение за рынком, верификация.',
			role: 'Ведущий Flutter-разработчик — архитектура, дизайн-система, код-ревью.',
			solutions: [
				'Котировки по WebSocket в стакан и графики',
				'Инструменты рисования на графиках вынес в отдельный пакет',
				'Денежные расчёты через decimal',
				'2FA, биометрия, KYC',
			],
			results: [
				'Графики и стакан держат 60+ FPS при потоке котировок',
			],
			tags: ['Flutter', 'BLoC', 'WebSocket', 'decimal', 'Firebase'],
		},
		{
			title: 'Финтех-платформа (необанк)',
			period: '12.2024 – 06.2025',
			task: 'Мультивалютные счета для крипто- и фиат-операций.',
			role: 'Flutter-разработчик — дизайн-система, функциональность, код-ревью.',
			solutions: [
				'Real-time обновления через Centrifugo и protobuf',
				'Вход по пин-коду и биометрии, KYC',
				'Кошельки через WalletConnect',
				'Анимации на Rive',
			],
			results: [],
			tags: ['Flutter', 'BLoC', 'Centrifugo', 'protobuf', 'WalletConnect'],
		},
		{
			title: 'Спортивное приложение для прогнозов',
			period: '03.2024 – 11.2025',
			task: 'Прогнозы на спортивные события с лигами и таблицами лидеров.',
			role: 'Flutter-разработчик — дизайн-система, функциональность, код-ревью.',
			solutions: [
				'Офлайн-доступ и кеш',
				'Встроенные покупки',
				'Firebase: пуши, аналитика, dynamic links',
			],
			results: [
				'50K+ установок и 4,2★ в Google Play',
			],
			tags: ['Flutter', 'BLoC', 'Firebase', 'In-app purchases'],
		},
		{
			title: 'Приложение для автомобиля',
			period: '11.2022 – 01.2024',
			task: 'Управление функциями машины с телефона.',
			role: 'Flutter-разработчик — дизайн-система, функциональность, код-ревью.',
			solutions: [
				'Реактивное соединение по MQTT',
				'Климат и центральный замок',
				'Радио и плейлисты',
				'Карты и маршруты на форке Yandex MapKit',
			],
			results: [],
			tags: ['Flutter', 'BLoC', 'MQTT', 'rxdart', 'Yandex MapKit'],
		},
		{
			title: 'Job-приложение с криптокошельком',
			period: '12.2021 – 08.2022',
			task: 'Поиск работы с ролями пользователей и встроенным криптокошельком.',
			role: 'Flutter-разработчик — архитектура, код-ревью, релизы.',
			solutions: [
				'Ролевая модель доступа',
				'Чаты по WebSocket',
				'Google Maps',
				'Кошелёк на web3dart и WalletConnect',
			],
			results: [],
			tags: ['Flutter', 'MobX', 'WebSocket', 'web3dart'],
		},
		{
			title: 'Фитнес-приложение',
			period: '08.2021 – 11.2021, 09.2022 – 10.2022',
			task: 'Общение и трекинг активности для тех, кто тренируется.',
			role: 'Flutter-разработчик — функциональность, UI и анимации, релизы.',
			solutions: [
				'Сторис с камерой и обработкой видео',
				'Голосовые в чате',
				'Умные весы по Bluetooth и данные здоровья',
				'Встроенные покупки',
			],
			results: [],
			tags: ['Flutter', 'MobX', 'Bluetooth', 'HealthKit/Health Connect'],
		},
		{
			title: 'Wayback',
			period: '2026',
			task: 'Вернуться к сохранённой точке без интернета.',
			role: 'Автор.',
			solutions: [
				'Offline-first навигация по GPS и компасу',
				'Clean architecture и Bloc',
				'Своя дизайн-система с живым демо',
				'Макеты в Penpot',
			],
			results: [
				'Открытый код, живое демо дизайн-системы, APK в релизах',
			],
			tags: ['Flutter', 'Bloc', 'GPS', 'Penpot'],
			openSource: true,
			repoUrl: 'https://github.com/Dogayo/wayback',
			demoUrl: 'https://dogayo.github.io/wayback',
			apkUrl: 'https://github.com/Dogayo/wayback/releases/latest',
			license: 'MIT',
		},
	],
	education: {
		institution: 'Томский техникум информационных технологий (ТТИТ)',
		program: 'Информационные системы и программирование',
		period: '2018 – 2021',
		duration: '3 года',
		disciplines: [
			'Алгоритмы и структуры данных',
			'Дискретная математика',
			'Программирование',
			'Базы данных, системный анализ и моделирование процессов',
		],
		achievements: [
			'1-е место на региональном чемпионате WorldSkills, «Мобильная разработка» (2020)',
			'Практические проекты в области мобильной разработки',
		],
	},
	selfEducation: {
		title: 'Самообразование в мобильной разработке',
		period: '2019 – по настоящее время',
		description: 'Постоянное изучение новых технологий, фреймворков и лучших практик мобильной разработки',
	},
	courses: [
		'Стажировка по компетенции «Разработка мобильных приложений» — 2019, Сабитов Э. П., директор Hakta, эксперт',
		'Томская школа программистов, курс «Разработка приложений» — 2017',
		'Томская школа программистов, курс «Основы программирования» — 2016',
	],
	skills: [
		{
			title: 'Языки программирования',
			items: [
				{ name: 'Dart', level: 'expert' },
				{ name: 'Java', level: 'intermediate' },
				{ name: 'Kotlin', level: 'intermediate' },
				{ name: 'C#', level: 'basic' },
				{ name: 'Python', level: 'basic' },
			],
		},
		{
			title: 'Мобильная разработка',
			items: [
				{ name: 'Flutter', level: 'expert' },
				{ name: 'BLoC' },
				{ name: 'MobX' },
				{ name: 'go_router' },
				{ name: 'Dio' },
				{ name: 'WebSocket' },
				{ name: 'sqflite' },
				{ name: 'Firebase' },
				{ name: 'web3dart' },
				{ name: 'WalletConnect' },
				{ name: 'Jetpack Compose', level: 'basic' },
			],
		},
		{
			title: 'Инструменты и DevOps',
			items: [
				{ name: 'Git', level: 'expert' },
				{ name: 'CI/CD', level: 'intermediate' },
				{ name: 'Развертывание', level: 'intermediate' },
				{ name: 'Mason' },
				{ name: 'Figma' },
				{ name: 'Penpot' },
			],
		},
		{
			title: 'Специализация',
			items: [
				{ name: 'Финтех и крипто' },
				{ name: 'Web3-интеграции' },
				{ name: 'Архитектура приложений' },
				{ name: 'Дизайн-системы и UI/UX' },
				{ name: 'Оптимизация производительности' },
				{ name: 'Безопасность' },
				{ name: 'Код-ревью и постановка задач' },
			],
		},
	],
	interests: [
		{
			title: 'Баскетбол',
			text: 'Каждый четверг играю в любительских играх. Лучший способ переключиться после недели за компьютером.',
		},
	],
	learning: [
		'Flutter глубже: производительность, тестирование, нативная интеграция и Kotlin Multiplatform',
		'Шире мобилки: бэкенд и архитектура, AI-инструменты в разработке, дизайн интерфейсов',
		'Английский: подтягиваю с A2 до свободного рабочего уровня',
	],
	titles: {
		about: 'Обо мне',
		experience: 'Опыт',
		lastPosition: 'Последнее место работы',
		earlyCareer: 'Начало пути',
		projects: 'Проекты',
		education: 'Образование',
		disciplines: 'Ключевые дисциплины',
		achievements: 'Достижения',
		selfEducation: 'Дополнительное образование',
		courses: 'Курсы и сертификации',
		skills: 'Навыки',
		contacts: 'Контакты',
		personal: 'Не только код',
		interests: 'Интересы',
		learning: 'Сейчас изучаю',
		task: 'Задача',
		role: 'Роль',
		solutions: 'Решения',
		results: 'Результат',
	},
	ui: {
		nav: {
			experience: 'опыт',
			projects: 'проекты',
			skills: 'навыки',
			contacts: 'контакты',
		},
		navLabel: 'Разделы',
		theme: {
			label: 'Тема',
			light: 'светлая',
			dark: 'тёмная',
		},
		language: 'Язык',
		downloadResume: 'Скачать резюме',
		stack: 'Стек',
		apk: 'APK в релизах',
		demo: 'Демо дизайн-системы',
		levels: {
			expert: 'эксперт',
			intermediate: 'рабочий уровень',
			basic: 'базовый',
		},
		ageWords: { one: 'год', few: 'года', many: 'лет', other: 'лет' },
		notFound: {
			title: 'Такой страницы нет',
			error: 'Нет такого файла или каталога',
			home: 'на главную',
		},
	},
};

const en: Profile = {
	fullName: 'Alexander Dogaev',
	role: 'Flutter Developer · Middle+',
	tagline: 'I take Flutter apps from architecture to release on the App Store and Google Play.',
	description: 'Flutter developer with 5+ years of experience. Fintech and crypto: exchanges, wallets, neobanks. Architecture, design systems, App Store and Google Play releases.',
	stack: ru.stack,
	location: 'Tomsk, Russia',
	workFormat: 'remote or relocation',
	status: 'open to offers',
	resumeUrl: '/Dogaev_Flutter_Developer_en.pdf',
	about: 'I have been building with Flutter since 2021, after a year and a half of Java development. At Crypton Studio I spent 4.5 years on crypto and fintech apps: exchanges, wallets and neobanks. I design app architecture and design systems, review code and built the company’s internal Starter Kit. In 2020 I took first place in mobile development at the regional WorldSkills championship.',
	contactsLead: 'Open to offers, remote or with relocation. Telegram is the fastest way to reach me.',
	stats: [
		{ value: '5+', label: 'years in Flutter' },
		{ value: '7', label: 'projects' },
		{ value: '50K+', label: 'installs' },
	],
	contacts: ru.contacts,
	experience: {
		lastPosition: {
			title: 'Flutter Developer (Middle+)',
			organization: 'Crypton Studio',
			period: '07.21 – 01.26',
			duration: '4.5 years',
			responsibilities: [
				'Building crypto and fintech mobile apps: exchanges, wallets, neobanks',
				'Designing architecture (BLoC, clean architecture, modular structure of internal packages) and design systems; code review',
				'Trading modules, WebSocket quotes, precise money calculations (decimal), 2FA and biometrics',
				'Web3 integrations: web3dart, WalletConnect (MetaMask, Trust Wallet), ECDSA/secp256k1 transaction signing',
				'Internal tooling: the company Starter Kit (3+ projects started on it), code generation from Swagger APIs, Mason templates, a chart drawing tools package',
				'Performance optimization to 60+ FPS',
				'Leading project cycles: planning, task assignment, tracking and reporting',
				'Building, testing and publishing to the App Store and Google Play',
			],
		},
		earlyCareer: {
			title: 'Java Developer',
			organization: 'Mirball',
			period: '02.20 – 06.21',
			duration: '1 year 5 months',
			responsibilities: [
				'Desktop apps for managing and monitoring compute nodes and farms',
				'PostgreSQL and data model design',
				'UI built with JavaFX',
			],
		},
	},
	projects: [
		{
			title: 'Crypto exchange and swap service',
			period: '10.2024 – 01.2026',
			task: 'A mobile exchange app: trading, market watching, verification.',
			role: 'Lead Flutter developer — architecture, design system, code review.',
			solutions: [
				'WebSocket quotes feeding the order book and charts',
				'Chart drawing tools extracted into a separate package',
				'Money calculations with decimal',
				'2FA, biometrics, KYC',
			],
			results: [
				'Charts and order book hold 60+ FPS under a live quote stream',
			],
			tags: ['Flutter', 'BLoC', 'WebSocket', 'decimal', 'Firebase'],
		},
		{
			title: 'Fintech platform (neobank)',
			period: '12.2024 – 06.2025',
			task: 'Multi-currency accounts for crypto and fiat operations.',
			role: 'Flutter developer — design system, features, code review.',
			solutions: [
				'Real-time updates via Centrifugo and protobuf',
				'PIN and biometric sign-in, KYC',
				'Wallets via WalletConnect',
				'Rive animations',
			],
			results: [],
			tags: ['Flutter', 'BLoC', 'Centrifugo', 'protobuf', 'WalletConnect'],
		},
		{
			title: 'Sports prediction app',
			period: '03.2024 – 11.2025',
			task: 'Predictions on sports events with leagues and leaderboards.',
			role: 'Flutter developer — design system, features, code review.',
			solutions: [
				'Offline access and caching',
				'In-app purchases',
				'Firebase: push notifications, analytics, dynamic links',
			],
			results: [
				'50K+ installs and 4.2★ on Google Play',
			],
			tags: ['Flutter', 'BLoC', 'Firebase', 'In-app purchases'],
		},
		{
			title: 'Connected car app',
			period: '11.2022 – 01.2024',
			task: 'Controlling car features from a phone.',
			role: 'Flutter developer — design system, features, code review.',
			solutions: [
				'Reactive MQTT connection',
				'Climate control and central locking',
				'Radio and playlists',
				'Maps and routes on a Yandex MapKit fork',
			],
			results: [],
			tags: ['Flutter', 'BLoC', 'MQTT', 'rxdart', 'Yandex MapKit'],
		},
		{
			title: 'Job app with a crypto wallet',
			period: '12.2021 – 08.2022',
			task: 'Job search with user roles and a built-in crypto wallet.',
			role: 'Flutter developer — architecture, code review, releases.',
			solutions: [
				'Role-based access',
				'WebSocket chats',
				'Google Maps',
				'Wallet on web3dart and WalletConnect',
			],
			results: [],
			tags: ['Flutter', 'MobX', 'WebSocket', 'web3dart'],
		},
		{
			title: 'Fitness app',
			period: '08.2021 – 11.2021, 09.2022 – 10.2022',
			task: 'Social features and activity tracking for people who work out.',
			role: 'Flutter developer — features, UI and animations, releases.',
			solutions: [
				'Camera stories with video processing',
				'Voice messages in chat',
				'Bluetooth smart scales and health data',
				'In-app purchases',
			],
			results: [],
			tags: ['Flutter', 'MobX', 'Bluetooth', 'HealthKit/Health Connect'],
		},
		{
			title: 'Wayback',
			period: '2026',
			task: 'Get back to a saved spot without an internet connection.',
			role: 'Author.',
			solutions: [
				'Offline-first navigation by GPS and compass',
				'Clean architecture and Bloc',
				'Custom design system with a live demo',
				'Designs in Penpot',
			],
			results: [
				'Open source, live design system demo, APK in releases',
			],
			tags: ['Flutter', 'Bloc', 'GPS', 'Penpot'],
			openSource: true,
			repoUrl: 'https://github.com/Dogayo/wayback',
			demoUrl: 'https://dogayo.github.io/wayback',
			apkUrl: 'https://github.com/Dogayo/wayback/releases/latest',
			license: 'MIT',
		},
	],
	education: {
		institution: 'Tomsk College of Information Technologies',
		program: 'Information Systems and Programming',
		period: '2018 – 2021',
		duration: '3 years',
		disciplines: [
			'Algorithms and data structures',
			'Discrete mathematics',
			'Programming',
			'Databases, systems analysis and process modeling',
		],
		achievements: [
			'1st place at the regional WorldSkills championship, Mobile Applications Development (2020)',
			'Hands-on mobile development projects',
		],
	},
	selfEducation: {
		title: 'Self-study in mobile development',
		period: '2019 – present',
		description: 'Continuously learning new technologies, frameworks and mobile development best practices',
	},
	courses: [
		'Internship in Mobile Applications Development — 2019, mentored by E. P. Sabitov, director of Hakta and WorldSkills expert',
		'Tomsk School of Programmers, Application Development course — 2017',
		'Tomsk School of Programmers, Programming Basics course — 2016',
	],
	skills: [
		{
			title: 'Programming languages',
			items: ru.skills[0].items,
		},
		{
			title: 'Mobile development',
			items: ru.skills[1].items,
		},
		{
			title: 'Tools and DevOps',
			items: [
				{ name: 'Git', level: 'expert' },
				{ name: 'CI/CD', level: 'intermediate' },
				{ name: 'Deployment', level: 'intermediate' },
				{ name: 'Mason' },
				{ name: 'Figma' },
				{ name: 'Penpot' },
			],
		},
		{
			title: 'Focus areas',
			items: [
				{ name: 'Fintech and crypto' },
				{ name: 'Web3 integrations' },
				{ name: 'App architecture' },
				{ name: 'Design systems and UI/UX' },
				{ name: 'Performance optimization' },
				{ name: 'Security' },
				{ name: 'Code review and task planning' },
			],
		},
	],
	interests: [
		{
			title: 'Basketball',
			text: 'Amateur games every Thursday. My favourite way to switch off after a week at the computer.',
		},
	],
	learning: [
		'Going deeper into Flutter: performance, testing, native integration and Kotlin Multiplatform',
		'Beyond mobile: backend and architecture, AI tools in development, interface design',
		'English: improving from A2 to a confident working level',
	],
	titles: {
		about: 'About',
		experience: 'Experience',
		lastPosition: 'Latest position',
		earlyCareer: 'Early career',
		projects: 'Projects',
		education: 'Education',
		disciplines: 'Key subjects',
		achievements: 'Achievements',
		selfEducation: 'Further education',
		courses: 'Courses and certifications',
		skills: 'Skills',
		contacts: 'Contacts',
		personal: 'Beyond code',
		interests: 'Interests',
		learning: 'Currently learning',
		task: 'Task',
		role: 'Role',
		solutions: 'Solutions',
		results: 'Result',
	},
	ui: {
		nav: {
			experience: 'experience',
			projects: 'projects',
			skills: 'skills',
			contacts: 'contacts',
		},
		navLabel: 'Sections',
		theme: {
			label: 'Theme',
			light: 'light',
			dark: 'dark',
		},
		language: 'Language',
		downloadResume: 'Download resume',
		stack: 'Stack',
		apk: 'APK in releases',
		demo: 'Design system demo',
		levels: {
			expert: 'expert',
			intermediate: 'working level',
			basic: 'basic',
		},
		ageWords: { one: 'year', other: 'years' },
		notFound: {
			title: 'Page not found',
			error: 'No such file or directory',
			home: 'home',
		},
	},
};

/** Только год и месяц: точная дата рождения не публикуется. Возраст растёт с 1-го числа месяца. */
export const born: Born = { year: 2000, month: 10 };

export const defaultLocale: Locale = 'ru';

export const profiles = { ru, en } satisfies Record<Locale, Profile>;

/** Адрес страницы для каждой локали; русская версия в корне. */
export const localePaths: Record<Locale, string> = {
	ru: '/',
	en: '/en/',
};
