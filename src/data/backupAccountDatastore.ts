import { Account } from "../types";

export default class BackupAccountDatastore {
  getAccount(accountNumber: string): Account {
    // Access backup data base to retrieve account, code removed for brevity
    return {} as Account;
  }
  updateAccount(account: Account): void {
    // Update account in backup database, code removed for brevity
  }
}
