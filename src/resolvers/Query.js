import { listAllUsers, getUserByEmail } from "../utils/auth";

const Query = {
  users: () => listAllUsers(),
  user: (args) => getUserByEmail(args.email),
};

export default Query;
