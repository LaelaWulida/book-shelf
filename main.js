document.addEventListener('DOMContentLoaded', function() {
    const inputBookForm = document.getElementById('inputBook');
    const searchBookForm = document.getElementById('searchBook');
  
    inputBookForm.addEventListener('submit', function(event) {
      event.preventDefault();
      addBook();
    });
  
    searchBookForm.addEventListener('submit', function(event) {
      event.preventDefault();
      searchBooks();
    });
  
    function addBook() {
      const title = document.getElementById('inputBookTitle').value;
      const author = document.getElementById('inputBookAuthor').value;
      const year = document.getElementById('inputBookYear').value;
      const isComplete = document.getElementById('inputBookIsComplete').checked;
  
      const book = {
        id: +new Date(),
        title,
        author,
        year: parseInt(year),
        isComplete
      };
  
      saveBook(book);
      renderBooks();
      inputBookForm.reset();
    }
  
    function saveBook(book) {
      let books = localStorage.getItem('books');
      if (!books) {
        books = [];
      } else {
        books = JSON.parse(books);
      }
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    function getBooks() {
      const books = localStorage.getItem('books');
      return books ? JSON.parse(books) : [];
    }
  
    function renderBooks() {
      const books = getBooks();
      const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
      const completeBookshelfList = document.getElementById('completeBookshelfList');
      incompleteBookshelfList.innerHTML = '';
      completeBookshelfList.innerHTML = '';
  
      books.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
          completeBookshelfList.appendChild(bookElement);
        } else {
          incompleteBookshelfList.appendChild(bookElement);
        }
      });
    }
  
    function createBookElement(book) {
      const bookItem = document.createElement('article');
      bookItem.classList.add('book_item');
      bookItem.setAttribute('data-id', book.id);
  
      const bookTitle = document.createElement('h3');
      bookTitle.innerText = book.title;
  
      const bookAuthor = document.createElement('p');
      bookAuthor.innerText = `Penulis: ${book.author}`;
  
      const bookYear = document.createElement('p');
      bookYear.innerText = `Tahun: ${book.year}`;
  
      const bookActions = document.createElement('div');
      bookActions.classList.add('action');
  
      const toggleButton = document.createElement('button');
      toggleButton.classList.add('green');
      toggleButton.innerText = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
      toggleButton.addEventListener('click', () => {
        toggleBookCompletion(book.id);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('red');
      deleteButton.innerText = 'Hapus buku';
      deleteButton.addEventListener('click', () => {
        deleteBook(book.id);
      });
  
      bookActions.appendChild(toggleButton);
      bookActions.appendChild(deleteButton);
  
      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(bookYear);
      bookItem.appendChild(bookActions);
  
      return bookItem;
    }
  
    function toggleBookCompletion(id) {
      let books = getBooks();
      books = books.map(book => {
        if (book.id === id) {
          book.isComplete = !book.isComplete;
        }
        return book;
      });
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks();
    }
  
    function deleteBook(id) {
      let books = getBooks();
      books = books.filter(book => book.id !== id);
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks();
    }
  
    function searchBooks() {
      const query = document.getElementById('searchBookTitle').value.toLowerCase();
      const books = getBooks();
      const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
      const completeBookshelfList = document.getElementById('completeBookshelfList');
      incompleteBookshelfList.innerHTML = '';
      completeBookshelfList.innerHTML = '';
  
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
  
      filteredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
          completeBookshelfList.appendChild(bookElement);
        } else {
          incompleteBookshelfList.appendChild(bookElement);
        }
      });
    }
  
    renderBooks();
  });
  