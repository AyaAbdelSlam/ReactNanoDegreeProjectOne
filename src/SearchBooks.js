import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class SearchBooks extends Component{
  state = {
    filteredBooks:[]
  }
  

  filterBooks = (event) => {
    if (event.target.value.length > 0) {
      BooksAPI.search(event.target.value.toLowerCase()).then((result) => {
        this.setState({
          filteredBooks:result
        })
      }).catch((error) => {
        console.log(error);
      }) 
    } else if(event.target.value == '') {
      this.setState({
        filteredBooks: []
      });
    }
  }
  render() {
    this.state.filteredBooks.forEach((book) => {
      this.props.myBooks.forEach((myBook) => {
          if (myBook.id === book.id) {
              book.shelf = myBook.shelf
          }
      })
  });
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
                <button className="close-search">Close</button>
              </Link>
          <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.filterBooks}/>
          </div>
        </div>
        <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.filteredBooks.length > 0 ? (
                    this.state.filteredBooks.map((b) => (
                      <li>
                        <Book key={b.id} book={b} changeBookShelf={this.props.changeBookShelf}/>             
                      </li>
                    ))
                  ) : (
                      <li>No Books to show</li>
                  )
                }
          </ol>
        </div>
      </div>)
    }
}

SearchBooks.propTypes = {
  changeBookShelf: PropTypes.func,
  myBooks:PropTypes.array
}

export default SearchBooks;