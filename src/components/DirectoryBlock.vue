<template>
  <div class="col-span-2 h-screen bg-dark-grey overflow-y-auto">
    <!-- Folders List-->
    <ul class="flex flex-col gap-y-[8px] text-[16px] py-[15px]">
      <li v-for="(folder, index) in folders">
        <base-folder-preview :folder="folder" :key="index">
        </base-folder-preview>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// Variables
const store = useStore();
const folders = computed(() => store.state.folders);
</script>
