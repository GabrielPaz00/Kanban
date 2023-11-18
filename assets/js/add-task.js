import { closeModal } from './modal.js';
import { createNewTemplate } from './create-template.js';
import { moveNext, movePrev } from './change-card.js';

/**
 * Adds a new task to the taskArray and updates the tableArray and rows.
 *
 * @param {Array} taskArray - The array of tasks.
 * @param {Array} tableArray - The array of table elements.
 * @param {Array} rows - The array of row elements.
 */
function addNewTask(taskArray, tableArray, rows) {
  const titleTaskInput = document.querySelector('[data-input-title]');
  const descriptionInput = document.querySelector('[data-textarea]');

  if (titleTaskInput.validity.valid && descriptionInput.validity.valid) {
    //add new element to task array
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
    //close modal
    closeModal();
    //get all buttons
    const nextBtns = document.querySelectorAll('[data-btn-next]');
    const prevBtns = document.querySelectorAll('[data-btn-prev');
    //get new buttons
    const newNextBtn = nextBtns[nextBtns.length - 1];
    const newPrevBtn = prevBtns[prevBtns.length - 1];
    //add event listeners to new buttons
    newNextBtn.addEventListener('click', (event) =>
      moveNext(event, tableArray, rows)
    );
    newPrevBtn.addEventListener('click', (event) =>
      movePrev(event, tableArray, rows)
    );
  } else {
    titleTaskInput.classList.add('input--error');
    descriptionInput.classList.add('input--error');
  }
  console.log(tableArray);

  rows.forEach((row, index) => {
    console.log(`Lista ${index + 1} : `);
    row.showList();
  });
}
export { addNewTask };
