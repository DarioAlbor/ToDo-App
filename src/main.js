import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faExclamation, faUser, faBook, faPlus, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faSun, faExclamation, faUser, faBook, faPlus, faPencilAlt, faTrash);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');