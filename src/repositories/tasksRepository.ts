import Task from "@/interfaces/Task";
import ApiResponseData from "@/interfaces/ApiResponseJson";

export default {
  async getTasks(): Promise<Task[]> {
    const response = await fetch("/data/tasks.json");
    const responseJson = (await response.json()) as ApiResponseData;
    return responseJson.data;
  }
};
