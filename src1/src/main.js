import Vue from 'vue'
// import "core-js/stable"
import "regenerator-runtime/runtime"
import App from './App.vue'
import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"
import VueRouter from 'vue-router';
import Users from './Users.vue';
// import "babel-polyfill";
// import "./app";

const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    
      onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
      }
    
})

Vue.use(VueRouter);

const routes = [
  {path:'/users',name:'App',component : Users },
  
];
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
 const router = new VueRouter({
    routes,
    mode:'history'
 });

// new Vue({
//   el: '#app',
//   render: h => h(App),
//   apolloProvider,
// })
new Vue({
  render: h => h(App),
  router,
  apolloProvider,
}).$mount('#app')
