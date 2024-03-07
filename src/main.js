import { createApp } from "vue";
import "./style.css";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import BaseSelect from "./components/base/BaseSelect.vue";
import BaseFolderPreview from "./components/base/BaseFolderPreview.vue";
import BaseNotePreview from "./components/base/BaseNotePreview.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("BaseSelect", BaseSelect);
app.component("BaseFolderPreview", BaseFolderPreview);
app.component("BaseNotePreview", BaseNotePreview);

app.mount("#app");
