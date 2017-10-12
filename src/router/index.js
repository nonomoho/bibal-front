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

import ExemplaireIndex from '@/components/exemplaires/Index.vue'
import ExemplaireCreate from '@/components/exemplaires/Create.vue'
import ExemplaireUpdate from '@/components/exemplaires/Update.vue'

import ReservationIndex from '@/components/reservations/Index.vue'
import ReservationCreate from '@/components/reservations/Create.vue'
import ReservationUpdate from '@/components/reservations/Update.vue'

import EmpruntIndex from '@/components/emprunts/Index.vue'
import EmpruntCreate from '@/components/emprunts/Create.vue'
import EmpruntUpdate from '@/components/emprunts/Update.vue'

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
      path: '/exemplaires',
      name: 'exemplaires.index',
      component: ExemplaireIndex
    },
    {
      path: '/exemplaires/create',
      name: 'exemplaires.create',
      component: ExemplaireCreate
    },
    {
      path: '/exemplaires/:id/update',
      name: 'exemplaires.update',
      component: ExemplaireUpdate,
      props: true
    },
    {
      path: '/reservations',
      name: 'reservations.index',
      component: ReservationIndex
    },
    {
      path: '/reservations/create',
      name: 'reservations.create',
      component: ReservationCreate
    },
    {
      path: '/reservations/:id/update',
      name: 'reservations.update',
      component: ReservationUpdate,
      props: true
    },
    {
      path: '/emprunts',
      name: 'emprunts.index',
      component: EmpruntIndex
    },
    {
      path: '/emprunts/create',
      name: 'emprunts.create',
      component: EmpruntCreate
    },
    {
      path: '/emprunts/:id/update',
      name: 'emprunts.update',
      component: EmpruntUpdate,
      props: true
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
