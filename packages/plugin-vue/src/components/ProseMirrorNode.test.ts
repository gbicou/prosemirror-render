import { mount } from "@vue/test-utils";
import ProseMirrorNode from "./ProseMirrorNode";
import { describe, test, expect } from "vitest";

describe("ProseMirrorNode component", () => {
  test("render simple node", async () => {
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

    expect(wrapper.text()).toContain("fail");

    expect(wrapper.text()).toContain("content");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
