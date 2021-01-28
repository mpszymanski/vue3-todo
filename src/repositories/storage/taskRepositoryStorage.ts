import taskRepository from "@/repositories/interfaces/taskRepository";
import Task from "@/interfaces/Task";
import storageClient from "@/repositories/storageClient";
import { v4 as uuid } from "uuid";

export default {
  get(): Task[] {
    return storageClient.getArray<Task[]>("tasks");
  },
  create(task: Task): void {
    const allTasks = storageClient.getArray<Task[]>("tasks");

    if (!task.id) {
      task.id = uuid();
    }

    allTasks.push(task);

    storageClient.storeArray("tasks", allTasks);
  },
  toggle(taskId: string): void {
    const allTasks = storageClient.getArray<Task[]>("tasks");
    const taskIndex = findTaskIndexById(allTasks, taskId);

    allTasks[taskIndex].isDone = !allTasks[taskIndex].isDone;

    storageClient.storeArray("tasks", allTasks);
  },
  remove(taskId: string): void {
    const allTasks = storageClient.getArray<Task[]>("tasks");

    allTasks.splice(findTaskIndexById(allTasks, taskId), 1);

    storageClient.storeArray("tasks", allTasks);
  }
} as taskRepository;

function findTaskIndexById(tasks: Task[], taskId: string) {
  return tasks.findIndex(task => task.id === taskId);
}
