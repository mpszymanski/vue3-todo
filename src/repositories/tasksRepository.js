export default {
  async getTasks() {
    const response = await fetch("/data/tasks.json");
    return response.json();
  }
};
