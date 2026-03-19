import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AideContact from "../pages/AideContact";

describe("AideConctact - Formulaire de message", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  test("affiche les champs nom, email et message", () => {
    render(
      <MemoryRouter>
        <AideContact />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/Nom :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message :/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Envoyer/i }),
    ).toBeInTheDocument();
  });

  test("Afficher un message de succès après l'envoi du formulaire", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    render(
      <MemoryRouter>
        <AideContact />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Nom :/i), {
      target: { value: "Elo" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail :/i), {
      target: { value: "test@test.fr" },
    });
    fireEvent.change(screen.getByLabelText(/Sujet :/i), {
      target: { value: "Question" },
    });
    fireEvent.change(screen.getByLabelText(/Message :/i), {
      target: { value: "Ceci est un test" },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByRole("button", { name: /Envoyer/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/message a bien été envoyé/i),
      ).toBeInTheDocument();
    });
  });
});
