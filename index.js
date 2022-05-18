//Establish classes for Books and Genres

class Book {
    constructor(bookTitle, authorName) {
        this.bookTitle = bookTitle;
        this.authorName = authorName;
    }

    describeBook() {
        return `${this.bookTitle} was written by ${this.authorName}`
    }
}


class Genre {
//create a constructor for declaring the genre name and an empty array to put books into this genre when selected
    constructor(genreName) {
        this.genreName = genreName;
        this.books = [];
    }

//Add functionality to add books and validate that they are part of the Book class
    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            throw new Error(`${book} is not in the list of books and cannot be added to a genre.`);
        }
    }

//Add functionality to describe the book
    describeGenre() {
        return `${this.genreName} has ${this.books.length} books.`;
    }
}

//this Menu class defines all the functionality and options for the user
class Menu {
    constructor() {
        //declare a blank 'genres' array so that new genres can be added and perhaps later deleted from this array
        this.genres = [];

        //declare the selected genre to be selected later
        this.selectedGenre = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        //define options that user will have with a switch statement, pointing to methods to be created later
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createGenre();
                    break;0.
                case '2':
                    this.viewGenre();
                    break;
                case '3':
                    this.deleteGenre();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        //message displayed when '0' or other, nonvalid option is selected and app is closed
        alert("Thanks for using the Book and Genre Menu app!");
    }

    //this method shows the user their options, as outlined in the switch statement above 
    showMainMenuOptions() {
        return prompt(`
        0 -- Exit Program
        1 -- Create a New Genre
        2 -- View Genres and Manage Books
        3 -- Delete a Genre
        `)
    }

    //this method shows optiosn for the Genre submenu, outlined below in the viewGenre method
    showGenreMenuOptions(description) {
        return prompt( `
        0 -- Go Back
        1 -- Add a Book
        2 -- Delete a Book
        -----------------
        ${description}
        `)
    }

    //here, we begin coding all the options we provided through the switch statements and menu options

    //allow user to create genre through prompt and then push to 'genres' array
    createGenre() {
        let genreName = prompt("Enter the genre name: ");
        this.genres.push(new Genre(genreName));
    }

    //allow user to view the genres defined thus far
    viewGenre() {
        //this lists the genres defined so far by looping through the genres array and creating a concatenated string listing the index and name of each genre
        let genreString4View = '';

        for (let i = 0; i < this.genres.length; i++) {
            genreString4View += i + ' -- ' + this.genres[i].genreName + '\n';
        }
        
        //finally, we use a prompt to show the concatenated string and allow the user to choose one
        let index = prompt(`${genreString4View} \n
            Enter the index of the genre you wish to view: 
            `);

        //validate input    
        if (index > -1 && index < this.genres.length) {
            this.selectedGenre = this.genres[index];
            


            //create another concatenated string listing all the books in the genre they selected
            let description = 'Genre Name: ' + this.selectedGenre.genreName + '\n';
            for (let i = 0; i < this.selectedGenre.books.length; i++) {
                description += i + ' -- ' + this.selectedGenre.books[i].bookTitle + ' by ' + this.selectedGenre.books[i].authorName + '\n';
            }

            //create a switch statement with directions on what the browser should do when the user selects a genre option
            let selection = this.showGenreMenuOptions(description);
            switch (selection) {
                case '1':
                    this.addBook();
                    break;
                case '2':
                    this.removeBook();
            }
        }
    }
    
    //here are the methods that allow the user to add new genres, delete genres, and add and remove books
    createGenre() {
        let genreName = prompt("Enter the genre name: ");
        this.genres.push(new Genre(genreName));
    }

    deleteGenre() {
        //i added another concatenated string so that users can see the names and indexes of all the genres to choose which to delete
        let genreString4Delete = '';
        for (let i = 0; i < this.genres.length; i++) {
            genreString4Delete += i + ' -- ' + this.genres[i].genreName + '\n';
        }    
   
        let index = prompt(`${genreString4Delete} \n
            Enter the index of the genre you wish to delete: `);
    
            //validate input

            if (index > -1 && index < this.genres.length) {
            this.genres.splice(index, 1);
        }
    }

    addBook() {
        let bookTitle = prompt("Enter the title of the new book: ");
        let authorName = prompt("Enter the author name of the new book: ");
        this.selectedGenre.books.push(new Book(bookTitle, authorName));
    }

    removeBook() {
        //i added another concatenated string so that users can see the names of all the books in the selected genre to choose which to delete
        let bookString4Delete = '';

        for (let i = 0; i < this.selectedGenre.books.length; i++) {
            bookString4Delete += i + ' -- ' + this.selectedGenre.books[i].bookTitle + ' by ' + this.selectedGenre.books[i].authorName + '\n';
        }    
  

        let index = prompt(`${bookString4Delete} \n
            Enter the number of the book you want to remove: 
        `);
        if (index > -1 && index < this.selectedGenre.books.length) {
            this.selectedGenre.books.splice(index, 1);
        }      
    }

}

let menu = new Menu();
menu.start();