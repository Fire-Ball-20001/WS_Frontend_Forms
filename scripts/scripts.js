const TEXT_PATTERN = /^[А-Яа-я]+$/;
const PHONE_PATTERN = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
const PHONE_TITLE = "8(xxx)xxx-xx-xx";

window.onload = () => {
  const inputs = Array.from(document.getElementsByTagName("input"));
  const form = document.getElementById("form");

  inputs.forEach((element) => {
    if (element.required) {
      if (element.type === "text") {
        element.pattern = TEXT_PATTERN.source;
      } else if (element.type === "date") {
        element.oninput = validityDate;
      } else if (element.type === "tel") {
        element.pattern = PHONE_PATTERN.source;
        element.placeholder = PHONE_TITLE;
        element.title = PHONE_TITLE;
      }
    }

    if (element.type === "checkbox") {
      element.onchange = validityChecboxes;
    }
  });

  document.getElementById("send_button").onclick = validity;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);
    const data = getFormData(event.target);
    sendData(data);
    loadData();
  });

  loadPage();
  loadData();
};

function validity() {
  const err_text = document.getElementById("error");

  if (!validityChecboxes() || !validityDate()) {
    err_text.style.display = "block";
    return false;
  }

  err_text.style.display = "none";
}

function validityChecboxes() {
  const checkboxes = Array.from(document.getElementsByClassName("wrapper__checkbox"));
  const border = document.getElementById("border_checkboxes");

  for(const checkbox of checkboxes) {
    if (checkbox.checked) {
      border.classList.remove("main__border--error");
      return true;
    }
  }
  border.classList.add("main__border--error");
  return false;
}

function validityDate() {
  const date = document.getElementsByName("date_birth")[0];

  if (date.value === "" || Date.parse(date.value) >= Date.now()) {
    date.classList.add("main__input--error");
    return false;
  } else {
    date.classList.remove("main__input--error");
    return true;
  }
}
