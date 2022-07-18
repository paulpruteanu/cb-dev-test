import { Account, AccountStatus, MakePaymentRequest } from "../types";
import ValidatorInterface from "./validator.interface";

export default class ChapsValidator implements ValidatorInterface {
  isValid(account: Account, request: MakePaymentRequest) {
    return account.accountStatus === AccountStatus.Live;
  }
}
