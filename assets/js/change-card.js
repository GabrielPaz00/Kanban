import { createNewTemplate } from './create-template.js';

/**
 * Mueve la tarjeta a la siguiente columna en el tablero Kanban.
 *
 * @param {Event} event - El objeto de evento desencadenado por la acción de mover.
 * @param {Array} tableArray - El array que contiene las columnas del tablero Kanban.
 * @param {Array} rows - El array que representa las filas del tablero Kanban.
 */
export const moveNext = (event, tableArray, rows) => {
  let container = event.target.parentElement.parentElement;
  /**
   * Se guarda el índice de la columna y la fila donde
   * se encuentra la tarea a mover.
   *
   * @var {int} tdNum - índice de la columna.
   * @var {int} rowNum - índice de la fila.
   */
  let tdNum = container.parentElement.dataset.column - 1;
  let rowNum = container.parentElement.parentElement.dataset.row - 1;
  /**
   * @constant {Array} currentList - Lista donde se encuentra la tarea a mover.
   *
   */
  const currentList = rows[rowNum];
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

  /** Guarda la información de la card que se desea mover una constante task.
   * @constant {Object} curreValueArray - Objeto que contiene
   * el titulo y la descripción de la tarea que se desea mover.
   * @constant {Object} task - Objeto que contiene
   * el titulo y la descripción de la nueva tarea.
   */
  const curreValueArray = tableArray[tdNum][rowNum];
  const task = curreValueArray;
  // Se Crea una nueva card en la siguiente columna del tablero.
  const { title, description, newCard } = createNewTemplate(
    tdNum + 1,
    tableArray,
    rows
  );
  title.textContent = task.title;
  description.textContent = task.about;

  /**
   *
   * @constant {Array} currentColumn - Array de la columna actual en donde se encuentra la tarea.
   * @constant {Array} nextColumn - Array de la columna destino de la tarea.
   */
  const currentColumn = tableArray[tdNum];
  const nextColumn = tableArray[tdNum + 1];

  // Se valida si el valor del siguente nodo es igual a null.
  if (nextNode.val.firstChild == null) {
    // Se le inserta la nueva card al valor del siguiente nodo.
    nextNode.val.appendChild(newCard);
    //Se actualizan los valores del Array del tablero.
    nextColumn[rowNum] = curreValueArray;
    currentColumn[rowNum] = null;
  }
  // Si el valor del siguente nodo no es igual a null.
  else {
    // Se evalua si en la siguiente posicion del array del tablero es igual a null.
    if (nextColumn[rowNum] == null) {
      //Se actualizan los valores del Array del tablero.
      nextColumn[rowNum] = curreValueArray;
      currentColumn[rowNum] = null;
    } else {
      // Recorre todo el array de la siguiente columna.
      nextColumn.forEach((element, index) => {
        /* Cuando el valor del elemento sea igaul a null, 
        este toma el valor del objeto de la tarea. */
        if (element == null) {
          nextColumn[index] = curreValueArray;
        }
        /* Si terminando de recorrer el array no se encontró ningun
        elemento que su valor sea igual a null, se inserta el objeto de la tarea 
        al final de el array. */
        if (element != null && index == nextColumn.length - 1) {
          nextColumn.push(curreValueArray);
        }
      });
      //Se actualizan los valores del Array del tablero.
      tableArray[tdNum][rowNum] = null;
    }
  }
  // Se elimina el contenedor de la tarea en HTML.
  currentNode.val.innerHTML = null;

  // Limpia la consola.
  console.clear();

  // Muestra el array de la tabla.
  console.log(tableArray);

  // Muestra todas las listas doblemente enlazadas.
  rows.forEach((row, index) => {
    console.log(`Lista ${index + 1} : `);
    row.showList();
  });
};

/**
 * Mueve la tarjeta a la columna anterior en el tablero Kanban.
 *
 * @param {Event} event - El objeto de evento desencadenado por la acción del usuario.
 * @param {Array} tableArray - El array que contiene las columnas y filas del tablero Kanban.
 * @param {Array} rows - El array que representa las filas del tablero Kanban.
 */
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
  /** Guarda la información de la card que se desea mover una constante task.
   * @constant {Object} curreValueArray - Objeto que contiene
   * el titulo y la descripción de la tarea que se desea mover.
   * @constant {Object} task - Objeto que contiene
   * el titulo y la descripción de la nueva tarea.
   */
  const curreValueArray = tableArray[tdNum][rowNum];
  const task = curreValueArray;
  const { title, description, newCard } = createNewTemplate(
    tdNum - 1,
    tableArray,
    rows
  );
  title.textContent = task.title;
  description.textContent = task.about;

  const currentColumn = tableArray[tdNum];
  const prevColumn = tableArray[tdNum - 1];

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

  // Mostrar información en la consola
  console.log(tableArray);

  rows.forEach((row, index) => {
    console.log(`Lista ${index + 1} : `);
    row.showList();
  });
}
