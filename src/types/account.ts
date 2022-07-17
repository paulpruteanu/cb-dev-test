import { AccountStatus } from "./accountStatus";
import { AllowedPaymentSchemes } from "./allowedPaymentSchemes";

export interface Account {
  accountNumber: string;
  balance: number;
  accountStatus: AccountStatus;
  allowedPaymentSchemes: AllowedPaymentSchemes;
}
