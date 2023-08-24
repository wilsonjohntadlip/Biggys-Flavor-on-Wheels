const selectwrap = document.getElementById("selectwrap");
const selectballs = document.getElementById("selectballs");
const selectnachos = document.getElementById("selectnachos");
const subtotalvalue = document.getElementById("subtotalvalue");
const totalvalue = document.getElementById("totalvalue");

let subtotal = 0;

function compute() {
  subtotal = parseInt(selectwrap.value) * 85;
  subtotal += parseInt(selectballs.value) * 75;
  subtotal += parseInt(selectnachos.value) * 75;

  subtotalvalue.innerText = "Php" + subtotal;
  totalvalue.innerText = "Php" + (subtotal + 50);
}

selectwrap.addEventListener("click", compute);
selectballs.addEventListener("click", compute);
selectnachos.addEventListener("click", compute);
