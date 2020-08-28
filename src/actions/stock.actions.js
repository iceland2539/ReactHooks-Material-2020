import {
  STOCK_FETCHING,
  STOCK_SUCCESS,
  STOCK_FAILED,
  server,
} from "../Constants";
import { httpClient } from "../utils/HttpClient";

export const setStateToFetching = () => ({
  type: STOCK_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: STOCK_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: STOCK_FAILED,
  payload,
});

export const getProduct = () => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    doGetProduct(dispatch);
  };
};

const doGetProduct = async (dispatch) => {
  try {
    let result = await httpClient.get(server.PRODUCT_URL);
    dispatch(setStateToSuccess(result.data));
  } catch (err) {
    dispatch(setStateToFailed());
  }
};
