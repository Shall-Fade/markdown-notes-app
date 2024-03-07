<template>
  <div
    @click="selectFolder(folder)"
    class="flex items-center justify-between cursor-pointer px-[20px] duration-100 hover:bg-blue/30"
  >
    <div class="relative flex items-center gap-[5px]">
      <!-- <button
        v-if="folder.folders && !folder.icon"
        class="absolute left-[-25px] w-[20px] h-[20px]"
        type="button"
      >
        <img
          class="w-full h-full"
          src="/images/icons/angle-down.svg"
          alt="Note"
        />
      </button> -->
      <img
        v-if="folder.icon"
        class="w-[20px] h-[20px]"
        :src="folder.icon"
        :alt="folder.title"
      />
      <span
        v-if="folder.color"
        class="bg-[purple] rounded-[50%] w-[10px] h-[10px] mr-[10px]"
      >
      </span>
      <span>
        {{ folder.title }}
      </span>
    </div>
    <button
      class="w-[15px] h-[15px] transition-all duration-150"
      :class="[isOpen ? 'rotate-180' : '']"
      v-if="folder.expand"
      type="button"
    >
      <!-- <img
        class="w-full h-full"
        src="/images/icons/angle-down.svg"
        alt="Angle"
      /> -->
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="#EBEBEB"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="VGRepo_iconCarrier">
          <path
            fill="#EBEBEB"
            fill-rule="evenodd"
            d="M12.2929,5.292875 C12.6834,4.902375 13.3166,4.902375 13.7071,5.292875 C14.0976,5.683375 14.0976,6.316555 13.7071,6.707085 L8.70711,11.707085 C8.31658,12.097605 7.68342,12.097605 7.29289,11.707085 L2.29289,6.707085 C1.90237,6.316555 1.90237,5.683375 2.29289,5.292875 C2.68342,4.902375 3.31658,4.902375 3.70711,5.292875 L8,9.585765 L12.2929,5.292875 Z"
          ></path>
        </g>
      </svg>
    </button>
    <span v-else class="text-[14px] text-light-grey/50">{{ folder.notes.length }}</span>
  </div>
  <ul
    v-if="folder.folders && isOpen"
    class="flex flex-col gap-y-[5px] ml-[20px] mt-[5px]"
  >
    <li v-for="(folder, index) in folder.folders">
      <base-folder-preview :folder="folder" :key="index"></base-folder-preview>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

// Variables
const store = useStore();
const props = defineProps(["folder"]);
const isOpen = ref(true);
// let test = store.getters.notesCount;

// Select Folder
function selectFolder(folder) {
  if (folder.expand) {
    isOpen.value = !isOpen.value;
  } else {
    store.commit("SELECT_FOLDER", folder.title);
  }
}
</script>
