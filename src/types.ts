export interface CreateCheckoutData {
  stripePublicKey: string;
  stripeSecretKey: string;
  userEmail: string;
  price: string;
  successUrl: string;
  cancel_url: string;
}
