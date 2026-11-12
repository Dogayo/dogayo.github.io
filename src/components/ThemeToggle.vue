<script setup lang="ts">
import { onMounted, ref } from 'vue';

type Theme = 'light' | 'dark';

const props = defineProps<{
	labels: { label: string; light: string; dark: string };
}>();

const options: { value: Theme; label: string }[] = [
	{ value: 'light', label: props.labels.light },
	{ value: 'dark', label: props.labels.dark },
];

// Начальная тема уже выставлена скриптом в <head>; подсветка кнопок идёт через CSS,
// поэтому до гидрации ничего не мигает.
const current = ref<Theme | null>(null);

onMounted(() => {
	current.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
});

function select(theme: Theme) {
	current.value = theme;
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// Хранилище недоступно (приватный режим) — тема просто не запомнится.
	}
}
</script>

<template>
	<div role="group" :aria-label="labels.label" class="flex items-center gap-0.5 rounded-full border border-border bg-surface-2 p-[3px]">
		<button
			v-for="option in options"
			:key="option.value"
			type="button"
			:aria-pressed="current === option.value"
			:class="[
				'rounded-full px-2.5 py-1.5 font-mono text-mono-s transition-colors sm:px-3',
				option.value === 'light'
					? 'bg-surface text-text dark:bg-transparent dark:text-muted dark:hover:text-text'
					: 'text-muted hover:text-text dark:bg-surface dark:text-text',
			]"
			@click="select(option.value)"
		>
			{{ option.label }}
		</button>
	</div>
</template>
