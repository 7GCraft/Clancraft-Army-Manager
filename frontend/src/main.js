import { createApp } from 'vue';
import App from './App.vue';


import './assets/tailwind.css';

import router from './router'
import store from './store/index'

import {FontAwesomeIcon} from './icon'
import userAlert from './components/UserAlert';


const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('user-alert', userAlert);


app.use(router);
app.use(store)

app.mount('#app');
