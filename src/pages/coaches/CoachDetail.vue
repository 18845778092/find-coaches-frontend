<!-- coaches/c1 具体某一个教练页面，从全部教练点进去的页面-->
<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink" v-if="!isContactPage">Contact</base-button>
        </header>
        <transition name="load">
        <router-view></router-view>
        </transition>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>
<script>
export default {
  props: ['id'],        //通过配置路由props:true获取,和this.$route.params.id一样
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      // return this.$route.path + '/' + this.id + '/contact';
      return '/coaches/' + this.id + '/contact';
    },
    isContactPage(){
      return this.$route.path.includes('/contact')
    }
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

<style scoped>
.load-enter-from,
.load-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.load-enter-active {
  transition: all 0.5s ease-out;
}

.load-leave-active {
  transition: all 0.5s ease-in;
}

.load-enter-to,
.load-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>