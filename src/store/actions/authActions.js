export const signIn = (credentials) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    });

  // firebase.logout();
};

export const signUp = (newUser) => (
  dispatch,
  getState,
  { getFirebase, getFireStore }
) => {
  const firebase = getFirebase();
  const firestore = getFirebase().firestore();
  // const firestore = getFireStore();

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((resp) =>
      firestore
        .collection('user')
        .doc(resp.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
        })
    )
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
};
