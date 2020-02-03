import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import { Route ,Link} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    currentlyReading: [],
    read: [],
    wantToRead:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksResult) => {
      this.setState({
        books: booksResult,
        currentlyReading: booksResult.filter((b) => b.shelf === 'currentlyReading'),
        read: booksResult.filter((b) => b.shelf === 'read'),
        wantToRead: booksResult.filter((b)=>b.shelf === 'wantToRead')
      })
       console.log(this.state.books);
    })
  }
  changeBookShelf = (updatedbook) => {
    BooksAPI.update(updatedbook, updatedbook.shelf).then((result) => {
      if (result) {
        BooksAPI.getAll().then((booksResult) => {
          this.setState({
            books: booksResult,
            currentlyReading: booksResult.filter((b) => b.shelf === 'currentlyReading'),
            read: booksResult.filter((b) => b.shelf === 'read'),
            wantToRead: booksResult.filter((b) => b.shelf === 'wantToRead')
          })
        });
      }
    });
  }

  render() {
    return (
      <div className="app">
      <Route path='/' exact render={() => (
        
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                  <BookShelf changeBookShelf={this.changeBookShelf} title="Currently Reading" booksArray={this.state.currentlyReading}/>
                  <BookShelf changeBookShelf={this.changeBookShelf} title="Want to Read" booksArray={this.state.wantToRead}/>
                  <BookShelf changeBookShelf={this.changeBookShelf} title="Read" booksArray={this.state.read}/>
              </div>
            </div>
            <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
              </Link>
            </div>
          </div>
      )} />
      <Route path='/search' component={()=><SearchBooks changeBookShelf={this.changeBookShelf} />} />
      </div>
          
    )
  }
}

export default BooksApp
