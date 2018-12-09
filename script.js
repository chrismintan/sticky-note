const palette = [
  "#FFFF88",
  "#A1F094",
  "#FFABE4",
  "#FDCC65FF",
  "#D4B1FE",
  "#9FDEFD",
  "#E0E1DD"
];

window.onload = function() {
  console.log('linked!')
}

function deleteAll() {
  console.log("Deleting")
}

function search() {
  console.log('search code here')
}

function newSticky() {
  // Cloning hidden sticky
  let template = document.getElementById('template');
  let newSticky = template.cloneNode(true);
  newSticky.style.display = "inline-block";
  newSticky.style.background = palette.green;

  // Appending sticky to board
  let board = document.getElementById('board');
  board.appendChild(newSticky);
  console.log('appended!')
}