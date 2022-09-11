angular.module('myApp', []).controller('GameController', ['$scope', function($scope) {
	
	//Draw the board game
    $scope.size = 8;
    $scope.widths = [];

    //Draw board
    for(var i = 0; i < $scope.size; i++) { 
        $scope.widths.push(i);
    }
	
}]);

$(document).ready(function() {   
  var themes = [
      {
          name: 'ORANGE',
          boardBorderColor: '#FC4C02',
          lightBoxColor: '#FC4C02',
          darkBoxColor: '#FC4C02',
          optionColor: '#FC4C02',
          optionHoverColor: '#FC4C02'
      },
      {   
          name: 'BLUE',
          boardBorderColor: '#FC4C02',
          lightBoxColor: '#008E97',
          darkBoxColor: '#FC4C02',
          optionColor: '#FC4C02',
          optionHoverColor: '#FC4C02'
      },
  ];
    
    var colors = [
        {
            name: 'BLACK',
            color: '#000'
        }, 
    ];
    
    var colorOption = 0;
    var themeOption = 1;
   
    //Set up theme
    var setTheme = function() {
        var theme = themes[themeOption];
        
        $('#theme-option').html(theme.name);
        
        $('#board').css('border-color', theme.boardBorderColor);
        $('.light-box').css('background', theme.lightBoxColor);
        $('.dark-box').css('background', theme.darkBoxColor);
        
    }
    //Set up color for chess pieces
    var setColor = function() {
        var color = colors[colorOption];
        
        $('#color-option').html(color.name);
    }
	 

	

	var player = 'black'; //First player

	//Selected chess piece to move
	var select = {
		 canMove: false, //Ready to move of not
		 piece: '',      //Color, type of the piece
		 box: ''         //Position of the piece
	}

	//Game's history (pieces + positions)
	var historyMoves = [];

	//Position and color of pawn promotion
	var promotion = {};

	//Set up board game
	$(function() {		 
		$('#player').html(chessPieces.black.king);

		 //Set up color for boxes, chess pieces
		 for(var i = 0; i < 8; i++) {
			  for(var j = 0; j < 8; j++) {
					var box = $('#box-' + i + '-' + j);
					if((i + j) % 2 !== 0) {
						 box.addClass('light-box');
					} else {
						 box.addClass('dark-box');
					}
					setNewBoard(box, i, j); //Set up all chess pieces
			  }
		 }
		 setColor();
		 setTheme();
	});


		$(function() {
			 //Option menu
			 $('#option').on('click', function() {
				  if($('#option-menu').hasClass('hide')) {
						$('#game').css('opacity', '0.3');
						$('#option-menu').removeClass('hide');
				  } else {
						$('#game').css('opacity', '1');
						$('#option-menu').addClass('hide');
				  }
			 });

		 //Undo button 
		 $('#undo-btn').on('click', function() {
			  if(historyMoves.length === 0) {
					return;
			  }

			  //Reset all changes
			  $('.box').removeClass('selected');
			  $('.box').removeClass('suggest');

			  switchPlayer();

			  select = { canMove: false, piece: '', box: '' };
		 });

		 //Box click event
		 $('.box').on('click', function() {
			  if($(this).hasClass('selected')) { 
					$(this).removeClass('selected');

					$('.box').removeClass('suggest');
					select = { canMove: false, piece: '', box: '' };
					return;
			  }

			  
			  if(!select.canMove) {
					if($(this).attr('piece').indexOf(player) >= 0) {
						 selectPiece($(this));
					}
			  }

			  
			  else if(select.canMove) { 
					var selectedPieceInfo = select.piece.split('-');
					var color = selectedPieceInfo[0];
					var type = selectedPieceInfo[1];

				
					if($(this).attr('piece').indexOf(color) >= 0) {
						 $('#' + select.box).removeClass('selected');
						 $('.box').removeClass('suggest');
						 //Select a piece to move
						 selectPiece($(this));
						 return;
					}

					
					if($(this).hasClass('suggest')) { 

						 
						 var move = {
							  previous: {},
							  current: {}
						 }

						 move.previous.piece = select.piece;
						 move.previous.box = select.box;

						 move.current.piece = $(this).attr('piece');
						 move.current.box = $(this).attr('id');

						 historyMoves.push( move );

						 //Move selected piece successfully
						 setPiece($(this), color, type);

						 //Delete moved box
						 deleteBox($('#' + select.box));

						 $('.box').removeClass('suggest');

						 select = { canMove: false, piece: '', box: '' };

						 //Switch player
						 switchPlayer();
					}
			  }
		 });
	});

	//Get piece and position of the selected piece
	var selectPiece = function(box) {
		 box.addClass('selected');
		 select.box = box.attr('id');
		 select.piece = box.attr('piece');
		 select.canMove = true;

		 suggestNextMoves(getNextMoves(select.piece, select.box));
	}

	var getNextMoves = function(selectedPiece, selectedBox) {
		 var selectedPieceInfo = selectedPiece.split('-');
		 var color = selectedPieceInfo[0];
		 var type = selectedPieceInfo[1];

		 var id = selectedBox.split('-');
		 var i = parseInt(id[1]);
		 var j = parseInt(id[2]);

		 var nextMoves = [];

		 switch(type) {
			  case 'pawn':
					if(color === 'black') {
						 var moves = [
							  [0, 1], [0, 2], [1, 1], [-1, 1]
						 ];
					} else {
						 var moves = [
							  [0, -1], [0, -2], [1, -1], [-1, -1]
						 ];
					}
					nextMoves = getPawnMoves(i, j, color, moves);
					break;
			  case 'rook':
					var moves = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getQueenMoves(i, j, color, moves);
					break;
			  case 'knight':
					var moves = [
						 [-1, -2], [-2, -1], [1, -2], [-2, 1],
						 [2, -1], [-1, 2], [2, 1], [1, 2]
					];
					nextMoves = getKnightMoves(i, j, color, moves);
					break;
			  case 'bishop':
					var moves = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					nextMoves = getQueenMoves(i, j, color, moves);
					break;
			  case 'queen':
					var moves1 = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					var moves2 = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getQueenMoves(i, j, color, moves1)
									.concat(getQueenMoves(i, j, color, moves2));
					break;
			  case 'king':
					var moves = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1],
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getKnightMoves(i, j, color, moves);
					break;
			  default: 
					break;
		 }
		 return nextMoves;
	}

	//Calculate next moves for pawn pieces
	var getPawnMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var index = 0; index < moves.length; index++) {
			  var tI = i + moves[index][0];
			  var tJ = j + moves[index][1];
			  if( !outOfBounds(tI, tJ) ) {
					var box = $('#box-' + tI + '-' + tJ);

					if(index === 0) { //First line
						 if(!box.hasClass('placed')) {
							  nextMoves.push([tI, tJ]);
						 } else {
							  index++;
						 }
					} else if(index === 1) { //First line
						 if( ((color === 'black' && j === 1) ||
								 (color === 'white' && j === 6)) &&
							  !box.hasClass('placed')) {
							  nextMoves.push([tI, tJ]);
						 }
					} else if(index > 1) { //Other lines
						 if(box.attr('piece') !== '' && box.attr('piece').indexOf(color) < 0) {
							  nextMoves.push([tI, tJ]);
						 }
					}
			  }
		 }
		 return nextMoves;
	}

	//Set up piece for clicked box
	var setPiece = function(box, color, type) {


		 box.html(chessPieces[color][type]);
		 box.addClass('placed');
		 box.attr('piece', color + '-' + type);
	}

	//Delete selected element
	var deleteBox = function(box) {
		 box.removeClass('placed');
		 box.removeClass('selected');
		 box.removeClass('suggest');
		 box.html('');
		 box.attr('piece', '');
	}

	//Default board
	var setNewBoard = function(box, i, j) {
		 if(j === 7) {
			  if(i === 0 || i === 7) {
					setPiece(box, 'white', 'rook');
			  } else if(i === 1 || i === 6) {
					setPiece(box, 'white', 'knight');
			  } else if(i === 2 || i === 5) {
					setPiece(box, 'white', 'bishop');
			  } else if(i === 3) {
					setPiece(box, 'white', 'queen');
			  } else if(i === 4) {
					setPiece(box, 'white', 'king');
			  }
		 } else if(j === 6) {
			  setPiece(box, 'white', 'pawn');
		 } else if(j === 1) {
			  setPiece(box, 'black', 'pawn');
		 } else if(j === 0) {
			  if(i === 0 || i === 7) {
					setPiece(box, 'black', 'rook');
			  } else if(i === 1 || i === 6) {
					setPiece(box, 'black', 'knight');
			  } else if(i === 2 || i === 5) {
					setPiece(box, 'black', 'bishop');
			  } else if(i === 3) {
					setPiece(box, 'black', 'queen');
			  } else if(i === 4) {
					setPiece(box, 'black', 'king');
			  }
		 }
	}

	//Switch player
	var switchPlayer = function() {
		 if(player === 'black') {
			  $('#player').html(chessPieces.white.king);
			  player = 'white';
		 } else {
			  $('#player').html(chessPieces.black.king);
			  player = 'black';
		 }
	}

	//Restart game
	var resetGame = function() {

		 

		 historyMoves = [];
		 promotion = {};
	}
    
});


	//Check if position i, j is in the board game
	var outOfBounds = function(i, j) {
		 return ( i < 0 || i >= 8 || j < 0 || j >= 8 );
	}

	//Show possible moves by add suggestion to boxes
	var suggestNextMoves = function(nextMoves) {
		 for(var move of nextMoves) {
			  var box = $('#box-' + move[0] + '-' + move[1]);
			  box.addClass('suggest');
		 }
	}


  //Chess pieces
	var chessPieces = {
    'white': {
       'king': '&#9812;',
       'queen': '&#9813;',
       'rook': '&#9814;',
       'bishop': '&#9815;',
       'knight': '&#9816;',
       'pawn': '&#9817;'
    },
    'black': {
       'king': '&#9818;',
       'queen': '&#9819;',
       'rook': '&#9820;',
       'bishop': '&#9821;',
       'knight': '&#9822;',
       'pawn': '&#9823;'
    }
 };