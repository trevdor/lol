import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Stack, Text, useTheme } from "@chakra-ui/core";

import { subscribeToFeatures } from "./utils";

import title from "./images/lol-title-linear-900.png";

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

export default function LoggedOut() {
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
      <Flex justifyContent="center" h={["32", "56"]} mx={4} my={0}>
        <img
          alt="Lights on Leyden"
          className="title"
          src={title}
          height="100%"
          width="100%"
        />
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
