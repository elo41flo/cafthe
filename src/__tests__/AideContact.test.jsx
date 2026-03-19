// On importe les outils de base de React et les fonctions de test
import React from "react";
// Render : affiche le composant dans un navigateur virtuel
// Screen : Permet de "regarder" ce qui est affiché à l'écran
// fireEvent : simule les actions
// WaitFor : attnd qu'un changement apparaisse
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// MemoryRouter : simule le routeur de mon site
import { MemoryRouter } from "react-router-dom";
// Les fonctions de structure de Vitest
import { describe, test, expect, vi, beforeEach } from "vitest";
// On importe la page qu'on veut tester
import AideContact from "../pages/AideContact";

// describe : On crée une boîte qui regroupe tous les tests de cette page
describe("AideConctact - Formulaire de message", () => {
  // beforeEach : Avant chaque test, on prépare le terrain
  beforeEach(() => {
    // On créer une doublure (mock) de la fonction fetch
    // pour éviter que le test n'envoie un vrai mail à chaque fois
    global.fetch = vi.fn();
  });
  // Premier Test : On vérifie juste si l'interface s'affiche bien
  test("affiche les champs nom, email et message", () => {
    // Arrange : On affiche la page dans le navigateur virtuel du test
    render(
      <MemoryRouter>
        <AideContact />
      </MemoryRouter>,
    );

    // Assert : On vérifie que les labels sont bien là
    // i signifie "insensible à la casse"
    expect(screen.getByLabelText(/Nom :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message :/i)).toBeInTheDocument();

    // On vérifie que le bouton d'envoie est présent
    expect(
      screen.getByRole("button", { name: /Envoyer/i }),
    ).toBeInTheDocument();
  });

  // Deuxième Test : On test le scénario où l'utilisateur envoie un message
  test("Afficher un message de succès après l'envoi du formulaire", async () => {
    // Arrange : On dit à notre doublure fetch de répondre "ok"
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    // On affiche la page
    render(
      <MemoryRouter>
        <AideContact />
      </MemoryRouter>,
    );

    // Act : On simule la saisie de l'utilisateur dans les champs
    // Target : { value : "..."} Simule ce que l'utilisateur tape
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

    // On clique sur la checkbox RGPD (Obligatoire pour l'envoyer)
    fireEvent.click(screen.getByRole("checkbox"));

    // On click sur le bouton "Envoyer"
    fireEvent.click(screen.getByRole("button", { name: /Envoyer/i }));

    // Assert : Comme l'envoi prend un peu de temps (asynchrone)
    // on utilise waitFor pour attendre que le message de succès apparaisse
    await waitFor(() => {
      expect(
        screen.getByText(/message a bien été envoyé/i),
      ).toBeInTheDocument();
    });
  });
});
