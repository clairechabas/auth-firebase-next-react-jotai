import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

// Firebase Admin SDK to access Firestore.
admin.initializeApp()
const db = admin.firestore()

/**
 * Create user in Firestore on user account creation through Firebase Auth.
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

/**
 * Delete user in Firestore on user account deletion through Firebase Auth.
 */
export const deleteUserDocument = functions.auth
  .user()
  .onDelete(async (user) => {
    db.collection('users').doc(user.uid).delete()
  })
