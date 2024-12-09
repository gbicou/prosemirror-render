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
        src: 'https://placehold.co/400x300',
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
