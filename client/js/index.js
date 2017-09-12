let fields = [
  document.querySelector("#date"),
  document.querySelector("#value"),
  document.querySelector("#quantity")
];

let tbody = document.querySelector("table tbody");

document.querySelector(".form").addEventListener("submit", function(event) {
  event.preventDefault();

  let tr = document.createElement("tr");

  fields.forEach(function(field) {
    let td = document.createElement("td");
    td.textContent = field.value;
    tr.appendChild(td);
  });

  let tdVolume = document.createElement("td");
  tdVolume.textContent = fields[1].value * fields[2].value;

  tr.appendChild(tdVolume);

  tbody.appendChild(tr);

  fields[0].value = "";
  fields[1].value = 1;
  fields[2].value = 0;

  fields[0].focus();
});
