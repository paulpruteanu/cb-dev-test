import { Account, MakePaymentRequest } from "../types";
import ValidatorInterface from "./validator.interface";

export default class FasterPaymentsValidator implements ValidatorInterface {
  isValid(account: Account, request: MakePaymentRequest) {
    return account.balance > request.amount;
  }
}
