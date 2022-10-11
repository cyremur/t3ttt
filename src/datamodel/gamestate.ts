export type Player = "X" | "O";
export type FieldState = Player | " ";

export class Field {
  state: FieldState;

  constructor() {
    this.state = " ";
  }

  claim(player: Player) {
    if (this.state === " ") {
      this.state = player;
    }
  }
}

export class TTTBoard {
  fields: Field[][];
  turn: Player;

  constructor() {
    this.fields = [
      [new Field(), new Field(), new Field()],
      [new Field(), new Field(), new Field()],
      [new Field(), new Field(), new Field()],
    ];
    this.turn = "X";
  }

  claim(i: number, j: number, p: Player) {
    this.getField(i, j).claim(p);
    switch (this.turn) {
      case "X":
        this.turn = "O";
        break;
      case "O":
        this.turn = "X";
        break;
    }
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
    if (this.getWinner() !== " ") {
      return true;
    }
    for (const row of this.fields) {
      for (const field of row) {
        if (field.state === " ") {
          return false;
        }
      }
    }
    return true;
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
    if (this.isWinner("X")) return "X";
    if (this.isWinner("O")) return "O";
    return " ";
  }
}
