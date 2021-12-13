import { createRouter, createWebHistory } from 'vue-router';

import StoriesList from '@/pages/stories/StoriesList';
import store from '@/store/index';
import NotFound from '@/pages/NotFound';

const TheStory = () => import('@/pages/stories/TheStory');
const StoryRegistration = () => import('@/pages/stories/StoryRegistration');
const UserAuth = () => import('@/pages/auth/UserAuth');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/stories' },
    {path: '/stories', component: StoriesList},
    {path: '/stories/:id', component: TheStory, props: true},
    {path: '/register', component: StoryRegistration, meta: { requiresAuth: true }},
    {path: '/auth', component: UserAuth, meta: { requiresUnauth: true }},
    {path: '/:notFound(.*)', component: NotFound},
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/stories');
  } else {
    next();
  }
});

export default router;