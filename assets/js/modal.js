/**
 * Muestra el modal.
 */
const showModal = () => {
  const modal = document.querySelector('[data-modal]');
  modal.classList.add('modal--show');
  modal.showModal();
};
/**
 * Cierra el modal y realiza las siguientes acciones:
 * - Cierra el modal.
 * - Limpia el valor del campo de entrada 'newTaskInput'.
 * - Limpia el valor del campo de entrada 'aboutInput'.
 */
const closeModal = () => {
  const modal = document.querySelector('[data-modal]');
  modal.classList.remove('modal--show');
  modal.close();
  const newTaskInput = document.querySelector('[data-input-title]');
  const aboutInput = document.querySelector('[data-textarea]');
  newTaskInput.value = '';
  aboutInput.value = '';
  newTaskInput.classList.remove('input--error');
  aboutInput.classList.remove('input--error');
};

export { showModal, closeModal };
