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
  persistentNotes();
}

function deleteAll() {
  console.log("Deleting")
}

function search() {
  console.log('search code here')
}

function persistentNotes() {
  if ( localStorage.hasOwnProperty('chrisiscool') ) {
    let data = localStorage.getItem('chrisiscool');
    notes = JSON.parse(data);
  } else {
    notes = ["mynameischris!"];
  }

  // Clearing up empty notes
  for ( let i = 0; i < notes.length; i++ ) {
    if ( notes[i] == "" ) {
      notes.splice(i,1);
    }
  }

  // Appending notes to board
  for ( let i = 0; i < notes.length; i++ ) {
    if ( notes[i] != "mynameischris!" && notes[i] != null ) {
      newSticky(notes[i].header, notes[i].content, notes[i].color);
    }
  }
}

function newSticky() {
  // Just shortening script
  let pos = parseInt(document.getElementsByClassName("note").length);

  // Cloning hidden sticky
  let template = document.getElementById('template');
  let newSticky = template.cloneNode(true);
  newSticky.style.display = "inline-block";
  newSticky.style.background = palette[1];

  // Appending sticky to board
  let board = document.getElementById('board');
  board.appendChild(newSticky);
  console.log('appended!')

  // Making options visible when hovering
  let optionsArr = document.getElementsByClassName("options");
  function show() { optionsArr[pos].style.visibility = "visible" };
  function hide() { optionsArr[pos].style.visibility = "hidden" };
  newSticky.addEventListener("mouseover", show)
  newSticky.addEventListener("mouseout", hide)
}