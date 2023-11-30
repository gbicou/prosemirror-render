// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt-themes/typography"],
  modules: ["@bicou/prosemirror-render-nuxt", "@vueuse/nuxt"],
  prosemirrorRender: {
    types: {
      heading: ({ level }) => [level ? `prose-h${level}` : "header", { level: undefined }],
      paragraph: "prose-p",
      code: "prose-code-inline",
      code_block: "prosemirror-code-block",
      horizontal_rule: "prose-hr",
      link: "prose-a",
      bold: "prose-strong",
      strong: "prose-strong",
      italic: "prose-em",
      em: "prose-em",
      blockquote: "prose-blockquote",
      bullet_list: "prose-ul",
      ordered_list: "prose-ol",
      list_item: "prose-li",
      image: "prose-img",
      table: "prosemirror-table",
      table_row: "prose-tr",
      table_header: "prose-th",
      table_cell: "prose-td",
    },
  },
});
