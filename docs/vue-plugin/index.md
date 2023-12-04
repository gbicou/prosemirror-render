# Vue plugin

## Installation

To install the plugin, you can run the following command with your preferred package manager :

```shell
pnpm install @bicou/prosemirror-render-vue
```

## Usage

To use the plugin, you first need to import it into your Vue application.
You can do this by adding the following lines to your file :

```ts {3,6}
import { createApp } from "vue";
import App from "./app.vue";
import ProsemirrorPlugin from "@bicou/prosemirror-render-vue";

createApp(App)
  .use(ProsemirrorPlugin)
  .mount("#app");
```

The plugin adds the `ProsemirrorRender` component to the Vue application and 
provide a default map of node and mark types to elements.

## `ProsemirrorRender` component

Use this component to render a ProseMirror JSON document by passing it as the `node` property :

```vue
<script setup>
// retrieved from where you stored the editor content  
const document = {
  type: "doc",
  content: [
    // ...
  ]
};
</script>

<template>
  <prosemirror-render :node="document" />
</template>
```

The output of the `ProsemirrorRender` component can be customized globally with plugin options
or locally with the provideProsemirrorOptions helper.
