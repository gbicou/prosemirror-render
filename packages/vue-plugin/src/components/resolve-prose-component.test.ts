import ProsemirrorRender, { resolveProseComponent } from "./prosemirror-render";
import { describe, it, expect } from "vitest";
import { VueProsemirrorOptions } from "../options";

describe("resolveProseComponent", () => {
  const options: VueProsemirrorOptions = {
    types: {
      heading: ({ level }) => `h${level}`,
      paragraph: "p",
      camelCase: "camel",
      snake_case: "snake",
      comp: () => ProsemirrorRender,
      tw: ["tailwind", { class: "bg-white" }],
      script: false,
    },
    skipUnknown: false,
  };

  it("returns the element name", () => {
    expect(resolveProseComponent({ type: "paragraph" }, options)).toStrictEqual(["p", {}]);
  });

  it("returns the node type if no correspondance", () => {
    expect(resolveProseComponent({ type: "unknown" }, options)).toStrictEqual(["unknown", {}]);
    expect(resolveProseComponent({ type: "unknownType" }, options)).toStrictEqual(["unknown-type", {}]);
  });

  it("returns false with skipUnknown enabled", () => {
    expect(resolveProseComponent({ type: "unknown" }, { ...options, skipUnknown: true })).toStrictEqual([false, {}]);
    expect(resolveProseComponent({ type: "unknownType" }, { ...options, skipUnknown: true })).toStrictEqual([false, {}]);
  });

  it("returns false if set to false", () => {
    expect(resolveProseComponent({ type: "script" }, options)).toStrictEqual([false, {}]);
  });

  it("finds the type in camel case", () => {
    expect(resolveProseComponent({ type: "camelCase" }, options)).toStrictEqual(["camel", {}]);
    expect(resolveProseComponent({ type: "camel-case" }, options)).toStrictEqual(["camel", {}]);
    expect(resolveProseComponent({ type: "camel_case" }, options)).toStrictEqual(["camel", {}]);
  });

  it("finds the type in snake case", () => {
    expect(resolveProseComponent({ type: "snakeCase" }, options)).toStrictEqual(["snake", {}]);
    expect(resolveProseComponent({ type: "snake-case" }, options)).toStrictEqual(["snake", {}]);
    expect(resolveProseComponent({ type: "snake_case" }, options)).toStrictEqual(["snake", {}]);
  });

  it("returns a component", () => {
    expect(resolveProseComponent({ type: "comp" }, options)).toStrictEqual([ProsemirrorRender, {}]);
  });

  it("tries to resolve to a component", () => {
    expect(resolveProseComponent({ type: "foo-bar" }, options)).toStrictEqual(["foo-bar", {}]);
  });

  it("can use node attributes", () => {
    expect(resolveProseComponent({ type: "heading", attrs: { level: 1 } }, options)).toStrictEqual(["h1", { level: 1 }]);
  });

  it("can returns properties", () => {
    expect(resolveProseComponent({ type: "tw" }, options)).toStrictEqual(["tailwind", { class: "bg-white" }]);
  });
});
