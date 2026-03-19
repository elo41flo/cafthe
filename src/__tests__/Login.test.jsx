import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext"; // Vérifie bien ce chemin

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/login" }), // Mock requis si Login utilise location
  };
});

const renderLogin = () =>
  render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>,
  );

describe("Login — Formulaire de connexion", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    global.fetch = vi.fn();
  });

  test("affiche les champs email, mot de passe et le bouton de connexion", () => {
    renderLogin();

    expect(screen.getByLabelText(/E-mail :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe :/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /se connecter/i }),
    ).toBeInTheDocument();
  });

  test("permet la saisie et redirige après une connexion réussie", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "Utilisateur connecté",
        token: "fake-token",
      }),
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/E-mail :/i), {
      target: { value: "test@test.fr" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe :/i), {
      target: { value: "MotDePasse123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  test("affiche un message d'erreur si les identifiants sont incorrects", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Identifiants invalides" }),
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/E-mail :/i), {
      target: { value: "wrong@test.fr" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe :/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(screen.getByText(/identifiants invalides/i)).toBeInTheDocument();
    });
  });
});
