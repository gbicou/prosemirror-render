import { mount } from "@vue/test-utils";
import ProsemirrorRender from "./prosemirror-render";
import { describe, it, expect } from "vitest";
import { ProsemirrorJSONNode } from "../prosemirror-json";

describe("component ProsemirrorRender", () => {
  const nodeSimple: ProsemirrorJSONNode = {
    type: "doc",
    attrs: {
      "data-test": "doc",
    },
    content: [
      {
        type: "paragraph",
        attrs: {
          "data-test": "paragraph",
        },
        content: [
          {
            type: "text",
            text: "content",
          },
        ],
      },
    ],
  };
  const vueSimple = mount(ProsemirrorRender, { props: { node: nodeSimple } });

  it("exists", () => {
    expect(ProsemirrorRender).toBeTruthy();
  });

  it("renders simple node", () => {
    expect(vueSimple.get("[data-test=doc]").element.tagName).toBe("DIV");
    expect(vueSimple.get("[data-test=doc]").element.children).toHaveLength(1);

    expect(vueSimple.get("[data-test=paragraph]").element.tagName).toBe("P");
    expect(vueSimple.get("[data-test=paragraph]").text()).toBe("content");

    expect(vueSimple.html()).toMatchSnapshot();
  });

  it("don't pollute DOM with stringified object", () => {
    expect(vueSimple.html()).not.toContain("object Object");
  });

  const nodeSimpleMark: ProsemirrorJSONNode = {
    type: "doc",
    attrs: {
      "data-test": "doc",
    },
    content: [
      {
        type: "paragraph",
        attrs: {
          "data-test": "paragraph",
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "bold",
                attrs: {
                  "data-test": "bold",
                },
              },
            ],
            text: "content",
          },
        ],
      },
    ],
  };
  const vueSimpleMark = mount(ProsemirrorRender, { props: { node: nodeSimpleMark } });

  it("renders simple mark", () => {
    expect(vueSimpleMark.get("[data-test=paragraph]").text()).toBe("content");
    expect(vueSimpleMark.get("[data-test=bold]").text()).toBe("content");

    expect(vueSimpleMark.text()).toContain("content");
    expect(vueSimpleMark.html()).toMatchSnapshot();
  });

  const nodeDoubleMark: ProsemirrorJSONNode = {
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
              {
                type: "italic",
              },
            ],
            text: "content",
          },
        ],
      },
    ],
  };
  const vueDoubleMark = mount(ProsemirrorRender, { props: { node: nodeDoubleMark } });

  it("renders marks in order", () => {
    expect(vueDoubleMark.html()).toContain("<b><i>content</i></b>");
  });

  const nodeEmpty: ProsemirrorJSONNode = {
    type: "doc",
  };
  const vueEmpty = mount(ProsemirrorRender, { props: { node: nodeEmpty } });

  it("renders an empty doc", () => {
    expect(vueEmpty.html()).toBe("<div></div>");
  });
});
