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
    
    //Set up background theme
    var setTheme = function() {
        var theme = themes[themeOption];
        
        $('#theme-option').html(theme.name);
        $('.light-box').css('background', theme.lightBoxColor);
        $('.option-nav').css('color', theme.optionColor)
    }
    
    //Set up color for  pieces
    var setColor = function() {
        var color = colors[colorOption];
        
        $('#color-option').html(color.name);
      
        $('#pawn-promotion-option').css('color', color['color']);
        
        $('#player').css('color', color['color']);
    }
	 

	var player = 'black'; //First move

	// chess piece to move first
	var select = {
		 canMove: false, //Ready to move of not
		 piece: '',      //Color, type of the piece
		 box: ''         //Position of the piece
	}

	//Set up board game on loading
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


		 //Box click event
		 $('.box').on('click', function() {
			  if($(this).hasClass('selected')) { //Undo
					$(this).removeClass('selected');

					$('.box').removeClass('suggest');
					select = { canMove: false, piece: '', box: '' };
					return;
			  }

			  //Select new box
			  if(!select.canMove) {
					if($(this).attr('piece').indexOf(player) >= 0) {
						 selectPiece($(this));
					}
			  }
			 
		 });
	});

	//Get piece and position for the selected piece
	var selectPiece = function(box) {
		 box.addClass('selected');
		 select.box = box.attr('id');
		 select.piece = box.attr('piece');
		 select.canMove = true;

		 suggestNextMoves(getNextMoves(select.piece, select.box));
	}

	//Set up piece for clicked box
	var setPiece = function(box, color, type) {

		 //Check end game (if king is defeated)
		 if(box.attr('piece').indexOf('king') >= 0) {
			  showWinner(player);

			  box.html(chessPieces[color][type]);
			  box.addClass('placed');
			  box.attr('piece', color + '-' + type);

			  return;
		 }
		
		 box.html(chessPieces[color][type]);
		 box.addClass('placed');
		 box.attr('piece', color + '-' + type);
	}

	//Default board state 
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

	//Restart game 
	var resetGame = function() {
	}

});


	// pieces
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