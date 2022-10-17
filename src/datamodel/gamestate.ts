export type Player = "X" | "O";
export type FieldState = Player | " ";

export class Field {
  state: FieldState;
  board: TTTBoard;

  constructor(board: TTTBoard) {
    this.state = " ";
    this.board = board;
  }

  claim(player: Player) {
    if (this.state === " ") {
      this.state = player;
      this.board.endTurn();
    }
  }
}

export class TTTBoard {
  fields: Field[][];
  turn: number;
  winner: FieldState;

  constructor() {
    this.fields = [
      [new Field(this), new Field(this), new Field(this)],
      [new Field(this), new Field(this), new Field(this)],
      [new Field(this), new Field(this), new Field(this)],
    ];
    this.turn = 0;
    this.winner = " ";
  }

  getActivePlayer(): Player {
    return this.turn % 2 == 0 ? "X" : "O";
  }

  claim(i: number, j: number) {
    this.getField(i, j).claim(this.getActivePlayer());
  }

  endTurn() {
    const player = this.getActivePlayer();
    if (this.isWinner(player)) {
      this.winner = player;
    }
    this.turn += 1;
  }

  getField(i: number, j: number) {
    const row = this.fields[i];
    if (row === undefined) {
      throw new Error(`Out of bounds. i=${i}`);
    }
    const field = row[j];
    if (field === undefined) {
      throw new Error(`Out of bounds. i=${i}, j=${j}`);
    }
    return field;
  }

  isOver() {
    if (this.winner !== " ") {
      return true;
    }
    return this.turn >= 9;
  }

  isWinner(player: Player) {
    //match row
    for (let i = 0; i < 3; i++) {
      let ownsRow = true;
      for (let j = 0; j < 3; j++) {
        if (player !== this.getField(i, j).state) {
          ownsRow = false;
        }
      }
      if (ownsRow) {
        return true;
      }
    }
    //match col
    for (let j = 0; j < 3; j++) {
      let ownsCol = true;
      for (let i = 0; i < 3; i++) {
        if (player !== this.getField(i, j).state) {
          ownsCol = false;
        }
      }
      if (ownsCol) {
        return true;
      }
    }
    //diags
    let ownsD1 = true;
    let ownsD2 = true;
    for (let i = 0; i < 3; i++) {
      if (player !== this.getField(i, i).state) {
        ownsD1 = false;
      }
      if (player !== this.getField(i, 2 - i).state) {
        ownsD2 = false;
      }
    }
    return ownsD1 || ownsD2;
  }

  getWinner(): FieldState {
    return this.winner;
  }
}
