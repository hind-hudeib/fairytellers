const container = document.getElementById('input-fields-container');
const addButton = document.getElementById('add-input-field-button');
let count = 1;

addButton.addEventListener('click', () => {
  const newField = document.createElement('div');
  newField.classList.add('input-field');
  newField.innerHTML = `
    <input type="text" name="input-field-${count + 1}">
  `;
  container.appendChild(newField);
  count++;
});
