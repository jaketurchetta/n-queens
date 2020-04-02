/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var newBoard = new Board({ 'n': n });

  var placeRook = function (row = 0) {

    if (n === row) {
      return newBoard.rows();
    } else {
      for (var column = 0; column < n; column++) {
        newBoard.togglePiece(row, column);
        if (!(newBoard.hasAnyRooksConflicts())) {
          row++;
          return placeRook(row);
        }
        newBoard.togglePiece(row, column);
      }
    }
  };

  var solution = placeRook();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var newBoard = new Board({ 'n': n });
  var solutionCount = 0;

  var placeRook = function (row) {

    if (row === n) {
      solutionCount += 1;
      return;
    }
    for (var column = 0; column < n; column++) {
      newBoard.togglePiece(row, column);
      if (!newBoard.hasAnyRooksConflicts()) {
        placeRook(row + 1);
      }
      newBoard.togglePiece(row, column);
    }
  };

  placeRook(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var newBoard = new Board({ 'n': n });
  var solution = newBoard.rows();

  var callback = function() {
    solution = _.map(newBoard.rows(), function(row) {
      return row.slice();
    });
  };

  var placeQueen = function (row) {

    if (row === n) {
      return callback();
    }

    for (var column = 0; column < n; column++) {
      newBoard.togglePiece(row, column);
      if (!newBoard.hasAnyQueensConflicts()) {
        var result = placeQueen(row + 1);
        if (result) {
          return result;
        }
      }
      newBoard.togglePiece(row, column);
    }
  };

  var solution = placeQueen(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var newBoard = new Board({ 'n': n });
  var solutionCount = 0;

  var placeQueen = function (row) {

    if (row === n) {
      solutionCount += 1;
      return;
    }
    for (var column = 0; column < n; column++) {
      newBoard.togglePiece(row, column);
      if (!newBoard.hasAnyQueensConflicts()) {
        placeQueen(row + 1);
      }
      newBoard.togglePiece(row, column);
    }
  };

  placeQueen(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
