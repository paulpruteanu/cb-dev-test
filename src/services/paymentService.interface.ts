import { MakePaymentRequest, MakePaymentResult } from "../types";

export default interface PaymentServiceInterface {
  makePayment(request: MakePaymentRequest): MakePaymentResult;
}
