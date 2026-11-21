const myLibrary = [];

function Book(id,name,author,pages,status) {
    this.id=id;
    this.Name=name;
    this.Author=author;
    this.Pages=pages;
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
            else if(key==='status'){
                const stat_btn=document.createElement("button");
                stat_btn.textContent=`${value}`;
                if(value==="read"){
                    stat_btn.classList.add("stat_read");
                    stat_btn.textContent="Read";
                }
                else{
                    stat_btn.classList.add("stat_not_read");
                    stat_btn.textContent="Not Read";
                }
                stat_btn.classList.add("stat_btn");
                card.appendChild(stat_btn);
            } 
            else{
                const p = document.createElement("p");
                p.textContent=`${key}: ${value}`;
                card.appendChild(p);
            }
        }
        const del_btn=document.createElement("button");
        del_btn.textContent="REMOVE";
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

const stat_btn=document.querySelector(".stat_btn");
main_content.addEventListener("click",(event)=>{
    if(!event.target.classList.contains("stat_btn")) return;
    const card=event.target.closest(".card");
    const book = myLibrary.find(b => b.id===card.id);
    if(event.target.classList.contains("stat_read")){
        event.target.textContent="Not Read";
        event.target.classList.add("stat_not_read");
        event.target.classList.remove("stat_read");
        book.status="not read";
    }
    else{
        event.target.textContent="Read";
        event.target.classList.add("stat_read");
        event.target.classList.remove("stat_not_read");
        book.status="read";
    }

});