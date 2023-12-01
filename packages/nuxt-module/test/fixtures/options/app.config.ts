export default defineAppConfig({
  prosemirror: {
    types: {
      italic: () => ["span", { class: "italic" }],
    },
  },
});
