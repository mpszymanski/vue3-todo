import { ref } from "vue";
import tasksRepository from "@/repositories/tasksRepository";
import { v4 as uuid } from "uuid";

export default function useTasks() {
  const tasks = ref([]);

  const fetchTasks = async () => {
    try {
      const { data } = await tasksRepository.getTasks();
      tasks.value = data;
    } catch (error) {
      /* istanbul ignore next */
      console.error(error);
    }
  };

  const addTask = taskName => {
    tasks.value.push({
      id: uuid(),
      name: taskName,
      isDone: false
    });
  };

  const toggleTaskDone = taskId => {
    const taskIndex = findTaskIndexById(taskId);

    tasks.value[taskIndex].isDone = !tasks.value[taskIndex].isDone;
  };

  const removeTask = taskId => {
    if (confirm("Are you sure?")) {
      tasks.value.splice(findTaskIndexById(taskId), 1);
    }
  };

  function findTaskIndexById(taskId) {
    return tasks.value.findIndex(task => task.id === taskId);
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    toggleTaskDone,
    removeTask
  };
}
