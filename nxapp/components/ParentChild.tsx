
"use client";

import { useState } from "react";
import Child from "./Child";

export default function ParentChild() {
  const [states, setStates] = useState<string[]>([
    "Tozeur",
    "Gafsa",
    "Tunis",
  ]);

  const [chosen, setChosen] = useState("");
  const [newState, setNewState] = useState("");

  function addState(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = newState.trim();

    if (!value) return;

    if (states.some((state) => state.toLowerCase() === value.toLowerCase())) {
      return;
    }

    setStates((previousStates) => [...previousStates, value]);
    setNewState("");
  }

  return (
    <section className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-2 text-2xl font-bold text-blue-700">
        Exercice 5 — Communication entre composants
      </h2>

      <p className="mb-4 text-gray-600">
        Le parent transmet la liste à l'enfant et reçoit la ville sélectionnée.
      </p>

      <form onSubmit={addState} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={newState}
          onChange={(event) => setNewState(event.target.value)}
          placeholder="Saisir une ville"
          aria-label="Nouvelle ville"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2"
        />

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
        >
          Ajouter
        </button>
      </form>

      <Child states={states} onSelect={setChosen} />

      <p className="mt-4 font-medium">
        Ville sélectionnée :{" "}
        <span className="text-blue-700">
          {chosen || "Aucune"}
        </span>
      </p>
    </section>
  );
}
