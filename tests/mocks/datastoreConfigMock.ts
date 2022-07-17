import Datastore from '../../src/config/datastore';

export default class DatastoreMock {
  private mockDatastore = Datastore as jest.Mock<Datastore>;

  public withMockedLive(): DatastoreMock {
    this.mockDatastore.mockImplementation(() => {
      return {
        getConfig() {
          return {
            datastoreType: 'Live',
          };
        },
      };
    });
    return this;
  }

  public withMockedBackup(): DatastoreMock {
    this.mockDatastore.mockImplementation(() => {
      return {
        getConfig() {
          return {
            datastoreType: 'Backup',
          };
        },
      };
    });
    return this;
  }

  public reset() {
    this.mockDatastore.mockClear();
  }
}
