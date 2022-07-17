import AccountDatastore from '../../src/data/accountDatastore';
import { Account, AccountStatus, AllowedPaymentSchemes } from '../../src/types';

export default class AccountDatastoreMock {
  private mockAccountDatastore = AccountDatastore as jest.Mock<AccountDatastore>;
  updateAccountMock = jest.fn();

  withMockedBacsAccount(): AccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockAccountDatastore.mockImplementation(() => {
      return {
        getAccount(accountNumber: string): Account {
          return {
            accountNumber: 'fooAccount',
            balance: 12,
            accountStatus: AccountStatus.Live,
            allowedPaymentSchemes: AllowedPaymentSchemes.Bacs,
          };
        },
        updateAccount(account: Account) {
          return updateAccountMock(account);
        },
      };
    });
    return this;
  }

  withMockedFasterPaymentsAccount(): AccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockAccountDatastore.mockImplementation(() => {
      return {
        getAccount(accountNumber: string): Account {
          return {
            accountNumber: 'fooAccount',
            balance: 12,
            accountStatus: AccountStatus.Live,
            allowedPaymentSchemes: AllowedPaymentSchemes.FasterPayments,
          };
        },
        updateAccount(account: Account) {
          return updateAccountMock(account);
        },
      };
    });
    return this;
  }

  withMockedChapsAccount(): AccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockAccountDatastore.mockImplementation(() => {
      return {
        getAccount(accountNumber: string): Account {
          return {
            accountNumber: 'fooAccount',
            balance: 12,
            accountStatus: AccountStatus.Live,
            allowedPaymentSchemes: AllowedPaymentSchemes.Chaps,
          };
        },
        updateAccount(account: Account) {
          return updateAccountMock(account);
        },
      };
    });
    return this;
  }

  withMockedChapsDisabledAccount(): AccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockAccountDatastore.mockImplementation(() => {
      return {
        getAccount(accountNumber: string): Account {
          return {
            accountNumber: 'fooAccount',
            balance: 12,
            accountStatus: AccountStatus.Disabled,
            allowedPaymentSchemes: AllowedPaymentSchemes.Chaps,
          };
        },
        updateAccount(account: Account) {
          return updateAccountMock(account);
        },
      };
    });
    return this;
  }

  withMockedNullAccount(): AccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockAccountDatastore.mockImplementation(() => {
      return {
        getAccount(accountNumber: string): Account {
          return null as unknown as Account;
        },
        updateAccount(account: Account) {
          return updateAccountMock(account);
        },
      };
    });
    return this;
  }

  reset() {
    this.mockAccountDatastore.mockClear();
    this.updateAccountMock.mockClear();
  }
}
