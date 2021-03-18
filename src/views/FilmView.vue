<template>
  <div class="main" v-if="film">
    <div class="main__inner">
      <img class="main__poster" :src="paths[film.poster]" alt="">
      <div class="main__info">
        <h1 class="main__title">
          {{ film.name }}
        </h1>
        <p class="film__rating">
          {{ film.rating }}
        </p>
        <p class="main__genre">
          {{ film.genre }}
        </p>
        <p class="main__caption">
          {{ film.caption }}
        </p>
        <label for="main__select">Select a ticket </label>
        <select v-model="select" name="" id="main__select">
          <option v-for="ticket in film.tickets" :key="ticket">{{ ticket }}</option>
        </select>
        <button class="main__button" @click="orderTicket">Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'FilmView',

  data(){
    return{
      film: null,
      select: 0,
      paths: [
        require('../assets/2.jpg'),
        require('../assets/5.jpg'),
        require('../assets/6.jpg'),
        require('../assets/4.jpg'),
        require('../assets/1.jpg'),
        require('../assets/3.jpeg')
      ]
    }
  },
  methods:{
    orderTicket(){
      let chose = this.film.tickets.indexOf(Number(this.select))
      this.film.tickets.splice(chose, 1)
      console.log(this.film)
      db.collection('films').doc(this.film.id).update({
        Tickets: this.film.tickets
      })
    }
  },
  async mounted() {
    await db.collection('films').onSnapshot((snapshotChange)=>{
      let films = []
      snapshotChange.forEach((doc)=>{
        films.push({
          id: doc.id,
          name: doc.data().Name,
          genre: doc.data().Genre,
          caption: doc.data().Caption,
          rating: doc.data().Rating,
          tickets: doc.data().Tickets,
          poster: doc.data().Poster
        })
      })
      this.film = films.find(f => f.id === this.$route.params.id)
    })
  }
}
</script>

<style scoped>
.main__inner{
  display: flex;
  justify-content: center;
}

.main__poster{
  margin-right: 10px;
  width: 350px;
  height: 500px;
  border: 7px solid #fff;
}

.main__info{
  max-width: 300px;
  color: #ffffff;
}

.main__button{
  display: block;
  margin-top: 15px;
  width: 100px;
  height: 30px;
}
</style>