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
  });

  it("finds the type in pascal case", () => {
    expect(resolveProseComponent({ type: "kebab-case" }, components)).toStrictEqual(["kebab", {}]);
  });

  it("returns a component", () => {
    expect(resolveProseComponent({ type: "comp" }, components)).toStrictEqual([ProseMirrorNode, {}]);
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
