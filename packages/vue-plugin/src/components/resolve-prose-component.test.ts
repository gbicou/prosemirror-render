import ProsemirrorRender, { resolveProseComponent } from "./prosemirror-render";
import { describe, it, expect } from "vitest";
import { VueProsemirrorTypes } from "../options";

describe("resolveProseComponent", () => {
  const types: VueProsemirrorTypes = {
    heading: ({ level }) => `h${level}`,
    paragraph: "p",
    camelCase: "camel",
    snake_case: "snake",
    comp: () => ProsemirrorRender,
    tw: ["tailwind", { class: "bg-white" }],
  };

  it("returns the element name", () => {
    expect(resolveProseComponent({ type: "paragraph" }, types)).toStrictEqual(["p", {}]);
  });

  it("returns the node type if no correspondance", () => {
    expect(resolveProseComponent({ type: "unknown" }, types)).toStrictEqual(["unknown", {}]);
    expect(resolveProseComponent({ type: "unknownType" }, types)).toStrictEqual(["unknown-type", {}]);
  });

  it("finds the type in camel case", () => {
    expect(resolveProseComponent({ type: "camelCase" }, types)).toStrictEqual(["camel", {}]);
    expect(resolveProseComponent({ type: "camel-case" }, types)).toStrictEqual(["camel", {}]);
    expect(resolveProseComponent({ type: "camel_case" }, types)).toStrictEqual(["camel", {}]);
  });

  it("finds the type in snake case", () => {
    expect(resolveProseComponent({ type: "snakeCase" }, types)).toStrictEqual(["snake", {}]);
    expect(resolveProseComponent({ type: "snake-case" }, types)).toStrictEqual(["snake", {}]);
    expect(resolveProseComponent({ type: "snake_case" }, types)).toStrictEqual(["snake", {}]);
  });

  it("returns a component", () => {
    expect(resolveProseComponent({ type: "comp" }, types)).toStrictEqual([ProsemirrorRender, {}]);
  });

  it("tries to resolve to a component", () => {
    expect(resolveProseComponent({ type: "foo-bar" }, types)).toStrictEqual(["foo-bar", {}]);
  });

  it("can use node attributes", () => {
    expect(resolveProseComponent({ type: "heading", attrs: { level: 1 } }, types)).toStrictEqual(["h1", { level: 1 }]);
  });

  it("can returns properties", () => {
    expect(resolveProseComponent({ type: "tw" }, types)).toStrictEqual(["tailwind", { class: "bg-white" }]);
  });
});
