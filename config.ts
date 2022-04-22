require("dotenv").config();

if (!process.env.ACCOUNT_ID && !process.env.PK) {
  throw new Error("ACCOUNT_ID and PRIVATE KEY must be set in .env");
}

export const CONFIG = {
  accId: process.env.ACCOUNT_ID,
  pk: process.env.PK,
};
