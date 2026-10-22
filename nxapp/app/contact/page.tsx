
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);

    if (name.trim().length < 2) {
      return;
    }

    if (message.trim().length < 10) {
      return;
    }

    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-16 text-gray-900">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-3 text-3xl font-bold text-blue-700">
          Contact
        </h1>

        <p className="mb-6 text-gray-600">
          Une question ? Remplissez le formulaire ci-dessous.
        </p>

        {success && (
          <div
            role="status"
            className="mb-6 rounded-lg bg-green-100 p-4 text-green-800"
          >
            Votre formulaire est valide. Ceci est une démonstration :
            votre message n’a pas été envoyé par e-mail.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-medium"
            >
              Nom complet
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Votre nom"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSuccess(false);
              }}
              minLength={2}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {name.length > 0 && name.trim().length < 2 && (
              <p className="mt-1 text-sm text-red-600">
                Le nom doit contenir au moins 2 caractères.
              </p>
            )}
          </div>
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
      setSuccess(false);
    }}
    required
    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />

  {email.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
      <p className="mt-1 text-sm text-red-600">
        Veuillez saisir une adresse e-mail valide.
      </p>
    )}
</div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-medium"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Écrivez votre message..."
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setSuccess(false);
              }}
              minLength={10}
              required
              className="w-full resize-y rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-sm text-gray-500">
              Au moins 10 caractères.
            </p>

            {message.length > 0 && message.trim().length < 10 && (
              <p className="mt-1 text-sm text-red-600">
                Votre message est trop court.
              </p>
            )}
          </div>

          <button
  type="submit"
  disabled={
    name.trim().length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.trim().length < 10
  }
  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
>
  Envoyer
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
