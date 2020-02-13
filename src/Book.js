import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component{
    
    handleChange = (event) => {
        this.props.book.shelf = event.target.value;
        this.props.changeBookShelf(this.props.book);
    }
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={
                            this.props.book.imageLinks ?
                            ({
                            width: 128, height: 188,
                            backgroundImage:  `url(${this.props.book.imageLinks.thumbnail})`
                        }) : ({
                            
                            width: 128, height: 188,
                            backgroundImage:  "url(http://via.placeholder.com/128x193?text=No%20Cover)"
                        })}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange} value={this.props.book.shelf == undefined ? 'none': this.props.book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">
                {Array.isArray(this.props.book.authors)? this.props.book.authors.join(', '):''}                       
                    </div>
            </div>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeBookShelf:PropTypes.func
}

export default Book;

