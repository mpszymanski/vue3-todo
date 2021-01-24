import { ref } from "vue";
import { v4 as uuid } from "uuid";
import tasksRepository from "@/repositories/tasksRepository";
import Task from "@/interfaces/Task";

export default function useTasks() {
  const tasks = ref<Task[]>([]);

  const fetchTasks = async () => {
    try {
      tasks.value = await tasksRepository.getTasks();
    } catch (error) {
      /* istanbul ignore next */
      console.error(error);
    }
  };

  const addTask = (taskName: string) => {
    tasks.value.push({
      id: uuid(),
      name: taskName,
      isDone: false
    });
  };

  const toggleTaskDone = (taskId: string) => {
    const taskIndex = findTaskIndexById(taskId);

    tasks.value[taskIndex].isDone = !tasks.value[taskIndex].isDone;
  };

  const removeTask = (taskId: string) => {
    if (confirm("Are you sure?")) {
      tasks.value.splice(findTaskIndexById(taskId), 1);
    }
  };

  function findTaskIndexById(taskId: string) {
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
