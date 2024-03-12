import { createApp } from "vue";
import "./style.css";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import BaseFolderPreview from "./components/base/BaseFolderPreview.vue";
import BaseNotePreview from "./components/base/BaseNotePreview.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("BaseFolderPreview", BaseFolderPreview);
app.component("BaseNotePreview", BaseNotePreview);

app.mount("#app");
