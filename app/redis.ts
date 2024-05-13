import { Redis } from "@upstash/redis";

if (!process.env.KV_REST_API_TOKEN) {
  throw new Error("KV_REST_API_TOKEN is not defined");
}

const redis = new Redis({
  url: "https://resolved-martin-43908.upstash.io",
  token: process.env.KV_REST_API_TOKEN,
});

export default redis;
