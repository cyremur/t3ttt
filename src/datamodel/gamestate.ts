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
    const row = this.fields[i];
    if (row === undefined) {
      throw new Error(`Out of bounds. i=${i}`);
    }
    const field = row[j];
    if (field === undefined) {
      throw new Error(`Out of bounds. i=${i}, j=${j}`);
    }
    field.claim(p);
    switch (this.turn) {
      case "X":
        this.turn = "O";
        break;
      case "O":
        this.turn = "X";
        break;
    }
  }
}
