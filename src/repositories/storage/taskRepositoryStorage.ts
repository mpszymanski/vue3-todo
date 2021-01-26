import taskRepository from "@/repositories/interfaces/taskRepository";
import Task from "@/interfaces/Task";
import storageClient from "@/repositories/storageClient";
import { v4 as uuid } from "uuid";

export default {
  get(): Task[] {
    return storageClient.get<Task[]>("tasks");
  },
  create(task: Task): void {
    const allTasks = storageClient.get<Task[]>("tasks");

    if (!task.id) {
      task.id = uuid();
    }

    allTasks.push(task);

    storageClient.set("tasks", allTasks);
  },
  toggle(taskId: string): void {
    const allTasks = storageClient.get<Task[]>("tasks");
    const taskIndex = findTaskIndexById(allTasks, taskId);

    allTasks[taskIndex].isDone = !allTasks[taskIndex].isDone;

    storageClient.set("tasks", allTasks);
  },
  remove(taskId: string): void {
    const allTasks = storageClient.get<Task[]>("tasks");

    allTasks.splice(findTaskIndexById(allTasks, taskId), 1);

    storageClient.set("tasks", allTasks);
  }
} as taskRepository;

function findTaskIndexById(tasks: Task[], taskId: string) {
  return tasks.findIndex(task => task.id === taskId);
}
