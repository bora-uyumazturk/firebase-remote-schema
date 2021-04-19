import { listAllUsers, getUserByEmail, getUserById } from "../utils/auth";

const Query = {
  users: () => listAllUsers(),
  userByEmail: (parent, args) => getUserByEmail(args.email),
  userById: (parent, args) => getUserById(args.uid),
};

export default Query;
