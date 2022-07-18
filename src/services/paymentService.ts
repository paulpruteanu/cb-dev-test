import {
  Account,
  MakePaymentRequest,
  MakePaymentResult,
} from "../types";
import DatastoreConfig from "../config/datastore";
import BackupAccountDatastore from "../data/backupAccountDatastore";
import AccountDatastore from "../data/accountDatastore";
import PaymentServiceInterface from "./paymentService.interface";
import Validator from "../validators/validator";

export default class PaymentService implements PaymentServiceInterface {
  datastoreType: string;
  accountDatastore: AccountDatastore | BackupAccountDatastore;
  constructor() {
    const datastoreConfig = new DatastoreConfig();
    this.datastoreType = datastoreConfig.getConfig().datastoreType;
    this.accountDatastore = this.getAccountDatastore();
  }
  getAccountDatastore(): AccountDatastore | BackupAccountDatastore {
    return this.datastoreType === "Backup"
      ? new BackupAccountDatastore()
      : new AccountDatastore();
  }

  makePayment(request: MakePaymentRequest): MakePaymentResult {
    let account: Account = this.accountDatastore.getAccount(
      request.debtorAccountNumber
    );

    if (!(new Validator().isValid(account, request))) {
      return {
        success: false,
      };
    }

    account.balance -= request.amount;
    this.accountDatastore.updateAccount(account);

    return {
      success: true,
    };
  }
}
