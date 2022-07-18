import { Account, MakePaymentRequest } from "../types";
import ValidatorInterface from "./validator.interface";

export default class BacsValidator implements ValidatorInterface {
  isValid(account: Account, request: MakePaymentRequest) {
    return true;
  }
}
