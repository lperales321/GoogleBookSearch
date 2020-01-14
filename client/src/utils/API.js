import axios from "axios";

export default {
  // Search for book
  findBooks: function(title) {
    return axios({
      "method":"GET",
      "url":"https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=" + "AIzaSyDU0dlAtMCVbQUIp5gsOgZBu7V20dMk5jc"
      })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
      })
  },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
