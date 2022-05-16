import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import BaseCard from './components/ui/BaseCard'
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
const app=createApp(App);

app.component('BaseCard',BaseCard)
app.component('BaseButton',BaseButton)
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.use(store)
app.use(router)
app.mount('#app')
