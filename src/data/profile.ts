// Весь текст сайта. Разметка только читает эти данные, при сборке они превращаются в HTML.
// Чтобы добавить язык, расширьте Locale и добавьте объект в profiles: TypeScript потребует все поля.

export type Locale = 'ru';

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
	task: string;
	role: string;
	solutions: string;
	results: string;
}

export interface Profile {
	fullName: string;
	role: string;
	tagline: string;
	stack: string[];
	location: string;
	availability: string[];
	about: string;
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
	titles: SectionTitles;
}

const ru: Profile = {
	fullName: 'Александр Догаев',
	role: 'Flutter-разработчик · Middle+',
	tagline: 'Веду Flutter-приложения от архитектуры до релиза в App Store и Google Play.',
	stack: [
		'Flutter',
		'Dart',
		'BLoC',
		'Clean Architecture',
		'WebSocket',
		'Web3',
		'CI/CD',
	],
	location: 'Томск, Россия',
	availability: [
		'Удалённо или переезд',
		'Открыт к предложениям',
	],
	about: 'Пишу на Flutter с 2021 года, до этого полтора года разрабатывал на Java. 4,5 года в Crypton Studio делал крипто- и финтех-приложения: биржи, кошельки, необанки. Проектирую архитектуру и дизайн-системы, провожу код-ревью, собрал внутренний Starter Kit компании. В 2020 году занял первое место на региональном WorldSkills по мобильной разработке.',
	stats: [
		{ value: '4+', label: 'лет во Flutter' },
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
		skills: 'Технологии и навыки',
		task: 'Задача',
		role: 'Роль',
		solutions: 'Решения',
		results: 'Результат',
	},
};

export const defaultLocale: Locale = 'ru';

export const profiles = { ru } satisfies Record<Locale, Profile>;

export const profile: Profile = profiles[defaultLocale];
