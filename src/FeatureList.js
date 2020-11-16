import { useState, useEffect } from "react";
import { Box, Flex, Heading, Stack, Text, useTheme } from "@chakra-ui/react";

import { subscribeToFeatures } from "./utils";
import timTitleImg3 from "./images/sparkleTitle_800.png";

import css from "./FeatureList.module.css";

function FeatureList() {
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
        <img
          alt="Lights on Leyden"
          className={css.timTitleImg3}
          loading="lazy"
          src={timTitleImg3}
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

export default FeatureList;
