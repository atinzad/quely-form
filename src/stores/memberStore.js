import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class MemberStore {
  member = null;
  constructor() {
    makeAutoObservable(this);
  }

  addMember = async (queue, newMember, fieldValues, navigate) => {
    try {
      newMember.queue = queue._id;
      newMember.fieldValues = fieldValues;

      const response = await instance.post("/members", newMember);
      this.member = response.data.payload;
      navigate("/Confirmation");
      console.log(response);
    } catch (error) {
      console.log("failed to add new member", error);
    }
  };
}

const memberStore = new MemberStore();
export default memberStore;
