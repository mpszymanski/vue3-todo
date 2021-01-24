import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import Tasks from "@/components/Tasks.vue";
import TasksItem from "@/components/TasksItem.vue";
import TasksInput from "@/components/TasksInput.vue";

jest.mock("@/repositories/tasksRepository", () => ({
  getTasks: jest.fn(() =>
    Promise.resolve([
      {
        id: "55e4456c-37fd-417e-a09d-595c3cc6d624",
        name: "Task 1",
        isDone: true
      },
      {
        id: "fd389d6a-ed23-48a9-b340-8065d5e391c5",
        name: "Task 2",
        isDone: false
      }
    ])
  )
}));

describe("Tasks.vue", () => {
  it("renders tasks list", async () => {
    const wrapper = shallowMount(Tasks);

    await flushPromises();

    expect(wrapper.findAllComponents(TasksItem).length).toBe(2);
  });

  it("toggle task status", async () => {
    const wrapper = mount(Tasks);

    await flushPromises();

    expect(
      wrapper
        .findAllComponents(TasksItem)[0]
        .find('[data-test="task-is-done"]')
        .exists()
    ).toBeTruthy();

    wrapper
      .findAllComponents(TasksItem)[0]
      .vm.$emit("toggle", "55e4456c-37fd-417e-a09d-595c3cc6d624");

    expect(
      wrapper
        .findAllComponents(TasksItem)[0]
        .find('[data-test="task-is-not-done"]')
        .exists()
    ).toBeTruthy();
  });

  it("remove task with confirmation", async () => {
    window.confirm = jest.fn(() => true);

    const wrapper = shallowMount(Tasks);

    await flushPromises();

    wrapper
      .findAllComponents(TasksItem)[1]
      .vm.$emit("remove", "fd389d6a-ed23-48a9-b340-8065d5e391c5");

    await nextTick();

    expect(wrapper.findAllComponents(TasksItem).length).toBe(1);
  });

  it("do not remove task without confirmation", async () => {
    window.confirm = jest.fn(() => false);

    const wrapper = shallowMount(Tasks);

    await flushPromises();

    wrapper
      .findAllComponents(TasksItem)[1]
      .vm.$emit("remove", "fd389d6a-ed23-48a9-b340-8065d5e391c5");

    await nextTick();

    expect(wrapper.findAllComponents(TasksItem).length).toBe(2);
  });

  it("add new task", async () => {
    const wrapper = mount(Tasks);

    await flushPromises();

    const taskName = "New task";

    wrapper.findComponent(TasksInput).vm.$emit("submit", taskName);

    await nextTick();

    expect(wrapper.findAllComponents(TasksItem).length).toBe(3);
    expect(wrapper.findAllComponents(TasksItem)[2].text()).toBe(taskName);
  });
});
