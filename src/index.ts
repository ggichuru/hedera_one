import { Client } from "@hashgraph/sdk";
import { CONFIG } from "../config";
import { account } from "./utils/account";

const main = async () => {
  await account();
};

main();
