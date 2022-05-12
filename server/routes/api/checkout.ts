import * as express from "express";

import { success, failure } from "@utils/responder";
import stripe from "@utils/stripe";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  try {
    const { price, email, name } = req.body;

    const customer = await stripe.customers.create({ email, name });

    const subscription: any = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    success(res, {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      customer,
    });
  } catch (error) {
    failure(res, error);
  }
});

router.get("/plans", async (req: any, res: any) => {
  try {
    const products = await stripe.products.list();

    const product = products?.data?.filter((p) => p.name === "Lite")?.[0]?.id;
    const prices = await stripe.prices.list({
      product,
    });

    success(res, {
      prices: prices.data,
    });
  } catch (error) {
    failure(res, error);
  }
});

export default router;
