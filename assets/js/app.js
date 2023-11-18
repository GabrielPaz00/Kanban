import { showModal, closeModal } from './modal.js';
import { addNewTask } from './add-task.js';
import { createNewTemplate } from './create-template.js';

//modal buttons
//show modal
const btn = document.querySelector('[data-btn]');
btn.addEventListener('click', showModal);
//close modal
const closeBtn = document.querySelector('[data-btn-cancel]');
closeBtn.addEventListener('click', closeModal);

//table
const tableArray = new Array(4);

//task
const tasksArray = [{ title: 'Tarea 4', about: 'Hacer tarea 4' }];
tableArray[0] = tasksArray;

//to do

const toDoArray = [
  { title: 'Por hacer', about: 'hacer tarea 3 :)' },
  { title: 'Por hacer', about: 'hacer tarea 3' },
];
tableArray[1] = toDoArray;

//doing
const doingArray = [{ title: 'En proceso', about: 'hacer tarea 2' }];
tableArray[2] = doingArray;

//done
const doneArray = [{ title: 'Hecho', about: 'hacer tarea 1' }];
tableArray[3] = doneArray;

//DLL
let rows = [];

//show tasks
for (let i = 0; i < tableArray.length; i++) {
  tableArray[i].forEach((task) => {
    const { title, description } = createNewTemplate(i, tableArray, rows);
    title.textContent = task.title;
    description.textContent = task.about;
  });
}
//add task
const addBtn = document.querySelector('[data-btn-add]');
addBtn.addEventListener('click', () => {
  addNewTask(tasksArray, tableArray, rows);
});

//show info

console.log(tableArray);

//show list
rows.forEach((row, index) => {
  console.log(`Lista ${index + 1} : `);
  row.showList();
});
