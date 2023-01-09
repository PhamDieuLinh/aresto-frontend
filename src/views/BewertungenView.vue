<template>
  <div class="bewertungen">
    <h1>Bewertungen</h1>
    <div class="card mb-3" style="max-width: 1200px;">
      <div class="row g-0">
        <div class="col-md-3">
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
    <div class="container-fluid">
    <form class="row g-3 needs-validation" novalidate>
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Neue Bewertung</h1>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="restaurant-addresse" class="form-label">Author Name</label>
            <input type="text" class="form-control" id="author-name" v-model="authorName" required>
            <div class="invalid-feedback">
              Ihren Name bitte eingeben
            </div>
          </div>
          <div class="mb-3">
            <label for="restaurant-beschreibung" class="form-label">Review</label>
            <input type="text" class="form-control" id="re-view" v-model="review" required>
            <div class="invalid-feedback">
              Review bitte eingeben.
            </div>
          </div>
          <div class="mb-3">
            <label for="kategorie" class="form-label">Stern</label>
            <select id="autoSizingSelect" class="form-select" v-model="rating" required>
              <option selected disabled>Auswählen...</option>
              <option value="VERYBAD">1</option>
              <option value="BAD">2</option>
              <option value="OK">3</option>
              <option value="GOOD">4</option>
              <option value="VERYGOOD">5</option>
            </select>
            <div class="invalid-feedback">
              Bitte ein Kategorie auswählen.
            </div>
          </div>
          <div>
              <Rating></Rating>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" type="submit" @click="createReview(id)" >Speichern</button>
        </div>
      </div>
    </form>
    </div>
    <div class="list-group" v-for="bewertung in bewertungen" :key="bewertung.id">
      <br>
      <a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{bewertung.authorName}}</h5>
        </div>
        <p v-if="bewertung.rating===1">{{bewertung.rating}} Stern</p>
        <p v-else>{{bewertung.rating}}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        </p>
        <p class="mb-1">{{bewertung.review}}</p>
      </a>
      </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating'
export default {
  name: 'BewertungenView',
  data () {
    return {
      restaurant: [],
      bewertungen: [],
      authorName: '',
      review: '',
      rating: 0,
      everageRating: 0
    }
  },
  props: ['id'],
  components: [Rating],
  methods: {
    createReview (rid) {
      const valid = this.validate()
      if (valid) {
        const endpoint2 = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/bewertungen'

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const payload2 = JSON.stringify({
          authorName: this.authorName,
          review: this.review,
          rating: this.rating,
          rid: rid
        })
        const requestOptions2 = {
          method: 'POST',
          headers: myHeaders,
          body: payload2,
          redirect: 'follow'
        }

        fetch(endpoint2, requestOptions2)
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
  },
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
    const endpoint1 = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/bewertungen/restaurant/' + this.id
    fetch(endpoint1, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(bewertung => {
        this.bewertungen.push(bewertung)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>
#st{text-align: center}
</style>
