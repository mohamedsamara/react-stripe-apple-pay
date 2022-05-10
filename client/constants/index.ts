const ENV = process.env;

export const STRIPE_PUBLISHABLE_KEY = ENV.STRIPE_PUBLISHABLE_KEY || "";
export const STRIPE_SECRET_KEY = ENV.STRIPE_SECRET_KEY || "";

export const API_URL = `/api/v1`;
