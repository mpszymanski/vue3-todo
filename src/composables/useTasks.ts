import { ref, computed } from "vue";
import tasksRepository from "@/repositories/storage/taskRepositoryStorage";
import Task from "@/interfaces/Task";

export default function useTasks() {
  const tasks = ref<Task[]>([]);

  const fetchTasks = (): void => {
    tasks.value = tasksRepository.get();
  };

  const hasAnyTask = computed(() => (tasks.value ? tasks.value.length : false));

  const addTask = (taskName: string): void => {
    tasksRepository.create({
      name: taskName,
      isDone: false
    });

    fetchTasks();
  };

  const toggleTaskDone = (taskId: string): void => {
    tasksRepository.toggle(taskId);

    fetchTasks();
  };

  const removeTask = (taskId: string): void => {
    if (!confirm("Are you sure?")) {
      return;
    }

    tasksRepository.remove(taskId);

    fetchTasks();
  };

  const removeAllTasks = (): void => {
    if (!confirm("Are you sure?")) {
      return;
    }

    tasksRepository.removeAll();

    tasks.value = [];
  };

  return {
    tasks,
    hasAnyTask,
    fetchTasks,
    addTask,
    toggleTaskDone,
    removeTask,
    removeAllTasks
  };
}
