<template>
  <div class="bewertungen">
    <h1>Bewertungen</h1>
    <p>{{id}}</p>
    <div class="card mb-3" style="max-width: 1200px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="../assets/Restaurant.webp" class="img-fluid rounded-start" style="max-width: 200px;" :alt="restaurant.name">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{restaurant.name}}</h5>
            <p class="card-text">Adresse: {{restaurant.address}}</p>
            <p class="card-text">Beschreibung: {{restaurant.description}} </p>
          </div>
        </div>
      </div>
    </div>
    <div class="list-group" v-for="bewertung in bewertungen" :key="bewertung.id">
      <a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{bewertung.authorName}}</h5>
          <small>3 days ago</small>
        </div>
        <p v-if="bewertung.rating===1">{{bewertung.rating}} Stern</p>
        <p v-else>{{bewertung.rating}} Sterne</p>
        <p class="mb-1">{{bewertung.review}}</p>
      </a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BewertungenView',
  data () {
    return {
      restaurant: [],
      bewertungen: []
    }
  },
  props: ['id'],
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/restaurants/' + this.id
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then((result) => {
        this.restaurant = result
      })
      .catch(error => console.log('error', error))
    const endpoint2 = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/bewertungen/restaurant/' + this.id
    fetch(endpoint2, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(bewertung => {
        this.bewertungen.push(bewertung)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
