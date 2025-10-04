const newNote = document.getElementById("new__note");
const tags = document.getElementsByClassName("tags__list-item");
const searchButton = document.getElementById("search__button");
const searchInput = document.getElementById("search__input");
const modal = document.getElementById('modal');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const notesList = document.getElementById("list");

newNote.addEventListener("click", () => {
    modal.style.display = 'flex';
})

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

saveNoteBtn.addEventListener("click", () => {
    const title = document.getElementById('titleInput').value.trim();
    const tag = document.getElementById('tagInput').value.trim();
    const date = new Date().toLocaleString(); // текущая дата и время

    if (title) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `<div class="note__left__part">
                                <span class="note__title">${title}</span>
                                <span class="note__date">${date}</span>
                            </div>
                            <div class="note__tag">
                                <span class="tag">${tag || '—'}</span>
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
