<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="d d-flex justify-content-center  align-items-center color">
                <!-- <img class="castle" src="@/assets/peach-verano-Cropped.webp" alt="" srcset=""> -->
                <div>
                    <h1 class="size-404">404</h1>
                    <h2 class="text-404">PRINCESS IS NOT HERE !</h2>
                    <router-link to="/pokemon"><button class="btn btn-secondary">Volver</button></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.size-404{
    font-size: 50vh;
    color: white; -webkit-text-stroke: 3px black;
}
.text-404{
    font-size: 5rem;
    color: white; -webkit-text-stroke: 2px black;
}
.castle{
height: 20rem;
width: auto;
/* opacity: 0.3; */
/* filter: blur(2px) */
}
.color {
background-image: url("@/assets/start.jpg");
background-size: cover;
}
.d {
height: 90vh;
}
</style>
