class Tareas {
    id = Math.ceil(Math.random()*1000);
     
    constructor(tarea, priority) {
        this.tarea = tarea;
        this.priority = priority;
    }
}

export {Tareas};