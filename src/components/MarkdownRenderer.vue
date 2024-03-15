<script setup lang="ts">
import MarkdownIt from "markdown-it";
// import { onMounted } from "vue";
import marked from 'marked';
import { computed, onMounted, ref } from "vue";

const s = ref("# Hello, **World**!");

defineProps({
  source: {
    type: String,
    default: ""
  }
});

computed(() => {
  let x = ""
  if (s.value) {
    // x = marked(s.value);
    console.log(x);
  }
  return x;
})

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
</script>

<template>
  <div class="markdown" v-html="markdown.render(source)" />
</template>

<style scoped>
/* h1 {
  border: thin solid red !important;
} */

div.markdown[data-v-0b0b9f63] h1 {
  border: thin solid red !important;
}
</style>
