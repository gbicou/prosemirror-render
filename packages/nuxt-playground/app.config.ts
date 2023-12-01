export default defineAppConfig({
  prosemirror: {
    types: {
      doc: () => ["section", { class: "prosemirror" }],
    },
  },
});
