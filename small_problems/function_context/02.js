let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let context = this;
    return [1, 2, 3].map(function(number) {
      return context.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies())