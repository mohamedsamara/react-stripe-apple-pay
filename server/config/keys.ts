import "dotenv/config";

import { IConfigKeys } from "@/types/config";

const ENV = process.env;
const PORT: number = parseInt(ENV.PORT as string, 10);

const config: IConfigKeys = {
  node_env: ENV.NODE_ENV || "production",
  port: PORT || 3000,
  stripe_publishable_key: ENV.STRIPE_PUBLISHABLE_KEY || "",
  stripe_secret_key: ENV.STRIPE_SECRET_KEY || "",
  stripe_webhook_secret:
    ENV.STRIPE_WEBHOOK_SECRET ||
    "whsec_00c1393382f866879458ec07a2d059ffd40d1b295f16dba6909e09296d0cd6b0",
  api_url: `/api/v1`,
};

export default config;
