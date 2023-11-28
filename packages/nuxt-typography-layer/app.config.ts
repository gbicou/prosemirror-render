export default defineAppConfig({
  prosemirror: {
    shiki: false,
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    prosemirror?: {
      /** Use shiki code highlighter for code block, requires shiki-es to be installed as dependencies */
      shiki?:
        | false
        | {
            theme: string;
          };
    };
  }
}
