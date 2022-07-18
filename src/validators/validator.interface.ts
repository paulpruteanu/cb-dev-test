import { Account, MakePaymentRequest, PaymentScheme } from "../types";

export default interface ValidatorInterface {
  isValid(account: Account, request: MakePaymentRequest): boolean;
  getValidator?(type: PaymentScheme): ValidatorInterface;
}
