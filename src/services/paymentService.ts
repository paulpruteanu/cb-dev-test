import {
  Account,
  AccountStatus,
  AllowedPaymentSchemes,
  MakePaymentRequest,
  MakePaymentResult,
  PaymentScheme,
} from "../types";
import DatastoreConfig from "../config/datastore";
import BackupAccountDatastore from "../data/backupAccountDatastore";
import AccountDatastore from "../data/accountDatastore";
import PaymentServiceInterface from "./paymentService.interface";

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
  paymentSchemeMapping = {
    [AllowedPaymentSchemes.FasterPayments]: PaymentScheme.FasterPayments,
    [AllowedPaymentSchemes.Bacs]: PaymentScheme.Bacs,
    [AllowedPaymentSchemes.Chaps]: PaymentScheme.Chaps,
  };
  isValidPayment(
    account: Account,
    request: MakePaymentRequest
  ): boolean {
    if (
      account === null ||
      this.paymentSchemeMapping[account.allowedPaymentSchemes] !== request.paymentScheme
    ) {
      return false;
    }
    if (
      request.paymentScheme === PaymentScheme.FasterPayments &&
      account.balance < request.amount
    ) {
      return false;
    }
    return !(
      request.paymentScheme === PaymentScheme.Chaps &&
      account.accountStatus !== AccountStatus.Live
    );
  }

  makePayment(request: MakePaymentRequest): MakePaymentResult {
    let account: Account = this.accountDatastore.getAccount(
      request.debtorAccountNumber
    );

    if (!this.isValidPayment(account, request)) {
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
