import { db, auth, mode } from "./db.real.js";
// import { db, auth, mode } from "./db.fake.js";

export { auth, db, mode };

export const DATE_FORMAT = "yyyy-MM-DD";

export function login(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth().signOut();
}

export function onAuthStateChanged(callback) {
  return auth().onAuthStateChanged(callback);
}

export const fetchUser = limitCalls(async function fetchUser(uid) {
  return fetchDoc(`users/${uid}`);
});

export const fetchDoc = limitCalls(function fetchDoc(path) {
  return db
    .doc(path)
    .get()
    .then((doc) => doc.data());
});

export const subscribeToPenguins = limitCalls(function subscribeToPenguins(
  callback
) {
  let doc = db.collection("features").doc("penguins");

  return doc.onSnapshot((snapshot) => callback(getDataFromDoc(snapshot)));
});

export const subscribeToFeatures = limitCalls(function subscribeToFeatures(
  callback
) {
  let collection = db.collection("features").orderBy("name");

  return collection.onSnapshot((snapshot) =>
    callback(getDocsFromSnapshot(snapshot))
  );
});

export const fetchVotes = limitCalls(function fetchVotes() {
  return db
    .collection("posts")
    .orderBy("createdAt")
    .get()
    .then(getDocsFromSnapshot);
});

// export async function like(like) {
//   return db
//     .collection("likes")
//     .add({ createdAt: Date.now(), ...like })
//     .then(ref => ref.get())
//     .then(doc => ({ ...doc.data(), id: doc.id }));
// }

export const getFeatures = limitCalls(function getFeatures(uid) {
  return db
    .collection("features")
    .orderBy("title")
    .get()
    .then(getDocsFromSnapshot);
});

export const loadVotes = limitCalls(function loadVotes(createdAtMax, limit) {
  return db
    .collection("votes")
    .orderBy("createdAt", "desc")
    .where("createdAt", "<", createdAtMax)
    .limit(limit)
    .get()
    .then(getDocsFromSnapshot);
});

export const subscribeToNewVotes = limitCalls(function subscribeToNewVotes(
  createdAtMin,
  callback
) {
  return db
    .collection("posts")
    .orderBy("createdAt", "desc")
    .where("createdAt", ">=", createdAtMin)
    .onSnapshot((snapshot) => {
      callback(getDocsFromSnapshot(snapshot));
    });
});

export function sortByCreatedAtDescending(a, b) {
  return b.createdAt - a.createdAt;
}

export async function like(featureRef, uid) {
  featureRef.transaction(function (feature) {
    if (feature) {
      if (feature.stars && feature.stars[uid]) {
        feature.starCount--;
        feature.stars[uid] = null;
      } else {
        feature.starCount++;
        if (!feature.stars) {
          feature.stars = {};
        }
        feature.stars[uid] = true;
      }
    }
    return feature;
  });
}

function getDataFromDoc(doc) {
  return { ...doc.data(), id: doc.id };
}

function getDocsFromSnapshot(snapshot) {
  const docs = [];
  snapshot.forEach((doc) => {
    docs.push(getDataFromDoc(doc));
  });
  return docs;
}

function limitCalls(fn, limit = 20) {
  let calls = 0;
  return (...args) => {
    calls++;
    if (calls > limit) {
      throw new Error(
        `EASY THERE: You've called "${fn.name}" too many times too quickly, did you forget the second argument to useEffect? Also, this is a message from React Training, not React.`
      );
    } else {
      setTimeout(() => (calls = 0), 3000);
    }
    return fn(...args);
  };
}
