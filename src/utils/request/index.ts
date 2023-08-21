import { config } from "dotenv";
import { request } from "https";
config();

type MethodT = "GET" | "POST";

const apiCall = (path: string, method?: MethodT) => {
  return new Promise((resolve, reject) => {});
};
