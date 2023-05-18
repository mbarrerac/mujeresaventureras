<template>
  <div class="container">
      <h2 class="tituloFrasePadre">{{ fraseGenerada }}</h2>
      <frase-aleatoria :frases="frases" @frase-generada="actualizarFraseGenerada" />
  </div>
</template>
  
<script>
import FraseAleatoria from '@/components/FraseAleatoria.vue'; // Asegúrate de que la ruta al componente sea correcta
  
export default {
    components: {
      FraseAleatoria
    },
    data() {
      return {
        frases: [],
        fraseGenerada: ''
      };
    },
    methods: {
      cargarFrases() {
        // Realiza una llamada para obtener las frases desde el archivo JSON o desde tu API
        // Aquí se simula una carga asincrónica para fines de ejemplo

        fetch('/frases.json')
        .then(response => response.json())
        .then(data => {
          this.frases = data.frases;
        })
        .catch(error => {
          console.error('Error al cargar el archivo JSON:', error);
        });       
      },
      actualizarFraseGenerada(frase) {
        this.fraseGenerada = frase;
      }
    },
    created() {
      this.cargarFrases();
    }
};
</script>
<style>
  .tituloFrasePadre{
    padding-top: 5rem;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
</style>