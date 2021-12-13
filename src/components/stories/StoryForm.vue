<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !storyTitle.isValid}">
      <label for="storyTitle">Title</label>
      <input type="text" id="storyTitle" v-model.trim="storyTitle.val" @blur="clearValidity('storyTitle')"/>
      <p v-if="!storyTitle.isValid">Title must not be empty.</p>
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description.val" @blur="clearValidity('description')"/>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{invalid: !story.isValid}">
      <label for="story">Story</label>
      <textarea id="story" rows="20" v-model.trim="story.val" @blur="clearValidity('story')"/>
      <p v-if="!story.isValid">Story must not be empty.</p>
    </div>
    <div class="form-control" :class="{invalid: !categories.isValid}">
      <h3>Categories</h3>
      <div>
        <input type="checkbox" id="bedtime" value="bedtime" v-model="categories.val" @blur="clearValidity('categories')">
        <label for="bedtime">Bedtime stories</label>
      </div>
      <div>
        <input type="checkbox" id="feelgood" value="feelgood" v-model="categories.val" @blur="clearValidity('categories')">
        <label for="feelgood">Feelgood stories</label>
      </div>
      <div>
        <input type="checkbox" id="strange" value="strange" v-model="categories.val" @blur="clearValidity('categories')">
        <label for="strange">Strange stories</label>
      </div>
      <p v-if="!categories.isValid">Select at least one category.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors.</p>
    <base-button>{{ submitButtonCaption }}</base-button>
  </form>
</template>

<script>
export default {
  name: 'StoryForm',
  emits: ['save-data'],
  data() {
    return {
      storyTitle: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      story: {
        val: '',
        isValid: true
      },
      categories: {
        val: [],
        isValid: true
      },
      formIsValid: true,
    }
  },
  computed: {
    submitButtonCaption() {
      return this.$route.query.edit ? 'Update Story' : 'Register Story';
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.storyTitle.val === '') {
        this.storyTitle.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.story.val === '') {
        this.story.isValid = false;
        this.formIsValid = false;
      }
      if (this.categories.val.length === 0) {
        this.categories.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      const formData = {
        storyId: this.$route.query.edit ? this.$route.query.edit : null,
        storyTitle: this.storyTitle.val,
        author: this.$store.getters.userName,
        authorId: this.$store.getters.userId,
        desc: this.description.val,
        story: this.story.val,
        categories: this.categories.val,
      };

      this.$emit('save-data', formData);
    }
  },
  mounted() {
    if(this.$route.query.edit) {
      this.selectedStory = this.$store.getters['stories/stories'].find(st => st.id === this.$route.query.edit);
      this.storyTitle.val = this.selectedStory.storyTitle;
      this.description.val = this.selectedStory.description;
      this.story.val = this.selectedStory.story;
      this.categories.val = this.selectedStory.categories;
      this.storyTitle.val = this.selectedStory.storyTitle;
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #328b0f;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #328b0f solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>