export default {
  registerStory(state, payload) {
    state.stories.push(payload);
  },
  setStories(state, payload) {
    state.stories = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};