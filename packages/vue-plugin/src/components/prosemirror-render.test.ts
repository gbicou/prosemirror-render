// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import ProsemirrorRender from './prosemirror-render'
import { describe, it, expect } from 'vitest'
import { ProsemirrorJSONNode } from '../prosemirror-json'
import { defaultOptions, VueProsemirrorOptionsKey } from '../options'
import defu from 'defu'

describe('component ProsemirrorRender', () => {
  it('exists', () => {
    expect.hasAssertions()
    expect(ProsemirrorRender).toBeDefined()
  })

  const nodeSimple: ProsemirrorJSONNode = {
    type: 'doc',
    attrs: {
      'data-test': 'doc',
    },
    content: [
      {
        type: 'paragraph',
        attrs: {
          'data-test': 'paragraph',
        },
        content: [
          {
            type: 'text',
            text: 'content',
          },
        ],
      },
    ],
  }

  it('renders simple node', () => {
    expect.hasAssertions()

    const vueSimple = mount(ProsemirrorRender, { props: { node: nodeSimple } })

    expect(vueSimple.get('[data-test=doc]').element.tagName).toBe('DIV')
    expect(vueSimple.get('[data-test=doc]').element.children).toHaveLength(1)

    expect(vueSimple.get('[data-test=paragraph]').element.tagName).toBe('P')
    expect(vueSimple.get('[data-test=paragraph]').text()).toBe('content')

    expect(vueSimple.html()).toMatchInlineSnapshot(`
      "<div data-test="doc">
        <p data-test="paragraph">content</p>
      </div>"
    `)

    vueSimple.unmount()
  })

  it('don\'t pollute DOM with stringified object', () => {
    expect.hasAssertions()

    const vueSimple = mount(ProsemirrorRender, { props: { node: nodeSimple } })

    expect(vueSimple.html()).not.toContain('object Object')

    vueSimple.unmount()
  })

  const nodeSimpleMark: ProsemirrorJSONNode = {
    type: 'doc',
    attrs: {
      'data-test': 'doc',
    },
    content: [
      {
        type: 'paragraph',
        attrs: {
          'data-test': 'paragraph',
        },
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
                attrs: {
                  'data-test': 'bold',
                },
              },
            ],
            text: 'content',
          },
        ],
      },
    ],
  }

  it('renders simple mark', () => {
    expect.hasAssertions()

    const vueSimpleMark = mount(ProsemirrorRender, { props: { node: nodeSimpleMark } })

    expect(vueSimpleMark.get('[data-test=paragraph]').text()).toBe('content')
    expect(vueSimpleMark.get('[data-test=bold]').text()).toBe('content')

    expect(vueSimpleMark.text()).toContain('content')
    expect(vueSimpleMark.html()).toMatchInlineSnapshot(`
      "<div data-test="doc">
        <p data-test="paragraph"><b data-test="bold">content</b></p>
      </div>"
    `)

    vueSimpleMark.unmount()
  })

  const nodeDoubleMark: ProsemirrorJSONNode = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
                attrs: {
                  'data-test': 'bold',
                },
              },
              {
                type: 'italic',
                attrs: {
                  'data-test': 'italic',
                },
              },
            ],
            text: 'content',
          },
        ],
      },
    ],
  }

  it('renders marks in order', () => {
    expect.hasAssertions()

    const vueDoubleMark = mount(ProsemirrorRender, { props: { node: nodeDoubleMark } })

    expect(vueDoubleMark.get('[data-test=bold]').get('[data-test=italic]')).toBeDefined()
    expect(vueDoubleMark.get('[data-test=bold]').get('[data-test=italic]').text()).toBe('content')

    expect(vueDoubleMark.text()).toContain('content')
    expect(vueDoubleMark.html()).toMatchInlineSnapshot(`
      "<div>
        <p><b data-test="bold"><i data-test="italic">content</i></b></p>
      </div>"
    `)

    vueDoubleMark.unmount()
  })

  const nodeEmpty: ProsemirrorJSONNode = {
    type: 'doc',
  }

  it('renders an empty doc', () => {
    expect.hasAssertions()

    const vueEmpty = mount(ProsemirrorRender, { props: { node: nodeEmpty } })

    expect(vueEmpty.html()).toBe('<div></div>')

    vueEmpty.unmount()
  })

  const nodeMixedTextNodes: ProsemirrorJSONNode = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Simple' }],
      },
      {
        type: 'paragraph',
        attrs: {
          'data-test': 'paragraph',
        },
        content: [
          { type: 'text', text: 'This is a ' },
          { type: 'text', marks: [{ type: 'strong' }], text: 'basic' },
          { type: 'text', text: ' example.' },
        ],
      },
    ],
  }

  it('renders mixed text and marks', () => {
    expect.hasAssertions()

    const vueMixedTextNodes = mount(ProsemirrorRender, { props: { node: nodeMixedTextNodes } })

    expect(vueMixedTextNodes.get('[data-test=paragraph]').text()).toBe('This is a basic example.')
    expect(vueMixedTextNodes.html()).toMatchInlineSnapshot(`
      "<div>
        <h2>Simple</h2>
        <p data-test="paragraph">This is a <strong>basic</strong> example.</p>
      </div>"
    `)

    vueMixedTextNodes.unmount()
  })

  const unsafeScriptDocument: ProsemirrorJSONNode = {
    type: 'doc',
    content: [
      {
        type: 'script',
        content: [{ type: 'text', text: 'console.log(\'unsafe\')' }],
      },
    ],
  }

  it('skip types when set to false', () => {
    expect.hasAssertions()

    const vueUnsafeScript = mount(ProsemirrorRender, {
      props: { node: unsafeScriptDocument },
      global: {
        provide: {
          [VueProsemirrorOptionsKey]: defu(
            {
              types: {
                script: false,
              },
            },
            defaultOptions,
          ),
        },
      },
    })

    expect(vueUnsafeScript.html()).not.toContain('unsafe')
    expect(vueUnsafeScript.html()).toMatchInlineSnapshot(`
      "<div>
        <!-- prosemirror type 'script' skipped -->
      </div>"
    `)

    vueUnsafeScript.unmount()
  })

  it('skip unknown types when skipUnknown option set', () => {
    expect.hasAssertions()

    const vueUnknownSkip = mount(ProsemirrorRender, {
      props: { node: unsafeScriptDocument },

      global: {
        provide: {
          [VueProsemirrorOptionsKey]: defu(
            {
              skipUnknown: true,
            },
            defaultOptions,
          ),
        },
      },
    })

    expect(vueUnknownSkip.html()).not.toContain('unsafe')
    expect(vueUnknownSkip.html()).toMatchInlineSnapshot(`
      "<div>
        <!-- prosemirror type 'script' skipped -->
      </div>"
    `)

    vueUnknownSkip.unmount()
  })

  const textNullish: ProsemirrorJSONNode = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            // eslint-disable-next-line unicorn/no-null
            text: null,
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: undefined,
          },
        ],
      },
    ],
  }

  it('renders an nullish text as empty string', () => {
    expect.hasAssertions()

    const vueTextNullish = mount(ProsemirrorRender, { props: { node: textNullish } })

    expect(vueTextNullish.html()).toMatchInlineSnapshot(`
      "<div>
        <p></p>
        <p></p>
      </div>"
    `)

    vueTextNullish.unmount()
  })
})
