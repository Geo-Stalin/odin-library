const myLibrary = [];

function Book(id,b_name,author,pages,status) {
    this.id=id;
    this.b_name=b_name;
    this.author=author;
    this.pages=pages;
    this.status=status;
}

function addBookToLibrary(b_name,author,pages,status) {
    
    const id = crypto.randomUUID();
    const book = new Book(id,b_name,author,pages,status);
    myLibrary.push(book);
}