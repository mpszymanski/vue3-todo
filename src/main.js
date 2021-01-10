import { createApp } from 'vue'
import App from './App.vue'

// Tailwind styles
import './index.css'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

library.add(faCheckCircle)

app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false

app.mount('#app')
