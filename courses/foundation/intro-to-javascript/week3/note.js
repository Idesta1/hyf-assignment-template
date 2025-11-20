// save a note
const notes = [];
function saveNote(content, id) {
  notes.push({ content: content, id: id });
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

console.log(notes);

// get a note

function getNote(id) {
  return notes.find((note) => note.id === id);
}

const firstNote = getNote(1);
const secondNote = getNote(2);
console.log(firstNote);
console.log(secondNote);

// log out notes
function logOutNotesFormatted() {
  notes.forEach((note) => {
    console.log(
      `The note with id: ${note.id}, has the following note text: ${note.content}`
    );
  });
}

logOutNotesFormatted();
