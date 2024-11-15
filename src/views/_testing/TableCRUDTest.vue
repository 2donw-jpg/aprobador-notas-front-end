<template>
  <v-data-table
    :headers="headers"
    :items="teachers"
    :search="search"
    item-key="teacher_name"

  >

    <template v-slot:top>
      <v-toolbar flat>
        <v-row class="align-bottom pa-3">
          <v-col>
            <v-text-field 
            v-model="search"
            label="Buscar por nombre"
            variant="outlined"
            hide-details
            flat
            dense
            single-line
          ></v-text-field>
          </v-col>


        <!-- TODO: Implementar esto ya en sistema -->
        <v-col class="align-bottom">
          <v-select
            v-model="selectedCareers"
            :items="careers"
            label="Filtrar por Carrera"
            item-title="career_name"
            item-value="career_id"
            variant="outlined"
            dense
            clearable
            multiple
          >
            <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 2">
                <span>{{ item.title }}</span>
            </v-chip>
            <span v-if="index === 2" class="text-grey text-caption align-self-center">
                (+{{ selectedCareers.length - 2 }} más)
            </span>
            </template>
            
          </v-select> 
          </v-col>
        </v-row>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

      
         <!-- Dialog Start -->
      <v-dialog v-model="dialog" max-width="700">    
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="text-none font-weight-bold"
            text="Nuevo Catedrático"
            color="success"
            variant="elevated"
            v-bind="activatorProps"
          ></v-btn>
        </template>



        <!-- Card Start -->
        <v-card :title="formTitle" min-width=600>
          <v-form ref="form" v-model="valid" @submit.prevent="saveForm">
            <v-container>
              <v-row class="align-end">

            <!-- Full Name Field -->
                <v-col>
                  <v-text-field
                  v-model="teacher.fullName"
                  label="Nombre completo"
                  variant="underlined"
                  :rules="[fullNameRules.required, fullNameRules.minLength, fullNameRules.onlyLetters]"
                  required
                  ></v-text-field>
                </v-col>

            <!-- Email Field -->
                <v-col>
                  <v-text-field
                  v-model="teacher.email"
                  label="Correo electrónico"
                  variant="underlined"
                  suffix="@ujcv.edu.hn"
                  :rules="[emailRules.required, emailRules.email]"
                  required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-select
                  v-model="teacher.selectedCareers"
                  :items="careers"
                  label="Filtrar por Carrera"
                  item-title="career_name"
                  item-value="career_id"
                  variant="underlined"
                  clearable
                  multiple
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index < 2">
                        <span>{{ item.title }}</span>
                      </v-chip>
                      <span v-if="index === 2" class="text-grey text-caption align-self-center">
                      (+{{ selectedCareers.length - 2 }} más)
                      </span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>

            </v-container>
          </v-form>  

          <v-card-actions>
            <v-btn text="Cerrar" variant="tonal" @click="close"></v-btn>
            <v-btn :disabled="!valid" variant="flat"  color="success" type="submit" @click="saveForm">Guardar</v-btn>
          </v-card-actions>
        </v-card>    
      </v-dialog>

      
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="FormDelete"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>


    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        <span class="mdi mdi-pencil"></span>
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> 
        <span class="mdi mdi-delete"></span>
      </v-icon>
    </template>


    <template v-slot:no-data>
      <v-btn @click="loadData"> Recargar Datos </v-btn>
    </template>

    <template v-slot:item.teacher_active="{ item }">
          <v-chip
            :color="item.teacher_active == 'ACTIVO' ? 'success' : 'grey'"
            :text="item.teacher_active == 'ACTIVO' ? 'Activo' : 'Inactivo'"
            variant="flat"
            x-small
          ></v-chip>
      </template>

  </v-data-table>

  <GeneralAlert
    :alertTitle="alert.title"
    :alertType="alert.type"
    v-model="alert.visible"
  />
</template>

<script>
import { CareerManagmentService, TeacherManagmentService } from '@/services/data.service.js';
  export default {
    data: () => ({

      alert: {visible: false,title: '',type: ''},
      dialog: false,
      dialogDelete: false,
      valid: false,

      fullNameRules: {
        required: v => !!v || 'Nombre completo es requerido',
        minLength: v => (v && v.length >= 10) || 'El nombre debe de contener por lo menos 10 carácteres',
        onlyLetters: v => /^[a-zA-Zñ\s]+$/.test(v) || 'El nombre solo puede contener letras y espacios',
      },
      emailRules: {
        required: v => !!v || 'Correo electrónico es requerido',
        email: v => /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?$/.test(v) || 'El correo solo pueden ser letras, números y el signo de puntuación en medio'      
      },
    
      headers: [
        { title: 'Nombre', key: "teacher_name", value: 'teacher_name' },
        { title: 'Correo electrónico', key: "teacher_email", value: 'teacher_email',},
        { title: 'Carreras', key: "teacher_careers", value: 'teacher_careers',align:"start"},
        { title: 'Estado', key: "teacher_active", value: 'teacher_active' ,align:"center"},
        { title: 'Acciones', key: "actions", value: '',sortable:"false",align:"center"}
      ],
      selectedCareers:[],
      teachers: [],
      careers: [],

      editedIndex: -1,
      
      editteacher: {
        id: '',
        fullName: '',
        email: '',
        selectedCareers:[],
      },

      teacher: {
        id: '',
        fullName: '',
        email: '',
        selectedCareers:[],
      },

    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Nuevo Catedrático' : 'Editar Catedrático'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },

    mounted() {
      this.loadData();
    },

    methods: {
      async loadData() {
      try {
        const careerResponse = await CareerManagmentService.getCareerList();
        const teacherResponse = await TeacherManagmentService.getTeacherList();

        //TODO: Show an alert if this if the status is not 200
        if(teacherResponse.status != 200){
          throw new Error("Error loading teacher data");
        }
        if(careerResponse.status != 200){

          throw new Error("Error loading career data");
        }
          
        this.careers = careerResponse.data;
        this.teachers = teacherResponse.data;

      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    },

      editItem(item) {
        this.editteacher ={
          id: item.teacher_id,
          fullName: item.teacher_name,
          email:  item.teacher_email,
          //
        }
        console.log("editedIndex: ", this.editedIndex);
        //this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        this.editedIndex = item.teacher_code;
        console.log("editedIndex: ", this.editedIndex);
/*      this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item) */
        this.dialogDelete = true
      },


      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.teacher = {fullName:'',email:'',selectedCareers:[]};
          this.editedIndex = -1;
          this.valid = false;
        })
      },

      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.teacher = {fullName:'',email:'',selectedCareers:[]};
          this.editedIndex = -1
        })
      },

      saveForm() {
      this.editedIndex === -1 ? this.FormNew() : this.FormEdit()
      }, 


      FormNew(){
        if (this.valid) {
          TeacherManagmentService.createTeacher(this.teacher.fullName.toUpperCase(), this.teacher.email, this.teacher.selectedCareers)
            .then(response => {
              // Check if response status is 201 (created)
              if (response.status === 201) {
                this.SuccessAlert();
                this.clearData();
                this.loadData();
              } else {
                this.ErrorAlert();  // Error alert if status isn't 201 (unexpected response)
              }
            })
            .catch(error => {
              console.error('Error creating teacher:', error);
              this.ErrorAlert();  // Error alert if the request fails (e.g., network issues)
            });
          } else {
            this.WarningAlert();  // Show warning alert if form is invalid
          }
        },

      FormEdit(){
        if (this.valid) {
          TeacherManagmentService.editTeacher(this.editteacher.fullName.toUpperCase(), 
                                              this.editteacher.email, 
                                              this.editteacher.selectedCareers,
                                              this.editteacher.id)
            .then(response => {
              // Check if response status is 201 (created)
              if (response.status === 201) {
                this.SuccessAlert();
                this.clearData();
                this.loadData();
              } else {
                this.ErrorAlert();  // Error alert if status isn't 201 (unexpected response)
              }
            })
            .catch(error => {
              console.error('Error creating teacher:', error);
              this.ErrorAlert();  // Error alert if the request fails (e.g., network issues)
            });
          } else {
            this.WarningAlert();  // Show warning alert if form is invalid
          }
        },
      },

      FormDelete(){
        this.closeDelete()
      },

      SuccessAlert() {
      this.alert.visible = true;
      this.alert.title = 'Registro creado exitosamente';
      this.alert.type = 'success';
      
    },
    
    ErrorAlert() {
      this.alert.visible = true;
      this.alert.title = 'Error al crear registro, por favor intente de nuevo. Si el problema persiste comuniquese con su supervisor sobre el problema';
      this.alert.type = 'error';
      
    },
    WarningAlert() {
      this.alert.visible = true;
      this.alert.title = 'Por favor, llene todos los datos correctamente';
      this.alert.type = 'warning';
    }


    };
  
</script>
