import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router'
import ArmyList from './pages/ArmyList.vue'
import ArmyView from './pages/ArmyView.vue'
import NotFound from './pages/NotFound.vue'
const app = createApp(App)

    
const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/armies' },
      {name:'armyView',
        path:'/armies/:armyId',
        component: ArmyView
    },
      {
        name: 'armies',
        path: '/armies',
        component: ArmyList,
      }, // our-domain.com/teams => TeamsList
      
      { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
      // console.log(to, from, savedPosition);
      if (savedPosition) {
        return savedPosition;
      }
      return { left: 0, top: 0 };
    }
  });

app.use(router)

app.mount('#app')
