import React, { Fragment, useEffect, useState } from "react";
import { subscribeToFeatures } from "./utils";

export default function LoggedOut() {
  const [features, setFeatures] = useState("");

  useEffect(() => {
    return subscribeToFeatures(docs => {
      setFeatures(docs);
    });
  }, []);

  return (
    <div>
      <h1>Lights on Leyden</h1>
      <dl>
        {features &&
          features.map(f => (
            <Fragment key={f.title}>
              <dt style={{ color: "var(--green)", fontWeight: 700 }}>
                {f.title}
              </dt>
              <dd>{f.description}</dd>
            </Fragment>
          ))}
      </dl>
    </div>
  );
}
