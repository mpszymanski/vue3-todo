import { shallowMount } from "@vue/test-utils";
import TasksItem from "@/components/TasksItem.vue";

describe("TasksItem.vue", () => {
  const task = {
    id: "55e4456c-37fd-417e-a09d-595c3cc6d624",
    name: "Task name",
    isDone: false
  };

  it("displays task name", () => {
    const wrapper = shallowMount(TasksItem, {
      props: {
        task
      }
    });

    expect(wrapper.text()).toBe(task.name);
  });

  it("emits toggle event", () => {
    const wrapper = shallowMount(TasksItem, {
      props: {
        task
      }
    });

    wrapper.get('[data-test="task"]').trigger("click");
    expect(wrapper.emitted().toggle[0]).toEqual([task.id]);
  });

  it("emits remove event", () => {
    const wrapper = shallowMount(TasksItem, {
      props: {
        task
      }
    });

    wrapper.get('[data-test="remove-task-button"]').trigger("click");
    expect(wrapper.emitted().remove[0]).toEqual([task.id]);
  });
});
