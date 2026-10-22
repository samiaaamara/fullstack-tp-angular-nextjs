
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim() || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    setMessage(
      "Formulaire valide ! Ceci est une démonstration : aucune authentification réelle n'est configurée."
    );
    setPassword("");
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-16 text-gray-900">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-blue-700">
          Connexion
        </h1>

        <p className="mb-6 text-gray-600">
          Remplissez le formulaire pour tester la validation.
        </p>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg bg-red-100 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mb-5 rounded-lg bg-green-100 p-3 text-sm text-green-700"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium"
            >
              Adresse e-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
                setMessage("");
              }}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium"
            >
              Mot de passe
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Au moins 6 caractères"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
                setMessage("");
              }}
              minLength={6}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          ← Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
