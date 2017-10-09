import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
import PageNotFound from '@/components/PageNotFound.vue'

import UsagerIndex from '@/components/usagers/Index.vue'
import UsagerCreate from '@/components/usagers/Create.vue'
import UsagerUpdate from '@/components/usagers/Update.vue'

import OeuvreIndex from '@/components/oeuvres/Index.vue'
import OeuvreCreate from '@/components/oeuvres/Create.vue'
import OeuvreUpdate from '@/components/oeuvres/Update.vue'
import OeuvreShow from '@/components/oeuvres/Show.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // redirect: {name: 'usagers.index'}
    },
    {
      path: '/usagers',
      name: 'usagers.index',
      component: UsagerIndex
    },
    {
      path: '/usagers/create',
      name: 'usagers.create',
      component: UsagerCreate
    },
    {
      path: '/usagers/:id/update',
      name: 'usagers.update',
      component: UsagerUpdate,
      props: true
    },
    {
      path: '/oeuvres',
      name: 'oeuvres.index',
      component: OeuvreIndex
    },
    {
      path: '/oeuvres/create',
      name: 'oeuvres.create',
      component: OeuvreCreate
    },
    {
      path: '/oeuvres/:id/update',
      name: 'oeuvres.update',
      component: OeuvreUpdate,
      props: true
    },
    {
      path: '/oeuvres/:id',
      name: 'oeuvres.show',
      component: OeuvreShow,
      props: true
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
