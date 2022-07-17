import BackupAccountDatastore from '../../src/data/backupAccountDatastore';
import { Account, AccountStatus, AllowedPaymentSchemes } from '../../src/types';

export default class BackupAccountDatastoreMock {
  private mockBackupAccountDatastore = BackupAccountDatastore as jest.Mock<BackupAccountDatastore>;
  public updateAccountMock = jest.fn();

  withMockedBacsAccount(): BackupAccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockBackupAccountDatastore.mockImplementation(() => {
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

  withMockedFasterPaymentsAccount(): BackupAccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockBackupAccountDatastore.mockImplementation(() => {
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

  withMockedChapsAccount(): BackupAccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockBackupAccountDatastore.mockImplementation(() => {
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

  withMockedChapsDisabledAccount(): BackupAccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockBackupAccountDatastore.mockImplementation(() => {
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

  withMockedNullAccount(): BackupAccountDatastoreMock {
    const updateAccountMock = this.updateAccountMock;
    this.mockBackupAccountDatastore.mockImplementation(() => {
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

  public reset() {
    this.mockBackupAccountDatastore.mockClear();
    this.updateAccountMock.mockClear();
  }
}
