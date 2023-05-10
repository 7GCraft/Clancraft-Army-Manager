import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ArmyList from './pages/ArmyList.vue';
import ArmyView from './pages/ArmyView.vue';
import NotFound from './pages/NotFound.vue';
import UnitList from './pages/UnitList.vue';
import userAlert from './components/UserAlert';
import './assets/tailwind.css';
/* import the fontawesome core */

import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faTrash, faX, faFileExcel,faPlus,faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faTrash, faX, faFileExcel,faPlus,faBriefcaseMedical);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('user-alert', userAlert);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/armies' },

    {
      name: 'armies',
      path: '/armies',
      component: ArmyList,
      children: [{ name: 'armyView', path: ':armyId', component: ArmyView }],
    },
    {
      name: 'units',
      path: '/units',
      component: UnitList,
    },

    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

app.use(router);

app.mount('#app');
