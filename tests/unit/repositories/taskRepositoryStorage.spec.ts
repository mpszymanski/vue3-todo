import taskRepositoryStorage from "@/repositories/storage/taskRepositoryStorage";
import storageClient from "@/repositories/storageClient";

beforeEach(() => {
  window.localStorage.clear();
});

jest.mock("@/repositories/storageClient", () => ({
  getArray: () => [{ id: "foo", name: "bar", isDone: false }],
  storeArray: () => null
}));

jest.mock("uuid", () => ({ v4: () => "55e4456c-37fd-417e-a09d-595c3cc6d624" }));

describe("taskRepositoryStorage.js", () => {
  it("can get all tasks", () => {
    const spyOnGetArray = jest.spyOn(storageClient, "getArray");

    taskRepositoryStorage.get();

    expect(spyOnGetArray).toHaveBeenCalledWith("tasks");
  });

  it("can create new task", () => {
    const spyOnGetArray = jest.spyOn(storageClient, "getArray");
    const spyOnStoreArray = jest.spyOn(storageClient, "storeArray");

    taskRepositoryStorage.create({ id: "baz", name: "bar", isDone: false });

    expect(spyOnGetArray).toHaveBeenCalledWith("tasks");
    expect(spyOnStoreArray).toHaveBeenCalledWith("tasks", [
      { id: "foo", name: "bar", isDone: false },
      { id: "baz", name: "bar", isDone: false }
    ]);
  });

  it("can create new task without passing ID", () => {
    const spyOnGetArray = jest.spyOn(storageClient, "getArray");
    const spyOnStoreArray = jest.spyOn(storageClient, "storeArray");

    taskRepositoryStorage.create({ name: "bar", isDone: false });

    expect(spyOnGetArray).toHaveBeenCalledWith("tasks");
    expect(spyOnStoreArray).toHaveBeenCalledWith("tasks", [
      { id: "foo", name: "bar", isDone: false },
      { id: "55e4456c-37fd-417e-a09d-595c3cc6d624", name: "bar", isDone: false }
    ]);
  });

  it("can toggle existing task", () => {
    const spyOnGetArray = jest.spyOn(storageClient, "getArray");
    const spyOnStoreArray = jest.spyOn(storageClient, "storeArray");

    taskRepositoryStorage.toggle("foo");

    expect(spyOnGetArray).toHaveBeenCalledWith("tasks");
    expect(spyOnStoreArray).toHaveBeenCalledWith("tasks", [
      { id: "foo", name: "bar", isDone: true }
    ]);
  });

  it("can toggle remove task", () => {
    const spyOnGetArray = jest.spyOn(storageClient, "getArray");
    const spyOnStoreArray = jest.spyOn(storageClient, "storeArray");

    taskRepositoryStorage.remove("foo");

    expect(spyOnGetArray).toHaveBeenCalledWith("tasks");
    expect(spyOnStoreArray).toHaveBeenCalledWith("tasks", []);
  });
});
