var productName = document.getElementById("productNameInput");
var productPrice = document.getElementById("productPriceInput");
var productCategory = document.getElementById("productCategoryInput");
var productDescription = document.getElementById("productDescInput");
var inputs = document.querySelectorAll(".form-control:not(input[type=search])");
var clearBtn = document.getElementById("clearForm");
var productsConatiner;
var currentindex = 0;

//  Check local Storage
(function () {
  //  if local Stoage contain data  will be returned in array
  if (localStorage.getItem("products") != null) {
    getLocal();
    displayProducts();
  } else productsConatiner = [];
})();

// set a New product on local storage
function setLocal() {
  localStorage.setItem("products", JSON.stringify(productsConatiner));
}

function getLocal() {
  productsConatiner = JSON.parse(localStorage.getItem("products"));
}
// Clear data form inputs
function clearForm() {
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
  inputs[3].value = "";
}
clearBtn.addEventListener("click", clearForm);
// dislay data in table
function displayProducts() {
  var container = ``;
  for (var i = 0; i < productsConatiner.length; i++) {
    container += ` <tr>
         <td>${i + 1}</td>
         <td>${productsConatiner[i].Name}</td>
         <td>${productsConatiner[i].Price}</td>
         <td>${productsConatiner[i].Category}</td>
         <td>${productsConatiner[i].Description}</td>
         <td>
             <div><i class="fa-regular fa-pen-to-square mx-2 text-warning" onclick="updateProduct(${i})" > </i>
                 <i class="fa-solid fa-trash-can mx-2 text-danger"onclick="deleteProduct(${i})"></i>
             </div></i>
         </td>


     </tr>`;
  }
  document.getElementById("tableData").innerHTML = container;
}
// delete product form array and local stoage and dispaly data after deleteing

function deleteProduct(index) {
  productsConatiner.splice(index, 1);
  setLocal();
  displayProducts();
}
// updating  data
function updateProduct(index) {
  currentindex = index;
  inputs[0].value = productsConatiner[index].Name;
  inputs[1].value = productsConatiner[index].Price;
  inputs[2].value = productsConatiner[index].Category;
  inputs[3].value = productsConatiner[index].Description;

  submitBtn.innerHTML = "Update";
}
function makeUpdate() {
  productsConatiner[currentindex].Name = inputs[0].value;
  productsConatiner[currentindex].Price = inputs[1].value;
  productsConatiner[currentindex].Category = inputs[2].value;
  productsConatiner[currentindex].Description = inputs[3].value;

  displayProducts();
  setLocal();
  clearForm();
  submitBtn.innerHTML = "Submit";
}

function search(term) {
  var container = ``;
  for (var i = 0; i < productsConatiner.length; i++) {
    if (
      productsConatiner[i].Name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      container += ` <tr>
                     <td>${i + 1}</td>
                     <td>${productsConatiner[i].Name}</td>
                     <td>${productsConatiner[i].Price}</td>
                     <td>${productsConatiner[i].Category}</td>
                     <td>${productsConatiner[i].Description}</td>
                     <td>
                         <div><i class="fa-regular fa-pen-to-square mx-2 text-warning" onclick="updateProduct(${i})" > </i>
                             <i class="fa-solid fa-trash-can mx-2 text-danger"onclick="deleteProduct(${i})"></i>
                         </div></i>
                     </td>
            
            
                 </tr>`;
    }
  }
  document.getElementById("tableData").innerHTML = container;
}

const mySwitch = document.getElementById("flexSwitchCheckChecked");
const inputContainer = document.getElementById("inputContainer");
const tableContaienr = document.getElementById("dataContainer");

// Add an event listener to detect changes in the switch state
mySwitch.addEventListener("change", function () {
  if (mySwitch.checked) {
    document.body.style.backgroundColor = "white";
    inputContainer.classList.replace("bg-dark", "bg-light");
    tableContaienr.classList.remove("table-dark");
  } else {
    // productName.style.cssText ='background-color: #000 ; color:fff !important ;'
    document.body.style.backgroundColor = "#2c3034";
    inputContainer.classList.replace("bg-light", "bg-dark");
    tableContaienr.classList.add("table-dark");
    // Perform actions for when the switch is OFF
  }
});

// Function to validate input based on a regex pattern
function validateInput(inputElement, regexPattern) {
  const inputValue = inputElement.value;
  const isValid = regexPattern.test(inputValue);

  if (isValid) {
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
  } else {
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
  }
}

// Define your regex patterns for validation
const namePattern = /^[a-zA-z]{3,}[\s\d0-9]*$/; // Only letters and spaces allowed
const pricePattern = /^[0-9]{3,}$/; // Numeric value with up to 2 decimal places
const categoryPattern = /^[a-zA-z]{3,}[a-zA-z\s\d0-9]*$/; // Only letters and spaces allowed
const descriptionPattern = /^[a-zA-z]{3,}[\s\d0-9a-zA-z]*$/;
const productNameError = document.getElementById('productNameError');
const productPriceError = document.getElementById('productPriceError');
const productCategoryError = document.getElementById('productCategoryError');
const productDescError = document.getElementById('productDescError');

const submitBtn = document.getElementById('submitBtn');

function validateInput(inputElement, regexPattern, errorElement) {
    const inputValue = inputElement.value;
    const isValid = regexPattern.test(inputValue);
    
    if (isValid) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        errorElement.classList.add('d-none');
    } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
        errorElement.classList.remove('d-none');
    }
    
    return isValid;
}

function validateAllInputs() {
    const isValidName = validateInput(productNameInput, namePattern, productNameError);
    const isValidPrice = validateInput(productPriceInput, pricePattern, productPriceError);
    const isValidCategory = validateInput(productCategoryInput, categoryPattern, productCategoryError);
    const isValidDescription = validateInput(productDescInput, descriptionPattern, productDescError);
    
    return isValidName && isValidPrice && isValidCategory && isValidDescription;
}

function addProduct() {
  var product = {
    Name: inputs[0].value,
    Price: inputs[1].value,
    Category: inputs[2].value,
    Description: inputs[3].value,
  };
  productsConatiner.push(product);
  setLocal();
  displayProducts();
  clearForm();
}



submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const isFormValid = validateAllInputs();
    
    if (isFormValid) {
        if (submitBtn.innerHTML === 'Update') {
            makeUpdate();
        } else if (submitBtn.innerHTML === 'Submit') {
            addProduct();
        }
    } else {
        // Handle validation errors
        console.log('Form is invalid!');
    }
});

// Add real-time validation on input change
productNameInput.addEventListener('input', function () {
    validateInput(productNameInput, namePattern, productNameError);
});

productPriceInput.addEventListener('input', function () {
    validateInput(productPriceInput, pricePattern, productPriceError);
});

productCategoryInput.addEventListener('input', function () {
    validateInput(productCategoryInput, categoryPattern, productCategoryError);
});

productDescInput.addEventListener('input', function () {
    validateInput(productDescInput, descriptionPattern, productDescError);
});
