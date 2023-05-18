<template>
  <div id="login" class="mt-5">
    <form @submit.prevent="login" ref="form">
      <div class="form-group">
        <label>Correo Electrónico</label>
        <input name="email" type="email" v-model.trim="loginForm.email" required  />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input name="password" type="password" v-model.trim="loginForm.password" required />
      </div>
      <button type="submit">Iniciar Sesión</button>
      <br /><br />
      <div id="login" class="mt-2"> 
        <p>¿No tienes cuenta?</p>
        <button type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="btnRegistro">Regístrate!</button>
    
      </div>
    </form>
    <br />
    <div v-if="error" class ="mb-4" >{{ error }}</div>
  </div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Registro</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-1">
               <label for="nombre1" class="form-label">Nombre</label>
               <input type="text" class="form-control" id="nombre" v-model.trim="loginForm.nombre1">
               <div class="invalid-feedback">Por favor ingrese su nombre</div>
          </div>
          <div class="mb-3">
               <label for="apellido1" class="form-label">Apellido</label>
               <input type="text" class="form-control" id="apellido" v-model.trim="loginForm.apellido1">
               <div class="invalid-feedback">Por favor ingrese su apellido</div>
          </div>          
          <div class="mb-3">
              <label for="direccion1" class="form-label">Dirección</label>
             <input type="text" class="form-control" id="direccion" v-model.trim="loginForm.direccion1">
             <div class="invalid-feedback">Por favor ingrese su dirección</div>
           </div>
          <div class="mb-3">
              <label for="telefono1" class="form-label">Teléfono</label>
              <input type="text" class="form-control" id="telefono" v-model.trim="loginForm.telefono1">
               <div class="invalid-feedback">Por favor ingrese su teléfono</div>
          </div>
          <div class="mb-3">
            <label for="Email1" class="form-label">Correo Electrónico</label>
            <input type="email" class="form-control" v-model.trim="loginForm.email1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="Password1" class="form-label">Contraseña</label>
            <input type="password" class="form-control" v-model.trim="loginForm.password1">
          </div>
        </form>
      </div>
      <div class="modal-footer justify-content-center">
        <button @click="registrarUsuario()" type="submit" data-bs-dismiss="modal">Aceptar</button>
        <button type="submit" data-bs-dismiss="modal" id="cerrarModalRegistro">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { auth } from "@/auth/auth.service";
import { SET_LOGIN_STATE } from "@/store/index";
 import { collection, getDocs, doc, deleteDoc, setDoc} from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
// import { doc, setDoc } from "firebase/firestore";
import { db } from "@/auth/auth.service"

// import {mapMutations} from 'vuex';

// import { GoogleAuthProvider } from "firebase/auth";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
        nombre1:'',
        apellido1:'',
        direccion1:'',
        telefono1:'',
        email1:"",
        password1:""
      },
      error: "",
    };
  },
  methods: {

    // Login o acceso de usuarios existentes -> método signInWithEmailAndPassword
    async login() {
      try {
        if (!this.$refs.form.checkValidity()) return;
        await auth.signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password,
          this.$store.state.usuarioConectado= this.loginForm.email,
        );
        this.$store.commit(SET_LOGIN_STATE, true);
        // this.$router.push({ name: "HomeView" });
        this.$router.push({ name: 'HomeView', params: { archivoJson: 'imagenes' } });

        // this.error= "";
        this.extraerUsuarios(1,this.loginForm.email)
    
        // this.$store.commit(cambiaEstadoLogin);
      } catch (err) {
        this.showAlert("Error: Uusuario no registrado")

        // this.showAlert("Error: "+ err.message)
        this.$store.state.loginUsuario=true,
        this.$store.state.loginAdmin=false                 
        // this.error = "Usuario o clave incorrecta";

        // this.$store.commit(cambiaEstadoLoginFalse);
        // this.$store.commit(SET_LOGIN_STATE, false);
      }
    },



   // Extraer usuarios

   async extraerUsuarios(llega,llegaEmail) {
      this.$store.state.usuarios=[]
      this.$store.state.usuariosTotal=[]
      const querySnapshot = await getDocs(collection(db, "UsuariosAdmin"));
      querySnapshot.forEach((doc) => {
      const curso = Object.assign({}, doc.data(), { id: doc.id });
          this.$store.state.usuarios.push(curso); 
      }); 
      this.$store.state.usuariosTotal = this.$store.state.usuarios
      if (llega===0){
         this.crearUsuarios()
      }else {
        // this.buscarUsuarios()
        const estadoUsuario1 = this.buscarUsuario(llegaEmail);
            if (estadoUsuario1==='0'){
                //es un asuario adminsitrador
                this.$store.state.loginUsuario=true,
                this.$store.state.loginAdmin=true
            }else{
              if (estadoUsuario1==='1'){
                 this.$store.state.loginUsuario=true,
                 this.$store.state.loginAdmin=true
              }else{
                this.$store.state.loginUsuario=true,
                this.$store.state.loginAdmin=false              
              }
            }
      }
    },
   async crearUsuarios(){
      const largoArreglo = this.$store.state.usuariosTotal.length;
      let cId = (largoArreglo + 1).toString();
     
      // Añado nuevo usuario"
      await setDoc(doc(db, "UsuariosAdmin",cId), {
          admin: 'No',
          apellido: this.loginForm.apellido1,
          direccion:this.loginForm.direccion1,
          email:this.loginForm.email1,
          estado:'2',
          idUsuario:cId,
          nombre:this.loginForm.nombre1,
          telefono:this.loginForm.telefono1
      });
      store.state.loginAdmin=false
    },

    // Registro de usuarios nuevos 

    async registrarUsuario (){
        auth.createUserWithEmailAndPassword(this.loginForm.email1,this.loginForm.password1)
        .then((userCredential)=> {  
             this.extraerUsuarios(0)
             this.$store.state.usuarioConectado = this.loginForm.email1
             this.showAlert("Usuario registrado correctamente")
             this.$store.commit(SET_LOGIN_STATE, true);
            //  this.$router.push({ name: "HomeView" });
             this.$router.push({ name: 'HomeView', params: { archivoJson: 'imagenes' } });
            
             
            //  this.$store.commit(cambiaEstadoLogin);
             //
         })
         .catch((error) => {
               this.$store.state.usuarioConectado='';
               this.codigoError = error.code;
               this.mensajeError = error.message;
               if (error.message==='Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
                  this.showAlert("Email ya se encuentra registrado en el sistema")
               }else{ if(error.message==='Firebase: Password should be at least 6 characters (auth/weak-password).'){
                          this.showAlert("Contraseña debe ser mayor a 6 caracteres")

               }else{
                  this.showAlert("Error: "+error.message)
               }
               }
          
              //  this.$store.commit(cambiaEstadoLogin);
               this.$store.commit(SET_LOGIN_STATE, false);
         });
      
 
    },

    buscarUsuario(llega){
     
         this.$store.state.usuarios = this.$store.state.usuariosTotal;
        //  const searchTerm = this.loginForm.email.toLowerCase();
        //  this.$store.state.usuarios = this.$store.state.usuarios.filter(element => {
        //       const name1 = element.email.toLowerCase();
        //       return name1.includes(searchTerm)  ;
        //  })
        const usuario = this.$store.state.usuarios.find(u => u.email === llega);
        return usuario ? usuario.estado : null;

      
    },

   showAlert(texto1){
        Swal.fire({
        title:texto1,
        icon:"success",  
        confirmButtonText:"Ok",
        })
    }
  },
  mounted() {

    // Para obtener el usuario con sesión activa -> método onAuthStateChanged 
      // this.$store.commit(cambiaEstadoLoginFalse);
      this.$store.commit(SET_LOGIN_STATE, false);
      auth.onAuthStateChanged((user) =>{
           this.$store.state.usuarioConectado=user.email
           this.showAlert("Sesión iniciada")
           this.$store.commit(SET_LOGIN_STATE, true);
          //  this.$router.push({ name: "HomeView" });
           this.$router.push({ name: 'HomeView', params: { archivoJson: 'imagenes' } });

           this.extraerUsuarios(1,user.email)
          //  this.$store.commit(cambiaEstadoLogin);
      });
  },
}

</script>
<style>
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  margin-top: -20px;
  /* background-color:#F5E9BE ; */
  
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /* width: 200%; */
  
 
}
.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
}
.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}
button[type="submit"] {
  margin-top: 1.5em;
  padding: 10px 20px;
  background-color:#8B82B7;
  border: none;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 15em;
  letter-spacing: 2px;
}

#btnRegistro, #cerrarModalRegistro{
  background-color: #8B82B7;
  color: white;
  border: 2px solid #F5E9BE;
  margin: 0 0 2em 0;
}

#cerrarModalRegistro{
  margin-top: 1em;
}

button[type="submit"]:hover {
  background-color: #8B82B7;
}

</style>