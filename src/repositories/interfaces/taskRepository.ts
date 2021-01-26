import Task from "@/interfaces/Task";

export default interface taskRepository {
  get(): Task[] | [];
  create(task: Task): Task;
  toggle(taskId: string): Task;
  remove(taskId: string): void;
}
