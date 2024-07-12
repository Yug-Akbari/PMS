import { firebaseAuth, firebaseDb } from './init'
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { setUserData, setAuthenticated, setUserPending } from '../redux/slices/user'
import store from '../redux/store/index'



export const firebaseGetUserInfoFromDb = async (id) => {
  try {
    const docRef = doc(firebaseDb, 'users', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error(error)
  }
}

const firebaseRegister = async (data) => {
  const { email, password, name, rememberMe } = data
  try {
    return await setPersistence(
      firebaseAuth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence,
    ).then(async () => {

      const user = createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        async ({ user }) => {
          if (user) {
            const infos = {
              displayName: name,
              name: name,
              email: user.email,
              uid: user.uid,
              createdAt: user.metadata.creationTime,
            }
            await setDoc(doc(firebaseDb, 'users', user.uid), infos)
          }
          return user
        },
      )
      return user
    })
  } catch (error) {
    throw error
  }
}


const firebaseGetCollectionWithId = async (id, collection) => {
  try {
    const docRef = doc(firebaseDb, collection, id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error(error)
  }
}

const firebaseGetAuthorizedUser = () => {
  const fn = firebaseAuth.onAuthStateChanged(async (userResponse) => {
    if (userResponse) {
      store.dispatch(
        setUserData({
          ...userResponse.reloadUserInfo,
          emailVerified: userResponse.emailVerified,
          phoneNumber: userResponse.phoneNumber,
          accessToken: userResponse.accessToken,
          uid: userResponse.uid,
        }),
      )
      store.dispatch(setAuthenticated(true))
      store.dispatch(setUserPending(false))
      const user = await firebaseGetUserInfoFromDb(userResponse.uid, 'users')
      store.dispatch(
        setUserData({
          ...user,
        }),
      )
    } else {
      console.log('not auth')
      store.dispatch(setAuthenticated(false))
      setTimeout(() => {
        store.dispatch(setUserPending(false))
      }, 1000)
    }
  })

  return fn
}



const firebaseLogin = async ({
  email,
  password,
  rememberMe,
}) => {

  const user = await setPersistence(
    firebaseAuth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence,
  ).then(async () => {
    const usr = await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        const user = await firebaseGetCollectionWithId(
          userCredential.user.uid,
          'users',
        )
        return {
          user: {
            ...user,
            ...userCredential.user.reloadUserInfo,
            uid: userCredential.user.uid,
            accessToken: userCredential.user.accessToken,
          },
        }
      })
    return usr
  })
  return user
}
export {
  firebaseRegister,
  firebaseLogin,
  firebaseGetAuthorizedUser,
}
