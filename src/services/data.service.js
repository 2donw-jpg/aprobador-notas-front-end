import http from "@/http-commons";

export const GradeManagmentService = {

    /**
     * Lista los estados de aprobación de notas de los catedráticos
     * @param {number} parcial_id Ocupa el id del parcial para poder acceder a la información
     * @returns Promise que debe de ser accedido con el .data
     */
    getTeacherList(parcial_id){
        return http.get(`/schedule/parcial/${parcial_id}`);
    }    
}

export const TeacherManagmentService = {

    /**
     * Listado de todos los catedráticos
     * @returns Promise que debe de ser accedido con el .data
     */
    getTeacherList(){
        return http.get('/teachers')
    },

    /**
     * Crea un registro de catedrático en la base de datos
     * @param {String} teacher_name Nombre del catedrático
     * @param {String} teacher_email (optional) Correo electrónico (sin el dominio "@ujcv.edu.hn")
     * @param {[number]} teacher_careers Listado de career_id las cuales el catedrático pertenece
     */
    createTeacher(teacher_name, teacher_email = '', teacher_careers = []) {
        const body = {
            teacher_name: teacher_name,
        };
        teacher_careers? body.teacher_careers = teacher_careers : null;
        teacher_email? body.teacher_email = teacher_email.concat("@ujcv.edu.hn") : null;

        console.log("Form submitted:", body);

        if(teacher_careers){
            console.log("Career List is empty");
        }else{
            console.log("Career list: ", teacher_careers)
        }

        return http.post('/teachers', body); 
    }

}

export const CareerManagmentService = {

    /**
     * Listado de todas las carreras existentes en la base de datos
     * @returns Promise que debe de ser accedido con el .data
     */
    getCareerList(){
        return http.get('/careers')
    }
}

export const ClassManagmentService = {

    /**
     * 
     * Listado de todas las clases existentes en la base de datos
     * @returns Promise que debe de ser accedido con el .data
     */
    getClassesList(){
        return http.get('/classes')
    },

    /**
     * Crea un registro de clase en la base de datos
     * @param {String} class_code Código de la clase
     * @param {String} class_name Nombre de la clase
     */
    createClass(class_code, class_name) {
        return http.post('/classes', {
            class_code: class_code,
            class_name: class_name
        }); 
    }
}

