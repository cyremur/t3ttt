import create from "zustand";
import { Player, TTTBoard } from "./gamestate";

export type GameState = {
  board: TTTBoard;
  claimField: (i: number, j: number, p: Player) => void;
  clearBoard: () => void;
};

export const useTTTStore = create<GameState>((set) => ({
  board: new TTTBoard(),
  claimField: (i: number, j: number, p: Player) =>
    set((state) => {
      state.board.claim(i, j, p);
      return {board: state.board};
    }),
  clearBoard: () => set({ board: new TTTBoard() }),
}));

export const useBearStore = create<{ bears: number }>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
