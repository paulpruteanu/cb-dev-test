import { Account, AllowedPaymentSchemes, MakePaymentRequest, PaymentScheme } from "../types";
import ValidatorInterface from "./validator.interface";
import BacsValidator from "./bacs.validator";
import FasterPaymentsValidator from "./fasterPayments.validator";
import ChapsValidator from "./chaps.validator";

export default class Validator implements ValidatorInterface {
  paymentSchemeMapping = {
    [AllowedPaymentSchemes.FasterPayments]: PaymentScheme.FasterPayments,
    [AllowedPaymentSchemes.Bacs]: PaymentScheme.Bacs,
    [AllowedPaymentSchemes.Chaps]: PaymentScheme.Chaps,
  };
  isValid(account: Account, request: MakePaymentRequest) {
    if (account === null || this.paymentSchemeMapping[account.allowedPaymentSchemes] !== request.paymentScheme) {
      return false;
    }
    return this.getValidator(request.paymentScheme).isValid(account, request);
  }
  getValidator(type: PaymentScheme) {
    switch (type) {
      case PaymentScheme.Bacs:
        return new BacsValidator();
      case PaymentScheme.FasterPayments:
        return new FasterPaymentsValidator();
      case PaymentScheme.Chaps:
        return new ChapsValidator();
      default:
        return { isValid: () => false };
    }
  }
}
