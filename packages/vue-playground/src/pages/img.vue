<script setup lang="ts">
import { ProsemirrorRender } from '@bicou/prosemirror-render-vue'

const node = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a basic example of implementing images.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://source.unsplash.com/8xznAGy4HcY/800x400',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://source.unsplash.com/K9QHL52rE2k/800x400',
      },
    },
  ],
}
</script>

<template>
  <div>
    <prosemirror-render :node="node" />
  </div>
</template>
