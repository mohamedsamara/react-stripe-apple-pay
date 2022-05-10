import Stripe from "stripe";

import config from "@config/keys";

const stripe = new Stripe(config.stripe_secret_key, {
  apiVersion: "2020-08-27",
});

export default stripe;
