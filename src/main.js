import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router'
import ArmyList from './pages/ArmyList.vue'
import ArmyView from './pages/ArmyView.vue'
import NotFound from './pages/NotFound.vue'
import UnitList from './pages/UnitList.vue'
import BaseCard from './components/UI/BaseCard.vue'
import './assets/tailwind.css'

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
      }, 
      {
        name: 'units',
        path:'/units',
        component: UnitList
      },
      
      { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return { left: 0, top: 0 };
    }
  });

app.use(router)

app.component('base-card',BaseCard)
app.mount('#app')
