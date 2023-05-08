import { NativeBaseProvider, Box, Button, Text, Flex, Heading, VStack, Center, Divider } from "native-base";
import { CustomTheme } from "./src/theme/index";
import { I18nManager } from 'react-native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);


export default function App() {
  return (
       <NativeBaseProvider theme={CustomTheme} >
        <Box color='primary.300'>.</Box>
        <Box alignItems="center">
        <Button onPress={() => console.log("hello world")}>لود سریع . </Button>
        <Box color='indigo.800'>Hello world</Box>
         <Text fontSize="xs">xs</Text>
      <Text fontSize="sm" color={'blue.500'}>sm</Text>
      <Text fontSize="md" color={'blue.500'}>md</Text>
      <Text fontSize="lg" color={'blue.500'}>lg</Text>
      <Text fontSize="xl" color={'blue.500'}>xl</Text>
      <Text fontSize="2xl" color={'blue.500'}>2xl</Text>
     
      </Box>
      <Box bgColor={"lightBlue.300"} >
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Box>
      <Box bgColor={"lightBlue.300"} dir="rtl">
 <VStack space={2.5} w="100%" px="3">
          {
          /* flexDirection -> row */
        }
          <Heading size="md">row</Heading>
          <Flex direction="row" mb="2.5" mt="1.5">
            <Center size="16" bg="primary.100" _text={{
            color: "coolGray.800"
          }}>
              100
            </Center>
            <Center size="16" bg="primary.200" _text={{
            color: "coolGray.800"
          }}>
              200
            </Center>
            <Center bg="primary.300" size="16" _text={{
            color: "coolGray.800"
          }}>
              300
            </Center>
            <Center size="16" bg="primary.400" _text={{
            color: "coolGray.800"
          }}>
              400
            </Center>
          </Flex>
          </VStack>
          <Divider />
      </Box>
    </NativeBaseProvider>
  );
}


