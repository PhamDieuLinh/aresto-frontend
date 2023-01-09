<template>
  <div class="home">
    <div class="row g-0">
      <div id="s" class="col">
        <form class="d-flex" role="search">
          <input  v-model="searchCrit" class="form-control me-2" type="search" placeholder="Restaurant suchen" aria-label="Suchen" style="max-width: 400px;">
          <button class="btn btn-outline" type="submit" style="border-color: gold" v-on:click="search()">Neue Suche</button>
        </form>
      </div>

      <div id="dd" class="col">
      <div class="Kategorie">
        <div class="d-flex justify-content-center">
          <p style="font-size: 18px;">Kategorie: &nbsp; &nbsp; </p>
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

    </div>
    <i class="bi bi-star-fill"></i>
    <br>
    <div class="row">
    <div class="col-md-8">
    <h1>Asiatische Restaurants in Berlin:</h1>
    </div>
    <div id="checkbox" class="col-md-4">
      <br>
      <div class="form-check">
      <input class="form-check-input" type="checkbox" id="sort" v-model="sorted">
      <label class="form-check-label" for="sorted">
        nach Anzahl Bewertungen sortieren
      </label>
    </div>
    </div>
    <div class="col-md-1">
    </div>
    </div>
    <br>
    <div class="container-fluid">
      <restaurant-card-list :restaurants="search(searchCrit)"></restaurant-card-list>
    </div>
  </div>
</template>

<script>
import RestaurantCardList from '@/components/RestaurantCardList'
export default {
  name: 'HomeView',
  components: { RestaurantCardList },
  data () {
    return {
      restaurants: [],
      restaurantsCopy: [],
      filteredRestaurants: [],
      filteredRestaurantsCopy: [],
      searchCrit: '',
      kategorieParam: 'ALLE',
      sorted: false
    }
  },
  methods: {
    search (crit) {
      console.log(this.sorted)
      if (this.kategorieParam === 'ALLE') {
        this.restaurants = this.restaurants.filter(
          it => crit.length < 1 ||
            it.name.toLowerCase().includes(crit.toLowerCase()))
        if (!this.sorted) {
          return this.restaurants
        } else {
          this.restaurantsCopy = this.restaurants
          return this.restaurantsCopy.sort(this.compareBewertungIds)
        }
      } else {
        const filters = { kategorie: this.kategorieParam }
        this.filteredRestaurants = this.restaurants.filter(res =>
          Object.keys(filters).every(key => res[key] === filters[key]))
        this.filteredRestaurants = this.filteredRestaurants.filter(
          it => crit.length < 1 ||
            it.name.toLowerCase().includes(crit.toLowerCase()))
        if (!this.sorted) {
          return this.filteredRestaurants
        } else {
          this.filteredRestaurantsCopy = this.filteredRestaurants
          return this.filteredRestaurantsCopy.sort(this.compareBewertungIds)
        }
      }
    },
    setKategorieParam (kat) {
      this.kategorieParam = kat
      return this.kategorieParam
    },
    compareBewertungIds (a, b) {
      let comparison = 0
      if (a.bewertungIds.length < b.bewertungIds.length) {
        comparison = 1
      } else if (a.bewertungIds.length > b.bewertungIds.length) {
        comparison = -1
      }
      return comparison
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
