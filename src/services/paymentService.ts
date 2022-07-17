import {
  Account,
  MakePaymentRequest,
  MakePaymentResult,
  PaymentScheme,
  AccountStatus,
  AllowedPaymentSchemes,
} from '../types';
import DatastoreConfig from '../config/datastore';
import BackupAccountDatastore from '../data/backupAccountDatastore';
import AccountDatastore from '../data/accountDatastore';
import PaymentServiceInterface from './paymentService.interface';

export default class PaymentService implements PaymentServiceInterface {
  datastoreType: string;
  constructor() {
    const datastoreConfig = new DatastoreConfig();
    this.datastoreType = datastoreConfig.getConfig().datastoreType;
  }
  makePayment(request: MakePaymentRequest): MakePaymentResult {
    let account: Account;

    if (this.datastoreType === 'Backup') {
      let accountDatastore = new BackupAccountDatastore();
      account = accountDatastore.getAccount(request.debtorAccountNumber);
    } else {
      let accountDatastore = new AccountDatastore();
      account = accountDatastore.getAccount(request.debtorAccountNumber);
    }

    let result: MakePaymentResult = { success: true };

    switch (request.paymentScheme) {
      case PaymentScheme.Bacs:
        if (account === null) {
          result.success = false;
        } else if (account.allowedPaymentSchemes !== AllowedPaymentSchemes.Bacs) {
          result.success = false;
        }
        break;
      case PaymentScheme.FasterPayments:
        if (account === null) {
          result.success = false;
        } else if (account.allowedPaymentSchemes !== AllowedPaymentSchemes.FasterPayments) {
          result.success = false;
        } else if (account.balance < request.amount) {
          result.success = false;
        }
        break;
      case PaymentScheme.Chaps:
        if (account === null) {
          result.success = false;
        } else if (account.allowedPaymentSchemes !== AllowedPaymentSchemes.Chaps) {
          result.success = false;
        } else if (account.accountStatus !== AccountStatus.Live) {
          result.success = false;
        }
        break;
    }

    if (result.success) {
      account.balance -= request.amount;

      if (this.datastoreType === 'Backup') {
        let accountDatastore = new BackupAccountDatastore();
        accountDatastore.updateAccount(account);
      } else {
        let accountDatastore = new AccountDatastore();
        accountDatastore.updateAccount(account);
      }
    }

    return result;
  }
}
