import { mount } from "@vue/test-utils";
import ProseMirrorNode, { resolveProseComponent } from "./prose-mirror-node";
import { describe, it, expect } from "vitest";
import { VueProseMirrorComponents } from "../options";

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

describe("resolveProseComponent", () => {
  const components: VueProseMirrorComponents = {
    heading: ({ level }) => `h${level}`,
    paragraph: "p",
    camel_case: "camel",
    kebab_case: "kebab",
    comp: () => ProseMirrorNode,
  };

  it("returns the element name", () => {
    expect(resolveProseComponent({ type: "paragraph" }, components)).toBe("p");
  });

  it("returns the node type if no correspondance", () => {
    expect(resolveProseComponent({ type: "unknown" }, components)).toBe("unknown");
  });

  it("finds the type in camel case", () => {
    expect(resolveProseComponent({ type: "camelCase" }, components)).toBe("camel");
  });

  it("finds the type in pascal case", () => {
    expect(resolveProseComponent({ type: "kebab-case" }, components)).toBe("kebab");
  });

  it("returns a component", () => {
    expect(resolveProseComponent({ type: "comp" }, components)).toBe(ProseMirrorNode);
  });

  it("tries to resolve to a component", () => {
    expect(resolveProseComponent({ type: "foo-bar" }, components)).toBe("foo-bar");
  });

  it("can use node attributes", () => {
    expect(
      resolveProseComponent(
        {
          type: "heading",
          attrs: { level: 1 },
        },
        components,
      ),
    ).toBe("h1");
  });
});
