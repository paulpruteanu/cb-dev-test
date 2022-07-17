import PaymentService from '../src/services/paymentService';
import { AccountStatus, AllowedPaymentSchemes, PaymentScheme } from '../src/types';
import AccountDatastoreMock from "./mocks/accountDatastoreMock";
import BackupAccountDatastoreMock from "./mocks/backupAccountDatastoreMock";
import DatastoreConfigMock from "./mocks/datastoreConfigMock";

jest.mock('../src/data/accountDatastore');
jest.mock('../src/data/backupAccountDatastore');
jest.mock('../src/config/datastore');

describe('When making payments', () => {
  const liveAccountDatastoreMock = new AccountDatastoreMock();
  const backupAccountDatastoreMock = new BackupAccountDatastoreMock();
  const datastoreConfigMock = new DatastoreConfigMock();
  afterEach(() => {
    datastoreConfigMock.reset();
  });
  describe('against a live environment', () => {
    beforeEach(() => {
      datastoreConfigMock.withMockedLive();
    });
    describe('when making a Bacs payment', () => {
      afterEach(() => {
        liveAccountDatastoreMock.reset();
      });
      it('should update account when account payment scheme is Bacs', () => {
        liveAccountDatastoreMock.withMockedBacsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Bacs,
        });
        expect(paymentResult.success).toBeTruthy();
        expect(liveAccountDatastoreMock.updateAccountMock).toHaveBeenCalledWith({
          accountNumber: 'fooAccount',
          accountStatus: AccountStatus.Live,
          allowedPaymentSchemes: AllowedPaymentSchemes.Bacs,
          balance: 2,
        });
      });

      it('should not update account when account payment scheme is not Bacs', () => {
        liveAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Bacs,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account is null', () => {
        liveAccountDatastoreMock.withMockedNullAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Bacs,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });
    });

    describe('when making a FasterPayments payment', () => {
      afterEach(() => {
        liveAccountDatastoreMock.reset();
      });
      it('should update account when account payment scheme is FasterPayments', () => {
        liveAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeTruthy();
        expect(liveAccountDatastoreMock.updateAccountMock).toHaveBeenCalledWith({
          accountNumber: 'fooAccount',
          accountStatus: AccountStatus.Live,
          allowedPaymentSchemes: AllowedPaymentSchemes.FasterPayments,
          balance: 2,
        });
      });

      it('should not update account when account payment scheme is not FasterPayments', () => {
        liveAccountDatastoreMock.withMockedBacsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when balance is too low', () => {
        liveAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 100,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account is null', () => {
        liveAccountDatastoreMock.withMockedNullAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });
    });

    describe('when making a Chaps payment', () => {
      afterEach(() => {
        liveAccountDatastoreMock.reset();
      });
      it('should update account when account payment scheme is Chaps', () => {
        liveAccountDatastoreMock.withMockedChapsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeTruthy();
        expect(liveAccountDatastoreMock.updateAccountMock).toHaveBeenCalledWith({
          accountNumber: 'fooAccount',
          accountStatus: AccountStatus.Live,
          allowedPaymentSchemes: AllowedPaymentSchemes.Chaps,
          balance: 2,
        });
      });

      it('should not update account when account payment scheme is not Chaps', () => {
        liveAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account is null', () => {
        liveAccountDatastoreMock.withMockedNullAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account status is not live', () => {
        liveAccountDatastoreMock.withMockedChapsDisabledAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(liveAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });
    });
  });
  describe('against a backup environment', () => {
    beforeEach(() => {
      datastoreConfigMock.withMockedBackup();
    });
    describe('when making a Bacs payment', () => {
      afterEach(() => {
        backupAccountDatastoreMock.reset();
      });
      it('should update account when account payment scheme is Bacs', () => {
        backupAccountDatastoreMock.withMockedBacsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Bacs,
        });
        expect(paymentResult.success).toBeTruthy();
        expect(backupAccountDatastoreMock.updateAccountMock).toHaveBeenCalledWith({
          accountNumber: 'fooAccount',
          accountStatus: AccountStatus.Live,
          allowedPaymentSchemes: AllowedPaymentSchemes.Bacs,
          balance: 2,
        });
      });

      it('should not update account when account payment scheme is not Bacs', () => {
        backupAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Bacs,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account is null', () => {
        backupAccountDatastoreMock.withMockedNullAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Bacs,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });
    });

    describe('when making a FasterPayments payment', () => {
      afterEach(() => {
        backupAccountDatastoreMock.reset();
      });
      it('should update account when account payment scheme is FasterPayments', () => {
        backupAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeTruthy();
        expect(backupAccountDatastoreMock.updateAccountMock).toHaveBeenCalledWith({
          accountNumber: 'fooAccount',
          accountStatus: AccountStatus.Live,
          allowedPaymentSchemes: AllowedPaymentSchemes.FasterPayments,
          balance: 2,
        });
      });

      it('should not update account when account payment scheme is not FasterPayments', () => {
        backupAccountDatastoreMock.withMockedBacsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when balance is too low', () => {
        backupAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 100,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account is null', () => {
        backupAccountDatastoreMock.withMockedNullAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.FasterPayments,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });
    });

    describe('when making a Chaps payment', () => {
      afterEach(() => {
        backupAccountDatastoreMock.reset();
      });
      it('should update account when account payment scheme is Chaps', () => {
        backupAccountDatastoreMock.withMockedChapsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeTruthy();
        expect(backupAccountDatastoreMock.updateAccountMock).toHaveBeenCalledWith({
          accountNumber: 'fooAccount',
          accountStatus: AccountStatus.Live,
          allowedPaymentSchemes: AllowedPaymentSchemes.Chaps,
          balance: 2,
        });
      });

      it('should not update account when account payment scheme is not Chaps', () => {
        backupAccountDatastoreMock.withMockedFasterPaymentsAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account is null', () => {
        backupAccountDatastoreMock.withMockedNullAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });

      it('should not update account when account status is not live', () => {
        backupAccountDatastoreMock.withMockedChapsDisabledAccount();
        const paymentService = new PaymentService();
        const paymentResult = paymentService.makePayment({
          creditorAccountNumber: 'foo',
          debtorAccountNumber: 'bar',
          amount: 10,
          paymentDate: new Date(),
          paymentScheme: PaymentScheme.Chaps,
        });
        expect(paymentResult.success).toBeFalsy();
        expect(backupAccountDatastoreMock.updateAccountMock).not.toHaveBeenCalled();
      });
    });
  });
});
