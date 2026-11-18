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

const main_content=document.querySelector(".main_content");

function showCards(){
    const len = myLibrary.length;
    main_content.replaceChildren();//so no copy is made when we call the function again
    for(let i = 0;i<len;i++){
        const card = document.createElement("div");
        card.classList.add("card");
        for(const [key, value] of Object.entries(myLibrary[i])){
            if(key==='id'){
                card.id=value;
            }
                
            else{
                const p = document.createElement("p");
                p.textContent=`${key}: ${value}`;
                card.appendChild(p);
            }
        }
        const del_btn=document.createElement("button");
        del_btn.textContent="DEL";
        del_btn.classList.add("del_btn");
        card.appendChild(del_btn);
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

const del_btn=document.querySelector(".card>button");
main_content.addEventListener("click",(event)=>{
    if(!event.target.classList.contains("del_btn")) return;
    const card = event.target.closest(".card");
    const id = card.id;
    const index = myLibrary.findIndex(book => book.id===id);
    if(index!=-1){
        myLibrary.splice(index,1);
    }
    showCards();
});