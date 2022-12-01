import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import VCalendar from "v-calendar";

import "./style.css";
import "v-calendar/dist/style.css";

createApp(App).use(store).use(VCalendar, {}).mount("#app");
