<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <story-filter @change-filter="setFilters"></story-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadStories(true)" mode="outline">Refresh</base-button>
          <base-button v-if="moreThanOneStory" @click="readRandomStory">Random Story</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to create a new story</base-button>
          <base-button link to="/register" v-if="isLoggedIn && !isLoading">
            Register Story
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasStories">
          <story-item
            v-for="story in filteredStories"
            :key="story.id"
            :id="story.id"
            :storyTitle="story.storyTitle"
            :author="story.author"
            :description="story.description"
            :categories="story.categories"
          ></story-item>
        </ul>
        <h3 v-else>No stories found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import StoryItem from '@/components/stories/StoryItem';
import StoryFilter from '@/components/stories/StoryFilter';

export default {
  name: 'StoryList',
  components: {StoryItem, StoryFilter},
  data () {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        bedtime: true,
        feelgood: true,
        strange: true,
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    filteredStories() {
      const stories = this.$store.getters['stories/stories'];
      return stories.filter(story => {
        if (this.activeFilters.bedtime && story.categories.includes('bedtime')) {
          return true;
        }
        if (this.activeFilters.feelgood && story.categories.includes('feelgood')) {
          return true;
        }
        if (this.activeFilters.strange && story.categories.includes('strange')) {
          return true;
        }
        return false;
      })
    },
    hasStories() {
      return !this.isLoading && this.$store.getters['stories/hasStories'];
    },
    moreThanOneStory() {
      return this.$store.getters['stories/stories'].length > 1;
    }
  },
  created() {
    this.loadStories();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadStories(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('stories/loadStories', {forceRefresh: refresh});
      } catch(error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    readRandomStory() {
      const randomStoryId = Math.floor(Math.random() * this.$store.getters['stories/stories'].length);
      const destination = '/stories/' + this.$store.getters['stories/stories'][randomStoryId].id;
      this.$router.replace(destination);
    },
    handleError() {
      this.error = null;
    },
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>