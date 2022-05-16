<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Login to Register as Coach</base-button>
          <base-button link to="/register" v-if="isLoggedIn && !isCoach && !isLoading">register as a Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    CoachFilter,
    BaseDialog,
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    setFilters(updateFilters) {
      this.activeFilters = updateFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", { refresh });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
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