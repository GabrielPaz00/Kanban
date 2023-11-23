import { showModal, closeModal } from './modal.js';
import { addNewTask } from './add-task.js';
import { createNewTemplate } from './create-template.js';

// Botones del modal

// Mostrar modal
const btn = document.querySelector('[data-btn]');
btn.addEventListener('click', showModal);
// Cerrar modal
const closeBtn = document.querySelector('[data-btn-cancel]');
closeBtn.addEventListener('click', closeModal);

// El array que contiene las columnas del tablero Kanban
const tableArray = new Array(4);

// Tareas
const tasksArray = [
  { title: 'Ejemplos', about: 'Buscar ejemplos de árboles y gráfos.' },
];
tableArray[0] = tasksArray;

// Por hacer
const toDoArray = [{ title: 'Gráfos', about: 'Investigar sobre los gráfos.' }];
tableArray[1] = toDoArray;

// En proceso
const doingArray = [
  { title: 'Árboles', about: 'Investigar sobre los árboles.' },
];
tableArray[2] = doingArray;

// Hecho
const doneArray = [
  { title: 'Portada', about: 'Realizar portada para el parcial 3.' },
];
tableArray[3] = doneArray;

// Array de filas (contiene listas doblemente enlazadas)
let rows = [];

// Mostrar tareas
for (let i = 0; i < tableArray.length; i++) {
  tableArray[i].forEach((task) => {
    const { title, description } = createNewTemplate(i, tableArray, rows);
    title.textContent = task.title;
    description.textContent = task.about;
  });
}

// Agregar tarea
const addBtn = document.querySelector('[data-btn-add]');
addBtn.addEventListener('click', () => {
  addNewTask(tasksArray, tableArray, rows);
});

// Mostrar información en consola.

// Muestra el array de la tabla.
console.log(tableArray);
// Muestra todas las listas doblemente enlazadas.
rows.forEach((row, index) => {
  console.log(`Lista ${index + 1} : `);
  row.showList();
});
