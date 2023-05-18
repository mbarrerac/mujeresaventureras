<template>
  <div>
    <div class="titulo">
         <h2>Listado de personas inscritas por actividad</h2>
    </div>

    <select class="select-programacion" v-model="programaSeleccionada" @change="cargarUsuarios(programaSeleccionada)">
      <option value="">Seleccione actividad</option>
      <option v-for="programa in programacion" :key="programa.id" :value="programa.id">{{ programa.nombre }}</option>
        </select>
   
    

    <!-- <ul v-if="usuarios.length > 0"> -->
      <div class=" table-responsive contenedorTabla">
          <table class="table table-bordered table-hover align-middle">
            <thead class="table-primary">
                <tr>
                    <th scope="col" class="text-center">Nombre</th>
                    <th scope="col" class="text-center">Apellido</th>
                    <th scope="col" class="text-center">Dirección</th>
                    <th scope="col" class="text-center">Teléfono</th>
                    <th scope="col" class="text-center">Email</th>
    
                </tr>
            </thead>

            <TBody v-if="usuarios.length > 0">
              
               <template v-for="usuario in usuarios" :key="usuario.id">
                  <tr v-if="usuario.estadoInscritos===true">
                    <td  class="text-center">{{usuario.nombre}}</td>
                    <td  class="text-center">{{usuario.apellido}}</td>
                    <td  class="text-center">{{usuario.direccion}}</td>
                    <td  class="text-center">{{usuario.telefono}}</td>
                    <td  class="text-center">{{usuario.email}}</td>
                  </tr>
               </template>
               <!-- <button class="select-programacion" @click="generatePDF">Generar PDF</button> -->
            </tbody>
            <div v-else>
              <h2 class="tituloUsuario">No hay usuarios disponibles.</h2>
                 
            </div>
          </table>
       </div>
    <!-- </ul> -->

 
  </div>
</template>

<script>
  import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
  import { db } from '@/auth/auth.service';
  import pdfMake from 'pdfmake/build/pdfmake'
  import pdfFonts from 'pdfmake/build/vfs_fonts' 

  export default {
    data() {
      return {
        programaSeleccionada: '',
        programacion: [],
        usuarios: []
      };
    },
    methods: {
      async cargarProgramacion() {
          const programacionQuery = query(collection(db, 'Programacion'), where('estado', '==', 'Activo'));
          const programacionSnapshot = await getDocs(programacionQuery);
  
          this.programacion = programacionSnapshot.docs.map(doc => {
            return {
              id: doc.id,
              nombre: doc.data().nombre
            };
          });
      },

      async cargarUsuarios(element) {
          if (this.programaSeleccionada) {
            const inscritosQuery = query(collection(db, 'Inscritos'), where('idProgramacion', '==', element));
            const inscritosSnapshot = await getDocs(inscritosQuery);

            const promises = inscritosSnapshot.docs.map(async (inscritoDoc) => {
              const idUsuario = inscritoDoc.data().idUsuario;
              const usuarioDoc = await getDoc(doc(db, 'UsuariosAdmin', idUsuario));

              return {
                ...usuarioDoc.data(),
                estadoInscritos: true  // Agrega el estado de inscritos al objeto de usuario
              };
            });

            this.usuarios = await Promise.all(promises);
          } else {
            this.usuarios = [];
          }
      },

      generatePDF() {
  const usuariosContent = this.usuarios.map(usuario => ({
    columns: [
      { text: `Nombre: ${usuario.nombre} ${usuario.apellido}`, style: 'userInfo' },
      { text: `Email: ${usuario.email}`, style: 'userInfo' },
      { text: `Teléfono: ${usuario.telefono}`, style: 'userInfo' }
    ],
    columnGap: 10,
    margin: [0, 10]
  }));

  const docDefinition = {
    content: [
      { text: 'Usuarios asignados a la actividad', style: 'header' },
      { text: '\n' },
      ...usuariosContent
    ],
    styles: {
      header: {
        fontSize: 18,
        // bold: true,
        font: 'arial'
      },
      userInfo: {
        font: 'arial'
      }
    },
    defaultStyle: {
      font: 'arial'
    },
    // Definición de las fuentes utilizadas en el documento
    fonts: {
      Arial: {
        normal: './fonts/arial.ttf',
        bold: './fonts/arial-Bold.ttf',
        italics: './fonts/Arial-Italic.ttf',
        bolditalics: './fonts/Arial-BoldItalic.ttf' 
      }
    }
  };

  pdfMake.createPdf(docDefinition).download('usuarios_actividad.pdf');
}


  

    },
    created() {
      this.cargarProgramacion();
    }
  };
</script>
<style>
   .select-programacion {
      background-color: #8B82B7;
      color: white;
      margin-top: 20px; /* Ajusta el valor según el espacio deseado */
      margin-left: 20px;
      height: 40px; /* Ajusta el valor de altura deseado */
      margin-bottom: 50px
   } 
   .contenedorTabla {
      display: flex;
      justify-content: center;
   }   

   .table {
      margin-top: 10px; /* Ajusta el valor según el espacio deseado */
   }
   .table.table-bordered{
        font-family: 'Montserrat', sans-serif;
        margin-bottom: 5em;
      }
  .contenedorTabla{
        max-width: 99vw;
   }
   .tituloUsuario {
  
    font-family: 'Montserrat', sans-serif;
    margin-top: 20px;
    margin-bottom: 2rem; /* Ajusta el valor para agregar más espacio */
    text-align: center;
  }
</style>
