<template>
  <div class="card mb-3" style="max-width: 1200px;">
    <div class="row g-0">
      <div class="col-md-2">
        <img src="../assets/Restaurant.webp" class="img-fluid rounded-start" style="max-width: 200px;" :alt="restaurant.name">
      </div>
      <div class="col">
        <br>
        <div class="d-flex">
          &nbsp;
          &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          <p class="card-text" style="font-size: 15px">&nbsp;{{restaurant.bewertungIds.length}} Bewertung(en)</p>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{restaurant.name}}</h5>
          <p class="card-text" style="font-size: 13px">{{restaurant.kategorie}}</p>
          <p class="card-text">Adresse: {{restaurant.address}}</p>
          <p class="card-text">Beschreibung: {{restaurant.description}} </p>
          <a :href=" '/bewertungen/restaurant/' + restaurant.id" class="stretched-link">Zu den Bewertungen</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestaurantCard',
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
