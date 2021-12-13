<template>
  <base-card>
    <h2>Find your Story</h2>
    <span class="filter-option">
      <input type="checkbox" id="bedtime" checked @change="setFilter" />
      <label for="bedtime">Bedtime</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="feelgood" checked @change="setFilter" />
      <label for="feelgood">Feelgood</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="strange" checked @change="setFilter" />
      <label for="strange">Strange</label>
    </span>
  </base-card>
</template>

<script>
export default {
  name: 'StoryFilter',
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        bedtime: true,
        feelgood: true,
        strange: true,
      }
    }
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>