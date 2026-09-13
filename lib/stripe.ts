import Stripe from "stripe";

// Necesita STRIPE_SECRET_KEY in .env. Fara el, rutele de plata vor arunca eroare
// la runtime, dar restul aplicatiei (matching, dashboard-uri, admin) functioneaza normal.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-06-20",
});
