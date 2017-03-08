console.log('java sourced!');
var app = angular.module('BookApp', []);
app.controller('BookController', ['$http', function($http){
  console.log('created');
  var self = this;
  self.BookList = [];
  self.newBook = {}; // NOTE: user entry fields
  getBooks();
  function getBooks() {
    $http ({
      method: 'GET',
      url: '/books'
    }).then(function(response){
      self.BookList = response.data;
      console.log('response GET = ', self.BookList);
    });
  }
  self.addBook = function() {
    console.log('client-post exit = ', self.newBook);
    $http ({
      method: 'POST',
      url: '/books/new',
      data: self.newBook
    }).then(function(response){
      getBooks();
      self.newBook = {};
      console.log('response POST = ', response);
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





}]); // NOTE: app.controller
