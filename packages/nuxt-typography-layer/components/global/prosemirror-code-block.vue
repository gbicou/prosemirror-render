<template>
  <prose-code v-bind="$attrs" :code="code">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="shikiEnable && shikiHtml" v-html="shikiHtml" />
    <pre v-else><code><slot /></code></pre>
  </prose-code>
</template>

<script setup lang="ts">
import type { ProsemirrorJSONNode } from "@bicou/prosemirror-render-vue";
import { computedAsync } from "@vueuse/core";

const {
  prosemirrorTypography: { shiki },
} = useAppConfig();

const properties = defineProps<{
  node: ProsemirrorJSONNode;
  language?: string;
}>();
const { node, language } = toRefs(properties);

const code = computed(() => node.value.content?.map((node) => node.text).join("\n") ?? "");

const shikiEnable = computed(() => shiki && language.value);

const shikiHighlighter = computedAsync(async () => {
  if (shikiEnable.value) {
    const { getHighlighter } = await import("shiki");
    return await getHighlighter({ themes: [shiki.theme], langs: [language.value] });
  }
});

const shikiHtml = computed(() => {
  return shikiHighlighter.value?.codeToHtml(code.value, { lang: language.value, theme: shiki.theme });
});
</script>
