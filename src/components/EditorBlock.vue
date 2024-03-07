<template>
  <div class="col-span-8 h-screen bg-dark-grey overflow-y-auto">
    <div
      v-if="selectedNote !== ''"
      :class="[isEditMode ? 'pointer-events-auto' : 'pointer-events-none']"
      class="px-[20px] py-[15px] h-full"
    >
      <!-- Title Block -->
      <div class="flex items-center justify-between mb-[15px]">
        <input
          class="text-[28px] text-white placeholder:text-white bg-dark-grey font-medium outline-none"
          type="text"
          v-model="selectedNote.title"
          placeholder="Write Something..."
          @blur="addTitle(selectedNote.title)"
          @keypress.enter="addTitle(selectedNote.title)"
        />
        <button type="button">Settings</button>
      </div>
      <!-- Tags Block -->
      <div class="flex items-start gap-x-[10px] mb-[15px]">
        <span>Tags:</span>
        <ul class="flex flex-wrap items-center gap-[5px]">
          <li
            v-for="tag in selectedNote.tags"
            class="group relative flex items-center justify-center text-white bg-[purple] px-[10px] py-[2px] rounded-[15px]"
          >
            {{ tag }}
            <button
              @click="removeTag(tag)"
              class="group-hover:block hidden absolute top-[-5px] right-[-5px] bg-medium-grey w-[18px] h-[18px] rounded-full p-[3px]"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            </button>
          </li>
        </ul>
        <input
          v-model="newTag"
          @keypress.enter="addTag(newTag)"
          v-if="isEditMode"
          class="text-[16px] text-white placeholder:text-white bg-dark-grey font-medium outline-none"
          type="text"
          placeholder="Add Tag..."
        />
      </div>
      <!-- Status Block -->
      <div class="mb-[15px]">
        <div class="flex items-center gap-x-[15px]">
          <span>Status:</span>
          <div class="relative flex flex-col">
            <div
              @click="openStatusList"
              class="flex items-center gap-x-[50px] bg-medium-grey px-[20px] py-[8px] rounded-[5px] cursor-pointer"
            >
              <span class="font-medium">{{ selectedNote.status }}</span>
              <div
                class="w-[20px] h-[20px] transition-all duration-150"
                :class="[isOpen ? 'rotate-180' : '']"
              >
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
              </div>
            </div>
            <ul
              v-if="isOpen"
              class="absolute top-[45px] w-full bg-medium-grey rounded-[5px] overflow-hidden"
            >
              <li
                v-for="status in statusList"
                @click="selectStatus(status)"
                class="font-medium cursor-pointer hover:bg-blue px-[20px] py-[4px]"
              >
                {{ status }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Content Block -->
      <textarea
        class="text-[18px] text-white placeholder:text-white bg-dark-grey font-medium outline-none resize-none w-full h-full mb-[15px]"
        placeholder="Write Task..."
        v-model="selectedNote.content"
        @blur="addContent(selectedNote.content)"
        @keypress.enter="addContent(selectedNote.content)"
      ></textarea>
    </div>
    <div
      v-else
      class="flex items-center justify-center px-[20px] py-[15px] w-full h-full"
    >
      <h1 class="text-[52px] font-bold">Select Note...</h1>
    </div>
    <!-- Mode Toggle -->
    <button
      v-if="selectedNote !== ''"
      @click="toggleEditorMode()"
      class="absolute right-[50px] bottom-[50px]"
      type="button"
    >
      <div
        class="relative inline-flex items-center gap-x-[10px] bg-white p-[10px] rounded-[50px] cursor-pointer after:w-[30px] after:absolute after:bg-blue/90 after:rounded-[50px] after:top-[5px] after:bottom-[5px]"
        :class="[isEditMode ? 'after:right-[5px]' : 'after:left-[5px]']"
      >
        <div class="relative z-20 w-[20px] h-[20px]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 21H17M6.2 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V13.8C3 14.9201 3 15.4802 3.21799 15.908C3.40973 16.2843 3.71569 16.5903 4.09202 16.782C4.51984 17 5.07989 17 6.2 17Z"
                stroke="#212227"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </div>
        <div class="relative z-20 w-[20px] h-[20px]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                stroke="#212227"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                stroke="#212227"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

// Variables
const store = useStore();
const notes = computed(() => store.state.notes);
const selectedNote = computed(() => store.state.selectedNote);
const isEditMode = ref(false);
const isOpen = ref(false);
const statusList = ref(["Active", "On Hold", "Completed", "Dropped"]);
const currentNoteStatus = ref(selectedNote.value.status);
const newTag = ref("");

// Toggle Editor Mode
function toggleEditorMode() {
  isEditMode.value = !isEditMode.value;
}

// Open Status List
function openStatusList() {
  isOpen.value = !isOpen.value;
}

// Add Title
function addTitle(title) {
  selectedNote.value.title = title;
}

// Add New Tag
function addTag(tag) {
  selectedNote.value.tags.push(tag);
  newTag.value = "";
}

// Select Status
function selectStatus(status) {
  currentNoteStatus.value = status;
  selectedNote.value.status = currentNoteStatus.value;
  isOpen.value = false;
}

// Add Content
function addContent(content) {
  selectedNote.value.content = content;
}

// Remove Tag
function removeTag(tag) {
  for (let i = 0; i < selectedNote.value.tags.length; i++) {
    if (selectedNote.value.tags[i] === tag) {
      selectedNote.value.tags.splice(i, 1);
    }
  }
}

// Edit The Main Note
onMounted(() => {
  for (let i = 0; i < notes.value.length; i++) {
    if (selectedNote.value.id === notes.value[i].id) {
      notes.value[i] = selectedNote.value;
    }
  }
});
</script>
