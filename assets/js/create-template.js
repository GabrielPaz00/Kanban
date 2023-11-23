import { moveNext, movePrev } from './change-card.js';

/**
 * Crea una nueva plantilla para un tablero Kanban.
 * @param {number} i - El índice de la columna donde se creará la plantilla.
 * @param {Array} tableArray - El array que contiene las columnas del tablero Kanban.
 * @param {Array} rows - El array que representa las filas del tablero Kanban.
 * @returns {Object} - Objeto con los elementos de la plantilla creada.
 */
export const createNewTemplate = (i, tableArray, rows) => {
  // crear nuevo td
  const tdTask = document.createElement('td');
  tdTask.setAttribute('data-column', '1');

  const tdToDo = document.createElement('td');
  tdToDo.setAttribute('data-column', '2');

  const tdDoing = document.createElement('td');
  tdDoing.setAttribute('data-column', '3');

  const tdDone = document.createElement('td');
  tdDone.setAttribute('data-column', '4');

  const columns = [tdTask, tdToDo, tdDoing, tdDone];

  // crear nueva tr
  const createNewLine = (bodyTable) => {
    const row = bodyTable.childElementCount + 1;
    const tr = bodyTable.appendChild(document.createElement('tr'));
    tr.classList.add('table__row');
    tr.setAttribute('data-row', row);
    return tr;
  };

  /**
   * Representa un nodo de una lista doblemente enlazada.
   * @class
   */
  class Node {
    constructor(value) {
      this.val = value;
      this.next = null;
      this.prev = null;
    }
  }
  /**
   * Representa una lista doblemente enlazada.
   * @class
   */
  class List {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    /**
     * Imprime los valores de los nodos de la lista enlazada.
     * @returns {string} - La representación en cadena de los valores de los nodos.
     */
    print() {
      let current = this.tail;
      let result = '';
      while (current) {
        result += current.val + '<->';
        current = current.next;
      }
      return (result += 'X');
    }
    /**
     * Muestra los valores de la lista enlazada en la consola.
     */
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
    /**
     * Agrega un nuevo nodo con el valor dado al inicio de la lista enlazada.
     * @param {HTMLElement} value - El valor que se agregará al inicio de la lista enlazada.
     * @returns {LinkedList} - La lista enlazada actualizada.
     */
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

  // guardar td en el contenedor newcard
  let newCardContainer = columns[i];
  const bodyTable = document.querySelector('[data-tbody]');

  // crear un contenedor de div para la tarjeta
  const newCard = document.createElement('div');
  newCard.classList.add('table__card');
  newCard.setAttribute('data-card', '');
  newCardContainer.appendChild(newCard);

  // crear elementos h2 y p
  // agregar clase a h2 y p
  const title = document.createElement('h2');
  const description = document.createElement('p');
  title.classList.add('table__card__title');
  description.classList.add('table__card__description');

  const lastTr = bodyTable.lastChild;
  const trElements = lastTr.childNodes;

  const isEmptyTable = bodyTable.childElementCount === 0;

  /**
   * Comprueba si existe una tarjeta en una columna específica de una tabla.
   * @param {HTMLCollection} trElements - Los elementos <tr> de la tabla.
   * @param {HTMLElement} newCardContainer - El contenedor de la nueva tarjeta.
   * @returns {boolean} - Devuelve true si hay una tarjeta en la columna especificada, de lo contrario devuelve false.
   */
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

  /**
   * Verifica si existen elementos <td> en una lista de elementos <tr>.
   * @param {Array} trElements - La lista de elementos <tr>.
   * @param {HTMLElement} newCardContainer - El contenedor del nuevo elemento.
   * @returns {boolean} - Devuelve true si existen elementos <td>, de lo contrario devuelve false.
   */
  const hasTd = trElements.length
    ? checkTd(trElements, newCardContainer)
    : false;

  /**
   * La variable currentLine representa la línea actual que se va a crear en la tabla.
   * Si la tabla está vacía o ya tiene celdas, se crea una nueva línea.
   * De lo contrario, se utiliza la última fila existente.
   *
   * @constant {HTMLElement} currentLine - La línea actual de la tabla.
   */
  const currentLine = isEmptyTable || hasTd ? createNewLine(bodyTable) : lastTr;

  // Evalua si la fila actual es una nueva fila.
  if (currentLine != lastTr) {
    // Se crea un nueva lista.
    const list = new List();
    // Se agregan todas las columnas a la lista.
    // Cada columna se inserta en un nuevo nodo.
    for (let i = 0; i < 4; i++) {
      list.addToHead(columns[i]);
    }
    /* Se recorre la lista y se va insertando el valor de cada nodo 
    a la fila (cuurentLine)*/
    let current = list.tail;
    while (current) {
      currentLine.appendChild(current.val);
      current = current.next;
    }
    /* Se agrega al final del array que representa las filas del tablero Kanban 
    la nueva lista. */
    rows.push(list);
  }
  // Si la fila actual no es una nueva fila.
  else {
    /**
     * Comprueba las filas en busca de una posición disponible para una nueva tarjeta.
     *
     * @param {Array} rows - Las filas de la tabla Kanban.
     * @param {HTMLElement} newCardContainer - El contenedor de la nueva tarjeta.
     * @returns {number} - El índice de la fila donde se puede colocar la nueva tarjeta.
     */
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
    /* Se guarda el índice de la fila donde se puede colocar la nueva tarjeta
    en la variable n. */
    let n = checkRows(rows, newCardContainer);
    /**
     * @constant {LinkedList} currentList - Representa la lista actual en el índice n.
     */
    const currentList = rows[n];
    /**
     * Verifica si el elemento td está vacío.
     *
     * @param {Array} trElements - Los elementos tr a verificar.
     * @param {HTMLElement} newCardContainer - El contenedor del nuevo elemento de tarjeta.
     * @returns {boolean} - Devuelve true si el elemento td está vacío, de lo contrario devuelve false.
     */
    const tdEmpty = checkTd(trElements, newCardContainer);
    if (!tdEmpty) {
      /**
       * Se recorrela lista y se valida los dataset para
       * evaluar si el elemnto debe ser insertado en ese nodo.
       * Si los dataset son iguales, el elemento se inserta en el nodo correspondiente.
       */
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
  // agregar elementos h2 y p a la tarjeta
  newCard.appendChild(title);
  newCard.appendChild(description);

  // crear contenedor de botones
  // insertar contenedor de botones en tr
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('table__card__btn-container');
  btnContainer.setAttribute('data-btn-container', '');
  newCard.appendChild(btnContainer);

  // crear botones
  const btnNext = document.createElement('button');
  const btnPrev = document.createElement('button');
  // insertar botones en el contenedor
  btnContainer.appendChild(btnPrev);
  btnContainer.appendChild(btnNext);
  // agregar clase a los botones
  btnNext.classList.add('table__card__btn');
  btnPrev.classList.add('table__card__btn');
  // agregar atributos a los botones
  btnNext.setAttribute('data-btn-next', '');
  btnNext.setAttribute('type', 'button');
  btnPrev.setAttribute('data-btn-prev', '');
  btnPrev.setAttribute('type', 'button');
  // agregar contenido a los botones
  btnNext.textContent = '>';
  btnPrev.textContent = '<';
  // agregar event listeners a los botones
  btnNext.addEventListener('click', (event) =>
    moveNext(event, tableArray, rows)
  );
  btnPrev.addEventListener('click', (event) =>
    movePrev(event, tableArray, rows)
  );

  return { currentLine, title, description, btnNext, btnPrev, newCard };
};
