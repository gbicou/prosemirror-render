<script setup lang="ts">
import helloWorld from "#examples/documents/hello-world.json";
</script>

# ProseMirror Examples

This page demonstrates the basics of ProsemirrorRender component.

## Basic document

**Input**

<<< @/../examples/documents/hello-world.json{json}

**Output**

<prosemirror-render :node="helloWorld" />
