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
          text: 'But that one is.',
        },
      ],
    },
    {
      type: 'horizontalRule',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This isn’t striked through.',
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
              type: 'strike',
            },
          ],
          text: 'But that’s striked through.',
        },
      ],
    },
    {
      type: 'horizontalRule',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'There is no underline here.',
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
              type: 'underline',
            },
          ],
          text: 'This is underlined though.',
        },
      ],
    },
    {
      type: 'horizontalRule',
    },
    {
      type: 'orderedList',
      attrs: {
        start: 1,
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'A list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'And another one',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'orderedList',
      attrs: {
        start: 5,
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This item starts at 5',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'And another one',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
</script>

<template>
  <prosemirror-render :node="node" />
</template>
