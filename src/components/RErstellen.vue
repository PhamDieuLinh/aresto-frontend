<template>
  <div class="modal fade" id="rerstellen-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form class="row g-3 needs-validation" novalidate>
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Neues Restaurant</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="restaurant-name" class="form-label">Name</label>
              <input type="text" class="form-control" id="restaurant-name" v-model="name" required>
              <div class="invalid-feedback">
                Name des Restaurant bitte eingeben.
              </div>
            </div>
            <div class="mb-3">
              <label for="restaurant-addresse" class="form-label">Adresse</label>
              <input type="text" class="form-control" id="restaurant-addresse" v-model="address" required>
              <div class="invalid-feedback">
                Adresse des Restaurant bitte eingeben.
              </div>
            </div>
            <div class="mb-3">
              <label for="restaurant-beschreibung" class="form-label">Beschreibung</label>
              <input type="text" class="form-control" id="restaurant-beschreibung" v-model="description" required>
              <div class="invalid-feedback">
                Beschreibung bitte eingeben.
              </div>
            </div>
            <div class="mb-3">
              <label for="kategorie" class="form-label">Kategorie</label>
              <select id="autoSizingSelect" class="form-select" v-model="kategorie" required>
                <option selected disabled>Auswählen...</option>
                <option value="CHINESISCH">Chinesisch</option>
                <option value="JAPANISCH">Japanisch</option>
                <option value="KOREANISCH">Koreanisch</option>
                <option value="THAI">Thailändisch</option>
                <option value="VIETNAMESISCH">Vietnamesisch</option>
              </select>
              <div class="invalid-feedback">
                Bitte ein Kategorie auswählen.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abrechen</button>
            <button class="btn btn-primary" type="submit" @click="createRestaurant" >Speichern</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RErstellen',
  data () {
    return {
      name: '',
      address: '',
      description: '',
      kategorie: ''
    }
  },
  methods: {
    createRestaurant () {
      const valid = this.validate()
      if (valid) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/restaurants'

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const payload = JSON.stringify({
          name: this.name,
          address: this.address,
          description: this.description,
          kategorie: this.kategorie
        })
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow'
        }

        fetch(endpoint, requestOptions)
          .catch(error => console.log('error', error))
      }
    },
    validate () {
      let valid = true
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            valid = false
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
      return valid
    }
  }
}
</script>

<style scoped>

</style>
