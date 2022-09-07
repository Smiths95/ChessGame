// Debug Mode
var debug_mode = true;
// JSON Database
var database = [];
// JSON Game Database
var game = [];
// JSON Moves Database
var moves = [];
// Register Pieces
const pieces = {
  black: {
    king: { pos: "D8", icon: "chess-king",},
    queen: { pos: "E8", icon: "chess-queen",},
    bishop_1: { pos: "C8", icon: "chess-bishop",},
    bishop_2: { pos: "F8", icon: "chess-bishop",},
    knight_1: { pos: "B8", icon: "chess-knight",},
    knight_2: { pos: "G8", icon: "chess-knight",},
    rook_1: { pos: "A8", icon: "chess-rook",},
    rook_2: { pos: "H8", icon: "chess-rook",},
    pawn_1: { pos: "A7", icon: "chess-pawn",},
    pawn_2: { pos: "B7", icon: "chess-pawn",},
    pawn_3: { pos: "C7", icon: "chess-pawn",},
    pawn_4: { pos: "D7", icon: "chess-pawn",},
    pawn_5: { pos: "E7", icon: "chess-pawn",},
    pawn_6: { pos: "F7", icon: "chess-pawn",},
    pawn_7: { pos: "G7", icon: "chess-pawn",},
    pawn_8: { pos: "H7", icon: "chess-pawn",},
  },
  white: {
    king: { pos: "D1", icon: "chess-king",},
    queen: { pos: "E1", icon: "chess-queen",},
    bishop_1: { pos: "C1", icon: "chess-bishop",},
    bishop_2: { pos: "F1", icon: "chess-bishop",},
    knight_1: { pos: "B1", icon: "chess-knight",},
    knight_2: { pos: "G1", icon: "chess-knight",},
    rook_1: { pos: "A1", icon: "chess-rook",},
    rook_2: { pos: "H1", icon: "chess-rook",},
    pawn_1: { pos: "A2", icon: "chess-pawn",},
    pawn_2: { pos: "B2", icon: "chess-pawn",},
    pawn_3: { pos: "C2", icon: "chess-pawn",},
    pawn_4: { pos: "D2", icon: "chess-pawn",},
    pawn_5: { pos: "E2", icon: "chess-pawn",},
    pawn_6: { pos: "F2", icon: "chess-pawn",},
    pawn_7: { pos: "G2", icon: "chess-pawn",},
    pawn_8: { pos: "H2", icon: "chess-pawn",},
  },
};