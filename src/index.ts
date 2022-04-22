import { Client } from "@hashgraph/sdk";
import { CONFIG } from "../config";

const main = async () => {
  // create a connection to the hedera testnet
  const client = Client.forTestnet();

  // Set operator info (acc to pay for tx and query fees)
  client.setOperator(CONFIG.accId!, CONFIG.pk!);
};

main();
