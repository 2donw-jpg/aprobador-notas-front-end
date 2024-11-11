<!-- <template>
    <v-container>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          v-for="catedratico in filteredCatedraticos"
          :key="catedratico.idCatedratico"
        >
          <v-expansion-panel-title>
            {{ catedratico.nombre }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-data-table
              :headers="headers"
              :items="catedratico.clases"
              :sortable="true"
              hide-default-footer
            >
            <template v-slot:item.grade_status="{ value }">
            <v-chip :color="getColor(value)"> {{ value }} </v-chip>
            </template>
  
  
            </v-data-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </template>
  
  <script>
  import { GradeManagmentService } from '@/services/data.service.js';
   
  export default {
    data() {
      return {
        headers: [
          { title: 'Código', value: 'code' },
          { title: 'Clase', value: 'class' },
          { title: 'Sección', value: 'section' },
          { title: 'Estado', value: 'grade_status' },
          { title: 'Fecha', value: 'date' }
        ],
        catedraticos: [] // Almacena todos los registros
      };
    },
    computed: {
      filteredCatedraticos() {
        // Si `searchQuery` está vacío, devuelve todos los registros
        if (!this.searchQuery) {
          return this.catedraticos;
        }
        // Filtra los registros que coinciden con el término de búsqueda
        return this.catedraticos.filter(catedratico =>
          catedratico.nombre?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    mounted() {
      this.loadData();
    },
  
    methods: {
      getColor(grade_status) {
          console.log("Grade status: ", grade_status);
          if (grade_status === true) return 'green'
          else return 'gray'
      },
  
      async loadData() {
        try {
          //const response = await fetch('/Listitem.json');
          const parcial_id = '1';
          const response = await GradeManagmentService.getTeacherList(parcial_id);
          if (response.ok){
            console.log("The response is good");
          }
          // this.catedraticos = response.json();
          this.catedraticos = response.data;
  
        } catch (error) {
          console.error('Error loading JSON data:', error);
        }
      }
    }
  };
  </script>
   -->