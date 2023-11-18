import { createNewTemplate } from './create-template.js';

export function moveNext(event, tableArray, rows) {
  console.clear();
  let container = event.target.parentElement.parentElement;

  let tdNum = container.parentElement.dataset.column - 1;
  let rowNum = container.parentElement.parentElement.dataset.row - 1;

  let currentList = rows[rowNum];
  let currentNode;
  let nextNode;
  switch (tdNum) {
    case 0:
      currentNode = currentList.tail;
      break;
    case 1:
      currentNode = currentList.tail.next;
      break;
    case 2:
      currentNode = currentList.head.prev;
      break;
  }
  nextNode = currentNode.next;
  //containers current card
  const titleCont = container.firstChild;
  const descriptionCont = titleCont.nextSibling;

  //create new card
  const task = {
    title: `${titleCont.textContent}`,
    about: `${descriptionCont.textContent}`,
  };
  const { title, description, newCard } = createNewTemplate(
    tdNum + 1,
    tableArray,
    rows
  );
  title.textContent = task.title;
  description.textContent = task.about;

  const currentColumn = tableArray[tdNum];
  const nextColumn = tableArray[tdNum + 1];
  const curreValueArray = tableArray[tdNum][rowNum];

  if (nextNode.val.firstChild == null) {
    //
    nextNode.val.appendChild(newCard);

    nextColumn[rowNum] = curreValueArray;
    currentColumn[rowNum] = null;

    //
  } else {
    if (nextColumn[rowNum] == null) {
      nextColumn[rowNum] = curreValueArray;
      currentColumn[rowNum] = null;
    } else {
      nextColumn.forEach((element, index) => {
        if (element == null) {
          nextColumn[index] = curreValueArray;
        }
        if (element != null && index == nextColumn.length - 1) {
          nextColumn.push(curreValueArray);
        }
      });
      tableArray[tdNum][rowNum] = null;
    }
  }
  currentNode.val.innerHTML = null;

  //Show information in console
  console.log(tableArray);

  rows.forEach((row, index) => {
    console.log(`Lista ${index + 1} : `);
    row.showList();
  });
}
export function movePrev(event, tableArray, rows) {
  console.clear();
  let container = event.target.parentElement.parentElement;

  let tdNum = container.parentElement.dataset.column - 1;
  let rowNum = container.parentElement.parentElement.dataset.row - 1;

  let currentList = rows[rowNum];
  let currentNode;
  let prevNode;
  switch (tdNum) {
    case 1:
      currentNode = currentList.tail.next;
      break;
    case 2:
      currentNode = currentList.head.prev;
      break;
    case 3:
      currentNode = currentList.head;
      break;
  }
  prevNode = currentNode.prev;
  const titleCont = container.firstChild;
  const descriptionCont = titleCont.nextSibling;

  //new card
  const task = {
    title: `${titleCont.textContent}`,
    about: `${descriptionCont.textContent}`,
  };
  const { title, description, newCard } = createNewTemplate(
    tdNum - 1,
    tableArray,
    rows
  );
  title.textContent = task.title;
  description.textContent = task.about;

  const currentColumn = tableArray[tdNum];
  const prevColumn = tableArray[tdNum - 1];
  const curreValueArray = tableArray[tdNum][rowNum];

  if (prevNode.val.firstChild == null) {
    //
    prevNode.val.appendChild(newCard);

    prevColumn[rowNum] = curreValueArray;
    currentColumn[rowNum] = null;

    //
  } else {
    if (prevColumn[rowNum] == null) {
      prevColumn[rowNum] = curreValueArray;
      currentColumn[rowNum] = null;
    } else {
      prevColumn.forEach((element, index) => {
        if (element == null) {
          prevColumn[index] = curreValueArray;
        }
        if (element != null && index == prevColumn.length - 1) {
          prevColumn.push(curreValueArray);
        }
      });
      tableArray[tdNum][rowNum] = null;
    }
  }
  currentNode.val.innerHTML = null;

  //Show information in console
  console.log(tableArray);

  rows.forEach((row, index) => {
    console.log(`Lista ${index + 1} : `);
    row.showList();
  });
}
