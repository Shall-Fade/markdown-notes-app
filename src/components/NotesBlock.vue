<template>
  <div class="col-span-2 bg-black h-screen overflow-y-auto">
    <div class="relative flex items-center justify-between px-[20px] py-[15px]">
      <button type="button">
        <img
          class="w-[25px] h-[25px]"
          src="/images/icons/sort-az.svg"
          alt="Sort"
        />
      </button>
      <span>{{ selectedFolder.title }}</span>
      <!-- Notes Create Button -->
      <div>
        <button
          v-if="
            selectedFolder.title !== 'Trash' &&
            selectedFolder.title !== 'Notebooks'
          "
          type="button"
          @click="createNote()"
        >
          <img
            class="w-[20px] h-[20px]"
            src="/images/icons/write-note.svg"
            alt="Create Note"
          />
        </button>
        <div v-if="selectedFolder.title === 'Notebooks'">
          <button
            type="button"
            @click="isVisibleFolderModal = !isVisibleFolderModal"
          >
            <img
              class="w-[20px] h-[20px]"
              src="/images/icons/write-note.svg"
              alt="Create Note"
            />
          </button>
          <form @keyup.esc="isVisibleFolderModal = !isVisibleFolderModal" @keyup.enter="createFolder()" v-if="isVisibleFolderModal" class="absolute flex bg-medium-grey left-0 right-0 mt-[15px] z-[9999]">
            <input v-model="folderTitleValue" class="outline-none px-[20px] py-[5px] text-black font-medium" type="text" placeholder="Folder title...">
            <button @click="createFolder()" class="bg-blue w-full hover:bg-blue/70 duration-200" type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Notes Search Block -->
    <div class="flex items-center relative px-[20px] mb-[10px]">
      <img
        class="absolute ml-[10px] w-[20px] h-[20px]"
        src="/images/icons/search.svg"
        alt="Search"
      />
      <input
        class="w-full rounded-[3px] py-[5px] pl-[40px] pr-[10px] text-white bg-dark-grey placeholder:text-light-grey outline-none"
        type="text"
        placeholder="Search"
        v-model="searchNote"
      />
    </div>
    <!-- Notes List -->
    <ul v-if="selectedFolder.title !== 'Notebooks'" class="text-[16px]">
      <!-- Note -->
      <li v-for="note in notes">
        <base-note-preview v-if="displayNotes(note)" @click="openNote(note)">
          <template v-slot:title>{{ note.title }}</template>
          <template v-slot:date>{{ note.date }}</template>
          <template v-slot:tags>
            <li
              v-for="tag in note.tags"
              class="flex items-center justify-center text-white bg-[purple] px-[5px] py-[1px] rounded-[10px] whitespace-nowrap"
            >
              {{ tag }}
            </li>
          </template>
          <template v-slot:description>
            {{ note.content }}
          </template>
        </base-note-preview>
      </li>
    </ul>
    <!-- Folders List -->
    <ul v-if="selectedFolder.title === 'Notebooks'" class="text-[16px]">
      <!-- Folder -->
      <li v-for="folder in selectedFolder.folders">
        <base-folder-preview :folder="folder" :key="index">
        </base-folder-preview>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
// import { vOnClickOutside } from '@vueuse/components';

// Variables
const store = useStore();
const notes = computed(() => store.state.notes);
const folders = computed(() => store.state.folders);
const selectedFolder = computed(() => store.state.selectedFolder);
const selectedNote = computed(() => store.state.selectedNote);
const searchNote = ref("");
const folderTitleValue = ref("");
const isVisibleFolderModal = ref(false);

// Display Notes
function displayNotes(note) {
  for (let i = 0; i < note.folder.length; i++) {
    if (
      note.folder[i] === selectedFolder.value.title &&
      note.title.toLowerCase().includes(searchNote.value.toLowerCase())
    ) {
      return true;
    }
  }
}

// Generate Random ID
function generateId() {
  return Math.floor(Math.random() * (9999999999 - 999999999) + 999999999);
}

// Get Date
function getDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = new Array("0" + month).slice(-1);
  }

  if (day < 10) {
    day = new Array("0" + day).slice(-1);
  }

  return `${year}-${month}-${day}`;
}

// Create Note
function createNote() {
  let currentId = generateId();

  notes.value.push({
    id: currentId,
    title: "",
    folder: ["All Notes", `${selectedFolder.value.title}`],
    status: "",
    tags: [],
    content: "",
    date: getDate(),
  });

  // Add a note to the selected folder
  findFolder(folders.value, selectedFolder.value.title, currentId);

  // Select a note after creating it
  for (let i = 0; i < notes.value.length; i++) {
    if (notes.value[i].id === currentId) {
      store.commit("SELECT_NOTE", notes.value[i]);
    }
  }

  searchNote.value = "";
}

// Create Folder
function createFolder() {
  if (selectedFolder.value.title === "Notebooks" && folderTitleValue.value !== "") {
    selectedFolder.value.folders.push({
      title: `${folderTitleValue.value}`,
      notes: [],
    });
  }

  isVisibleFolderModal.value = false;
}

// Find Folder
function findFolder(arr, selectedFolder, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === selectedFolder || arr[i].title === "All Notes") {
      arr[i].notes.push(id);
    } else if ("folders" in arr[i]) {
      findFolder(arr[i].folders, selectedFolder, id);
    }
  }
}

// Open Note
function openNote(note) {
  store.commit("SELECT_NOTE", note);
}
</script>
