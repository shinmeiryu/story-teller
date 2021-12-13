<template>
  <section>
    <base-card>
      <h2>Register as a new story now!</h2>
      <story-form @save-data="saveData"></story-form>
    </base-card>
  </section>
</template>

<script>
import StoryForm from '@/components/stories/StoryForm';

export default {
  name: 'StoryRegistration',
  components: {StoryForm},
  methods: {
    saveData(data) {
      if(this.$route.query.edit) {
        this.$store.dispatch('stories/updateStory', data);
      } else {
        this.$store.dispatch('stories/registerStory', data);
      }
      this.$router.replace('/stories');
    }
  }
};
</script>