import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class MemberStore {
  member = null;
  constructor() {
    makeAutoObservable(this);
  }

  addMember = async (queue, newMember, navigate) => {
    try {
      newMember.queue = queue._id;

      const response = await instance.post("/members", newMember);
      this.member = response.data.payload;
      console.log("dataaa");
      navigate("/Confirmation");

      console.log(response);
    } catch (error) {
      console.log("failed to add new member", error);
    }
  };
}

const memberStore = new MemberStore();
export default memberStore;
