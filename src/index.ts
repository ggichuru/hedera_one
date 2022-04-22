import { Client } from "@hashgraph/sdk";
import { CONFIG } from "../config";
import { account } from "./utils/account";
import { transfer } from "./utils/transfer";

const main = async () => {
  await transfer();
};

main();
