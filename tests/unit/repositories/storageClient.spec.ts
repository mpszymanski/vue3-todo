import storageClient from "@/repositories/storageClient";

class LocalStorageMock {
  private store: any;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string): string {
    return this.store[key] !== undefined ? this.store[key] : null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock()
});

beforeEach(() => {
  jest.clearAllMocks();
  window.localStorage.clear();
});

describe("storeClient.js", () => {
  it("store data in local storage", () => {
    storageClient.storeArray("foo", [{ name: "bar" }]);

    expect(window.localStorage.getItem("foo")).toStrictEqual(
      '[{"name":"bar"}]'
    );
  });

  it("retrieve data from local storage", () => {
    window.localStorage.setItem("foo", JSON.stringify([{ name: "bar" }]));

    expect(storageClient.getArray("foo")).toStrictEqual([{ name: "bar" }]);
  });

  it("getArray always return array", () => {
    expect(storageClient.getArray("non-existed")).toStrictEqual([]);
  });
});
