import create from "zustand";
import { Player, TTTBoard } from "./gamestate";

export type GameState = {
  board: TTTBoard;
  claimField: (i: number, j: number) => void;
  clearBoard: () => void;
};

export const useTTTStore = create<GameState>()((set) => ({
  board: new TTTBoard(),
  claimField: (i: number, j: number) =>
    set((state) => {
      state.board.claim(i, j);
      return {board: state.board};
    }),
  clearBoard: () => set({ board: new TTTBoard() }),
}));