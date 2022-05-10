import "dotenv/config";
import * as fs from "fs";

import { IConfigKeys } from "@/types/config";

const ENV = process.env;
const PORT: number = parseInt(ENV.PORT as string, 10);

const config: IConfigKeys = {
  node_env: ENV.NODE_ENV || "production",
  port: PORT || 3000,
  stripe_publishable_key: ENV.STRIPE_PUBLISHABLE_KEY || "",
  stripe_secret_key: ENV.STRIPE_SECRET_KEY || "",
};

export default config;
