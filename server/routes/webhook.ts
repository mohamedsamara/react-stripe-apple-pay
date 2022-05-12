import * as express from "express";

const router = express.Router();

import config from "@config/keys";
import stripe from "@utils/stripe";

const endpointSecret = config.stripe_webhook_secret;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    const signature = request.headers["stripe-signature"] as any;

    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(err);
        console.log(`⚠️ Webhook signature verification failed.`);
        console.log(
          `⚠️ Check the env file and enter the correct webhook secret.`
        );
        return response.sendStatus(400);
      }
    }

    const dataObject = event.data.object as any;

    console.log("event.type---", event.type);

    let customer_id;
    let subscription_id;

    switch (event.type) {
      case "invoice.payment_succeeded":
        console.log("invoice.payment_succeeded------");

        if (dataObject["billing_reason"] == "subscription_create") {
          subscription_id = dataObject["subscription"];
          const payment_intent_id = dataObject["payment_intent"];
          customer_id = dataObject["customer"];

          const payment_intent = await stripe.paymentIntents.retrieve(
            payment_intent_id
          );

          await stripe.subscriptions.update(subscription_id, {
            default_payment_method: payment_intent.payment_method as any,
          });

          await stripe.customers.update(customer_id, {
            invoice_settings: {
              default_payment_method: payment_intent.payment_method as any,
            },
          });
        }
        break;

      case "invoice.payment_failed":
        console.log("invoice.payment_failed------");
        customer_id = dataObject["customer"];
        subscription_id = dataObject["subscription"];
        const attempt_count = dataObject["attempt_count"];
        const next_payment_attempt = dataObject["next_payment_attempt"];

        if (!next_payment_attempt) {
        }

        break;

      case "customer.subscription.deleted":
        break;

      case "customer.subscription.updated":
        break;

      case "checkout.session.completed":
        if (dataObject["mode"] === "setup") {
          const setupIntentId = dataObject["setup_intent"];

          const setupIntent = (await stripe.setupIntents.retrieve(
            setupIntentId
          )) as any;
          const paymentMethodId = setupIntent.payment_method;

          customer_id = setupIntent.metadata.customer_id;
          subscription_id = setupIntent.metadata.subscription_id;

          // Attach the PaymentMethod to the customer
          await stripe.paymentMethods.attach(paymentMethodId as any, {
            customer: customer_id,
          });

          //Set a default payment method for future invoices
          await stripe.customers.update(customer_id, {
            invoice_settings: {
              default_payment_method: paymentMethodId as any,
            },
          });

          //Set default_payment_method on the Subscription
          await stripe.subscriptions.update(subscription_id, {
            default_payment_method: paymentMethodId as any,
          });
        }
      default:
    }
    response.send();
  }
);

export default router;
