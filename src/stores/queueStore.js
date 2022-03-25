import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class QueueStore {
  queues = [];
  loading = true;
  constructor() {
    makeAutoObservable(this);
  }

  fetchQueues = async () => {
    try {
      const response = await instance.get("/queues");
      this.queues = response.data.payload;
      this.loading = false;
      console.log("this.queues", this.queues);
    } catch (error) {
      console.log("error");
    }
  };
}

const queueStore = new QueueStore();
queueStore.fetchQueues();
export default queueStore;
