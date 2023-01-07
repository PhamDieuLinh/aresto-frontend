<template>
  <div class="home">
    <div class="row g-0">
      <div id="s" class="col">
        <form class="d-flex" role="search">
          <input  v-model="searchCrit" class="form-control me-2" type="search" placeholder="Restaurant suchen" aria-label="Suchen" onkeyup="search()" style="max-width: 400px;">
          <button class="btn btn-outline-succes" type="submit" style="border-color: gold" v-on:click="search">Suchen</button>
        </form>
      </div>

      <div id="dd" class="col">
      <div class="Kategorie">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ kategorieParam }}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click="setKategorieParam('ALLE')">Alle</a></li>
          <li><a class="dropdown-item" v-on:click="setKategorieParam('CHINESISCH')">CHINESISCH</a></li>
          <li><a class="dropdown-item" v-on:click="setKategorieParam('JAPANISCH')">JAPANISCH</a></li>
          <li><a class="dropdown-item" v-on:click="setKategorieParam('KOREANISCH')">KOREANISCH</a></li>
          <li><a class="dropdown-item" v-on:click="setKategorieParam('THAI')">THAI</a></li>
          <li><a class="dropdown-item" v-on:click="setKategorieParam('VIETNAMESISCH')">VIETNAMESISCH</a></li>
        </ul>
      </div>
    </div>

    </div>
    <i class="bi bi-star-fill"></i>
    <h1>Asiatische Restaurants in Berlin:</h1>
    <div class="container-fluid">
      <div class="row" v-for="restaurant in search(searchCrit)" :key="restaurant.id" >
        <div class="card mb-3" style="max-width: 1200px;">
          <div class="row g-0">
            <div class="col-md-3">
                <img src="../assets/Restaurant.webp" class="img-fluid rounded-start" style="max-width: 200px;" :alt="restaurant.name">
            </div>
            <div class="col">
              <br>
              <div class="d-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              <p class="card-text" style="font-size: 15px">&nbsp; 4</p>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      restaurants: [],
      filteredRestaurants: [],
      searchCrit: '',
      kategorieParam: 'ALLE'
    }
  },
  methods: {
    search (crit) {
      if (this.kategorieParam === 'ALLE') {
        this.restaurants = this.restaurants.filter(
          it => crit.length < 1 ||
            it.name.toLowerCase().includes(crit.toLowerCase()))
        return this.restaurants
      } else {
        const filters = { kategorie: this.kategorieParam }
        this.filteredRestaurants = this.restaurants.filter(res =>
          Object.keys(filters).every(key => res[key] === filters[key]))
        this.filteredRestaurants = this.filteredRestaurants.filter(
          it => crit.length < 1 ||
            it.name.toLowerCase().includes(crit.toLowerCase()))
        return this.filteredRestaurants
      }
    },
    setKategorieParam (kat) {
      this.kategorieParam = kat
      return this.kategorieParam
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
<style>
#dd{text-align: center}
#s{text-align: center}
</style>
