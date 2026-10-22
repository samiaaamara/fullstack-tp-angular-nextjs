
"use client";

type ChildProps = {
  states: string[];
  onSelect: (state: string) => void;
};

export default function Child({ states, onSelect }: ChildProps) {
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-lg font-semibold">
        Liste des villes
      </h3>

      {states.length === 0 ? (
        <p className="text-gray-500">Aucune ville disponible.</p>
      ) : (
        <ul className="space-y-2">
          {states.map((state) => (
            <li key={state}>
              <button
                type="button"
                onClick={() => onSelect(state)}
                className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                {state}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

