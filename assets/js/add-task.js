import { closeModal } from './modal.js';
import { createNewTemplate } from './create-template.js';
import { moveNext, movePrev } from './change-card.js';

/**
 * Agrega una nueva tarea al array de tareas y actualiza el array de tablas y filas.
 *
 * @param {Array} taskArray - El array de tareas.
 * @param {Array} tableArray - El array que contiene las columnas del tablero Kanban.
 * @param {Array} rows - El array que representa las filas del tablero Kanban.
 */
function addNewTask(taskArray, tableArray, rows) {
  const titleTaskInput = document.querySelector('[data-input-title]');
  const descriptionInput = document.querySelector('[data-textarea]');

  //Evalúa si ambos campos son validos (no están vacíos).
  if (titleTaskInput.validity.valid && descriptionInput.validity.valid) {
    /** Guarda la información dada por el usuario.
     *
     * @constant {Object} task - Objeto que contiene
     * el titulo y la descripción de la nueva tarea.
     */
    const task = {
      title: `${titleTaskInput.value}`,
      about: `${descriptionInput.value}`,
    };
    taskArray.forEach((element, index) => {
      if (element == null) {
        taskArray[index] = task;
      }
      if (element != null && index == taskArray.length - 1) {
        taskArray.push(task);
      }
    });
    const { title, description } = createNewTemplate(0, tableArray, rows);
    title.textContent = titleTaskInput.value;
    description.textContent = descriptionInput.value;

    // Cerrar el modal
    closeModal();

    /** Selecciona todos los botones y guardarlos.
     * @constant {Array} nextBtns - Array que contiene todos los botones Next.
     * @constant {Array} prevBtns - Array que contiene todos los botones Prev.
     */
    const nextBtns = document.querySelectorAll('[data-btn-next]');
    const prevBtns = document.querySelectorAll('[data-btn-prev');
    // Obtiene los nuevos botones (últimos botones del array).
    const newNextBtn = nextBtns[nextBtns.length - 1];
    const newPrevBtn = prevBtns[prevBtns.length - 1];
    // Agrega event listeners a los nuevos botones
    newNextBtn.addEventListener('click', (event) =>
      moveNext(event, tableArray, rows)
    );
    newPrevBtn.addEventListener('click', (event) =>
      movePrev(event, tableArray, rows)
    );
  }
  // Si ambos campos no son validos cambia el color del input.
  else {
    titleTaskInput.classList.add('input--error');
    descriptionInput.classList.add('input--error');
  }
  // Limpia la consola.
  console.clear();

  // Muestra el array de la tabla.
  console.log(tableArray);

  // Muestra todas las listas doblemente enlazadas.
  rows.forEach((row, index) => {
    console.log(`Lista ${index + 1} : `);
    row.showList();
  });
}
export { addNewTask };
