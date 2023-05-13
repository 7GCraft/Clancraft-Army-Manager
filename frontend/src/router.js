import { createRouter, createWebHistory } from 'vue-router';
import { ArmyList,ArmyView,UnitList,NotFound } from '@/pages';
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

  export default router;