import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component{

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.props.booksArray.map((b) => (
                            <li>
                                <Book key={b.id} book={b} changeBookShelf={this.props.changeBookShelf} />                        
                            </li>
                        ))
                    }                      
                    </ol>
                  </div>
            </div>
        );
    }
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    booksArray: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func
}
export default BookShelf;