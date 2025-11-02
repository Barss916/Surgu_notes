let maxId = parseInt(localStorage.getItem("maxId"));
let notes = []
let redactedNote = null;

const tags = document.getElementsByClassName("tags__list-item");
const searchInput = document.getElementById("search__input");
const modal = document.getElementById('modal');
const notesList = document.getElementById("list");
const modalTitle = document.getElementById("modal-title");
const modalInput = document.getElementById("titleInput");

const newNote = document.getElementById("new__note");
const saveNoteBtn = document.getElementById('saveNoteBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const searchButton = document.getElementById("search__button");


async function deleteData(noteId) {
    try{
        const res = await fetch("http://localhost:5000/notes/delete", {method: "DELETE", headers:{"Content-Type": "application/json"}, body: JSON.stringify({id: noteId})})
        document.location.reload();
    } catch (e) {
        console.log(e);
    }
}

async function updateData(noteId, title, tag) {
    try{
        const res = await fetch("http://localhost:5000/notes/update", {method: "PUT", headers:{"Content-Type": "application/json"}, body: JSON.stringify({id: noteId, title: title, tag: tag})})
        document.location.reload();
    } catch (e) {
        console.log(e);
    }
}

async function updateNote(noteId, title, tag, date) {
    try{
        const res = await fetch("http://localhost:5000/notes/delete", {method: "DELETE", headers:{"Content-Type": "application/json"}, body: JSON.stringify({id: noteId})})
        document.location.reload();
    } catch (e) {
        console.log(e);
    }
}

async function initData() {
   try
    {const res = await fetch("http://localhost:5000", {method : "GET"});
    if (!res.ok){
        console.log("404");
        return 0;
    }

    const data = await res.json();
    console.log(JSON.stringify(data));
    for(let note of data){
        const id = note.id;
        const title = note.title;
        const tag_text = note.tag;
        const date = note.date;
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.id = id;
        noteDiv.innerHTML = `<div class="note__left__part">
                                <span class="note__title">${title}</span>
                                <span class="note__date">${date}</span>
                            </div>
                            <div class="note__tag">
                                <span class="tag">${tag_text || '—'}</span>
                            </div>
                            <div class="note__buttons">
                                <button data-id="${id}" class="note__button delete__note">Удалить</button>
                                <button data-id="${id}" class="note__button update__note">Редактировать</button>
                            </div>`;
        notesList.appendChild(noteDiv);
        localStorage.setItem("maxId", id);
        notes.push(note);
    }
    } catch (e){
        console.log(e)
    }
}

initData();
async function createData(noteId, title, tag, date) {
   try{
    const res = await fetch("http://localhost:5000/notes", {method : "POST", body: JSON.stringify({"id": noteId, "title": title, "tag": tag, "date": date})});
    if (!res.ok){
        console.log("404");
        return 0;
    }
    } catch (e){
        console.log(e)
    }
}


newNote.addEventListener("click", () => {
    modal.style.display = 'flex';
    openModal();
})

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

function saveNote() {
    const title = titleInput.value.trim();
    const tag = tagInput.value;
    
    if (redactedNote) {
        const noteIndex = notes.findIndex(note => note.id === redactedNote);
        if (noteIndex !== -1) {
            notes[noteIndex] = {
                ...notes[noteIndex],
                title: title,
                tag: tag
            };
            updateData(notes[noteIndex].id, notes[noteIndex].title, notes[noteIndex].tag, notes[noteIndex].date);
        }
    } 

    else {
        const newNote = {
            id: maxId + 1,
            title: title,
            tag: tag,
            date: new Date().toLocaleString()
        };
        notes.push(newNote);
        createData(newNote.id, newNote.title, newNote.tag, newNote.date);
        showNote(newNote.id, newNote.title, newNote.tag, newNote.date);
        maxId++;
    }

    modal.style.display = 'none';
}

function showNote(noteId, noteTitle, noteTag, noteDate) {
    const id = noteId;
    const title = noteTitle;
    const tag_text = noteTag;
    const date = noteDate;
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.id = id;
    noteDiv.innerHTML = `<div class="note__left__part">
                            <span class="note__title">${title}</span>
                            <span class="note__date">${date}</span>
                        </div>
                        <div class="note__tag">
                            <span class="tag">${tag_text || '—'}</span>
                        </div>
                        <div class="note__buttons">
                            <button data-id="${id}" class="note__button delete__note">Удалить</button>
                            <button data-id="${id}" class="note__button update__note">Редактировать</button>
                        </div>`;
    notesList.appendChild(noteDiv); 
}

function openModal(noteId = null) {
    if (noteId) {
        const note = notes.find(note => note.id === noteId);
        if (note) {
            modalTitle.textContent = 'Редактировать заметку';
            titleInput.value = note.title;
            tagInput.value = note.tag;
            redactedNote = note.id;
        }
    } else {
        modalTitle.textContent = 'Новая заметка';
        titleInput.value = '';
        tagInput.value = 'Идеи';
        redactedNote = null;
    }
    
}

saveNoteBtn.addEventListener('click', () => saveNote());

searchButton.addEventListener("click", () => {
    const input = document.getElementById("search__input").value.toLowerCase();
    const itemsList = document.getElementsByClassName("note");
    const item = document.getElementsByClassName("note__title")
    console.log(1);
    for (let i = 0; i < itemsList.length; i++){
        const itemText = item[i].textContent.toLowerCase();
        if (itemText.includes(input)){
            itemsList[i].style.display = "";
        }
        else {
            itemsList[i].style.display = "none";
        };
    };
})

document.addEventListener("click", function (e) {
    if (e.target.className === "tags__list-item"){
        const tag = e.target.textContent.toLowerCase();
        const itemsList = document.getElementsByClassName("note");
        const item = document.getElementsByClassName("note__tag")
        for (let i = 0; i < itemsList.length; i++){
            const itemTag = item[i].textContent.toLowerCase();
            if (itemTag.includes(tag)){
                itemsList[i].style.display = "";
            }
            else if (tag === "все"){
                if (itemTag.includes("")){
                    itemsList[i].style.display = "";
                };
            }
            else {
                itemsList[i].style.display = "none";
            };
        };
    }
});


notesList.addEventListener('click', e => {
    const btn = e.target.closest('.note__button');

    const noteId = parseInt(btn.dataset.id, 10);
    if (btn.classList.contains('delete__note')){
        deleteData(noteId);
    }
    if (btn.classList.contains('update__note')){
        const note = notes.find(note => note.id === noteId)
        modal.style.display = 'flex';
        openModal(note.id);
    }
});