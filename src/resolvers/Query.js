import { listAllUsers } from "../utils/auth";

const Query = {
  users: () => listAllUsers(),
};

export default Query;
