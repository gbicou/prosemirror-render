import ProsemirrorRender, { resolveProseComponent } from "./prosemirror-render";
import { describe, it, expect } from "vitest";
import { VueProsemirrorComponents } from "../options";

describe("resolveProseComponent", () => {
  const components: VueProsemirrorComponents = {
    heading: ({ level }) => `h${level}`,
    paragraph: "p",
    camelCase: "camel",
    snake_case: "snake",
    comp: () => ProsemirrorRender,
    tw: ["tailwind", { class: "bg-white" }],
  };

  it("returns the element name", () => {
    expect(resolveProseComponent({ type: "paragraph" }, components)).toStrictEqual(["p", {}]);
  });

  it("returns the node type if no correspondance", () => {
    expect(resolveProseComponent({ type: "unknown" }, components)).toStrictEqual(["unknown", {}]);
  });

  it("finds the type in camel case", () => {
    expect(resolveProseComponent({ type: "camelCase" }, components)).toStrictEqual(["camel", {}]);
    expect(resolveProseComponent({ type: "camel-case" }, components)).toStrictEqual(["camel", {}]);
    expect(resolveProseComponent({ type: "camel_case" }, components)).toStrictEqual(["camel", {}]);
  });

  it("finds the type in snake case", () => {
    expect(resolveProseComponent({ type: "snakeCase" }, components)).toStrictEqual(["snake", {}]);
    expect(resolveProseComponent({ type: "snake-case" }, components)).toStrictEqual(["snake", {}]);
    expect(resolveProseComponent({ type: "snake_case" }, components)).toStrictEqual(["snake", {}]);
  });

  it("returns a component", () => {
    expect(resolveProseComponent({ type: "comp" }, components)).toStrictEqual([ProsemirrorRender, {}]);
  });

  it("tries to resolve to a component", () => {
    expect(resolveProseComponent({ type: "foo-bar" }, components)).toStrictEqual(["foo-bar", {}]);
  });

  it("can use node attributes", () => {
    expect(resolveProseComponent({ type: "heading", attrs: { level: 1 } }, components)).toStrictEqual(["h1", {}]);
  });

  it("can returns properties", () => {
    expect(resolveProseComponent({ type: "tw" }, components)).toStrictEqual(["tailwind", { class: "bg-white" }]);
  });
});
