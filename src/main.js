import { createApp } from "vue";
import App from "./App.vue";

// Tailwind styles
import "./index.css";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle as fasCheckCircle,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as farCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

library.add(fasCheckCircle);
library.add(farCheckCircle);
library.add(faTrash);

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.config.productionTip = false;

app.mount("#app");
