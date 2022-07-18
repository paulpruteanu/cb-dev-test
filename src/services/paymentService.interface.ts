import { MakePaymentRequest, MakePaymentResult } from "../types";
import AccountDatastore from "../data/accountDatastore";
import BackupAccountDatastore from "../data/backupAccountDatastore";

export default interface PaymentServiceInterface {
  datastoreType: string;
  accountDatastore: AccountDatastore | BackupAccountDatastore;
  makePayment(request: MakePaymentRequest): MakePaymentResult;
  getAccountDatastore(): AccountDatastore | BackupAccountDatastore;
}
