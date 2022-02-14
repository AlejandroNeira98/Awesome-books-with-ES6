export const titleInput = document.getElementById('title-input');
export const authorInput = document.getElementById('author-input');
export const submitButton = document.getElementById('submit-button');

export class Methods {
  constructor() {
    this.books = [];
  }

  init = function () {
    if (JSON.parse(localStorage.getItem('books')) !== null) {
      this.books = JSON.parse(localStorage.getItem('books'));
      this.books.forEach((element) => {
        this.addBookToDocument(element);
      });
    }
  };

  removeBook = function (time) {
    this.books = this.books.filter((book) => book.time !== time);
    localStorage.setItem('books', JSON.stringify(this.books));
  };

  removeBtnEventListener = function (element, time) {
    this.removeBook(time);
    element.parentElement.remove();
  };

  addBookToDocument = function (book) {
    const booksDiv = document.getElementById('books');

    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('data-time', book.time);

    const bookDesc = document.createElement('p');
    bookDesc.classList.add('book-description');
    const remove = document.createElement('button');
    remove.classList.add('remove-btn');
    bookDesc.innerText = `"${book.title}" by ${book.author}`;
    remove.innerText = 'Remove';

    bookDiv.append(bookDesc, remove);
    booksDiv.append(bookDiv);
    remove.addEventListener('click', () => {
      this.removeBtnEventListener(remove, book.time);
    });
  };

  addBookToLocalStorage = function (title, author) {
    const d = new Date();
    const time = d.getTime();
    this.books.push({
      title,
      author,
      time,
    });
    localStorage.setItem('books', JSON.stringify(this.books));
    this.addBookToDocument({
      title,
      author,
      time,
    });
  };
}

export let windowLoad = () => {window.addEventListener('load', () => {
  const method = new Methods();

  method.init();

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const author = authorInput.value;
    const title = titleInput.value;
    method.addBookToLocalStorage(title, author);
    authorInput.value = null;
    titleInput.value = null;
  });
});}