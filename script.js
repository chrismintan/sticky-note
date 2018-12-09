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
  while ( document.getElementById("board").firstChild ) {
    document.getElementById("board").removeChild(document.getElementById("board").firstChild);
  }
  notes = ["mynameischris!"];
  localStorage.clear();
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
  postStickies(notes);
}

// Function to append notes to board
function postStickies(notes) {
  for ( let i = 0; i < notes.length; i++ ) {
    if ( notes[i] != "mynameischris!" && notes[i] != null ) {
      newSticky(notes[i].header, notes[i].content, notes[i].color);
    }
  }
}

// Function to create a new sticky note (empty fields)
function newSticky(header, body, color) {
  // Just shortening script
  let pos = parseInt(document.getElementsByClassName("note").length);

  // Cloning hidden sticky
  let template = document.getElementById("template");
  let newSticky = template.cloneNode(true);
  newSticky.style.display = "inline-block";
  newSticky.classList.add("note");

  // Appending sticky to board
  let board = document.getElementById("board");
  board.appendChild(newSticky);

  // If params are not undefined, means it's a saved note
  if ( header != undefined ) {
    document.getElementsByClassName("header")[pos].value = header;
    document.getElementsByClassName("content")[pos].value = body;
    newSticky.style.background = palette[color];
  } else {
    // Setting the color of the note to be one of the 7 colors defined prior (only if it's a new note)
    let rNum = Math.floor(Math.random() * 7);
    let color = palette[rNum]
    newSticky.style.background = color;
    document.getElementsByClassName("color")[pos].textContent = rNum;
  };

  // Making options visible when hovering
  let optionsArr = document.getElementsByClassName("options");
  function show() { optionsArr[pos].style.visibility = "visible" };
  function hide() { optionsArr[pos].style.visibility = "hidden" };
  newSticky.addEventListener("mouseover", show)
  newSticky.addEventListener("mouseout", hide)

  // Function for saving notes. Localstorage is used for notes to persist through refreshing / closing browser
  let saveButton = document.getElementsByClassName("save")[pos];

  function saveNote() {
    let header = document.getElementsByClassName("header")[pos].value;
    let content = document.getElementsByClassName("content")[pos].value;
    let colorChoice = document.getElementsByClassName("color")[pos].textContent;
    let note = {
      header: header,
      content: content,
      color: colorChoice
    }
    // Saving note into array of notes
    notes[pos] = note
    localStorage.setItem("chrisiscool", JSON.stringify(notes))
  }

  saveButton.addEventListener("click", saveNote)

  // Creating the color picker
  let selector = document.getElementsByClassName("selector")[pos];
  for ( let i = 0; i < 6; i++ ) {
    let color = document.createElement("span");
    selector.appendChild(color);
    color.style.background = palette[i]
    color.addEventListener("click", function() {
      newSticky.style.background = palette[i]
      selector.style.visibility = "hidden";
      document.getElementsByClassName("color")[pos].textContent = i;
    })
  }

  let colorButton = document.getElementsByClassName("colorPicker")[pos];

  colorButton.addEventListener("click", function() {
    selector.style.visibility = "visible";
  })

  // Delete note function
  let delButton = document.getElementsByClassName("delete")[pos];

  // Adding some animations
  delButton.addEventListener("click", function() {
    newSticky.classList.add("animate-remove");
    setTimeout(function() {
      newSticky.style.display = "none";
    }, 700)
    notes[pos] = "";
    console.log(notes)
    console.log(pos)
    localStorage.setItem("chrisiscool", JSON.stringify(notes))
  })
}

function search() {
  let input = document.getElementById("search").value;

  // Looping through array of notes. If string is found, mark them out
  for ( let i = 0; i < notes.length; i++ ) {
    if ( notes[i] != "mynameischris!" && notes[i] != "" ) {
      if ( notes[i].header.includes(input) || notes[i].content.includes(input) ) {
        notes[i].match = true;
      } else {
        notes[i].match = false;
      }
    }
  }
  while ( document.getElementById("board").firstChild ) {
    document.getElementById("board").removeChild(document.getElementById("board").firstChild);
  }
  notes.sort(function(a,b) {
    return b.match - a.match;
  })

  postStickies(notes);
  setTimeout(function() {
    results()
  }, 333)
}

// Function to animate search results
function results() {
  let input = document.getElementById("search").value;
  for ( let i = 0; i < document.getElementsByClassName("note").length; i++ ) {
    if ( notes[i] != "mynameischris!" && notes[i] != "" ) {
      if ( notes[i].header.includes(input) || notes[i].content.includes(input) ) {
        document.getElementsByClassName("note")[i].classList.add("enlarge");
      } else {
        document.getElementsByClassName("note")[i].classList.add("shrink");
      }
    }
  }
}

// Function to check if sticky has been saved
function checkNotes() {
  for ( let i = 0; i < document.getElementsByClassName("note").length; i++ ) {
    if ( notes[i] != "mynameischris!" && notes[i] != "" && notes[i] != undefined ) {
      if ( document.getElementsByClassName("header")[i].value != notes[i].header || document.getElementsByClassName("content")[i].value != notes[i].content || document.getElementsByClassName("color")[i].textContent != notes[i].color ) {
        document.getElementsByClassName("notify")[i].style.display = "none";
      } else {
        document.getElementsByClassName("notify")[i].style.display = "block";
      }
    }
  }
}

document.onkeydown = function() {
  checkNotes();
}



