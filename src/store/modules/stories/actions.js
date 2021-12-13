export default {
  async registerStory(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      uri: 'xxx/stories.json',
      method: 'POST'
    })
  },
  async updateStory(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      uri: 'xxx/stories/' + payload.storyId + '.json',
      method: 'PUT'
    })
  },
  async deleteStory(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      uri: 'xxx/stories/' + payload + '.json',
      method: 'DELETE'
    });
  },
  async auth(context, payload) {
    const storyData = {
      storyTitle: payload.storyTitle,
      author: localStorage.getItem('userName'),
      authorId: localStorage.getItem('userId'),
      description: payload.desc,
      story: payload.story,
      categories: payload.categories,
    };

    const token = context.rootGetters.token;
    const response = await fetch(payload.uri + '?auth=' + token, {
      method: payload.method,
      body: JSON.stringify(storyData)
    });
    const responseData = await response.json();
    if(!response.ok) { throw new Error(responseData.message || 'Failed to fetch!'); }

    context.commit('registerStory',{
      ...storyData,
      id: payload.id,
    });
  },
  async loadStories(context, payload) {
    if(payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(`xxx/stories.json`);
    const responseData = await response.json();
    if(!response.ok) { throw new Error(responseData.message || 'Failed to fetch!'); }

    const stories = [];

    for(const key in responseData) {
      const story = {
        id: key,
        storyTitle: responseData[key].storyTitle,
        author: responseData[key].author,
        authorId: responseData[key].authorId,
        description: responseData[key].description,
        story: responseData[key].story,
        categories: responseData[key].categories,
      };
      stories.push(story);
    }
    context.commit('setStories', stories);
    context.commit('setFetchTimestamp');
  },
};