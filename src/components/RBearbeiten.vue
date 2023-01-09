<template>
  <div class="modal fade" id="rbearbeiten-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <form class="row g-3 needs-validation" novalidate>
        <div class="modal-content" >
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Restaurant bearbeiten</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="row">
              <div class="col">
                <label for="restaurant-name" class="form-label">Name</label>
                <input type="text" class="form-control me-2" id="restaurant-name" :value="restaurant.name" disabled>
              </div>
              <div class="col">
                <label for="restaurant-name!" class="form-label">Neuer Name</label>
                <input type="text" class="form-control me-2" id="restaurant-name1" v-model="name1" required>
              </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col">
                  <label for="restaurant-addresse" class="form-label">Aktuelle Adresse</label>
                  <input type="text" class="form-control me-2" id="restaurant-addresse" :value="restaurant.address"  disabled>
                </div>
                <div class="col">
                  <label for="restaurant-addresse1" class="form-label"> Neue Adresse</label>
                  <input type="text" class="form-control me-2" id="restaurant-addresse-1" v-model="address1" required>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col">
                  <label for="restaurant-beschreibung" class="form-label">Beschreibung</label>
                  <input type="text" class="form-control me-2" id="restaurant-beschreibung" :value="restaurant.description" disabled>
                </div>
                <div class="col">
                  <label for="restaurant-beschreibung" class="form-label">Neue Beschreibung</label>
                  <input type="text" class="form-control me-2" id="restaurant-beschreibung-1" v-model="description1" required>
                </div>
            </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col">
                  <label for="kategorie" class="form-label">Kategorie</label>
                  <select id="autoSizingSelect" class="form-select" :value="restaurant.kategorie" disabled>
                    <option selected disabled>Auswählen...</option>
                    <option value="CHINESISCH">Chinesisch</option>
                    <option value="JAPANISCH">Japanisch</option>
                    <option value="KOREANISCH">Koreanisch</option>
                    <option value="THAI">Thailändisch</option>
                    <option value="VIETNAMESISCH">Vietnamesisch</option>
                  </select>
                </div>
                <div class="col">
                  <label for="kategorie" class="form-label">Neue Kategorie</label>
                  <select id="autoSizingSelect-1" class="form-select me-2" v-model="kategorie1" required>
                    <option selected disabled>Auswählen...</option>
                    <option value="CHINESISCH">Chinesisch</option>
                    <option value="JAPANISCH">Japanisch</option>
                    <option value="KOREANISCH">Koreanisch</option>
                    <option value="THAI">Thailändisch</option>
                    <option value="VIETNAMESISCH">Vietnamesisch</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abrechen</button>
            <button class="btn btn-primary" type="submit" @click="updateRestaurant" >Speichern</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RBearbeiten',
  props: ['restaurant'],
  data () {
    return {
      name1: '',
      address1: '',
      description1: '',
      kategorie1: ''
    }
  },
  methods: {
    updateRestaurant () {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/restaurants/' + this.restaurant.id

      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      if (this.name1 === '') {
        this.name1 = this.restaurant.name
      }
      if (this.address1 === '') {
        this.address1 = this.restaurant.address
      }
      if (this.description1 === '') {
        this.description1 = this.restaurant.description
      }
      if (this.kategorie1 === '') {
        this.kategorie1 = this.restaurant.kategorie
      }
      const payload = JSON.stringify({
        name: this.name1,
        address: this.address1,
        description: this.description1,
        kategorie: this.kategorie1
      })
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: payload,
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .catch(error => console.log('error', error))
    }
  }
}
</script>

<style scoped>

</style>
