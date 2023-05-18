import { createStore } from 'vuex'
import { collection, getDocs, doc, getDoc, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "@/auth/auth.service"

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';



export default createStore({
  state: {
    cursos: [],
    mostrarCurso: {codigo: '', nombre: '', estado: '', precio: '', duracion: '', descripcion: '', cupos: '', inscritos: '', imagen: '',eliminado:'false'},
    login:false,
    usuarioConectado:"",
    carga: false,
    cursosFiltrados:  [], 
    //esta las estoy usando yo
    usuarios:[],
    usuariosTotal:[],
    loginUsuario:false,
    loginAdmin:false,
    actividades:[],
    actividadesTotal:[],
  },

  getters: {

    loginTrue(state) {
      return state.login;
    }

  },

  mutations: {
    [SET_LOGIN_STATE](state, payload) {
      state.login = payload;
    },
    getCursos2(state,payload){
      state.actividades = payload
      state.actividadesTotal = payload 
     
    },
    getCurso(state,payload){
      state.mostrarCurso = payload 
    },
    cambiaEstadoLogin (state) {
      state.login = true
    },
    ///este lo voy a eliminar
    cambiaEstadoLoginFalse (state) {
      state.login = false
    },  
    getCursosFiltrados(state, payload){
      state.actividadesTotal = payload
    } 

  },


  actions: {

    // CRUD -> READ 

    async getCursos ({commit}){
      const cursos = [];
      const listado = await getDocs(collection(db, "Programacion"))
          listado.forEach(doc => {    
            let curso =  doc.data()
            curso.id = doc.id
            cursos.push(curso)
          });
          commit('getCursos2', cursos)
    },

    // Obtiene datos del curso seleccionado 

    async getCurso ({commit}, idCurso){
      const datosCurso = await getDoc(doc(db, "Programacion", idCurso));
      const curso = datosCurso.data();
      curso.id = datosCurso.id;
      curso.nombre = datosCurso.data().nombre;
      curso.estado = datosCurso.data().estado;
      curso.precio = datosCurso.data().precio;
      curso.duracion = datosCurso.data().duracion;
      curso.descripcion = datosCurso.data().descripcion;
      curso.cupos = datosCurso.data().cupos;
      curso.inscritos = datosCurso.data().inscritos;
      curso.imagen = datosCurso.data().imagen;
      curso.eliminado = datosCurso.data().eliminado
      commit('getCurso', curso)
      },

      // CRUD -> UPDATE 

    async modificarCurso({commit}, mostrarCurso){
      await setDoc(doc(db, "Programacion", mostrarCurso.id), {
   
        nombre: mostrarCurso.nombre,
        descripcion: mostrarCurso.descripcion,
        fechaDesde: mostrarCurso.fechaDesde,
        fechaHasta: mostrarCurso.fechaHasta,
        cupos: mostrarCurso.cupos,
        dificultad: mostrarCurso.dificultad,
        horarios:  mostrarCurso.horarios,
        elemento:  mostrarCurso.elemento,
        imagen: mostrarCurso.imagen,
        estado: mostrarCurso.estado,
        precio: mostrarCurso.precio,
        inscritos: mostrarCurso.inscritos,
        eliminado:false
      });
    },

    // CRUD -> CREATE 

    // async crearCurso({commit}, agregarCurso){
     
    //   alert('entre aca crear curso')
     
    //   let cId='2'
    //   await setDoc(doc(db, "Programacion", cId), {
    //     estado: agregarCurso.estado,
    //     nombre: agregarCurso.nombre,
    //     descripcion: agregarCurso.descripcion,
    //     fechaDesde: agregarCurso.fechaDesde,
    //     fechaHasta: agregarCurso.fechaHasta,
    //     horarios:agregarCurso.horarios,
    //     dificultad: agregarCurso.dificultad,
    //     precio: agregarCurso.precio,
    //     cupos: agregarCurso.cupos,
    //     inscritos: '0',
    //     imagen: agregarCurso.imagen,
    //     elemento: agregarCurso.elemento,
    //     eliminado: false
    //   })
      
    // },

    // CRUD -> DELETE 

    // async eliminarCurso({commit}, idBorrar){
    //   await deleteDoc(doc(db,"Programacion", idBorrar))
    // },

  //   async filtroName({ commit, state }, nombre) {
  //     const filtro = state.cursos.filter((curso) => {
  //       let nombresCursos = curso.nombre.toLowerCase();
  //       let nombreInput = nombre.toLowerCase();
  //       if (nombresCursos.includes(nombreInput)) {
  //         return curso;
  //       }
  //     });
  //     commit("getCursosFiltrados", filtro);
  //   },

 


  },

  modules: {
  }

})

