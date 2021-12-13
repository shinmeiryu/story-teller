import { createStore } from 'vuex';

import storiesModule from './modules/stories/index.js'
import authModule from './modules/auth/index.js'

const store = createStore({
  modules: {
    stories: storiesModule,
    auth: authModule,
  },
});

export default store;