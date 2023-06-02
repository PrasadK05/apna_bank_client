import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function TransactionTable({ data, loading, error }) {
  let [page, setPage] = useState(1);
  let ref = useRef();

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;

    if (scrollTop + clientHeight >= scrollHeight) {
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 2000);
    }
  };

  useEffect(() => {
    // Reset the page when new data is received
    setPage(1);
  }, [data]);
  const slicedData = data.slice(0, page * 20);
  return (
    <>
      <TableContainer display={"block"} mt="20px">
        <Table size="md" w="90%">
          <Thead>
            <Tr>
              <Th>Sr. No</Th>
              <Th>Date And Time</Th>
              <Th>Deposit</Th>
              <Th>Withdrawl</Th>
              <Th>Balance</Th>
              <Th>Note</Th>
            </Tr>
          </Thead>
        </Table>
        <Box
          overflowY={"scroll"}
          h="500px"
          ref={ref}
          onScroll={handleScroll}
          // css={{
          //   "&::-webkit-scrollbar": {
          //     width: "0.4em",
          //     background: "transparent",
          //   },
          //   "&::-webkit-scrollbar-thumb": {
          //     background: "transparent",
          //   },
          // }}
        >
          <Table size="md">
            <Tbody>
              {slicedData.map((el, i) => {
                return (
                  <Tr key={el._id}>
                    <Td>{i + 1}</Td>
                    <Td>{`${el.date} ${el.time}`}</Td>
                    <Td color={"green"}>
                      {el.type === "deposit" ? el.ammount : "-"}
                    </Td>
                    <Td color={"red"}>
                      {el.type === "withdraw" ? el.ammount : "-"}
                    </Td>
                    <Td>{el.balance}</Td>
                    <Td>{el.note}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Box
              display={loading ? "flex" : "none"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            </Box>
          </Table>
        </Box>
      </TableContainer>
      <Box
        display={error ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text color={"red"} fontSize={"2xl"}>
          Error Occured While Loading Data
        </Text>
      </Box>
    </>
  );
}
