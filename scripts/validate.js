const TEXT_PATTERN = /^[А-Яа-я]+$/;
const PHONE_PATTERN = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
const PHONE_TITLE = "8(xxx)xxx-xx-xx";
const VALIDATE_ERROR_MESSAGE = "error-validate-messages";

window.onload = () => {
  const inputs = Array.from(document.getElementsByTagName("input"));

  inputs.forEach((element) => {
    if (element.required) {
      if (element.name === "last_name" || element.name === "first_name") {
        element.pattern = TEXT_PATTERN.source;
        element.previousElementSibling.onmouseover = (mouse) => {
          textTooltip(mouse, element);
        };
      } else if (element.name === "date_birth") {
        element.oninput = validateDate;
        element.previousElementSibling.onmouseover = (mouse) => {
          dateTooltip(mouse, element);
        };
      } else if (element.name === "phone") {
        element.pattern = PHONE_PATTERN.source;
        element.placeholder = PHONE_TITLE;
        element.title = PHONE_TITLE;
        element.previousElementSibling.onmouseover = (mouse) => {
          phoneTooltip(mouse, element);
        };
      }
      const temp = element.parentElement.parentElement.firstElementChild;
      temp.textContent = `${temp.textContent}*`;
    }

    if (element.name === "direction") {
      element.onchange = validateChecboxes;
      element.parentElement.parentElement.previousElementSibling.onmouseover = (
        mouse
      ) => {
        naprTooltip(mouse);
      };
    }
  });

  document.getElementById("send_button").onclick = validate;

  const form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = getFormData(event.target);
    sendData(data);
    loadData();
  });

  loadPage();
  loadData();
};

function validate() {
  const err_text = document.getElementById("error");

  if (!validateChecboxes() || !validateDate()) {
    err_text.style.display = "block";
    return false;
  }

  err_text.style.display = "none";
}

function validateChecboxes() {
  const checkboxes = Array.from(
    document.getElementsByName("direction")
  );
  const border = document.getElementById("border_checkboxes");
  const isChecked = checkboxes.filter((ch) => ch.checked).length > 0;

  if (isChecked) {
    border.classList.remove("main-border--error");
    return true;
  }

  border.classList.add("main-border--error");
  return false;
}

function validateDate() {
  const date = this;

  if (date.value === "" || Date.parse(date.value) >= Date.now()) {
    date.classList.add("main__input--error");
    return false;
  } else {
    date.classList.remove("main__input--error");
    return true;
  }
}
