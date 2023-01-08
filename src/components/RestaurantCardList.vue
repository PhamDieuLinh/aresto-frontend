<template>
  <div class="container-fluid">
    <div class="row" v-for="restaurant in restaurants" :key="restaurant.id" >
      <restaurant-card :restaurant="restaurant"></restaurant-card>
    </div>
  </div>
</template>

<script>
import RestaurantCard from '@/components/RestaurantCard'
export default {
  name: 'RestaurantCardList',
  components: { RestaurantCard },
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
