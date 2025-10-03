let newNote = document.getElementsByTagName("button__notes");
const input = document.getElementById("search__input");
const notesList = document.getElementById("list");


document.addEventListener("click", function (e) {
    if (e.target.className === "button__notes"){
        let noteContainerL = document.createElement("div");
        noteContainerL.classList.add("note__left__part");


        const noteTitleInput = prompt("Заголовок заметки: ");
        let noteTitle = document.createElement("span");
        noteTitle.textContent = noteTitleInput;
        noteTitle.classList.add("note__title");


        let noteDate = document.createElement("span");
        noteDate.textContent = new Date().toISOString().split('T')[0];
        noteDate.classList.add("note__date");
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


        notesList.insertAdjacentHTML("beforeend", noteGeneral.outerHTML);
    };

    if (e.target.className == "search__button"){
        console.log(input.value.toLowerCase());
    };
});
