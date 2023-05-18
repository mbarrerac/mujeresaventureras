<template>
    <div class="containerFrase">
      <div class="row">
        <h2 class="tituloFrase">{{ frase }}</h2>
      </div>
      <div class="row">
        <button @click="generarNuevaFrase" class="btnBusqueda">Generar tu frase del día</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      frases: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        frase: ''
      };
    },
    methods: {
      generarNuevaFrase() {
          const indice = Math.floor(Math.random() * this.frases.length);
          let miFrase = '';
          if (this.frase === '') {
            miFrase = 'Presiona el botón para tu frase';
          } else {
            miFrase = 'Esta es tu frase del día, corresponde a la frase N°' + (indice + 1);
          }
          this.frase = this.frases[indice];
          this.$emit('frase-generada', miFrase);
      }
    },
    created() {
      this.generarNuevaFrase();
    }
  };
  </script>
  
  <style>
  .containerFrase {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .tituloFrase {
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 2rem; /* Ajusta el valor para agregar más espacio */
  }
  
  
  
  .btnBusqueda {
    margin-top: 1rem; /* Ajusta el valor para agregar más espacio */
    background-color: #8B82B7;
    color: white;
    border: 1px solid #8B82B7;
    letter-spacing: 3px;
    padding: 1em 2em;
    border-radius: 0;
  }
  
  .btnBusqueda:hover {
    background-color: #8B82B7;
    color: white;
    opacity: 0.7;
  }
  </style>
  
  