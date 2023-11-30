import MyModule from "../../../src/module";

export default defineNuxtConfig({
  extends: "../../..",
  modules: [
    [
      MyModule,
      {
        types: {
          italic: () => ["span", { class: "italic" }],
        },
      },
    ],
  ],
});
