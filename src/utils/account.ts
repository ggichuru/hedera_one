import {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
} from "@hashgraph/sdk";
import { CONFIG } from "../../config";

export const account = async () => {
  // create a connection to the hedera testnet
  const client = Client.forTestnet();

  // Set operator info (acc to pay for tx and query fees)
  client.setOperator(CONFIG.accId!, CONFIG.pk!);

  // Create new keys
  const new_pk = await PrivateKey.generateED25519();
  const new_public_key = new_pk.publicKey;

  // Create new account with 1_000 tinybar starting balance
  const new_account = await new AccountCreateTransaction()
    .setKey(new_public_key)
    .setInitialBalance(Hbar.fromTinybars(1000))
    .execute(client);

  //  Get the new account ID
  const getReceipt = await new_account.getReceipt(client);
  const new_acc_id = getReceipt.accountId;

  // log the account ID
  console.log("New account ID:", new_acc_id?.toString());

  // Verify the Account Balance
  const acc_balance = await new AccountBalanceQuery()
    .setAccountId(new_acc_id!)
    .execute(client);

  // log account balance
  console.log(
    `\nThe new Account balance ${acc_balance.hbars.toTinybars()} tinybars`
  );
};
