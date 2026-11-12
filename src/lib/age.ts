// Возраст для строки uptime. Общий код для сборки и для браузера: в браузере возраст
// пересчитывается, чтобы не устаревал между деплоями.

export interface Born {
	year: number;
	/** 1–12 */
	month: number;
}

/** Формы слова «год» по правилам Intl.PluralRules (one, few, many, other). */
export type AgeWords = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

export function ageAt(date: Date, born: Born): number {
	const age = date.getFullYear() - born.year;
	return date.getMonth() + 1 < born.month ? age - 1 : age;
}

export function formatAge(age: number, locale: string, words: AgeWords): string {
	const form = words[new Intl.PluralRules(locale).select(age)] ?? words.other;
	return `${age} ${form}`;
}
