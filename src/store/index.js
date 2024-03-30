import { createStore } from "vuex";

const store = createStore({
  state: {
    notes: [
      {
        id: 1,
        title: "Support deep link",
        folder: ["IOS app", "All Notes", "Notebooks"],
        status: "Active",
        tags: ["Important", "Tutorial"],
        content: "Lorem ipsum sit amet consectetur dolor lorema amet sit.",
        date: "2024-01-13",
      },
      {
        id: 2,
        title: "Support deep-deep link",
        folder: ["Pinned Notes", "All Notes"],
        status: "Active",
        tags: ["Important", "Tutorial"],
        content: "Lorem ipsum sit amet consectetur dolor lorema amet sit.",
        date: "2022-01-13",
      },
    ],
    folders: [
      {
        title: "All Notes",
        icon: "./images/icons/note.svg",
        notes: [1, 2],
      },
      {
        title: "Pinned Notes",
        icon: "./images/icons/pin.svg",
        notes: [2],
      },
      {
        title: "Notebooks",
        icon: "./images/icons/notebooks.svg",
        // notes: [1],
        folders: [
          {
            title: "Blog",
            notes: [],
          },
          {
            title: "First notebook",
            notes: [],
          },
          {
            title: "Project",
            notes: [],
          },
          {
            title: "Tips",
            notes: [],
          },
        ],
      },
      {
        title: "Trash",
        icon: "./images/icons/trash.svg",
        notes: [],
      },
      {
        title: "Status",
        icon: "./images/icons/status.svg",
        expand: true,
        folders: [
          {
            title: "Active",
            icon: "./images/icons/status.svg",
            notes: [],
          },
          {
            title: "On Hold",
            icon: "./images/icons/status.svg",
            notes: [],
          },
          {
            title: "Completed",
            icon: "./images/icons/status.svg",
            notes: [],
          },
          {
            title: "Dropped",
            icon: "./images/icons/status.svg",
            notes: [],
          },
        ],
      },
      {
        title: "Tags",
        icon: "./images/icons/tags.svg",
        expand: true,
        folders: [
          {
            title: "Important",
            color: true,
            notes: [],
          },
          {
            title: "Tips",
            color: true,
            notes: [],
          },
          {
            title: "Tutorial",
            color: true,
            notes: [],
          },
          {
            title: "JavaScript",
            color: true,
            notes: [],
          },
        ],
      },
    ],
    selectedFolder: {
      title: "All Notes",
      icon: "./images/icons/note.svg",
      notes: [1, 2],
    },
    selectedNote: "",
  },
  mutations: {
    SELECT_FOLDER(state, selectedFolder) {
      state.selectedFolder = selectedFolder;
    },
    SELECT_NOTE(state, selectedNote) {
      state.selectedNote = selectedNote;
    },
  },
});

export default store;
