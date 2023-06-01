import { useEffect } from "react";
import { Box,  Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList } from "../redux/banker/banker.action";
import CustomerTable from "../components/CustomerTable";
import SearchBar from "../components/SearchBar";


export default function Banker() {
  const { data } = useSelector((store) => store.auth);
  const { customerList, loading, error } = useSelector((store) => store.banker);
  const dispatch = useDispatch();

  let handleSearch = (val) => {
    dispatch(getCustomerList({ token: data.token }, val));
  };

  let handleReset = () => {
    dispatch(getCustomerList({ token: data.token }));
  };
  useEffect(() => {
    dispatch(getCustomerList({ token: data.token }));
  }, []);
  return (
    <>
      <Box
        w={{ base: "100%", sm: "100%", md: "90%", lg: "70%" }}
        m="auto"
        mt="30px"
      >
        <SearchBar getVal={handleSearch} handleReset={handleReset} />
        <Text fontSize={"2xl"} fontWeight={"bold"} ml="10px" mt="30px">
          Accounts
        </Text>
        <CustomerTable data={customerList} loading={loading} error={error} />        
      </Box>
    </>
  );
}
