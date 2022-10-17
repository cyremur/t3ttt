export type Player = "X" | "O";
export type FieldState = Player | " ";

export class Field {
  state: FieldState;
  board: TTTBoard;
  isWinning: boolean;

  constructor(board: TTTBoard) {
    this.state = " ";
    this.board = board;
    this.isWinning = false;
  }

  claim(player: Player) {
    if (this.state === " ") {
      this.state = player;
      this.board.endTurn();
    }
  }

  isClaimed() {
    return this.state !== " ";
  }

  markWinning() {
    this.isWinning = true;
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
    this.markWinner(player);
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

  markWinset(fields: Field[]) {
    for (const field of fields) {
      field.markWinning();
    }
  }

  markWinner(player: Player) {
    const winSet: Field[] = [];
    //match row
    for (let i = 0; i < 3; i++) {
      let ownsRow = true;
      for (let j = 0; j < 3; j++) {
        winSet.push(this.getField(i, j));
        if (player !== this.getField(i, j).state) {
          ownsRow = false;
          winSet.splice(0);
        }
      }
      if (ownsRow) {
        this.markWinset(winSet);
        this.winner = player;
      }
    }
    //match col
    for (let j = 0; j < 3; j++) {
      let ownsCol = true;
      for (let i = 0; i < 3; i++) {
        winSet.push(this.getField(i, j));
        if (player !== this.getField(i, j).state) {
          ownsCol = false;
          winSet.splice(0);
        }
      }
      if (ownsCol) {
        this.markWinset(winSet);
        this.winner = player;
      }
    }
    //diags
    let ownsD1 = true;
    let ownsD2 = true;
    for (let i = 0; i < 3; i++) {
      winSet.push(this.getField(i, i));
      if (player !== this.getField(i, i).state) {
        ownsD1 = false;
        winSet.splice(0);
      }
    }
    if (ownsD1) {
      this.markWinset(winSet);
      this.winner = player;
    }
    for (let i = 0; i < 3; i++) {
      winSet.push(this.getField(i, 2 - i));
      if (player !== this.getField(i, 2 - i).state) {
        ownsD2 = false;
        winSet.splice(0);
      }
    }
    if (ownsD2) {
      this.markWinset(winSet);
      this.winner = player;
    }
  }

  getWinner(): FieldState {
    return this.winner;
  }
}
