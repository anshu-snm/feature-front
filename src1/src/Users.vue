<template>
  <div>
    <h1>Users Overview</h1>
    <div v-for="event in events" :key="event.title">{{ event.title }}</div>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  name: "User",
  apollo: {
    events: gql`
      query {
        events {
          title
          description
          date
        }
      }
    `
  }
};
</script>
