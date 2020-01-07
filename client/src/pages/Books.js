import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: '',
    author: '',
    description: '',
    image: '',
    link: ''
  };

  // Get all books from the database and save them to this.state.books
  async componentDidMount() {
    this.loadBooks();
  }

  async loadBooks() {
    const result = await API.getBooks();
    this.setState({
      books: result.data
    });
  }

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSaveClick = event => {
    // When the form is submitted, prevent its default behavior, get books, update the books state
    event.preventDefault();

    const {title, author, description, image, link} = this.state;

    if (title && author && description && image && link) {
      API.saveBook({
        title,
        author,
        description,
        image,
        link
      })
      // .then(res => {
      //   this.loadBooks();
      // })
      .then(res => this.setState({
        books: [res.data, ...this.state.books]
      })
      )
      .catch(err => console.log(err));
    }
    
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
          <div class="card">
            <div class="card-body">
              Book Search

              <Input name="title" placeholder="Title" onChange={this.handleInputChange} />
              <FormBtn onClick={this.handleSearchClick}>Search</FormBtn>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              Results

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
                              <SaveBtn onClick={() => this.handleSaveClick(book._id)} />
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
            </div>
          </div>
          
          
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
