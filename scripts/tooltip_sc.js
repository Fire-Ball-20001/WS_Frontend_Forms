function loadPage() {
  const all_tooltips = document.getElementsByClassName("tooltip-button-border");

  for (const element of all_tooltips) {
    element.onmouseout = () => {
      closeTooltip();
    };
  }
}

function createTooltip(data) {
  const base_tooltip = document.createElement("div");

  base_tooltip.classList.add("tooltip");
  base_tooltip.id = "tooltip";

  data.forEach((text) => {
    const text_node = document.createElement("p");

    text_node.textContent = text.value;
    if (text.isOk) {
      text_node.classList.add("tooltip__text--ok");
    } else {
      text_node.classList.add("tooltip__text--error");
    }
    base_tooltip.appendChild(text_node);
  });

  return base_tooltip;
}

function tooltipView(tooltip, is_view) {
  if (is_view) {
    document.body.appendChild(tooltip);
  } else {
    document.body.removeChild(tooltip);
  }
}

function closeTooltip() {
  const tooltip = document.getElementById("tooltip");

  if (tooltip) {
    tooltipView(tooltip, false);
  }
}

function textTooltip(mouse, input) {
  let tooltip;

  if (input.validity.valueMissing) {
    tooltip = createTooltip([createText("Необходимо значение", false)]);
  } else if (input.validity.patternMismatch) {
    tooltip = createTooltip([
      createText("Значение может содержать только русские буквы", false),
    ]);
  } else {
    tooltip = createTooltip([createText("Всё хорошо", true)]);
  }

  tooltip.style.top = mouse.clientY;
  tooltip.style.left = mouse.clientX;
  tooltipView(tooltip, true);
}

function dateTooltip(mouse, input) {
  const data_tooltip = [];

  if (input.value === "") {
    data_tooltip.push(createText("Необходимо значение", false));
  } else {
    data_tooltip.push(createText("Всё хорошо", true));
  }

  if (!validateDate()) {
    data_tooltip.push(createText("Дата должна быть прошлым", false));
  } else {
    data_tooltip.push(createText("Дата соответствует", true));
  }

  const tooltip = createTooltip(data_tooltip);

  tooltip.style.top = mouse.clientY;
  tooltip.style.left = mouse.clientX;
  tooltipView(tooltip, true);
}

function naprTooltip(mouse) {
  let tooltip;

  if (!validateChecboxes()) {
    tooltip = createTooltip([
      createText("Необходимо выбрать хотя бы одно", false),
    ]);
  } else {
    tooltip = createTooltip([createText("Всё хорошо", true)]);
  }

  tooltip.style.top = mouse.clientY;
  tooltip.style.left = mouse.clientX;
  tooltipView(tooltip, true);
}

function phoneTooltip(mouse, input) {
  const data = [];
  
  if (input.value === "") {
    data.push(createText("Необходимо значение", false));
  } else if (input.validity.patternMismatch) {
    data.push(createText("Неверный формат", false));
    data.push(createText(`Формат: ${PHONE_TITLE}`, false));
  } else {
    data.push(createText("Всё хорошо", true));
  }

  const tooltip = createTooltip(data);

  tooltip.style.top = mouse.clientY;
  tooltip.style.left = mouse.clientX;
  tooltipView(tooltip, true);
}

function createText(value, isOk) {
  return {
    value: value,
    isOk: isOk,
  };
}
