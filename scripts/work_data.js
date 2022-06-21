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
  const res = Object.fromEntries(formData);

  return res;
}

function updateTable(data) {
  table = document.getElementById("table");
  const tbody = document.createElement("tbody");

  data.forEach((element) => {
    const row = document.createElement("tr");
    let napr = "";
    let is_pr = "Нет";

    if (element.is_frontend) {
      napr = "Frontend, ";
    }

    if (element.is_backend) {
      napr += "Backend, ";
    }

    if (element.is_mobile) {
      napr += "Mobile, ";
    }

    napr = napr.substring(0, napr.length - 2);

    if (element.is_pr == "ok") {
      is_pr = "Да";
    }

    if (element.is_pr == "work") {
      is_pr = "В работе";
    }

    const oneRow = {
      name: `${element.first_name} ${element.last_name} ${element.otch}`,
      phone: element.phone,
      date_birth: element.date_birth,
      napr: napr,
      is_pr: is_pr,
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
