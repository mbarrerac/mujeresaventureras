
<template>
    <div class="titulo">
         <h2>Inscríbete a nuestras aventuras</h2>
    </div>
    <div class="subtitulo py-3 ">
        <p>Recuerda que somos una comunidad de mujeres</p>
    </div>
    <div class="container mt-5">
        <div class="row justify-content-center py-5" v-if="($store.state.actividadesTotal.length) == 0">
             <div class="col-auto">
                  <fade-loader :loading="loading" :color="color" :size="size" class="mb-5"></fade-loader>
             </div>
        </div>

         <div class="row" v-else>
          <template v-for="curso in $store.state.actividadesTotal" :key="curso.nombre">
        
            <div class="col-lg-4 mb-5 col-md-6" > 
                <div class=" card border mb-3 mx-auto card-custom" style="width: 18rem;" v-if="curso.eliminado===false && curso.estado==='Activo'" >
                    <img v-bind:src="curso.imagen" class="card-img-top" alt="img" style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title text-center">{{curso.nombre}}</h5>
                        <p class="card-text text-left">{{curso.descripcion}}</p>
                        <!-- <p class="card-text text-left">{{curso.horarios}}</p> -->
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Fecha: {{curso.fechaDesde  }} / {{curso.fechaHasta  }}</li>
                        <li class="list-group-item">Cupos: {{curso.cupos }}</li>
                        <li class="list-group-item">Inscritos: {{curso.inscritos }}</li>
                        <li class="list-group-item">Precio: $ {{new Intl.NumberFormat('ES', {style: 'currency', currency: 'clp' }).format(curso.precio)}}</li>
                    </ul>
                   
                        <button type="button" class="btn btn-descripcion" data-bs-toggle="modal" :data-bs-target="'#myModal' + curso.id" >Ver Descripción</button> 
                        
                        <!-- <button  @click="validarCampos(curso)" :class = " curso.estado === 'Activo' ? 'btnInscribir' : 'btnDisabled'" :disabled="curso.estado === 'Activo' ">{{curso.estado === 'Activo' ? 'Inscribirme' : 'No disponible' }}</button>  -->
                        <button @click="validarCampos(curso)" class="btnInscribir">Inscribir</button>
                        <button @click="desIncribir(curso)" class="btnInscribir">DesIncribir</button>
                  
                        <!-- <button :class = " curso.estado === 'Activo' ? 'btnInscribir' : 'btnDisabled'" :disabled="curso.estado === 'Activo' ">{{curso.estado === 'Activo' ? 'Desinscribirme' : 'No disponible' }}</button> -->
                
                </div>
                   <!-- Ventana modal descripcion de producto-->
                   <div class="modal fade" :id="'myModal' + curso.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div class="modal-dialog">
                          <div class="modal-content">
                               <div class="modal-header">
                                   <h5 class="modal-title" id="exampleModalLabel">{{curso.nombre}}</h5>
                                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                               </div>
                               <div class="modal-body">
                                   <h5 class="card-title text-center">Descripción</h5>
                                   {{curso.descripcion}}
                                   <h5 class="card-title text-center">Fechas</h5>
                                   {{curso.fechaDesde}} / {{curso.fechaHasta}}
                                   <h5 class="card-title text-center">Horarios</h5>
                                   {{curso.horarios}}
                                   <h5 class="card-title text-center">Dificultad</h5>
                                   {{curso.dificultad}}
                                   <h5 class="card-title text-center">Elementos</h5>
                                   {{curso.elemento}}
                                   <h5 class="card-title text-left">Precio</h5>
                                   {{new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency' }).format(curso.precio)}}
                                   <h5 class="card-title text-left">Cupos</h5>
                                   {{curso.cupos}}      
                                   <h5 class="card-title text-left">Inscritos</h5>
                                   {{curso.inscritos}}                                            


                               </div>
                            </div>
                     </div>
                </div>
                <!-- Fin Ventana modal -->                     


              <!-- Modal del formulario -->
              <div class="modal" :class="{ 'd-block': mostrarModal }" id="miModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="miModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="miModalLabel">Inscribirse en actividad {{curso.nombre}} </h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-1">
                          <label for="nombre1" class="form-label">Nombre</label>
                          <input type="text" class="form-control" id="nombre" v-model.trim="loginForm.nombre">
                          <div class="invalid-feedback">Por favor ingrese su nombre</div>
                        </div>
                        <div class="mb-3">
                          <label for="apellido1" class="form-label">Apellido</label>
                          <input type="text" class="form-control" id="apellido" v-model.trim="loginForm.apellido">
                          <div class="invalid-feedback">Por favor ingrese su apellido</div>
                        </div>
                        <div class="mb-3">
                          <label for="direccion1" class="form-label">Dirección</label>
                          <input type="text" class="form-control" id="direccion" v-model.trim="loginForm.direccion">
                          <div class="invalid-feedback">Por favor ingrese su dirección</div>
                        </div>
                        <div class="mb-3">
                          <label for="telefono1" class="form-label">Teléfono</label>
                          <input type="text" class="form-control" id="telefono" v-model.trim="loginForm.telefono">
                          <div class="invalid-feedback">Por favor ingrese su teléfono</div>
                        </div>
          
                      </form>
                    </div>
                    <div class="modal-footer justify-content-center">
                      <button @click="registrarUsuarioActividad()" type="submit" data-bs-dismiss="modal">Aceptar</button>
                      <button @click="CerrarRegistro()" type="submit" data-bs-dismiss="modal" id="cerrarModalRegistro">Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </template>      
       </div>
 
       <div class="subtitulo py-3 ">
           <!-- <h2>Condiciones climáticas en</h2> -->
              <div v-if="clima">
                <h3>Temperatura en {{ clima.location.name }}</h3>
                <h1>{{ clima.current.temp_c }}°C</h1>
             </div>
       </div>

       <div id="app" class="subtitulo py-3">
            <select v-model="selectedRegion" class="select-region">
                <option value="">Seleccione una región</option>
                <option v-for="region in regions" :value="region.name" :key="region.name">{{ region.name }}</option>
            </select>

            <select v-model="selectedComuna" v-if="selectedRegion" class="select-comuna">
                <option value="">Seleccione una comuna</option>
                <option v-for="comuna in selectedRegionCommunes" :value="comuna.name" :key="comuna.name">{{ comuna.name }}</option>
            </select>
       </div>

  </div>
</template>
    
    
<script>
    import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
    import {mapActions, mapState} from 'vuex' 
    import $ from 'jquery';
    import { collection, query, where, getDoc,updateDoc,setDoc,doc,getDocs } from "firebase/firestore";
    import { db } from "@/auth/auth.service"
    import axios from 'axios';
    import emailjs from '@emailjs/browser';
   


    export default {
        name: "Home-View",
        data() {
            return {
            color:'#F2B119',
            mostrarModal: false,
            loginForm: {
              idUsuario:'',
              nombre: '',
              apellido: '',
              direccion: '',
              telefono: '',
              idActividad:'',
              nombreActividad:'',
              inscritos:0,
              email:''
        
            },
            usuarioSelecc:[],
            clima: null,
            regions: [],
            selectedRegion: "",
            selectedComuna: ""
            
        }
        },

      components: {
        FadeLoader
      }, 

      created(){
        this.getCursos()
        
      },

      methods: {
        ...mapActions(['getCursos']),

        async recuperarUsuario(element){
      
              let a = this.$store.state.usuarioConectado
              const q = query(collection(db, "UsuariosAdmin"), where("email", "==",a));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                let usuarioB =  doc.data()
                usuarioB.id = doc.id
                this.usuarioSelecc.push(usuarioB)
                this.loginForm.idUsuario = usuarioB.id
                this.loginForm.nombre = this.usuarioSelecc[0].nombre;
                this.loginForm.apellido = this.usuarioSelecc[0].apellido;
                this.loginForm.direccion = this.usuarioSelecc[0].direccion;
                this.loginForm.telefono = this.usuarioSelecc[0].telefono;
                this.loginForm.idActividad = element.id
                this.loginForm.inscritos = element.inscritos
                this.loginForm.email = this.usuarioSelecc[0].email;
                this.loginForm.nombreActividad =  element.nombre
              });
        
                           
              let aa = this.loginForm.idActividad + '-' + this.loginForm.idUsuario;
              const docRef = doc(db, "Inscritos", aa);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                if (docSnap.data().estado) {
                    this.showAlert('Ya se encuentra inscrito para esta actividad', 'Seleccione otra');
                } else {
                  this.activarModal();
                }
              } else {
                // console.log("No such document!");
                this.activarModal();
              }

        },

        activarModal(){
          const modalElement = document.getElementById('miModal');
                    modalElement.classList.add('show');
                    modalElement.style.display = 'block';
                    document.body.classList.add('modal-open');

        },

        validarCampos(element) {
          // Validar los campos antes de abrir el modal
          if (this.$store.state.usuarioConectado===''){
              this.showAlert('Debe iniciar sesión', 'para continuar con el registro de la actividad')
          } else {
            // Restablecer los valores del formulario
            this.loginForm.nombre = '';
            this.loginForm.apellido = '';
            this.loginForm.direccion = '';
            this.loginForm.telefono = '';
            this.loginForm.inscritos = 0;
            this.loginForm.idUsuario = '';
            this.loginForm.idActividad = ''   
            this.loginForm.nombreActividad  = ''
            this.loginForm.email=''
            this.recuperarUsuario(element)
          }
        },
  
        registrarUsuarioActividad(element) {
            if (this.loginForm.nombre.trim() === '' || this.loginForm.apellido.trim() === '' || this.loginForm.direccion.trim() === '' || this.loginForm.telefono.trim() === '') {
              this.showAlert('Debe ingresar datos requeridos','Antes de aceptar')
            }else {
                this.grabaRegistroActividad(true,1)
                
               
                this.CerrarRegistro()
            }
        },

        async grabaRegistroActividad(xestado,xInscrito){

             //grabo al usuario a la actividad
             let claveId = this.loginForm.idActividad+'-'+this.loginForm.idUsuario
             await setDoc(doc(db, "Inscritos", claveId), {
                  idUsuario:this.loginForm.idUsuario,
                  idProgramacion:this.loginForm.idActividad,
                  estado: xestado
                  
             })
            let tInscritos = parseInt(this.loginForm.inscritos + xInscrito);
            const actualizarInscritos = doc(db, "Programacion", this.loginForm.idActividad);
            await updateDoc(actualizarInscritos, {
                    inscritos: tInscritos
             });
             //Actualizo la informacion de usuario
             if (xestado===true){
                const actualizarUsuarios = doc(db, "UsuariosAdmin", this.loginForm.idUsuario);
                await updateDoc(actualizarUsuarios, {
                    apellido: this.loginForm.apellido,
                    nombre: this.loginForm.nombre,
                    direccion: this.loginForm.direccion,
                    telefono: this.loginForm.telefono
               });
             }
    

             
             this.enviaEmail(xestado)
             this.getCursos()
        },

        enviaEmail(xestado){
          //envio de correo
          let xMensaje = ''
           if (xestado) {
             xMensaje = 'Estas inscrito en la actividad ' + this.loginForm.nombreActividad 
          } else{
            xMensaje = 'Estas desinscrito en la actividad ' + this.loginForm.nombreActividad 
          }
          emailjs.send("service_5ipol2e","template_8yrjref",{
          to_name: 'Administradora Mujeres Aventureras',
          from_name:'Mujeres Aventureras',
          inputNombre:this.loginForm.nombre,
   
          inputMensaje:xMensaje ,
          inputEmail: this.$store.state.usuarioConectado
          }, "dR7QaEBpqKYO-KPn0")
          .then(() => {

            this.showAlert(xMensaje,'Correo Enviado, revisa tu bandeja de entrada')
          }, (err) => {
             alert(JSON.stringify(err));
          });
        },


        CerrarRegistro(){
            // Ocultar el modal
            const modalElement = document.getElementById('miModal');
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');

        },
       

        showAlert(texto1, texto2){
            Swal.fire({
              title:texto1,
              text: texto2,
              icon: 'success',
              confirmButtonText: 'Ok'
            })
        },

        async desIncribirUsuario(element){
          let a = this.$store.state.usuarioConectado
              const q = query(collection(db, "UsuariosAdmin"), where("email", "==",a));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                let usuarioB =  doc.data()
                usuarioB.id = doc.id
                this.usuarioSelecc.push(usuarioB)
                
                this.loginForm.idUsuario = usuarioB.id
                this.loginForm.idActividad = element.id
                this.loginForm.inscritos = element.inscritos
                this.loginForm.nombreActividad = element.nombre
              });
              //busco si existe para desincribirlo
              let aa= this.loginForm.idActividad+'-'+this.loginForm.idUsuario
              const docRef = doc(db, "Inscritos",aa);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                if (docSnap.data().estado) {
                
                    this.mensajeDesIncribir(aa)
                 }else{
                  this.showAlert('No te encuentras inscrito para esta actividad', 'No puedes desincibirte')
                 }
              } else {
                console.log("No such document!");
                this.showAlert('No te encuentras inscrito para esta actividad', 'Seleccione otra')
  
                
              }
        },

        mensajeDesIncribir(aa){
          Swal.fire({
              title: '¿Estás seguro de querer desinscribir esta actividad?',
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar',
          }).then((result) => {
             if (result.isConfirmed) {
                this.grabaRegistroActividad(false,-1)
               
                // Swal.fire('¡Listo! Has quedado desincrito de esta actividad', '', 'success');
              } 
          });
        },


        desIncribir(element) {
          // Validar los campos antes de abrir el modal
          if (this.$store.state.usuarioConectado===''){
              this.showAlert('Debe iniciar sesión', 'para continuar con la desincripción de la actividad')
          } else {
              this.desIncribirUsuario(element)
          }
        },

        async getCondicionesClima(comuna) {
            try {
              
                let sinAcentos = comuna.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const apiKey = '829e7502dab643b48af234422231305';
                const ciudad = comuna; // Cambia aquí por la ciudad que desees
                const ruta = 'http://api.weatherapi.com/v1/current.json?key='+apiKey+'&q='+ciudad+'&aqi=no'
                const response = await axios.get(
                      ruta
                );
                this.clima = response.data;
            } catch (error) {
                  this.showAlert('Información no disponible', 'por ahora')
            }
        },

        async fetchRegionsData() {
              try {
                const response = await fetch('/comunas.json'); // Ruta relativa al archivo JSON
                const jsonData = await response.json();
                this.regions = jsonData.regions;
              } catch (error) {
                console.error(error);
              }
        },
        getSelectedRegionComunas() {
              const selectedRegionObj = this.regions.find(region => region.name === this.selectedRegion);
              return selectedRegionObj ? selectedRegionObj.communes : [];
        }
           
   },
        
  watch: {
       selectedComuna(newComuna) {
           this.getCondicionesClima(newComuna);
       }
  },
  computed : {
      ...mapState(['cursos']),
      selectedRegionCommunes() {
          const selectedRegionObj = this.regions.find(region => region.name === this.selectedRegion);
          return selectedRegionObj ? selectedRegionObj.communes : [];
      }
  },

  mounted() {
      this.fetchRegionsData();
      this.getCondicionesClima('Valparaíso');
  },

        // async mounted(){
        //     this.$store.state.cursos=[]
        //     if(this.$store.state.usuarioConectado===''){    
        //         this.showAlert('No hay usuario conectado', 'Debe loguearse')
        //         this.$router.push('/login')
        //     }
        // }
 }
    
</script>
    
<style>
  .titulo{
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }

  .subtitulo{
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    padding-inline: 1rem;
  }

  .card {
     font-family: 'Montserrat', sans-serif;
     border-color: #D2AFFF;
  }

  .card-img-top{
     max-width: 15rem;
     height: 160px;
     align-self: center;
     padding-top: 2rem;
  }

  .card-body{
     padding-top: 20rem;
     max-width: 50rem;
     align-self: left;
  }

  .btnInscribir {
      margin-top: 10px; /* Ajusta el valor según el espacio deseado */         
      background-color: #8B82B7;
      color: white;
      border: 1px solid #8B82B7;
      letter-spacing: 3px;
      padding: .6em 0;
      border-radius: 0;
   }
  .btnInscribir:hover{
      background-color: #8B82B7;
      color: white;
      opacity: 0.7;
  } 

  .btnDisabled{
      background-color: #dadada;
      letter-spacing: 3px;
      color: rgb(70, 70, 70); 
      border: 1px solid #D2AFFF;
      padding: .6em 0;
  }

  .card-custom {
      max-width: 800px;
  }

  .btn.btn-descripcion:hover{
      background-color: #F5E9BE ;
      color: #B723AA;
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      opacity: 0.7;
   }

  .btn.btn-descripcion{
      background-color: #F5E9BE;
      color: #B723AA;
      border-radius: 0;
   }
 
   .select-region {
      background-color: #8B82B7;
      color: white;
  }

  .select-comuna {
      background-color: #8B82B7;
      color: white;
  }
  
  
  </style>