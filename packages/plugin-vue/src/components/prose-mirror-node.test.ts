import { mount } from "@vue/test-utils";
import ProseMirrorNode, { resolveProseComponent, substituteAttributes } from "./prose-mirror-node.ts";
import { describe, it, expect } from "vitest";

describe("component ProseMirrorNode", () => {
  it("renders simple node", async () => {
    expect(ProseMirrorNode).toBeTruthy();

    const wrapper = mount(ProseMirrorNode, {
      props: {
        node: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "content",
                },
              ],
            },
          ],
        },
      },
    });

    expect(wrapper.text()).toContain("content");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders simple mark", async () => {
    expect(ProseMirrorNode).toBeTruthy();

    const wrapper = mount(ProseMirrorNode, {
      props: {
        node: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "content",
                },
              ],
            },
          ],
        },
      },
    });

    expect(wrapper.text()).toContain("content");
    expect(wrapper.html()).toContain("<b>content</b>");
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("substituteAttributes", () => {
  it("replaces placeholders", () => {
    expect(substituteAttributes("paragraph[foo]")).toBe("paragraphfoo");
    expect(substituteAttributes("paragraph[foo]", { foo: "bar" })).toBe("paragraphbar");

    expect(substituteAttributes("h[level]", { level: 1 })).toBe("h1");
  });

  it("noop if no placeholder", () => {
    expect(substituteAttributes("h", { level: 1 })).toBe("h");
  });
});

describe("resolveProseComponent", () => {
  it("returns the element name", () => {
    expect(resolveProseComponent({ type: "paragraph" }, { paragraph: "p" })).toBe("p");
  });

  it("returns the node type if no correspondance", () => {
    expect(resolveProseComponent({ type: "paragraph" }, {})).toBe("paragraph");
  });

  it("finds the type in camel case", () => {
    expect(resolveProseComponent({ type: "camelCase" }, { camel_case: "p" })).toBe("p");
  });

  it("finds the type in pascal case", () => {
    expect(resolveProseComponent({ type: "kebab-case" }, { kebab_case: "p" })).toBe("p");
  });

  it("returns a component", () => {
    expect(resolveProseComponent({ type: "p" }, { p: ProseMirrorNode })).toBe(ProseMirrorNode);
  });

  it("tries to resolve to a component", () => {
    expect(resolveProseComponent({ type: "foo-bar" }, {})).toBe("foo-bar");
  });
});
