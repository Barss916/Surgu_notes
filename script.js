let newNote = document.getElementsByTagName("button__notes");
const notesList = document.getElementsByTagName("notes__list");


document.addEventListener("click", function (e) {
    if (e.target.className === "button__notes"){
        let noteContainerL = document.createElement("div");
        noteContainerL.classList.add("note__left__part");


        let noteTitle = document.createElement("span");
        let noteTitleText = document.createTextNode("Privet");
        noteTitle.classList.add("note__title");
        noteTitle.appendChild(noteTitleText);

        let noteDate = document.createElement("span");
        let noteDateText = document.createTextNode("12 Jan");
        noteDate.classList.add("note__date");
        noteDate.appendChild(noteDateText);
        
        let noteContainerR = document.createElement("div");
        noteContainerR.classList.add("note__tag");

        let noteTag = document.createElement("span");
        let noteTagText = document.createTextNode("Work");
        noteTag.classList.add("tag");
        noteTag.appendChild(noteTagText);

        noteContainerL.appendChild(noteTitle);
        noteContainerL.appendChild(noteDate);
        noteContainerR.appendChild(noteTag);

        let noteGeneral = document.createElement("div");
        noteGeneral.classList.add("note");
        noteGeneral.appendChild(noteContainerL);
        noteGeneral.appendChild(noteContainerR);

        console.log(notesList);
    }
});
