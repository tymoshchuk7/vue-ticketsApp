<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">
        ONLINE TICKETS
      </h1>
    </div>
  </header>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
/*font-family: 'PT Sans', sans-serif*/

 *, *::after, *::before{
   box-sizing: border-box;
 }

 body{
   margin: 0;
   padding: 0;
   /*background-color: #4d4d4d;*/
   background-image: url('./assets/Фон.jpg');
   background-size: cover;
   background-repeat: no-repeat;
   font-family: 'PT Sans', sans-serif;
 }

 .header__title{
   color: #fff;
   text-align: center;
   margin: 0;
   padding: 18px;
   letter-spacing: 3px;
 }
</style>
