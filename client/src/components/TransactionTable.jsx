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
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function TransactionTable({ data, loading, error }) {
  let [scrollData, setScrollData] = useState([]);
  let [page, setPage] = useState(1);
  let [hasMore, setHasMore] = useState(true);

  let fetchData = () => {
    let p = Math.ceil(data.length / 20);
    let start = (page - 1) * 20;
    let end = start + 20;
    if (page > p) {
      setHasMore(false);
      return;
    }else{

    console.log(page, p);
    if(scrollData.length===0){
      let sd = data.slice(start, end);
      setScrollData([ ...sd]);
    }else{
      let sd1 = data.slice(start, end);
      setScrollData([...scrollData, ...sd1]);
    }
   


    setPage((prevPage) => prevPage + 1);
    }
    if (page === p) {
      setHasMore(false);
      return;
    }
    console.log(scrollData);
  };
  

  useEffect(() => {
    setScrollData([]);
    setPage(1);
    setHasMore(hasMore);
    if (data.length !== 0) {
      fetchData();
    }
  }, [data]);

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={1}
        endMessage={<h4>{""}</h4>}
      >
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
      </InfiniteScroll>
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
