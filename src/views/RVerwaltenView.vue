<template>
  <div class="rverwalten">
    <div class="row g-0">
      <div id="s" class="col">
        <form class="d-flex" role="search">
          <input  v-model="searchCrit" class="form-control me-2" type="search" placeholder="Restaurant suchen" aria-label="Suchen" onkeyup="search()" style="max-width: 400px;">
          <button class="btn btn-outline-succes" type="submit" style="border-color: gold" v-on:click="search">Suchen</button>
        </form>
      </div>

      <div id="ad" class="col">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          &nbsp;
          Restaurant hinzufügen
        </button>

        <!-- Modal -->
        <r-erstellen></r-erstellen>
      </div>

    </div>
    <br>
    <div class="row">
      <div class="col-md-9">
    <h1>Liste der Restaurants:</h1>
      </div>
    <div id="checkbox" class="col-md-2">
      <br>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="sort" v-model="sorted">
        <label class="form-check-label" for="sorted">
          alphabeltisch sortieren
        </label>
      </div>
    </div>
    <div class="col-md-1">
    </div>
  </div>
    </div>
    <br>
    <div class="container-fluid">
      <div class="row" v-for="restaurant in search(searchCrit)" :key="restaurant.id" >
        <div class="card mb-3" style="max-width: 1200px;">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="../assets/Restaurant.webp" class="img-fluid rounded-start" style="max-width: 150px;" :alt="restaurant.name">
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">{{restaurant.name}}</h5>
                <p class="card-text" style="font-size: 13px">{{restaurant.kategorie}}</p>
                <p class="card-text">Adresse: {{restaurant.address}}</p>
                <p class="card-text">Beschreibung: {{restaurant.description}} </p>
              </div>
            </div>
            <div id="btn" class="col-md-2">
              <br>

              <!-- Button trigger modal -->
              <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" @click="saveRes(restaurant)">
                Bearbeiten
              </button>

              <r-bearbeiten :restaurant="restaurantToEdit"></r-bearbeiten>

              <br>

              <!-- Button trigger modal -->
              <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="saveRes(restaurant)">
                Löschen
              </button>

              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Restaurant löschen</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Sind Sie sicher, dass Restaurant {{restaurantToDelete.name}} gelöscht wird?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" id="deleteAlertBtn" data-bs-dismiss="modal" @click="deleteRestaurant(restaurantToDelete)">Löschen</button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RErstellen from '@/components/RErstellen'
import RBearbeiten from '@/components/RBearbeiten'
export default {
  name: 'RVerwaltenView',
  components: { RErstellen, RBearbeiten },
  data () {
    return {
      restaurants: [],
      restaurantsCopy: [],
      searchCrit: '',
      sorted: false,
      restaurantToDelete: {
        id: 0,
        name: '',
        address: '',
        description: '',
        kategorie: '',
        bewertungIds: []
      },
      restaurantToEdit: {
        id: 0,
        name: '',
        address: '',
        description: '',
        kategorie: '',
        bewertungIds: []
      }
    }
  },
  methods: {
    search (crit) {
      this.restaurants = this.restaurants.filter(
        it => crit.length < 1 ||
          it.name.toLowerCase().includes(crit.toLowerCase()))
      if (!this.sorted) {
        return this.restaurants
      } else {
        this.restaurantsCopy = this.restaurants
        return this.restaurantsCopy.sort(this.compareNames)
      }
    },
    async deleteRestaurant (res) {
      console.log('id')
      console.log(res.id)
      const endpoint2 = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/restaurants/' + res.id

      const requestOptions2 = {
        method: 'DELETE',
        redirect: 'follow'
      }
      fetch(endpoint2, requestOptions2).then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    },
    saveRes (res) {
      this.restaurantToDelete = res
      this.restaurantToEdit = res
    },
    compareNames (a, b) {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      let comparison = 0
      if (nameA > nameB) {
        comparison = 1
      } else if (nameA < nameB) {
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
#btn{text-align: right}
#s{text-align: center}
#ad{text-align: right}
</style>
