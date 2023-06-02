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
  let [scrollData, setScrollData] = useState([]);
  let [page, setPage] = useState(1);
  let ref = useRef();
  let [load, setLoad]=useState(true)

  let callback = (entries, observer) => {
    if (data.length !== 0) {      
      let start = (page - 1) * 20;
      let end = start + 20;
      entries.forEach((element) => {
        if (element.isIntersecting) {
          if (start < data.length) {
            setLoad(true)
            let sd1 = data.slice(start, end);
            setScrollData([...scrollData, ...sd1]);
            setPage(page++);
          } else {
            console.log("over");
            setLoad(false)
          }
        }
      });
    }
  };

  useEffect(() => {
    setScrollData([]);
    setPage(1);

    let observer = new IntersectionObserver(callback, { threshold: 1.0 });

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [data]);

  return (
    <>
      <TableContainer display={"block"} mt="20px">
        <Table size="md">
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
          <Tbody>
            {scrollData.map((el, i) => {
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
        </Table>
      </TableContainer>
      <Box ref={ref} >{load?"...loading":"Done"}</Box>
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
          size="xl"
        />
      </Box>
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
