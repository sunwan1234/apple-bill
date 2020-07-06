import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
      path: '/',
      redirect: '/money'
    },
    {
      path: '/money',
      component: Money
    },
    {
      path: '/labels',
      component: Labels
    },
    {
      path: '/statistics',
      component: Statistics
    },
    {
      path: '*', //不是以上几种情况
      component: NotFound
    }
]

const router = new VueRouter({
  routes
})

export default router
