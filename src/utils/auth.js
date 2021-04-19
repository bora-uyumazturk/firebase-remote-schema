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
        userArray.push({ uid: userRecord.uid, email: userRecord.email });
      });

      token = listUsersResult.pageToken;
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
    const user = await admin.auth().getUserByEmail(email);
    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error) {
    return null;
  }
};

const getUserById = async (uid) => {
  try {
    const user = await admin.auth().getUser(uid);
    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error) {
    return null;
  }
};

export { listAllUsers, getUserByEmail, getUserById };
