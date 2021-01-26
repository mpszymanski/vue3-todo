import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import Tasks from "@/components/Tasks.vue";
import TasksItem from "@/components/TasksItem.vue";
import TasksInput from "@/components/TasksInput.vue";
import taskRepositoryStorage from "@/repositories/storage/taskRepositoryStorage";

jest.mock("@/repositories/storage/taskRepositoryStorage");

const mockTask = {
  id: "55e4456c-37fd-417e-a09d-595c3cc6d624",
  name: "foo",
  isDone: false
};

describe("Tasks.vue", () => {
  it("renders tasks list", async () => {
    const spy = jest.spyOn(taskRepositoryStorage, "get");
    const wrapper = shallowMount(Tasks);

    expect(spy).toHaveBeenCalled();
  });

  it("toggle task status", async () => {
    const spy = jest.spyOn(taskRepositoryStorage, "toggle");
    const wrapper = shallowMount(Tasks);

    wrapper.vm.tasks = [mockTask];

    await nextTick();

    wrapper.findAllComponents(TasksItem)[0].vm.$emit("toggle", mockTask.id);

    expect(spy).toHaveBeenCalledWith(mockTask.id);
  });

  it("remove task with confirmation", async () => {
    window.confirm = jest.fn(() => true);

    const spy = jest.spyOn(taskRepositoryStorage, "remove");
    const wrapper = shallowMount(Tasks);

    wrapper.vm.tasks = [mockTask];

    await nextTick();

    wrapper.findAllComponents(TasksItem)[0].vm.$emit("remove", mockTask.id);

    expect(spy).toHaveBeenCalledWith(mockTask.id);
  });

  it("do not remove task without confirmation", async () => {
    window.confirm = jest.fn(() => false);

    const spy = jest.spyOn(taskRepositoryStorage, "remove");
    const wrapper = shallowMount(Tasks);

    wrapper.vm.tasks = [mockTask];

    await nextTick();

    wrapper.findAllComponents(TasksItem)[0].vm.$emit("remove", mockTask.id);

    expect(spy).not.toHaveBeenCalled();
  });

  it("add new task", async () => {
    const spy = jest.spyOn(taskRepositoryStorage, "create");
    const wrapper = shallowMount(Tasks);

    wrapper.findComponent(TasksInput).vm.$emit("submit", mockTask.name);

    await nextTick();

    expect(spy).toHaveBeenCalledWith({ isDone: false, name: "foo" });
  });
});
