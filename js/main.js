import {Tareas} from '../classes/Task.js';

class App {
    tareas = [];
    form = document.querySelector('#form1');
    output = document.querySelector('#output');
    button = document.querySelector('#btn-submit');
    filtropriority = document.querySelector('#filtro-prioridad')
    searchTask = document.querySelector('#filter')
    
    

    constructor() {
        this.form.addEventListener('submit', (e)=> this.handleSubmit(e));
        this.createFirstTareas();      
        this.filtropriority.addEventListener('change', (e) => this.filter(e));
        this.searchTask.addEventListener('keydown', (e) => this.buscarTareas(e));

    }   

        createFirstTareas() {
            
            const jsonTareas = localStorage.getItem('TAREAS');  
            if(!jsonTareas){
              return;
            }
        
            const parsedTareas = JSON.parse(jsonTareas);
            this.tareas = parsedTareas;
            this.secondprint()
          }
          
          updateLocalStorage(){
            const tareasString = JSON.stringify(this.tareas);
            localStorage.setItem('TAREAS', tareasString);
          }

          handleSubmit(e){
            e.preventDefault();
            const { tarea, priority } = this.getFormData();
            if(!tarea){
              return;
            }
              this.addTarea(tarea, priority);
            this.form.reset();
        }
        //datos del form
        getFormData(){
            const tarea = this.form.añadirTarea.value;
            const priority = this.form.prioridad.value;
            return { tarea, priority };
          }
        //añadimos tarea al array y local storage
          addTarea(tarea, priority){
            const newTarea = new Tareas(tarea, priority);
        
            this.tareas.push(newTarea);
        
            this.updateLocalStorage();
            const li = this.createLi(newTarea.id, tarea, priority);
        
             
          }
          //podemos eliminar tareas
          deleteTarea(id){  
            const sure = confirm('¿Seguro que has realizado la tarea?');
            if(!sure) {
              return;
            }
    
        
        
            this.tareas = this.tareas.filter((tarea) => {
              return tarea.id !== id;
            });
            this.output.innerHTML = '';
            this.tareas.forEach( ({id, tarea, priority}) => this.createLi(id, tarea, priority));
        
            this.updateLocalStorage();

            
          }

          //creamos listado de tareas mostradas con switch de color segun prioridad
          createLi(id, tarea, priority){

            const li = document.createElement('li');

          switch(priority){
              case'Urgente': li.className ='list-group-item list-group-item-danger'
              break;
              case'Intermedia': li.className = 'list-group-item list-group-item-warning';
              break;
              case 'Normal': li.className = 'list-group-item list-group-item-primary';
              break;
              default : 
              break;
            }
            li.innerHTML = tarea;
          
            const trashIcon = document.createElement('i'); 

            trashIcon.className = 'bi bi-trash text-danger';
                    
            trashIcon.addEventListener('click', ()=> this.deleteTarea(id));
            
            this.output.append(li);
            this.output.append(trashIcon);
            this.updateLocalStorage();
        
          }

          filter(e){
            const filterTasks = this.filtropriority.value
            const tareasFiltradas = this.tareas.filter((tarea) => tarea.priority === filterTasks);
            this.thisprint(tareasFiltradas);
           
          }

          thisprint(buscarTareas) {

            if(!buscarTareas) { };
        
            this.output.innerHTML= '';
            buscarTareas.forEach(({id, tarea, priority}) => {
            const li = this.createLi(id, tarea, priority)
            
            });
          
          }
        
          secondprint(){
          
            this.output.innerHTML= '';
            this.tareas.forEach(({id, tarea, priority}) => {
            const li = this.createLi(id, tarea, priority)
            }); 
            
          }
        
          buscarTareas(e){
           
            const buscarTareas = this.tareas.filter((tarea) => tarea.tarea.includes(e.key));
            this.thisprint(buscarTareas);
        
            return buscarTareas;
          }


}


        
const app = new App();
