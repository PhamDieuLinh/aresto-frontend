<template>
  <div class="home">
    <h1>Asiatische Restaurants in Berlin:</h1>
    <div class="container-fluid" >
      <div class="row" v-for="restaurant in restaurants" :key="restaurant.id">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      restaurants: []
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/restaurants'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(restaurant => {
        this.restaurants.push(restaurant)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>
