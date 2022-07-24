async function sendData(data) {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function loadData() {
  const response = await fetch("http://localhost:3000/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application-json",
    },
  });

  response.json().then((data) => {
    updateTable(data);
  });
}

function getFormData(form) {
  const formData = new FormData(form);
  const res = {};
  for (let i of formData.keys()) {
    if (i === "direction") {
      res[i] = formData.getAll(i);
    } else {
      res[i] = formData.get(i);
    }
  }
  return res;
}

function updateTable(data) {
  table = document.getElementById("table");
  const tbody = document.createElement("tbody");

  data.forEach((element) => {
    const row = document.createElement("tr");
    let is_pr = "";

    switch (element.is_pr) {
      case "ok":
        is_pr = "Да";
        break;

      case "work":
        is_pr = "В работе";
        break;

      default:
        is_pr = "Нет";
        break;
    }

    const oneRow = {
      name: `${element.first_name} ${element.last_name} ${element.middleName}`,
      phone: element.phone,
      date_birth: element.date_birth,
      direction: element.direction.join(", "),
      is_pr,
    };

    Object.values(oneRow).forEach((cellText) => {
      const cell = document.createElement("td");
      cell.appendChild(document.createTextNode(cellText));
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  if (table.children.length > 1) {
    table.removeChild(table.children[1]);
  }

  table.appendChild(tbody);
}
