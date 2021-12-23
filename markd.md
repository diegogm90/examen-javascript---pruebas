<div class="col-md-4 my-2">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Selecciona la prioridad</option>
                        <option value="1">Urgente</option>
                        <option value="2">Intermedia</option>
                        <option value="3">Normal</option>
                      </select>

                </div>



                constructor() {
        this.form.addEventListener('submit', (e)=> this.imprimirTarea(e))
    }

    imprimirTarea(e){
        e.preventDefault();
            const value = this.form.añadirTarea.value.trim();
            if(!value){
                return;
            }
            const li = document.createElement('li');
            li.innerHTML = this.form.añadirTarea.value;
            this.output.append(li);
            const newTarea = new Task(value);
            this.tareas.push(newTarea);
            console.log(app);
    }