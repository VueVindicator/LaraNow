/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';
import Gate from './gate';
Vue.prototype.$gate = new Gate(window.user);

import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfiguration: false,
  timer: 3000
});

window.Toast = Toast;

window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'))

Vue.use(VueRouter);

let routes = [
    {path: '/dashboard', component:  require('./components/dashboard.vue').default},
    {path: '/profile', component: require('./components/profile.vue').default},
    {path: '/user', component: require('./components/user.vue').default},
    {path: '/developer', component: require('./components/Developer.vue').default},
    {path: '/invoice', component: require('./components/invoice.vue').default},
    {path: '*', component: require('./components/notfound.vue').default}
]

import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
  color: '#bffaf3',
  failedColor: '#874b4b',
  height: '3px'
});

const router = new VueRouter({
    routes
});

Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function(date_ent){
    return moment(date_ent).format('MMMM, DD, YYYY');
})

let Fire = new Vue();

window.Fire = Fire

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
)

Vue.component(
    'not-found',
    require('./components/notfound.vue').default
)

const app = new Vue({
    el: '#app',
    router,
    data: {
      search: ''
    },
    methods:{
      searchit: _.debounce(() => {
        Fire.$emit('searching');
      }, 2000),
    }
});
