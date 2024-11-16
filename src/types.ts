export interface CreateCheckoutData {
  stripePublicKey: string;
  userEmail: string;
  price: string;
  successUrl: string;
  cancel_url: string;
}
