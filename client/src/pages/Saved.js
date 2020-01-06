import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
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

  // Add code here to get all books from the database and save them to this.state.books
  // async componentDidMount() {
  //   const result = await API.getBooks();
  //   this.setState({
  //     books: result.data
  //   });
  // }
  async componentDidMount() {
    this.loadBooks();
  }

  async loadBooks() {
    const result = await API.getBooks();
    this.setState({
      books: result.data
    });
  }

  //without using async
  //componentDidMount(){
  // API.getBooks().then(result => this.setState({books: result.data}));
  //}

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
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

  handleDeleteClick = id => {
    API.deleteBook(id)
       //.then(res => this.loadBooks())
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
          {/* <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" onChange={this.handleInputChange} />
              <Input name="author" placeholder="Author (required)" onChange={this.handleInputChange} />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" onChange={this.handleInputChange} />
              <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
            </form>
          </Col> */}
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h3>Search for and Save Books of Interest</h3>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                        {book.description}
                        {book.image}
                        {book.link}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.handleDeleteClick(book._id)} />
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
