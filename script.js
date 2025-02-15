const fileInput = document.getElementById('file-input');
const imageUploadDiv = document.getElementById('image-upload');
const placeholderImg = document.getElementById('placeholder-img');
const deleteBtn = document.querySelector(".delete");
const changeBtn = document.querySelector(".change");
const buttonsContainer = document.querySelector(".button-div");
const dragText = document.querySelector(".dragText");
const generate = document.querySelector(".generate");
const formContainer = document.querySelector(".form");
const submittedForm = document.querySelector(".submitted-form");

const usernameSpan = document.querySelector(".username-span");
const emailSpan = document.querySelector(".email-span");
const fillerImg = document.querySelector(".fillerImg");
const firstlastname = document.querySelector(".first-last-name");
const Username = document.querySelector(".Username");
const fullNameInput = document.querySelector(".fullNameInput");
const emailInput = document.querySelector(".emailInput");
const GitHub = document.querySelector(".GitHub");

let uploadedFile = null; 

imageUploadDiv.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  handleFile(event.target.files[0]);
});

imageUploadDiv.addEventListener('dragover', (event) => {
  event.preventDefault();
  imageUploadDiv.classList.add('dragging');
});

imageUploadDiv.addEventListener('dragleave', () => {
  imageUploadDiv.classList.remove('dragging');
});

imageUploadDiv.addEventListener('drop', (event) => {
  event.preventDefault();
  imageUploadDiv.classList.remove('dragging');
  const file = event.dataTransfer.files[0];
  if (file) {
    handleFile(file);
  }
});

function handleFile(file) {
  if (file.size <= 500 * 1024) { 
    const reader = new FileReader();
    reader.onload = function (e) {
      placeholderImg.src = e.target.result;
      uploadedFile = e.target.result; 

      buttonsContainer.style.display = 'block';
      buttonsContainer.style.marginTop = '10px';
      dragText.style.display = 'none';
    };
    reader.readAsDataURL(file);
  } else {
    alert('File is too large. Please upload an image up to 500KB.');
  }
}

deleteBtn.addEventListener('click', () => {
  placeholderImg.src = 'assets/images/icon-upload.svg'; 
  buttonsContainer.style.display = 'none'; 
  dragText.style.display = 'block';
  uploadedFile = null; 
});

changeBtn.addEventListener('click', () => {
  fileInput.click();
});

formContainer.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const requiredFields = document.querySelectorAll('[required]');
  let allFilled = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      allFilled = false;
      field.style.border = '2px solid red';
    } else {
      field.style.border = '';
    }
  });

  if (!allFilled) {
    alert('Please fill in all required fields.');
  } else {
    formContainer.style.display = "none";
    submittedForm.style.display = "block";

    if (uploadedFile) {
      fillerImg.src = uploadedFile;
    }
    
    usernameSpan.textContent = fullNameInput.value;
    emailSpan.textContent = emailInput.value;
    firstlastname.textContent = fullNameInput.value;
    Username.textContent = GitHub.value;
  }
});
