// Сдлеать трекинг заметок по  id

let maxId = 1;
const newNote = document.getElementById("new__note");
const tags = document.getElementsByClassName("tags__list-item");
const searchButton = document.getElementById("search__button");
const searchInput = document.getElementById("search__input");
const modal = document.getElementById('modal');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const notesList = document.getElementById("list");

let notes = [{
    "id": 1,
    "title": "fdas",
    "tag": 12
},
{
    "id": 2,
    "title": "fdas",
    "tag": 12
},
{
    "id": 3,
    "title": "fdas",
    "tag": 12
},
{
    "id": 4,
    "title": "fdas",
    "tag": 12
}];

function getMaxId() {
    for (let note of notes) {
        if (note.id > maxId) {
            maxId = note.id;
        }
    }
}

getMaxId();

async function initData() {
   try
    {const res = await fetch("http://localhost:5000", {method : "GET"});
    if (!res.ok){
        console.log("404");
        return 0;
    }

    const data = await res.json();
    console.log(data);
    return data;
    } catch (e){
        console.log(e)
    }
}

initData();

newNote.addEventListener("click", () => {
    modal.style.display = 'flex';
})

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

saveNoteBtn.addEventListener("click", () => {
    const title = document.getElementById('titleInput').value.trim();
    const tag = document.getElementById('tagInput');
    const tag_text = tag.options[tag.selectedIndex].text;
    const date = new Date().toLocaleString(); // текущая дата и время

    if (title) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `<div class="note__left__part">
                                <span class="note__title">${title}</span>
                                <span class="note__date">${date}</span>
                            </div>
                            <div class="note__tag">
                                <span class="tag">${tag_text || '—'}</span>
                            </div>`;
        notesList.appendChild(noteDiv);

        // очистка и закрытие
        document.getElementById('titleInput').value = '';
        document.getElementById('tagInput').value = '';
        modal.style.display = 'none';
    } 

    else {
        alert('Введите название заметки!');
    }
});

searchButton.addEventListener("click", () => {
    const input = document.getElementById("search__input").value.toLowerCase();
    const itemsList = document.getElementsByClassName("note");
    const item = document.getElementsByClassName("note__title")
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