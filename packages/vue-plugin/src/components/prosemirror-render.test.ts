// @vitest-environment happy-dom
import { mount } from "@vue/test-utils";
import ProsemirrorRender from "./prosemirror-render";
import { describe, it, expect } from "vitest";
import { ProsemirrorJSONNode } from "../prosemirror-json";
import { VueProsemirrorOptionsKey } from "../options";

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
                attrs: {
                  "data-test": "bold",
                },
              },
              {
                type: "italic",
                attrs: {
                  "data-test": "italic",
                },
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
    expect(vueDoubleMark.get("[data-test=bold]").get("[data-test=italic]")).toBeDefined();
    expect(vueDoubleMark.get("[data-test=bold]").get("[data-test=italic]").text()).toBe("content");

    expect(vueDoubleMark.text()).toContain("content");
    expect(vueDoubleMark.html()).toMatchSnapshot();
  });

  const nodeEmpty: ProsemirrorJSONNode = {
    type: "doc",
  };
  const vueEmpty = mount(ProsemirrorRender, { props: { node: nodeEmpty } });

  it("renders an empty doc", () => {
    expect(vueEmpty.html()).toBe("<div></div>");
  });

  const nodeMixedTextNodes: ProsemirrorJSONNode = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Simple" }],
      },
      {
        type: "paragraph",
        attrs: {
          "data-test": "paragraph",
        },
        content: [
          { type: "text", text: "This is a " },
          { type: "text", marks: [{ type: "strong" }], text: "basic" },
          { type: "text", text: " example." },
        ],
      },
    ],
  };
  const vueMixedTextNodes = mount(ProsemirrorRender, { props: { node: nodeMixedTextNodes } });

  it("renders mixed text and marks", () => {
    expect(vueMixedTextNodes.get("[data-test=paragraph]").text()).toBe("This is a basic example.");
    expect(vueMixedTextNodes.html()).toMatchSnapshot();
  });

  const unsafeScriptDocument: ProsemirrorJSONNode = {
    type: "doc",
    content: [
      {
        type: "script",
        content: [{ type: "text", text: "console.log('unsafe')" }],
      },
    ],
  };
  const vueUnsafeScript = mount(ProsemirrorRender, {
    props: { node: unsafeScriptDocument },
    global: {
      provide: {
        [VueProsemirrorOptionsKey]: {
          types: {
            script: false,
          },
        },
      },
    },
  });

  it("skip types when false", () => {
    expect(vueUnsafeScript.html()).not.toContain("unsafe");
    expect(vueUnsafeScript.html()).toMatchSnapshot();
  });
});
