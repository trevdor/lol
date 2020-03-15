import React, { useEffect, useState } from "react";

import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { subscribeToFeatures } from "./utils";

function Feature({ desc, title, votePct = 0 }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">
        {title} ({votePct}%)
      </Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}

export default function LoggedOut() {
  const [features, setFeatures] = useState("");

  useEffect(() => {
    return subscribeToFeatures(docs => {
      setFeatures(docs);
    });
  }, []);

  const totalVotes =
    features &&
    features.reduce((sum, f) => {
      return sum + f.votes;
    }, 0);

  console.log(totalVotes);
  return (
    <>
      <Heading as="h1">Lights on Leyden</Heading>
      <Stack p="4">
        {features &&
          features.map(f => {
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
    </>
  );
}
