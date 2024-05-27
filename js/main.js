let websiteName = document.getElementById("name");
let urlInput = document.getElementById("url");
let addBtn = document.getElementById("add");
let updateBtn = document.getElementById("update");
let allBookMarks = [];
let indexUpdate = 0;
let regUrl = /^https?:\/\/\S+$/;
let regName = /^.{3,}$/;
if (localStorage.getItem("allBookMarks") != null) {
  allBookMarks = JSON.parse(localStorage.getItem("allBookMarks"));
  display();
}

function checkInputsFilled() {
  let isNameValid = regName.test(websiteName.value.trim());
  let isUrlValid = regUrl.test(urlInput.value.trim());
  addBtn.disabled = !(isNameValid && isUrlValid);

  if (addBtn.disabled) {
    addBtn.classList.replace("remove", "add");
  } else {
    addBtn.classList.replace("add", "remove");
  }
}

function bookNameValidation() {
  if (regName.test(websiteName.value.trim())) {
    websiteName.classList.remove("is-invalid");
    websiteName.classList.add("is-valid");
  } else {
    websiteName.classList.add("is-invalid");
  }
}
function urlValidation() {
  if (regUrl.test(urlInput.value.trim())) {
    urlInput.classList.remove("is-invalid");
    urlInput.classList.add("is-valid");
  } else {
    urlInput.classList.add("is-invalid");
  }
}
function addBookMark() {
  let product = {
    name: websiteName.value,
    url: urlInput.value,
  };
  allBookMarks.push(product);
  localStorage.setItem("allBookMarks", JSON.stringify(allBookMarks));
  display();
  clearInput();
  addBtn.disabled = true;
  addBtn.classList.replace("remove", "add");
}

function display() {
  let cartona = "";
  for (let i = 0; i < allBookMarks.length; i++) {
    cartona += `<tr>

    <td>${i + 1}</td>
    <td class=" text-capitalize">${allBookMarks[i].name}</td>
    <td>
    <a href='${
      allBookMarks[i].url
    }' class="btn-visit" target="_blank"><i class="fa-solid fa-link pe-2"></i>Visit</a>

    </td>
    <td>
    <button class="btn btn-update" onclick="formUpdate(${i})"><i class="fa-regular fa-pen-to-square pe-2"></i>Update</button>

    </td>
    <td>
    <button class="btn btn-danger" onclick="deleteBookMark(${i})"><i class="fa-regular fa-trash-can pe-2"></i>Delete</button>
    </td>
  </tr>
  
`;
  }
  document.getElementById("demo").innerHTML = cartona;
}

function clearInput() {
  websiteName.value = "";
  urlInput.value = "";
  websiteName.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
}

function deleteBookMark(index) {
  allBookMarks.splice(index, 1);
  localStorage.setItem("allBookMarks", JSON.stringify(allBookMarks));
  display();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  clearInput();
}

function formUpdate(index) {
  indexUpdate = index;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  websiteName.value = allBookMarks[index].name;
  urlInput.value = allBookMarks[index].url;
}

function updateBookMark(indexUpdate) {
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  allBookMarks[indexUpdate].name = websiteName.value;
  allBookMarks[indexUpdate].url = urlInput.value;
  localStorage.setItem("allBookMarks", JSON.stringify(allBookMarks));
  clearInput();
  display();
  addBtn.disabled = true;
  addBtn.classList.replace("remove", "add");
}
