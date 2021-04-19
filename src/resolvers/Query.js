import { listAllUsers, getUserByEmail } from "../utils/auth";

const Query = {
  users: () => listAllUsers(),
  user: (parent, args) => getUserByEmail(args.email),
};

export default Query;
