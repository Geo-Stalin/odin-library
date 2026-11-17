const myLibrary = [];

function Book(id,name,author,pages,status) {
    this.id=id;
    this.name=name;
    this.author=author;
    this.pages=pages;
    this.status=status;
}

function addBookToLibrary(name,author,pages,status) {
    
    const id = crypto.randomUUID();
    const book = new Book(id,name,author,pages,status);
    myLibrary.push(book);
}

function showCards(){
    const len = myLibrary.length;
    const main_content=document.querySelector(".main_content");
    main_content.replaceChildren();//so no copy is made when we call the function again
    for(let i = 0;i<len;i++){
        const card = document.createElement("div");
        card.classList.add("card");
        for(const [key, value] of Object.entries(myLibrary[i])){
            if(key!='id'){
                const p = document.createElement("p");
                p.textContent=`${key}: ${value}`;
                card.appendChild(p);
            }
        }
        main_content.appendChild(card);
    }
}

const dialog = document.querySelector("dialog");
const add_book = document.querySelector(".header>button");
const close = document.querySelector("dialog>button");
const form = document.querySelector("form");
add_book.addEventListener("click",()=>{
    dialog.showModal();
});

close.addEventListener("click",()=>{
    dialog.close();
});

const submit = document.querySelector("form button");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    addBookToLibrary(data.name,data.author,data.pages,data.status);
    showCards();
    dialog.close();
});