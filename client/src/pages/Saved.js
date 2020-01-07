import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import API from "../utils/API";

class Saved extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: '',
    author: '',
    description: '',
    image: '',
    link: ''
  };

  async componentDidMount() {
    this.loadBooks();
  }

  async loadBooks() {
    const result = await API.getBooks();
    this.setState({
      books: result.data
    });
  }

  handleDeleteClick = id => {
    API.deleteBook(id)
       .then(res => {
         this.setState({
           books: this.state.books.filter(book => book._id !== id)
         })
       })
       .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h3>Search for and Save Books of Interest</h3>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <div class="form-group row">
                        <div class="col-md-10">
                            <h3>{book.title}</h3>
                        </div>
                        <div class="col-sm-1">
                            <ViewBtn>{book.link}</ViewBtn>
                        </div>
                        <div class="col-sm-0">
                            <DeleteBtn onClick={() => this.handleDeleteClick(book._id)} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-10">
                            <h5>Written By: {book.author}</h5>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <img src={book.image}></img>
                        </div>
                        <div class="col-md-10">
                            <h6>{book.description}</h6>
                        </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
