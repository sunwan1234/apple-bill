import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/components/EditLabel.vue';
import Figure from '@/views/Figure.vue';

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
      path: '/labels/edit',
      component: EditLabel
    },
    {
      path: '/statistics',
      component: Statistics
    },
    {
      path: '/figure',
      component: Figure
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
