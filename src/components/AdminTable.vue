<template>
  <div class="container">
    <div class="row">
      <h2 class="titulo">Administrador de actividades</h2>
    </div>
    <div class="row justify-content-center py-5" v-if="($store.state.actividadesTotal.length) == 0">
        <div class="col-auto">
          <fade-loader :loading="loading" :color="color" :size="size" class="mb-5"></fade-loader>
        </div>
      </div>
      <div  v-else>
        <div class="row justify-content-center py-4" id="searchContainer">
         <!-- busqueda deshabilitada por ahora -->
          <!-- <div id="search"  class="col-8" style="display: flex;">
            <input id="input-search" v-model = "texto" @keyup= "formulario" class="form-control w-100 me-2"  type="text" placeholder="Ingrese su búsqueda" >
            <button id="buttonSearch" class="btn btn-buscar" >
              <i class="fa fa-search"></i> Buscar
            </button>
          </div> -->
          <div class="col-2" style="display: flex; "> 
            <button type="button" class="btn btn-agregar" id="new" data-bs-toggle="modal" data-bs-target="#createModal" >Agregar Actividad</button>
          </div>


        </div>
        <div class=" table-responsive contenedorTabla">
          <table class="table table-bordered table-hover align-middle">
          <thead class="table-primary">
              <tr>
                  <th scope="col" class="text-center">Estado</th>
                  <th scope="col" class="text-center">Nombre</th>
                  <th scope="col" class="text-center">Descripción</th>
                  <th scope="col" class="text-center">Fecha desde</th>
                  <th scope="col" class="text-center">Fecha hasta</th>
                  <!-- <th scope="col" class="text-center">Horarios</th> -->
                  <!-- <th scope="col" class="text-center">Dificultad</th> -->
                  <!-- <th scope="col" class="text-center">Elementos</th> -->
                  <th scope="col" class="text-center">Precio</th>
                  <th scope="col" class="text-center">Cupos</th>
                  <th scope="col" class="text-center">Inscritos</th>
                  <th scope="col" class="text-center">Modificar</th>
                  <th scope="col" class="text-center">Eliminar</th>
              </tr>
        </thead>

        <TBody>
          <template v-for="curso in $store.state.actividadesTotal" :key="curso.nombre">

            <tr v-if="curso.eliminado===false">
                <td  class="text-center">{{curso.estado}}</td>
                <td  class="text-center">{{curso.nombre}}</td>
                <td  class="text-center">{{curso.descripcion}}</td>
                <td  class="text-center">{{curso.fechaDesde}}</td>
                <td  class="text-center">{{curso.fechaHasta}}</td>
                <!-- <td  class="text-center">{{curso.horarios}}</td> -->
                <!-- <td  class="text-center">{{curso.dificultad}}</td> -->
                <!-- <td  class="text-center">{{curso.elemento}}</td> -->
                <td  class="text-center">{{new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency' }).format(curso.precio)}}</td>
                <td  class="text-center">{{curso.cupos}}</td>
                <td  class="text-center">{{curso.inscritos}}</td>
                <td class="text-center">
                    <button class="btn btn-modificar"  id="modificar" @click="getCurso(curso.id)" type="button" data-bs-toggle="modal" data-bs-target="#editModal">&#9998;</button>
                </td>
                <td class="text-center"><button class="btn btn-modificar" id="borrar" type="button" @click="borraCurso(curso)">&#128465;</button></td>
            </tr>

          </template>

        </tbody>
        </table>
      </div>
      </div>
  </div>


      
  <!-- Modal Editar -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar Actividades</h1>
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{  }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="form" @submit.prevent="mensajeEditarCurso()">           
            <label for="estado-obj" class="form-label">Estado:</label>
            <br>
            <select id="estado" name="estado" v-model="mostrarCurso.estado">
                   <option value="Activo" :selected="mostrarCurso.estado === 'Activo'">Activo</option>
                   <option value="Inactivo" :selected="mostrarCurso.estado === 'Inactivo'">Inactivo</option>
            </select>
            <br>     
            <label for="nombre-obj" class="form-label">Nombre</label>     
            <input type="text" class="form-control" v-model="mostrarCurso.nombre">
            <label for="descripcion-obj" class="form-label">Descripción</label>
            <textarea class="form-control" id="descripcion" rows="3" v-model="mostrarCurso.descripcion"></textarea>
            <label for="fechaD-obj" class="form-label">Fecha Desde:</label>
            <input type="date" class="form-control" v-model="mostrarCurso.fechaDesde">
            <label for="fechaH-obj" class="form-label">Fecha Hasta:</label>
            <input type="date" class="form-control" v-model="mostrarCurso.fechaHasta">
            <label for="horarios-obj" class="form-label">Horarios</label>
            <textarea class="form-control" id="horarios" rows="3" v-model="mostrarCurso.horarios"></textarea>
           <label for="dificultad-obj" class="form-label">Dificultad:</label>
            <br>
            <select id="dificultad" name="dificultad" v-model="mostrarCurso.dificultad">
                   <option value="Basica" :selected="mostrarCurso.dificultad === 'Basica'">Basica</option>
                   <option value="Intermedia" :selected="mostrarCurso.dificultad === 'Intermedia'">Intermedia</option>
                   <option value="Avanzada" :selected="mostrarCurso.dificultad === 'Avanzada'">Avanzada</option>
            </select>
            <br>
            <label for="elementos-obj" class="form-label">Elementos</label>
            <textarea class="form-control" id="elementos" rows="3" v-model="mostrarCurso.elemento"></textarea>
            <label for="precio-obj" class="form-label">Precio</label>
            <input type="number" step="1" class="form-control" v-model="mostrarCurso.precio" min="0" max="99999999">
             <label for="cupos-obj" class="form-label">Cupos</label>
            <input type="number" step="1" class="form-control" v-model="mostrarCurso.cupos" min="1" max="99999999">
            <label for="img-obj" class="form-label">Imagen</label>
            <input type="text" class="form-control" v-model="mostrarCurso.imagen">
            <div class="modal-footer">
              <button type="button" class="btn btn-cancelar" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-modificar ms-2 p-2" data-bs-dismiss="modal" >Modificar</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  </div>

  <!-- Modal crear curso -->
  <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Crear actividades</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
       
          <form class="form" @submit.prevent="confirmaAgregarCurso()">

            <label for="estado-obj" class="form-label">Estado:</label>
            <br>
            <select id="estado" name="estado" v-model="agregarCurso.estado">
                   <option value="Activo" :selected="agregarCurso.estado === 'Activo'">Activo</option>
                   <option value="Inactivo" :selected="agregarCurso.estado === 'Inactivo'">Inactivo</option>
            </select>
            <br>     
            <label for="nombre-obj" class="form-label" >Nombre</label>     
            <input type="text" class="form-control" v-model="agregarCurso.nombre" required>
            <label for="descripcion-obj" class="form-label">Descripción</label>
            <textarea class="form-control" id="descripcion" rows="3" v-model="agregarCurso.descripcion"></textarea>
            <label for="fechaD-obj" class="form-label">Fecha Desde:</label>
            <input type="date" class="form-control" v-model="agregarCurso.fechaDesde">
            <label for="fechaH-obj" class="form-label">Fecha Hasta:</label>
            <input type="date" class="form-control" v-model="agregarCurso.fechaHasta">
            <label for="horarios-obj" class="form-label">Horarios</label>
            <textarea class="form-control" id="horarios" rows="3" v-model="agregarCurso.horarios"></textarea>
           <label for="dificultad-obj" class="form-label">Dificultad:</label>
            <br>
            <select id="dificultad" name="dificultad" v-model="agregarCurso.dificultad">
                   <option value="Basica" :selected="agregarCurso.dificultad === 'Basica'">Basica</option>
                   <option value="Intermedia" :selected="agregarCurso.dificultad === 'Intermedia'">Intermedia</option>
                   <option value="Avanzada" :selected="agregarCurso.dificultad === 'Avanzada'">Avanzada</option>
            </select>
            <br>
            <label for="elementos-obj" class="form-label">Elementos</label>
            <textarea class="form-control" id="elementos" rows="3" v-model="agregarCurso.elemento"></textarea>
            <label for="precio-obj" class="form-label">Precio</label>
            <input type="number" step="1" class="form-control" v-model="agregarCurso.precio" min="0" max="99999999">
             <label for="cupos-obj" class="form-label">Cupos</label>
            <input type="number" step="1" class="form-control" v-model="agregarCurso.cupos" min="1" max="99999999">
            <label for="img-obj" class="form-label">Imagen</label>
            <input type="text" class="form-control" v-model="agregarCurso.imagen">
            <div class="modal-footer">
              <button type="button" class="btn btn-cancelar " data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-crear ms-2 py-2" data-bs-dismiss="modal" >Crear actividad</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </template>
    
    <script>
    import Swal from 'sweetalert2'
    import {mapActions, mapState} from 'vuex';
    import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
    import { collection, getDocs, doc, getDoc, deleteDoc, setDoc} from "firebase/firestore";
    import { db } from "@/auth/auth.service"
    
    export default {
      name: 'AdminTable',
      components: {
         FadeLoader
      },
      data(){
        return{
          agregarCurso: {estado: 'Activo',nombre: '', descripcion: '', fechaDesde:'',fechaHasta:'',horarios:'',dificultad:'Basica',precio: '', cupos: '', imagen: '',inscritos: '',eliminado:'false'},
          idBorrarCurso: '',
          color: '#d676ab',
          texto : '',    
        }
      },
      created(){
            this.getCursos()
            this.getCurso(this.idEditar)
        },
        methods: { 
          formulario() {
            this.$store.dispatch('filtroName', this.texto)
        }

          ,
          ...mapActions(['getCursos', 'getCurso', 'crearCurso', 'modificarCurso','eliminarCurso', 'filtroName']),

        // SweetAlert para agregar curso

          confirmaAgregarCurso(){
            //validaciones
            // if (!this.agregarCurso.nombre || !this.agregarCurso.descripcion || !this.agregarCurso.fechaDesde || !this.agregarCurso.fechaHasta || !this.agregarCurso.horarios ||  !this.agregarCurso.precio || !this.agregarCurso.cupos || !this.agregarCurso.imagen) {
            //    alert('Por favor completa todos los campos obligatorios.');
            //     return;
            // }else{

           
            Swal.fire({
              title: '¿Estás seguro de crear esta actividad?',
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                // this.crearCurso(this.agregarCurso)
                this.crearActividad()
                this.getCursos()
                this.resetearCurso(this.agregarCurso)
                Swal.fire('¡Listo! Actividad ha sido creado exitosamente ', '', 'success')
              } else if (result.isDenied) {
                Swal.fire('Los cambios no se guardaron', '', 'info')
              }
            })
          // }
          },

          async crearActividad(){
       
            const largoArreglo = this.$store.state.actividadesTotal.length;
                
            let cId = (largoArreglo + 1).toString();
         
            await setDoc(doc(db, "Programacion", cId), {
      
              estado: this.agregarCurso.estado,
              nombre: this.agregarCurso.nombre,
              descripcion: this.agregarCurso.descripcion,
              fechaDesde: this.agregarCurso.fechaDesde,
              fechaHasta: this.agregarCurso.fechaHasta,
              horarios: this.agregarCurso.horarios,
              dificultad: this.agregarCurso.dificultad,
              precio: this.agregarCurso.precio,
              cupos: this.agregarCurso.cupos,
              inscritos: '0',
              imagen: this.agregarCurso.imagen,
              elemento: this.agregarCurso.elemento,
              eliminado: false
            })
            
          },


          // SweetAlert para borrar curso

          borraCurso(elemento){
            Swal.fire({
              title: '¿Estás seguro de eliminar esta actividad?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#f2b119',
              cancelButtonColor: '#8B82B7',
              confirmButtonText: 'Si, Eliminar'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Listo!',
                  'La actividad a sido eliminada exitosamente.',
                  'success'
                )
                // this.idBorrarCurso =  elemento;
                // this.eliminarCurso(this.idBorrarCurso);
                this.borrarActividad(elemento);
                this.getCursos();
              }
            })
          },
          
          async borrarActividad(cId){
              await setDoc(doc(db, "Programacion", cId.id), {
              estado: 'Inactivo',
              nombre: cId.nombre,
              descripcion: cId.descripcion,
              fechaDesde: cId.fechaDesde,
              fechaHasta: cId.fechaHasta,
              horarios: cId.horarios,
              dificultad: cId.dificultad,
              precio: cId.precio,
              cupos: cId.cupos,
              inscritos: cId.inscritos,
              imagen: cId.imagen,
              elemento: cId.elemento,
              eliminado: true
            })
          },



          // SweetAlert para editar curso

          mensajeEditarCurso(){
            Swal.fire({
              title: '¿Estás seguro de los cambios realizados?',
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire('¡Listo! La actividad ha sido modificado exitosamente ', '', 'success')
                this.getCursos() 
                this.modificarCurso(this.mostrarCurso)
              } else if (result.isDenied) {
                Swal.fire('La actividad no se ha podido guardar', '', 'info')
              }
            })
          },

          // Función para limpiar campos de formulario

          resetearCurso(){
            this.agregarCurso =  {estado: 'Activo',nombre: '', descripcion: '', fechaDesde:'',fechaHasta:'',horarios:'',dificultad:'Basica',precio: '', cupos: '', imagen: '',inscritos: '',eliminar:'false'}

          },

        },

        computed : {
        ...mapState(['cursos', 'mostrarCurso', 'agregarCurso', 'cursosFiltrados']),
        },  
        
      }


    </script>
    
    <style>
 
      #card-img-top{
        max-width: 8rem;
        height: 60px;
      }

      .container{
        font-family: 'Montserrat', sans-serif;
      }

      .titulo{
        padding-top: 5rem;
      }

      .table.table-bordered{
        font-family: 'Montserrat', sans-serif;
        margin-bottom: 5em;
      }
      .contenedorTabla{
        max-width: 99vw;
      }

      .modal-content{
      font-family: 'Montserrat', sans-serif;
      }

      #search{
        border-radius: 50px;
      }

      .btn.btn-crear,.btn.btn-modificar{
        background-color: #8B82B7;
        color: azure;
        font-family: 'Montserrat', sans-serif;
        margin: 0;
      }
      .btn.btn-crear:hover,.btn.btn-modificar:hover{
         background-color: #F5E9BE;
         color: #B723AA;
      }
      .btn.btn-cancelar,.btn.btn-agregar,.btn.btn-buscar{
         background-color: #8B82B7;
         color: azure;
         font-family: 'Montserrat', sans-serif;
      }
      .btn.btn-agregar{
         /* background-color: #F5E9BE;
         color:#B723AA; */
         background-color: #8B82B7;
         color: azure;
         font-family: 'Montserrat', sans-serif;
     
      }
      .btn.btn-cancelar:hover,.btn.btn-agregar:hover,.btn.btn-buscar:hover{
         background-color: #F5E9BE;
         color: #B723AA;
      }
      .btn.btn-agregar:hover{
         background-color: #F5E9BE;
         color: #B723AA;
      }
      .btn.btn-eliminar{
         background-color:#F5E9BE;
         color: #B723AA;
      }
      .btn.btn-eliminar:hover{
         background-color:#F5E9BE;
         color: #B723AA;
      }
      /* select:focus:hover {
         background-color:#F5E9BE;
         color: #B723AA;
      }  */
/* Color de fondo amarillo */
     /* .modal-content {
        background-color: #F5E9BE;
     } */

/* Color de texto rojo */
    /* .form-control {
       color: #B723AA;
   } */

/* Color de fondo azul y texto blanco para el título */
    .modal-header {
       background-color: #8B82B7;
    }

    .modal-title {
      color: white;
    }

 
    </style>