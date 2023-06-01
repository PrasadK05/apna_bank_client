import {
  CUSTOMER_TR_ERROR,
  CUSTOMER_TR_LOADING,
  CUSTOMER_TR_SUCCESS,
} from "./customer.type";
import axios from "axios";

const baseUrl = "https://apnabank.onrender.com";

export const customerTRSucc = (payload) => {
  return {
    type: CUSTOMER_TR_SUCCESS,
    payload,
  };
};

export const customerTRError = () => {
  return {
    type: CUSTOMER_TR_ERROR,
  };
};

export const customerTRLoad = () => {
  return {
    type: CUSTOMER_TR_LOADING,
  };
};

export const getCustomerTR = (data, search) => async (dispatch) => {
  dispatch(customerTRLoad());
  let headers = { Authorization: `Bearer ${data.token}` };

  if (search) {
    try {
      let srch = await axios.get(`${baseUrl}/user/transactions?q=${search}`, {
        headers,
      });

      if (srch.status === 200) {
        dispatch(customerTRSucc(srch.data.transactions));
        return true;
      } else {
        dispatch(customerTRError());
        return false;
      }
    } catch (error) {
      dispatch(customerTRError());
      return false;
    }
  } else {
    try {
      let res = await axios.get(`${baseUrl}/user/transactions`, { headers });

      if (res.status === 200) {
        dispatch(customerTRSucc(res.data.transactions));
        return true;
      } else {
        dispatch(customerTRError());
        return false;
      }
    } catch (error) {
      dispatch(customerTRError());
      return false;
    }
  }
};

export const depositAmt = async (token, ammount, note) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    let res = await axios.post(
      `${baseUrl}/user/deposit`,
      { ammount, type: "deposit", note },
      { headers }
    );
    if (res.status === 200) {
      return res.data.message;
    } else {
      return res.data.message;
    }
  } catch (error) {
    return error;
  }
};

export const withdrawAmt = async (token, ammount, note) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    let res = await axios.post(
      `${baseUrl}/user/withdraw`,
      { ammount, type: "withdraw", note },
      { headers }
    );
    if (res.status === 200) {
      return res.data.message;
    } else {
      return res.data.message;
    }
  } catch (error) {
    return error;
  }
};
