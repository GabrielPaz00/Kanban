import { moveNext, movePrev } from './change-card.js';

/**
 * Creates a new template for a Kanban board.
 *
 * @param {number} i - The index of the column where the template will be created.
 * @param {Array} tableArray - An array representing the Kanban board table.
 * @param {Array} rows - An array containing the rows of the Kanban board.
 * @returns {Object} - An object containing the elements of the newly created template.
 */
export const createNewTemplate = (i, tableArray, rows) => {
  //create new td
  const tdTask = document.createElement('td');
  tdTask.setAttribute('data-column', '1');

  const tdToDo = document.createElement('td');
  tdToDo.setAttribute('data-column', '2');

  const tdDoing = document.createElement('td');
  tdDoing.setAttribute('data-column', '3');

  const tdDone = document.createElement('td');
  tdDone.setAttribute('data-column', '4');

  const columns = [tdTask, tdToDo, tdDoing, tdDone];

  //create new tr
  const createNewLine = (bodyTable) => {
    const row = bodyTable.childElementCount + 1;
    const tr = bodyTable.appendChild(document.createElement('tr'));
    tr.classList.add('table__row');
    tr.setAttribute('data-row', row);
    return tr;
  };

  class Node {
    constructor(value) {
      this.val = value;
      this.next = null;
      this.prev = null;
    }
  }
  class List {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    print() {
      let current = this.tail;
      let result = '';
      while (current) {
        result += current.val + '<->';
        current = current.next;
      }
      return (result += 'X');
    }
    showList() {
      console.log(
        this.tail.val.firstChild,
        '<->',
        this.tail.next.val.firstChild,
        '<->',
        this.head.prev.val.firstChild,
        '<->',
        this.head.val.firstChild
      );
    }
    addToTail(value) {
      const newNode = new Node(value);
      let isEmpty = this.length == 0 ? true : false;
      if (!isEmpty) {
        let lastItem = this.tail;
        this.tail.prev = newNode;
        this.tail = newNode;
        this.tail.next = lastItem;
      } else {
        this.head = newNode;
        this.tail = newNode;
      }
      this.length++;
      return this;
    }
    addToHead(value) {
      const newNode = new Node(value);
      let isEmpty = this.length == 0 ? true : false;
      if (!isEmpty) {
        let lastItem = this.head;
        this.head.next = newNode;
        this.head = newNode;
        this.head.prev = lastItem;
      } else {
        this.tail = newNode;
        this.head = newNode;
      }
      this.length++;
      return this;
    }
  }

  //save td in newcard container
  let newCardContainer = columns[i];
  const bodyTable = document.querySelector('[data-tbody]');

  //create a div card container
  const newCard = document.createElement('div');
  newCard.classList.add('table__card');
  newCard.setAttribute('data-card', '');
  newCardContainer.appendChild(newCard);

  //create h2 and p elements
  //add class to h2 and p
  const title = document.createElement('h2');
  const description = document.createElement('p');
  title.classList.add('table__card__title');
  description.classList.add('table__card__description');

  const lastTr = bodyTable.lastChild;
  const trElements = lastTr.childNodes;

  const isEmptyTable = bodyTable.childElementCount === 0;

  const checkTd = (trElements, newCardContainer) => {
    let i = 0;
    let currentTd = trElements[i];
    let dataset = newCardContainer.dataset.column;
    while (i < 4) {
      currentTd = trElements[i];
      let column = currentTd.dataset.column;

      if (column == dataset && currentTd.hasChildNodes()) {
        return true;
      } else if (i == 3 && column != dataset && !currentTd.hasChildNodes()) {
        return false;
      }
      i++;
    }
  };
  const hasTd = trElements.length
    ? checkTd(trElements, newCardContainer)
    : false;

  const currentLine = isEmptyTable || hasTd ? createNewLine(bodyTable) : lastTr;
  if (currentLine != lastTr) {
    const list = new List();
    for (let i = 0; i < 4; i++) {
      list.addToHead(columns[i]);
    } // add the fourth column to the list

    let current = list.tail;
    while (current) {
      currentLine.appendChild(current.val);
      current = current.next;
    }
    rows.push(list);
  } else {
    const checkRows = (rows, newCardContainer) => {
      const columnDS = newCardContainer.dataset.column;
      for (let i = 0; i < rows.length; i++) {
        let current = rows[i].tail;

        let j = 0;
        while (j < 4) {
          let tdIsEmpty = current.val.childElementCount == 0;
          let currentDS = current.val.dataset.column;
          if (columnDS == currentDS && tdIsEmpty) {
            return i;
          }
          current = current.next;
          j++;
        }
      }
      return rows.length - 1;
    };
    let n = checkRows(rows, newCardContainer);
    let currentList = rows[n];
    const tdEmpty = checkTd(trElements, newCardContainer);
    if (!tdEmpty) {
      let current = currentList.tail;

      const columnDS = columns[i].dataset.column;
      while (current) {
        let currentNodeDS = current.val.dataset.column;
        if (currentNodeDS == columnDS) {
          break;
        }
        current = current.next;
      }
      newCardContainer = current.val;
      newCardContainer.appendChild(newCard);
    }
  }
  //add h2 and p elements to card
  newCard.appendChild(title);
  newCard.appendChild(description);

  //create container buttons
  //insert container buttons in tr
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('table__card__btn-container');
  btnContainer.setAttribute('data-btn-container', '');
  newCard.appendChild(btnContainer);

  //create buttons
  const btnNext = document.createElement('button');
  const btnPrev = document.createElement('button');
  //insert buttons in container
  btnContainer.appendChild(btnPrev);
  btnContainer.appendChild(btnNext);
  //add class to buttons
  btnNext.classList.add('table__card__btn');
  btnPrev.classList.add('table__card__btn');
  //add attributes to buttons
  btnNext.setAttribute('data-btn-next', '');
  btnNext.setAttribute('type', 'button');
  btnPrev.setAttribute('data-btn-prev', '');
  btnPrev.setAttribute('type', 'button');
  //add content to buttons
  btnNext.textContent = '>';
  btnPrev.textContent = '<';
  //add event liseners to buttons
  btnNext.addEventListener('click', (event) =>
    moveNext(event, tableArray, rows)
  );
  btnPrev.addEventListener('click', (event) =>
    movePrev(event, tableArray, rows)
  );

  return { currentLine, title, description, btnNext, btnPrev, newCard };
};
