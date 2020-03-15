import React, { useEffect, Fragment } from "react";
import { Router, Route } from "react-router-dom";
import { fetchDoc } from "./utils";
import { useAppState } from "./app-state";
// import UserDatePosts from "./UserDatePosts"
// import NotFound from "./NotFound"

export default function LoggedIn() {
  const [{ user }] = useAppState();

  // useEffect(() => {
  //   if (!user) {
  //     fetchDoc(`users/${auth.uid}`).then(user => {
  //       // okay to dispatch even if unmounted, might as well
  //       // get it in the app state cache
  //       dispatch({ type: "LOAD_USER", user })
  //     })
  //   }
  // }, [user, auth.uid, dispatch])

  return <h1>Logged in as {JSON.stringify(user)}</h1>;

  // user ?
  //   <Fragment>
  //     <div className="Main">
  //       <Router>
  //         <Route path=":uid/:date">
  //           {/* <UserDatePosts /> */}
  //         </Route>
  //         {/* <DefaultRoute>
  //           <NotFound />
  //         </DefaultRoute> */}
  //       </Router>
  //     </div>
  //   </Fragment>
  // ) : null
}
