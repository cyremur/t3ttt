import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { GameState, useBearStore, useTTTStore } from "../datamodel/zustand";
import { FieldState, Player, TTTBoard } from "../datamodel/gamestate";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const { board, claimField, clearBoard } = useTTTStore((state) => state);

  return (
    <>
      <Head>
        <title>Create T3TTT App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Create <span className="text-purple-300">T3TTT</span> App
        </h1>
        <Board board={board} claimField={claimField} clearBoard={clearBoard} />
      </main>
    </>
  );
};

export default Home;

const Board = ({ board, claimField, clearBoard }: GameState) => {
  return (
    <div className="mt-3 grid grid-cols-3 gap-3 pt-3 text-center">
      {board.fields.map((row, i) =>
        row.map((field, j) => (
          <FieldCard
            key={`${i}, ${j}, ${field.state}`}
            fieldState={field.state}
            i={i}
            j={j}
            claimField={(i: number, j: number) => claimField(i, j, board.turn)}
          />
        ))
      )}
    </div>
  );
};

type FieldCardProps = {
  fieldState: FieldState;
  i: number;
  j: number;
  claimField: (i: number, j: number) => void;
};

const FieldCard = ({ fieldState, i, j, claimField }: FieldCardProps) => {
  return (
    <section
      className="flex h-28 w-28 min-w-full flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105"
      onClick={() => {
        console.log(`${i}, ${j}, X`);
        claimField(i, j);
      }}
    >
      <h2 className="text-5xl text-gray-700">{fieldState.toString()}</h2>
    </section>
  );
};
