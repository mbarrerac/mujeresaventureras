<template>
    <footer>
        <img src="../assets/logo.png" alt="" width="100">
        <div class="nombres d-flex justify-content-center">
                 <p class = "mx-4">Derechos reservados a @mujeresaventureas.cl</p>   
        </div>
        <div class="redes-sociales">
          <h3>¡Síguenos en las redes sociales!</h3>
             <a href="https://www.instagram.com/_mujeresaventureras/" class="red-social-icon">
                <img src="../assets/instagram.png" alt="Icono Red Social">
             </a>
             <!-- esto functiona como parametro -->
             <a  class="red-social-icon">
                <img src="../assets/whatsapp.png" alt="Icono Red Social" @click="sendWhatsAppMessage">
             
             </a>
             
            


        </div>
    </footer>
</template>
    
    <script>

    export default {
    name: 'footer', 
    methods: {
 
 
  sendWhatsAppMessage() {
    const phoneNumber = '56975973764'; // Reemplaza con el número de teléfono deseado
    const message = 'Hola, Somos del grupo Mujeres Aventureras, este es  nuestro contacto por Whatsapp' // Reemplaza con el mensaje que deseas enviar

    const link = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(link); // Abre el enlace en una nueva pestaña o ventana del navegador
  }








}

    }

    
    </script>
    
    <style>
    footer {
    /* background-color: #207178; */
    /* background-color: #FFE184; */
    background-color: #F5E9BE;
    /* background-color: #B723AA; */
/*     margin-top: 5em; */
    padding: 50px;
    text-align: center;
    font-size: 14px;
    color: #B723AA;
    }

    .red-social-icon img {
     width: 40px;
     height: 40px;
    }
    .redes-sociales a {
       margin-right: 10px; /* Ajusta el valor según el espacio deseado */
    }  



    </style>