
console.log("--------------------------------------")
console.log("Hello there!  Welcome to our library.")
console.log("--------------------------------------")

//library module
const lib = (function() {

  var books, menu, borrowed

  books = {
    science: ['biology', 'physics', 'Mathematics', 'chemistry'],
    art: ['history', 'marketing', 'french', 'economics'],
    misc: ['art of war', '48 laws of power', 'why you act the way you do', '15 habits of higly effective pple']
  }

  menu = ['View available books', 'Borrow a book', 'Donate a book', 'See borrowed books', 'Return a book', 'Exit']

  borrowed = []

  return {

    getBooks: function(dept, showIndex = null) {
      if (dept === 'science') {
        console.log('\nSCIENCE:')
        books.science.forEach((element, index) => {
          showIndex ? console.log(index + ": " + element) : console.log("-> " + element)
        });
      } else if (dept === 'art') {
        console.log('\nART:')
        books.art.forEach((element, index) => {
          showIndex ? console.log(index + ": " + element) : console.log("-> " + element)
        });
      } else {
        console.log('\nMISC.:')
        books.misc.forEach((element, index) => {
          showIndex ? console.log(index + ": " + element) : console.log("-> " + element)
        });
      }
    },

    getBorrowed: function(showIndex = null, exFunc = null) {
      if (!borrowed.length) {
        console.log('You have not borrowed any books yet')
        exFunc ? exFunc() : ''
      } else {
        borrowed.forEach((element, index) => {
          showIndex ? console.log(index + ": " + element.bk) : console.log("-> " + element.bk)
        });
      }
    },

    getMenu: function() {
      console.log("MAIN MENU:")
      menu.forEach((element, index) => {
        console.log(index + ": " + element)
      });
    },

    donateBook: function(dept, title, ret = null) {
      if (dept === 'science') {
        ret ? books.science.push(title) : books.science.push(title + ' - donated')

        //should return main menu after donating(possibly after a timeout)
      } else if (dept === 'art') {
        ret ? books.art.push(title) : books.art.push(title + ' - donated')
      } else {
        ret ? books.misc.push(title) : books.misc.push(title + ' - donated')
      }
    },

    lendBook: function(dept, index) {
      if (dept === 'science') {
        let lentBook = books.science.splice(index, 1)
        borrowed.push({ bk: lentBook.toString(), dpt: 'science' })
        console.log('The book has been added to your catalogue, happy reading 😊')
      } else if (dept === 'art') {
        let lentBook = books.art.splice(index, 1)
        borrowed.push({ bk: lentBook.toString(), dpt: 'art' })
        console.log('The book has been added to your catalogue, happy reading 😊')
      } else {
        let lentBook = books.misc.splice(index, 1)
        borrowed.push({ bk: lentBook.toString(), dpt: 'art' })
        console.log('The book has been added to your catalogue, happy reading 😊')
      }
    },

    returnBook: function(index) {
      let returning = borrowed.splice(index, 1)
      this.donateBook(returning[0].dpt, returning[0].bk, true)
      console.log('Thanks for returning 👍, hope it was a good read.')
    },

        countBooks: function (dept) {
            if (dept === 'science') {
                return books.science.length
            } else if (dept === 'art') {
                return books.art.length
            } else if (dept === 'misc') {
                return books.misc.length
            }
        },

        countBorrowed: function () {
            return borrowed.length
        }
  }


})()

//program start module
const start = (function() {
  return {
    run: function() {
      library.getMenu()

      let input = prompt('> ')
      switch (input) {
        case '0':
          //see available books
          viewBooks()
          clExit()
          break;
        case '1':
          //borrow a book
          borrow()
          break;
        case '2':
          //donate a book
          donate()
          console.log('Thank you for your donation😘 \n')
          setTimeout(() => {
            this.run()
          }, 2000);
          break;
        case '3':
          //see borrowed books
          console.log('\nBORROWED BOOKS:')
          library.getBorrowed()
          clExit()
          break;
        case '4':
          //return borrowed books
          console.log('\nRETURN BORROWED BOOKS:')
          returnBook()
          break;
        case '5':
          //exit
          console.log("Goodbye 👋, hope we'll see you soon")
          setTimeout(() => { }, 2000);
          break;

        default:
          console.log('Invalid response')
          loadNrestart()
          break;
      }
    }
  }
})()

const library = lib

//run program
const init = start
init.run()



/********************
 * Helper Functions
 ********************/

function viewBooks() {
  console.log('\nSELECT DEPARTMENT:')
  console.log('0: SCIENCE')
  console.log('1: ART')
  console.log('2: MISC')
  let input = prompt('> ')
  if (input === '0') {
    library.getBooks('science')
  } else if (input === '1') {
    library.getBooks('art')
  } else if (input === '2') {
    library.getBooks('misc')
  } else {
    console.log('Invalid resonse\n')
    init.run()
  }
}



function donate() {
  console.log('\nDONATE BOOK')
  console.log('--------------')
  console.log('\nSELECT DEPARTMENT:')
  console.log('0: SCIENCE')
  console.log('1: ART')
  console.log('2: MISC')
  let input = prompt('> ')
  if (input === '0') {
    let input = prompt('Enter book title: > ')
    library.donateBook('science', input)
  } else if (input === '1') {
    let input = prompt('Enter book title: > ')
    library.donateBook('art', input)
  } else if (input === '2') {
    let input = prompt('Enter book title: > ')
    library.donateBook('misc', input)
  } else {
    console.log('Invalid resonse\n')
    init.run()
  }
}


function borrow() {
    console.log('\nBORROW BOOK')
    console.log('--------------')
    console.log('\nSELECT DEPARTMENT:')
    console.log('0: SCIENCE')
    console.log('1: ART')
    console.log('2: MISC')
    let input = prompt('> ')
    if (input === '0') {
        library.getBooks('science', true)
        let input = prompt('Enter book index: > ')
        if (isNaN(input)) {
            console.log('Invalid response: Input is not a number')
            loadNrestart()
        } else {
            if (input >= library.countBooks('science')) {
                console.log('Invalid response: Input is greater than index')
                loadNrestart()
            } else {
                //check input for invalid responses
                library.lendBook('science', input)
                loadNrestart()
            }
        }
        
    } else if(input === '1') {
        library.getBooks('art', true)
        let input = prompt('Enter book index: > ')
        if (isNaN(input)) {
            console.log('Invalid response: Input is not a number')
            loadNrestart()
        } else {
            if (input >= library.countBooks('art')) {
                console.log('Invalid response: Input is greater than index')
                loadNrestart()
            } else {
                //check input for invalid responses
                library.lendBook('art', input)
                loadNrestart()
            }
        }
    } else if (input === '2') {
        library.getBooks('misc', true)
        let input = prompt('Enter book index: > ')
        if (isNaN(input)) {
            console.log('Invalid response: Input is not a number')
            loadNrestart()
        } else {
            if (input >= library.countBooks('misc')) {
                console.log('Invalid response: Input is greater than index')
                loadNrestart()
            } else {
                //check input for invalid responses
                library.lendBook('misc', input)
                loadNrestart()
            }
        }
    } else {
        console.log('Invalid resonse\n')
        init.run()
    }
}

function returnBook() {
    library.getBorrowed(true, clExit)
    let input = prompt('Enter book index: > ')
    //check user input for invalid responses
    if (isNaN(input)) {
        console.log('Invalid response: Input is not an index')
        loadNrestart()
    } else {
        if (input >= library.countBorrowed()) {
            console.log('Invalid response: Input is greater than index')
            loadNrestart()
        } else {
            library.returnBook(input)
            loadNrestart()
        }
    }
}

function clExit() {
  console.log("0: Back")
  let exit = prompt('> ')
  if (exit === '0') {
    console.log('\n')
    init.run()
  } else {
    console.log('Invalid response\n')
    init.run()
  }
}

function loadNrestart() {
  setTimeout(() => {
    console.log('\n')
    init.run()
  }, 2000);
}

module.exports = loadNrestart;