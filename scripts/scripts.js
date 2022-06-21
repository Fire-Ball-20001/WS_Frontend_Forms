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
  const front = document.getElementsByName("is_frontend")[0];
  const back = document.getElementsByName("is_backend")[0];
  const mob = document.getElementsByName("is_mobile")[0];
  const border = document.getElementById("border_checkboxes");

  if (!front.checked && !back.checked && !mob.checked) {
    border.classList.add("main__border--error");
    return false;
  } else {
    border.classList.remove("main__border--error");
    return true;
  }
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
