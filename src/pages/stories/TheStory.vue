<template>
  <div>
    <base-dialog :fixed="true" :show="this.toBeDeleted" title="Delete story?" @close="closeDeleteDialog">
      <section>
        {{ deleteDialogText }}
      </section>
      <menu>
        <div name="actions">
          <base-button @click="deleteStory">Yes</base-button>
          <base-button @click="closeDeleteDialog">No</base-button>
        </div>
      </menu>
    </base-dialog>
    <section>
      <base-card>
        <h2>"{{ storyTitle }}"</h2>
        <h3>By {{ author }}</h3>
        <p>{{ story }}</p>
      </base-card>
      <base-card>
        <base-button v-if="!isAuthor" class="go-to-home" link to="/">Return to home</base-button>
        <div v-else>
          <base-button class="go-to-home extra edit" link :to="'/register?edit=' + this.id">Edit this Story</base-button>
          <base-button class="go-to-home extra delete" @click="confirmDelete">Delete this Story</base-button>
          <base-button class="go-to-home" link to="/">Return to home</base-button>
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TheStory',
  props: ['id'],
  data() {
    return {
      selectedStory: null,
      toBeDeleted: false
    };
  },
  computed: {
    storyTitle() {
      return this.selectedStory.storyTitle;
    },
    author() {
      return this.selectedStory.author;
    },
    categories() {
      return this.selectedStory.categories;
    },
    description() {
      return this.selectedStory.description;
    },
    story() {
      return this.selectedStory.story;
    },
    deleteDialogText() {
      return 'Are you sure you want to delete "' + this.selectedStory.storyTitle + '"?';
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isAuthor() {
      return this.$store.getters.userId === this.selectedStory.authorId;
    }
  },
  methods: {
    confirmDelete() {
      this.toBeDeleted = true;
    },
    deleteStory() {
      this.$store.dispatch('stories/deleteStory', this.id);
      this.$router.replace('/stories');
    },
    closeDeleteDialog() {
      this.toBeDeleted = false;
    },
  },
  created() {
    this.selectedStory = this.$store.getters['stories/stories'].find(st => st.id === this.id);
  },
};
</script>

<style scoped>
p {
  white-space: pre-wrap;
}

.go-to-home {
  width: 100%;
  text-align: center;
}

.go-to-home.extra {
  margin-bottom: 10px;
}

.go-to-home.edit {
  background-color: #F0FFFFB5;
  color: black;
}
.go-to-home.edit:hover {
  background-color: #9F9E9EB5;
}

.go-to-home.delete {
  background-color: #E01C1CFF;
}
.go-to-home.delete:hover {
  background-color: darkred;
}

</style>