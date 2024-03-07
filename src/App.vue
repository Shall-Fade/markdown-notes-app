<template>
  <div class="font-inter font-regular text-[16px] text-white bg-dark-grey min-h-full h-screen w-full">
    <div class="grid grid-cols-12">
      <DirectoryBlock />
      <NotesBlock />
      <EditorBlock />
    </div>
  </div>
</template>

<script setup>
import DirectoryBlock from "./components/DirectoryBlock.vue";
import EditorBlock from "./components/EditorBlock.vue";
import NotesBlock from "./components/NotesBlock.vue";
</script>
