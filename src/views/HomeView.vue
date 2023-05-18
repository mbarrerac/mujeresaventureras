<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
    <div class="carousel-inner">
      <div class="carousel-item" v-for="(imagen2, index) in selImagenes" :key="imagen2.imagen" :class="{ 'active': index === 0 }">
        <div class="image-container">
          <img :src="imagen2.imagen" class="d-block w-100" alt="">
        </div>
        <div class="carousel-caption d-none d-md-block align-middle">
             <h5>{{ imagen2.titulo }}</h5>
             <p>{{ imagen2.descripcion }}</p>
       </div>
       </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>


    
<script>
export default {
  // props: ['archivoJson'],
  name: 'HomeView',
  data() {
    return {
      selImagenes: [],
      parametros:'',
    };
  },
  methods: {
    async extraerImagen() {
      let resultado;
      try {
        // const response = await fetch("../../imagenes.json");
        const response = await fetch(this.parametros);
        if (!response.ok) {
          this.showAlert("No se pudo obtener el archivo de datos", "(imagenes.json)");
        }
        resultado = await response.json();
        return resultado;
      } catch (error) {
        this.showAlert("No se pudo obtener el archivo de datos (imagenes.json)", "Redireccionando a otra 'página'");
        this.$router.push({ name: "CoursesView" });
      }
    },
    showAlert(texto1, texto2) {
      Swal.fire({
        title: texto1,
        text: texto2,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    },
  },
  async mounted() {
    const parametro = this.$route.params.archivoJson;

    this.parametros = '../../'+parametro+'.json' // Imprime el valor del parámetro enviado en la URL
    this.selImagenes = await this.extraerImagen();
  },
};
</script>

    
<style>
    
    
  .container {
  max-width: 960px;
  margin: 0 auto;
  /* padding: 1.5rem;
  padding-top: 3rem;  */
  /* Agregado */
}

.image-container {
  max-width: 100%;
  max-height: calc(100vh - 9rem);  /* Actualizado */
  /* margin: 1cm auto 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 3cm solid  #F5E9BE; */
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  /* transform: translateY(1cm); */
}



/* .carousel-item{
  height: 600px;
} */
.carousel-item img{
  width: 100%;
  height: 100%;
  object-fit: cover;


}
.carousel-caption{
  /* background-color: rgba(0, 0, 0, 0.385); */
  /* background-color: rgba(255,255,255, 0.7); */

  background-color: rgba(139, 130, 183, 0.5);
  border-radius: 1rem;
  max-width: 1000px;
  margin-inline: auto;
  margin-bottom: 150px;
  
}
.carousel-item h5{
  font-family: 'Montserrat', sans-serif;
  font-size: 60px;
  /* color: #B723AA; */
}
.carousel-item p{
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  /* color: #B723AA */
}
  .titulo{
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  }
  .subtitulo{
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  padding-inline: 15rem ;
  }

  @media (max-width: 767px) {
  .carousel-caption {
    display: none !important;
  }
}
  </style>