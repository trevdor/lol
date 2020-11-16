import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfDay,
  endOfHour,
  endOfMinute,
  isBefore,
} from "date-fns";

import timTitleImg3 from "./images/sparkleTitle_800.png";
import pineWreath from "./images/pineWreath_389.png";

import css from "./LoggedOut.module.css";
import FeatureList from "./FeatureList";

function timeBtwn(now, targetDateString) {
  let tU = "";
  const targetMoment = new Date(targetDateString);
  const days = differenceInDays(targetMoment, new Date());
  const hours = differenceInHours(endOfDay(now), now);
  const minutes = differenceInMinutes(endOfHour(now), now);

  if (days) {
    tU += `${days}d `;
    tU += `${hours}h `;
  }

  if (!days && hours) {
    tU += `${hours}h `;
  }

  tU += `${(minutes + 1) % 60}m`;

  return tU;
}

function LoggedOut() {
  const areLightsOn = isBefore(new Date("12/01/2020"), new Date());

  return (
    <div className={css.siteWrapper}>
      <img
        alt="Lights on Leyden"
        className={css.timTitleImg3}
        loading="lazy"
        src={timTitleImg3}
      />
      {areLightsOn ? <FeatureList /> : <CountdownToLightsOn />}
    </div>
  );
}

function CountdownToLightsOn() {
  const [now, setNow] = useState(new Date());
  const [syncedWithClock, setSyncedWithClock] = useState(false);

  useEffect(() => {
    if (!syncedWithClock) {
      const theTimer = setTimeout(() => {
        setNow(new Date());
        setSyncedWithClock(true);
      }, differenceInSeconds(endOfMinute(now), now) * 1000);

      return () => clearTimeout(theTimer);
    }
  }, [syncedWithClock, now]);

  useEffect(() => {
    if (syncedWithClock) {
      setNow(new Date()); // don't miss the leading tick
      const theTimer = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(theTimer);
    }
  }, [syncedWithClock]);

  return (
    <div className={css.wreathWrapper}>
      <div className={css.wreathText}>
        <div className={css.timeUntil}>
          Lights turn on in <br />
          {timeBtwn(now, "12/01/2020")}
        </div>
      </div>
      <div className={css.wreath}>
        <img
          alt="pine wreath"
          loading="lazy"
          src={pineWreath}
          className={css.wreathImg}
        />
      </div>
    </div>
  );
}

export default LoggedOut;
