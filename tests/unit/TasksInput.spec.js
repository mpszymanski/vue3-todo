import { shallowMount } from "@vue/test-utils";
import TasksInput from "@/components/TasksInput.vue";

describe("TasksInput.vue", () => {
  it("emits event with task name on submit", () => {
    const taskName = "new task";
    const wrapper = shallowMount(TasksInput);

    wrapper.get('input[type="text"]').setValue(taskName);
    wrapper.trigger("submit");

    expect(wrapper.emitted().submit[0]).toEqual([taskName]);
  });

  it("cleans after submit", () => {
    const wrapper = shallowMount(TasksInput);

    wrapper.get('input[type="text"]').setValue("string to be removed");
    wrapper.trigger("submit");

    expect(wrapper.get('input[type="text"]').text()).toBe("");
  });

  it("can not be submitted with empty value", () => {
    const wrapper = shallowMount(TasksInput);
    wrapper.trigger("submit");

    expect(wrapper.emitted()).toStrictEqual({});
  });
});
