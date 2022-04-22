import { AccountBalanceQuery, Hbar, TransferTransaction } from "@hashgraph/sdk";
import { CONFIG } from "../../config";
import { account } from "./account";

export const transfer = async () => {
  // get created account id
  const { new_acc_id, client } = await account();

  // import your account id
  const acc_id = CONFIG.accId;

  // create a transfer transaction
  const sendHbar = await new TransferTransaction()
    .addHbarTransfer(acc_id!, Hbar.fromTinybars(-1000)) // sending account
    .addHbarTransfer(new_acc_id!, Hbar.fromTinybars(1000)) // Receiving account
    .execute(client);

  // Verify tx reached consensus
  const tx_receipt = await sendHbar.getReceipt(client);
  console.log("\nTransaction receipt status: ", tx_receipt.status.toString());

  // Get the cost of the query
  const queryCost = await new AccountBalanceQuery()
    .setAccountId(new_acc_id!)
    .getCost(client);

  console.log(`\nQuery cost: ${queryCost.toString()}`);

  // Get the new account balance
  const new_acc_balance = await new AccountBalanceQuery()
    .setAccountId(new_acc_id!)
    .execute(client);

  console.log(
    `\nNew account balance: ${new_acc_balance.hbars.toTinybars()} tinybars`
  );
};
