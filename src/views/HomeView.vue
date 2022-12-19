<template>
  <div class="home">
    <h1>Asiatische Restaurants in Berlin:</h1>
    <div class="card mb-3" style="max-width: 1200px;">
      <div class="row g-0">
        <div class="col" v-for="restaurant in restaurants" :key="restaurant.id">
          <img src="../assets/Restaurant.webp" class="img-fluid rounded-start" style="max-width: 200px;" :alt="restaurant.name">-->
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{restaurant.name}}</h5>
                      <p class="card-text">Adresse: {{restaurant.adress}}</p>
                      <p class="card-text">Beschreibung: {{restaurant.description}} </p>
                 </div>
        </div>
<!--        <div class="col-md-4">-->
<!--          <img src="../assets/Restaurant.webp" class="img-fluid rounded-start" style="max-width: 200px;" alt="Muster Restaurant">-->
<!--        </div>-->
<!--        <div class="col-md-8">-->
<!--          <div class="card-body">-->
<!--            <h5 class="card-title">Muster Restaurant</h5>-->
<!--            <p class="card-text">Adresse: Alexa</p>-->
<!--            <p class="card-text">Beschreibung: Hier ist Muster Restaurant </p>-->
<!--            <p class="card-text"><small class="text-muted">Öffnungszeiten: Mon- Son, 12 bis 21 Uhr</small></p>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data () {
    return {
      restaurants: [
        {
          id: 1,
          name: 'ChinaTown',
          adress: 'Weißenseer Weg 23, 34242 Berlin',
          description: 'Chinesisches Restaurant'
        },
        {
          id: 2,
          name: 'VietnamTown',
          adress: 'Aristotelessteig 23, 34243 Berlin',
          description: 'Vietnamesisches Restaurant'
        }
      ]
    }
  }
}
</script>
