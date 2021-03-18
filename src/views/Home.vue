<template>
  <div class="main">
    <splide :options="options" :slides="films">
      <splide-slide v-for="film in films" :key="film">
          <div class="film view view-first" >
            <img class="film__poster" :src="paths[film.poster]" alt="slide.alt">
            <div class="mask">
              <h2>{{ film.name }}</h2>
              <p>{{ film.genre }}</p>
              <p>{{ film.rating }}</p>
              <router-link :to="'/film/' + film.id" :index="index">
                <a href="#" class="info">Read More</a>
              </router-link>
            </div>
          </div>
      </splide-slide>
    </splide>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {db} from '../firebase'

export default {
  name: 'Home',
  components: {
    Splide,
    SplideSlide
  },
  data() {
    return {
      options: {
        rewind : true,
        perPage: 3,
        gap    : '1rem',
      },
      paths: [
        require('../assets/2.jpg'),
        require('../assets/5.jpg'),
        require('../assets/6.jpg'),
        require('../assets/4.jpg'),
        require('../assets/1.jpg'),
        require('../assets/3.jpeg')
      ],
      films: []
    }
  },
  async mounted() {
    await db.collection('films').onSnapshot((snapshotChange)=>{
      this.films = []
      snapshotChange.forEach((doc)=>{
        this.films.push({
          id: doc.id,
          name: doc.data().Name,
          genre: doc.data().Genre,
          caption: doc.data().Caption,
          rating: doc.data().Rating,
          tickets: doc.data().Tickets,
          poster: doc.data().Poster
        })
      })
    })
  }
}
</script>

<style scoped>
*, *::after, *::before{
  box-sizing: border-box;
}

.film__poster{
  width: 350px;
  height: 500px;
}


/*/////////////////////////////////////////////////////////////////////////////////////////////*/

.view {
  margin: 10px;
  float: left;
  border: 7px solid #fff;
  overflow: hidden;
  position: relative;
  text-align: center;
  box-shadow: 1px 1px 2px #e6e6e6;
  cursor: default;
}

.view .mask,
.view .content {
  width: 350px;
  height: 500px;
  padding: 100px;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0
}

.view img {
  display: block;
  position: relative
}

.view h2 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  position: relative;
  font-size: 17px;
  padding: 10px;
  margin: 20px 0 0 0
}

.view p {
  font-size: 14px;
  position: relative;
  color: #fff;
  padding: 0px 20px 0px;
  text-align: center
}

.view a.info {
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  background: #fff;
  color: #000;
  text-transform: uppercase;
  box-shadow: 0 0 1px #000
}

.view a.info:hover {
  box-shadow: 0 0 5px #000
}

.view-first img {
  transition: all 0.2s linear;
}

.view-first .mask {
  opacity: 0;
  background-color: rgba(3, 3, 3, 0.8);
  transition: all 0.4s ease-in-out;
}

.view-first h2 {
  transform: translateY(-100px);
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.view-first p {
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.2s linear;
}

.view-first a.info {
  opacity: 0;
  transition: all 0.2s ease-in-out;
}


/* */

.view-first:hover img {
  transform: scale(1.1);
}

.view-first:hover .mask {
  opacity: 1;
}

.view-first:hover h2,
.view-first:hover p,
.view-first:hover a.info {
  opacity: 1;
  transform: translateY(0px);
}

.view-first:hover p {
  transition-delay: 0.1s;
}

.view-first:hover a.info {
  transition-delay: 0.2s;
}



</style>
