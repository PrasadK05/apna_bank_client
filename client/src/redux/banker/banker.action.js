import axios from "axios";
import {
  CUSTOMER_LIST_ERROR,
  CUSTOMER_LIST_LOADING,
  CUSTOMER_LIST_SUCCESS,
} from "./banker.type";

const baseUrl = "https://apnabank.onrender.com";

export const customerListSucc = (payload) => {
  return {
    type: CUSTOMER_LIST_SUCCESS,
    payload,
  };
};

export const customerListError = () => {
  return {
    type: CUSTOMER_LIST_ERROR,
  };
};

export const customerListLoad = () => {
  return {
    type: CUSTOMER_LIST_LOADING,
  };
};

export const getCustomerList = (data, search) => async (dispatch) => {
  dispatch(customerListLoad());
  let headers = { Authorization: `Bearer ${data.token}` };

  if (search) {
    try {
      let srch = await axios.get(`${baseUrl}/banker/customers?q=${search}`, {
        headers,
      });
      if (srch.status === 200) {
        dispatch(customerListSucc(srch.data.customers));
        return true;
      } else {
        dispatch(customerListError());
        return false;
      }
    } catch (error) {
      dispatch(customerListError());
      return false;
    }
  } else {
    try {
      let res = await axios.get(`${baseUrl}/banker/customers`, { headers });
      if (res.status === 200) {
        dispatch(customerListSucc(res.data.customers));
        return true;
      } else {
        dispatch(customerListError());
        return false;
      }
    } catch (error) {
      dispatch(customerListError());
      return false;
    }
  }
};

export const getSingleCustomersTr = async (token, id, search) => {
  let headers = { Authorization: `Bearer ${token}` };

  if (search) {
    try {
      let srch = await axios.get(
        `${baseUrl}/banker/customerTransactions/${id}?q=${search}`,
        {
          headers,
        }
      );
      if (srch.status === 200) {
        return srch.data.transactions;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  } else {
    try {
      let res = await axios.get(
        `${baseUrl}/banker/customerTransactions/${id}`,
        {
          headers,
        }
      );
      if (res.status === 200) {
        return res.data.transactions;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }
};
