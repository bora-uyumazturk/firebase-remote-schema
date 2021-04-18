import dotenv from "dotenv";
dotenv.config();

import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

// get all user emails
const listAllUsers = async () => {
  try {
    let userArray = [];
    let token;

    while (true) {
      const listUsersResult = await admin.auth().listUsers(1000, token);

      listUsersResult.users.forEach((userRecord) => {
        userArray.push({ email: userRecord.email });
      });

      token = listUsersResult.pageToken;
      console.log(token);
      if (!token) {
        break;
      }
    }

    return userArray;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (error) {
    return null;
  }
};

export { listAllUsers, getUserByEmail };
