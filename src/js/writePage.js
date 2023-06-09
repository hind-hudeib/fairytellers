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


const toggleBtn = document.getElementById('toggle-btn');
const hiddenSection = document.getElementById('hidden-section');

toggleBtn.addEventListener('click', function () {
  hiddenSection.style.visibility = 'visible';
});

function readURL(input) {
  if (input.files && input.files[0]) {

    let reader = new FileReader();

    reader.onload = function (e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');
});


// -----------------------------------------------------

