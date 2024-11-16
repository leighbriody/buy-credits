import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import type { CreateCheckoutData } from "./types.ts";

export function buyCredits(): boolean {
  return true;
}

/***
 * Function to create the checkout
 */
export function createCheckout(
  createCheckout: CreateCheckoutData,
  stripe: Stripe
): Promise<Stripe.Response<Stripe.Checkout.Session>> {
  console.log("creating checkout");
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    payment_intent_data: {
      metadata: {
        userId: createCheckout.userEmail,
      },
    },
    line_items: [
      {
        price: createCheckout.price,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: createCheckout.successUrl,
    cancel_url: createCheckout.cancel_url,
  });
}

/***
 * a hook to allow the user to buy credit
 */
export function useBuyCredits(checkoutData: CreateCheckoutData): {
  buyCredits: () => Promise<void>;
} {
  console.log("use buy credits called");
  const stripeVar = new Stripe(checkoutData.stripeSecretKey, {
    apiVersion: "2024-10-28.acacia",
  });
  console.log("created stripe var");
  const stripePromise = loadStripe(checkoutData.stripePublicKey);
  return {
    buyCredits: async () => {
      const response = await createCheckout(checkoutData, stripeVar);
      console.log("created checkout");
      const stripe = await stripePromise;
      console.log("creating stripe promise");
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
      console.log("redirected to checkout");
    },
  };
}
