const showForm = () => {
	nLibrary.classList.toggle('is-hidden');
	nDrawer.classList.toggle('is-open');
  nAdd.classList.toggle('blue');
}

const Book = function(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = read;
};

const displayLibrary = () => {

};

const submitNewBook = (e) => {
	e.preventDefault();
	const newBookIndex = myLibrary.length;
	myLibrary[newBookIndex] = new Book(nTitle.value,nAuthor.value, nPages.value, nIsRead.checked);
	nForm.reset();
	displayLibrary();
};

const createEventHandlers = () => {
	nAdd.addEventListener('click', showForm);
	nForm.addEventListener('submit', submitNewBook);
};

const firebaseConfig = {
	apiKey: "AIzaSyBq0jW4RoghzdKB2vYhoxKLAUvZvhzRZnE",
	authDomain: "atomhkt-the-odin-project.firebaseapp.com",
	databaseURL: "https://atomhkt-the-odin-project.firebaseio.com",
	projectId: "atomhkt-the-odin-project",
	storageBucket: "atomhkt-the-odin-project.appspot.com",
	messagingSenderId: "650790814311",
	appId: "1:650790814311:web:fa8cbad76afc1150aa0ac2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const nAdd = document.querySelector(".btn-add");
const nTitle = document.getElementById("title");
const nAuthor = document.getElementById("author");
const nPages = document.getElementById("pages");
const nIsRead = document.getElementById("read");
const nDrawer = document.getElementById("new-book");
const nForm = document.getElementById("new-book-form");
const nLibrary = document.getElementById("library");


let myLibrary = [];

createEventHandlers();