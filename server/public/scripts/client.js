console.log('javascript wizardry!');
var app = angular.module('BookApp', []);
app.controller('BookController', ['$http', function($http){
  console.log('created');
  var self = this;
  self.BookList = [];
  self.newBook = {};

  getBooks();

  function getBooks() {
    $http ({
      method: 'GET',
      url: '/books'
    }).then(function(response){
      self.BookList = response.data;
    });
  }

  self.addBook = function() {
    $http ({
      method: 'POST',
      url: '/books/new',
      data: self.newBook
    }).then(function(response){
      getBooks();
      self.newBook = {};
    });
  }

self.deleteBook = function(idOfBookToDelete){
  $http({
    method: 'DELETE',
    url: '/books/delete/' + idOfBookToDelete
  }).then(function(response){
    getBooks();
  });
}

self.updateBook = function(book){
  $http({
    method: 'PUT',
    url: '/books/save/' + book.id,
    data: book
  }).then(function(response){
    getBooks();
  });
}



}]); // end of app.controller
