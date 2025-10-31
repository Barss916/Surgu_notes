let maxId = 1;
const newNote = document.getElementById("new__note");
const tags = document.getElementsByClassName("tags__list-item");
const searchButton = document.getElementById("search__button");
const searchInput = document.getElementById("search__input");
const modal = document.getElementById('modal');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const notesList = document.getElementById("list");

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
        const date = note.date; // текущая дата и время
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
                                <button id="delete__note" class="note__button">Удалить</button>
                                <button id="update__note" class="note__button">Редактировать</button>
                            </div>`;
        notesList.appendChild(noteDiv);
    }
    } catch (e){
        console.log(e)
    }
}

initData();

console.log(1);

async function createData(id, title, tag, date) {
   try
    {const res = await fetch("http://localhost:5000/notes", {method : "POST", body: JSON.stringify({"id": id, "title": title, "tag": tag, "date": date})});
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
})

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

saveNoteBtn.addEventListener("click", () => {
    const id = maxId;
    const title = document.getElementById('titleInput').value.trim();
    const tag = document.getElementById('tagInput');
    const tag_text = tag.options[tag.selectedIndex].text;
    const date = new Date().toLocaleString(); // текущая дата и время
    if (title) {
        maxId++;
        createData(id, title, tag_text, date);
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
                                <button id="delete__note" class="note__button">Удалить</button>
                                <button id="update__note" class="note__button">Редактировать</button>
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

const deleteNote = document.getElementById("delete__note");
const updateNote = document.getElementById("update__note");

console.log(deleteNote);

// deleteNote.addEventListener('click', () => {
//     console.log(1);
// });

// updateNote.addEventListener('click', () => {
//     console.log(2);
// });