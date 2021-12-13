<template>
  <li>
    <h3>{{ storyTitle }}</h3>
    <h4>By {{ author }}</h4>
    <p>{{ description }}</p>
    <div>
      <base-badge v-for="category in categories" :key="category" :type="category" :title="category"></base-badge>
    </div>
    <div class="actions">
      <base-button link :to="storyLink">View Story</base-button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'StoryItem',
  props: ['id', 'storyTitle', 'author', 'description', 'categories', 'story'],
  computed: {
    storyLink() {
      return this.$route.path + '/' + this.id;
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>