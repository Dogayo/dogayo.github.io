<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

type Theme = 'light' | 'dark';

const props = defineProps<{
	labels: { label: string; light: string; dark: string };
}>();

// Начальная тема уже выставлена скриптом в <head>; иконка солнца или луны выбирается через CSS,
// поэтому до гидрации ничего не мигает.
const current = ref<Theme | null>(null);
const label = computed(() => (current.value ? `${props.labels.label}: ${props.labels[current.value]}` : props.labels.label));

onMounted(() => {
	current.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
});

function apply(theme: Theme) {
	current.value = theme;
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// Хранилище недоступно (приватный режим) — тема просто не запомнится.
	}
}

// Новая тема проступает от кнопки мягким пятном с размытым краем; без View Transitions или при
// «уменьшить движение» — мгновенно. Сама анимация — в global.css, здесь только центр и радиус.
function toggle(event: MouseEvent) {
	const root = document.documentElement;
	const theme: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
	if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
		apply(theme);
		return;
	}

	const button = (event.currentTarget as HTMLElement).getBoundingClientRect();
	const x = button.left + button.width / 2;
	const y = button.top + button.height / 2;
	root.style.setProperty('--theme-x', `${x}px`);
	root.style.setProperty('--theme-y', `${y}px`);
	root.style.setProperty('--theme-r', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);

	root.classList.add('theme-transition');
	const transition = document.startViewTransition(() => apply(theme));
	// Браузер может пропустить переход (например, вкладка в фоне) — тема при этом уже применена.
	transition.ready.catch(() => {});
	transition.finished.finally(() => root.classList.remove('theme-transition'));
}
</script>

<template>
	<button
		type="button"
		:aria-label="label"
		:title="label"
		class="theme-toggle grid size-[38px] place-items-center rounded-full border border-border bg-surface-2 text-text transition-colors hover:text-accent"
		@click="toggle"
	>
		<!-- Солнце и луна — один рисунок: в тёмной теме круг растёт, тень наезжает на него, лучи прячутся. -->
		<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
			<mask id="theme-toggle-shadow">
				<rect width="24" height="24" fill="#fff" />
				<circle class="theme-toggle__shadow" cx="24" cy="4" r="7" fill="#000" />
			</mask>
			<!-- Маска на группе, а не на круге: так она не растёт вместе с ним. -->
			<g mask="url(#theme-toggle-shadow)">
				<circle class="theme-toggle__core" cx="12" cy="12" r="5" fill="currentColor" />
			</g>
			<g class="theme-toggle__rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4L6 18M18 6l1.4-1.4" />
			</g>
		</svg>
	</button>
</template>

<style>
.theme-toggle__core,
.theme-toggle__shadow,
.theme-toggle__rays {
	transform-box: view-box;
	transform-origin: center;
}

.theme-toggle__shadow {
	transform-origin: 24px 4px;
}

[data-theme='dark'] .theme-toggle__core {
	transform: scale(1.5);
}

[data-theme='dark'] .theme-toggle__shadow {
	transform: translate(-7px, 3.5px) scale(0.85);
}

[data-theme='dark'] .theme-toggle__rays {
	opacity: 0;
	transform: rotate(-90deg) scale(0.4);
}

@media (prefers-reduced-motion: no-preference) {
	.theme-toggle__core,
	.theme-toggle__shadow {
		transition: transform 500ms cubic-bezier(0.34, 1.4, 0.64, 1);
	}

	.theme-toggle__rays {
		transition:
			transform 500ms cubic-bezier(0.34, 1.4, 0.64, 1),
			opacity 300ms ease;
	}

	/* Лучи возвращаются чуть позже, когда луна уже начала сжиматься в солнце. */
	[data-theme='light'] .theme-toggle__rays {
		transition-delay: 120ms;
	}
}
</style>
