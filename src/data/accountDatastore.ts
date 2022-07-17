import { Account } from "../types";

export default class AccountDatastore {
  getAccount(accountNumber: string): Account {
    // Access database to retrieve account, code removed for brevity
    return {} as Account;
  }
  updateAccount(account: Account): void {
    // Update account in database, code removed for brevity
  }
}
