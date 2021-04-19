import { createApp } from "vue";
import App from "./App.vue";
import vNotif from "../src/vNotif";

createApp(App)
    .use(vNotif)
    .mount("#app");
