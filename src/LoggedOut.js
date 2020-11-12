import { useEffect, useState } from "react";
import { Box, Flex, Heading, Stack, Text, useTheme } from "@chakra-ui/core";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfDay,
  endOfHour,
  endOfMinute,
} from "date-fns";

import { subscribeToFeatures } from "./utils";

import timTitleImg3 from "./images/sparkleTitle_800.png";
import pineWreath from "./images/pineWreath_389.png";

import title from "./images/lol-title-linear-313x128.png";

import css from "./LoggedOut.module.css";

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
    <div className={css.siteWrapper}>
      <img
        alt="Lights on Leyden"
        src={timTitleImg3}
        className={css.timTitleImg3}
      />
      <div className={css.wreathWrapper}>
        <div className={css.wreathText}>
          {/* <div className={css.lightsOn}>
            Lights turn
            <br />
            on in
          </div> */}
          <div className={css.timeUntil}>
            Lights turn on in <br />
            {timeBtwn(now, "12/01/2020")}
          </div>
        </div>
        <div className={css.wreath}>
          <img alt="pine wreath" src={pineWreath} className={css.wreathImg} />
        </div>
      </div>
    </div>
  );
}

function Feature({ desc, title, votePct = 0 }) {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Box
      bg={colors.white}
      borderWidth="1px"
      color={colors.gray}
      m={4}
      p={5}
      shadow="md"
    >
      <Flex direction="row" h="100%">
        <Flex direction="column">
          <Heading color={colors.red[800]} fontSize="xl">
            {title} ({votePct}%)
          </Heading>
          <Text mt={4}>{desc}</Text>
        </Flex>
        {/* <Flex>Like</Flex> */}
      </Flex>
    </Box>
  );
}

function ChristmasTime() {
  const [features, setFeatures] = useState("");

  useEffect(() => {
    return subscribeToFeatures((docs) => {
      setFeatures(docs);
    });
  }, []);

  const totalVotes =
    features &&
    features.reduce((sum, f) => {
      return sum + f.votes;
    }, 0);

  console.log(totalVotes);

  // width={[
  //     "100%", // base
  //     "50%", // 480px upwards
  //     "25%", // 768px upwards
  //     "15%", // 992px upwards
  //   ]}

  return (
    <Flex
      alignItems="center"
      direction="column"
      justifyContent="center"
      pt="10"
    >
      <Flex justifyContent="center" mx="auto" my={0}>
        <img alt="Lights on Leyden" className="title" src={title} />
      </Flex>
      <Stack p="4">
        {features &&
          features.map((f) => {
            return (
              <Feature
                key={f.title}
                title={f.title}
                desc={f.description}
                votePct={
                  Number.isNaN(totalVotes)
                    ? 0
                    : Math.round((f.votes / totalVotes) * 100)
                }
              />
            );
          })}
      </Stack>
    </Flex>
  );
}

export default LoggedOut;
