import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

// Firebase Admin SDK to access Firestore.
admin.initializeApp()
const db = admin.firestore()

/**
 * Create a user in firestore each time a new user signs up.
 */
export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    /**
     * Cherry pick user data to only send
     * what we actually need to the client.
     */
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerData: user.providerData,
    }

    db.collection('users').doc(user.uid).set(newUser)
  })
