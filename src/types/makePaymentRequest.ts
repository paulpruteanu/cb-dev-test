import { PaymentScheme } from "./paymentScheme";

export interface MakePaymentRequest {
  creditorAccountNumber: string;
  debtorAccountNumber: string;
  amount: number;
  paymentDate: Date;
  paymentScheme: PaymentScheme;
}
