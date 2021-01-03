const showForm = () => {
	nLibrary.classList.toggle('is-hidden');
	nDrawer.classList.toggle('is-open');
	nAdd.classList.toggle('blue');
}

// const Book = function (index, title, author, pages, read) {
// 	this.index = index;
// 	this.title = title;
// 	this.author = author;
// 	this.pages = pages;
// 	this.isRead = read;
// };

class Book {
	constructor(index, title, author, pages, read) {
		this.index = index;
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = read;
	}
}

const snapToArray = (snapshot) => {
	let outArr = [];
	snapshot.forEach(function (childSnapshot) {
		let item = childSnapshot.val();
		outArr.push(item);
	});
	return outArr;
};

// Realtime data retrieve from firebase db, 
// triggers display update and calc max book index
const retrieveFromDB = () => {
	libRef.on('value', (snap) => {
		myLibrary = snapToArray(snap);
		displayLibrary();
		maxBookIndex = findMaxBookIndex(myLibrary);
	});
};

const findMaxBookIndex = (arr) => {
	if (Array.isArray(arr) && arr.length !== 0) {
		return arr.reduce((prev, current) =>
			(prev.index > current.index) ? prev : current, {}).index;
	}
	return 0;
};

const toggleIsRead = (e) => {
	if (e.target.value === 'true') {
		updtVal = false;
	} else {
		updtVal = true;
	}
	const book = e.target.parentNode.parentNode;
	libRef.child(book.id).update({
		isRead: updtVal
	});
};

const removeBook = (e) => {
	const book = e.target.parentNode.parentNode;
	// Remove book from db
	libRef.child(book.id).remove();
};

const submitNewBook = (e) => {
	e.preventDefault();
	const newIndex = maxBookIndex + 1;
	const newBook = new Book(newIndex, nTitle.value, nAuthor.value, nPages.value, nIsRead.checked);
	// Reset and hide form
	nForm.reset();
	nAdd.click();
	// Add new book to db
	libRef.child(newBook.index).set(newBook);
};

const displayBook = (book) => {
	const card = document.createElement('div');
	card.classList.add('book');
	card.id = book.index;
	const title = document.createElement('h3');
	title.innerHTML = book.title;
	const author = document.createElement('span');
	author.classList.add('author');
	author.innerHTML = `by ${book.author}`;
	const pages = document.createElement('span');
	pages.classList.add('pages');
	pages.innerHTML = `${book.pages} pages`;
	const buttonBox = document.createElement('div');
	buttonBox.classList.add('button-box');
	const isReadBtn = document.createElement('button');
	isReadBtn.type = 'button';
	isReadBtn.classList.add('is-read-toggle');
	isReadBtn.value = book.isRead;
	if (book.isRead) {
		isReadBtn.classList.add('green');
	};
	isReadBtn.innerHTML = "Read";
	const removeBtn = document.createElement('button');
	removeBtn.type = 'button';
	removeBtn.classList.add('remove-btn');
	removeBtn.innerHTML = "Remove";

	nLibrary.appendChild(card);
	buttonBox.append(isReadBtn, removeBtn);
	card.append(title, author, pages, buttonBox);

	isReadBtn.addEventListener('click', toggleIsRead);
	removeBtn.addEventListener('click', removeBook);
};

const displayLibrary = () => {
	nLibrary.innerHTML = '';
	if (Array.isArray(myLibrary) && myLibrary.length !== 0) {
		myLibrary.forEach(book => displayBook(book));
	}
};

const createEventHandlers = () => {
	nAdd.addEventListener('click', showForm);
	nForm.addEventListener('submit', submitNewBook);
};

////////////////////////////////////////////////////////
// Initialize Firebase
////////////////////////////////////////////////////////
const firebaseConfig = {
	apiKey: "AIzaSyBq0jW4RoghzdKB2vYhoxKLAUvZvhzRZnE",
	authDomain: "atomhkt-the-odin-project.firebaseapp.com",
	databaseURL: "https://atomhkt-the-odin-project.firebaseio.com",
	projectId: "atomhkt-the-odin-project",
	storageBucket: "atomhkt-the-odin-project.appspot.com",
	messagingSenderId: "650790814311",
	appId: "1:650790814311:web:fa8cbad76afc1150aa0ac2"
};

firebase.initializeApp(firebaseConfig);
////////////////////////////////////////////////////////

const nAdd = document.querySelector(".btn-add");
const nTitle = document.getElementById("title");
const nAuthor = document.getElementById("author");
const nPages = document.getElementById("pages");
const nIsRead = document.getElementById("read");
const nDrawer = document.getElementById("new-book");
const nForm = document.getElementById("new-book-form");
const nLibrary = document.getElementById("library");


let myLibrary = [];
let maxBookIndex = 0;
let db = firebase.database();
let libRef = db.ref('data');

createEventHandlers();
retrieveFromDB();