<script setup lang="ts">
import { ProsemirrorRender, provideProsemirrorOptions } from '@bicou/prosemirror-render-vue'
import PmMention from '../components/pm-mention.vue'
import '../main.css'

provideProsemirrorOptions({
  types: {
    doc: ['div', { class: 'bg-neutral-100 font-sans p-10' }],
    highlight: ['span', { class: 'bg-red-300' }],
    mention: () => [PmMention, { class: 'bg-blue-400 border-blue-800' }],
  },
})

const node = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This isn’t highlighted.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'highlight',
            },
          ],
          text: 'But that one is with tailwind.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'mention',
          attrs: {
            id: 'Winona Ryder',
          },
        },
        {
          type: 'text',
          text: ' is a vue component with additional tailwind class applied.',
        },
      ],
    },
  ],
}
</script>

<template>
  <div id="tailwind">
    <prosemirror-render :node="node" />
  </div>
</template>
