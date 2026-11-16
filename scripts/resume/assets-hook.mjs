// profile.ts импортирует картинки, как принято в Astro, а Node такие импорты не понимает.
// Резюме картинки не нужны: вместо модуля картинки отдаём её путь.
import { registerHooks } from 'node:module';

registerHooks({
	load(url, context, nextLoad) {
		if (/\.(png|jpe?g|webp|avif|svg)$/.test(url)) {
			return { format: 'module', source: `export default ${JSON.stringify(url)};`, shortCircuit: true };
		}
		return nextLoad(url, context);
	},
});
