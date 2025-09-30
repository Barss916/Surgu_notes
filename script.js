let newNote = document.getElementsByTagName("button__notes");
const notesList = document.getElementsByTagNameNS("notes__list");


document.addEventListener("click", function (e) {
    if (e.target.className === "button__notes"){
        console.log("ХЕЕЕ");
    }
});
