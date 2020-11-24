import { useState, useEffect } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import { FaGift, FaThumbsUp } from "react-icons/fa";
import { getFeatures } from "./utils";
import timTitleImg3 from "./images/sparkleTitle_800.png";

import css from "./FeatureList.module.css";

function FeatureList() {
  const [features, setFeatures] = useState("");

  useEffect(() => {
    return getFeatures().then((docs) => {
      setFeatures(docs);
    });
  }, []);

  // const totalVotes =
  //   features &&
  //   features.reduce((sum, f) => {
  //     return sum + f.votes;
  //   }, 0);

  // console.log(totalVotes);

  // width={[
  //     "100%", // base
  //     "50%", // 480px upwards
  //     "25%", // 768px upwards
  //     "15%", // 992px upwards
  //   ]}

  return (
    <Flex align="center" direction="column" justify="center" mt={4}>
      <Flex justify="center" mx="auto" my={0} mb={4}>
        <img
          alt="Lights on Leyden"
          className={css.timTitleImg3}
          loading="lazy"
          src={timTitleImg3}
        />
      </Flex>
      <Heading>Features</Heading>
      <Stack spacing={8} w="100%">
        {features &&
          features.map((f) => {
            console.log(`🥶 ${Object.keys(f)}`);
            return (
              <Card
                key={f.name}
                title={f.name}
                desc={f.description}
                pic={
                  f.images && f.images[f.featuredImage]
                    ? f.images[f.featuredImage]
                    : null
                }
                // votePct={
                //   Number.isNaN(totalVotes)
                //     ? 0
                //     : Math.round((f.votes / totalVotes) * 100)
                // }
              />
            );
          })}
      </Stack>
    </Flex>
  );
}

// Images stored on a feature
// {
//   feature: {
//     images: [
//       {
//         caption: "This is Santa Clause",
//         srcs: {
//           0: "https://example.com/foo.jpg",
//           640: "https://example.com/foo_640.jpg",
//         },
//       },
//       {
//         caption: "Santa Clause from 1997",
//         srcs: {
//           0: "https://example.com/bar.jpg",
//           640: "https://example.com/bar_640.jpg",
//         },
//       },
//     ],
//   },
// }

function Card({ desc, pic, title }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Center>
      <Flex
        direction="column"
        bg={useColorModeValue(colors.blue[100], colors.blue[800])}
        // borderRadius={12}
        color={useColorModeValue(colors.gray[900], colors.gray[100])}
        borderTopWidth={2}
        borderTopColor={useColorModeValue(colors.blue[400], colors.blue[400])}
        borderBottomWidth={8}
        borderBottomColor={useColorModeValue(
          colors.blue[700],
          colors.blue[700]
        )}
        borderRadius={[0, 8]}
        boxShadow="lg"
        my={5}
        pb={4}
        w={["100%", theme.sizes.container]}
        maxW={["100%", 850]}
      >
        <Flex justify="space-between" my={4} px={4}>
          <Heading
            color={useColorModeValue(colors.blue[800], colors.white)}
            fontSize="3xl"
          >
            {title}
          </Heading>
          <Button
            aria-label="Show this feature some love"
            leftIcon={<FaGift />}
            ml={2}
            minW={32}
            px={4}
            size="md"
          >
            Love it
          </Button>
        </Flex>
        {pic && <FeaturedPhoto pic={pic} />}
        <Text mt={4} px={4} dangerouslySetInnerHTML={{ __html: desc }}></Text>
      </Flex>
    </Center>
  );
}

function FeaturedPhoto({ pic }) {
  const defaultSrc = pic.srcs.find((src) => src.res === 0);

  return (
    <picture>
      <>
        {pic.srcs
          .filter((src) => Boolean(src.res))
          .map((src) => (
            <source
              media={`(min-width: ${src.res}px)`}
              srcset={`images/features/${src.filename}`}
            />
          ))}
      </>
      <Image
        src={`images/features/${defaultSrc.filename}`}
        alt={pic.caption}
        w="100%"
      />
    </picture>
  );
}

export default FeatureList;
