import { STOCK_FETCHING, STOCK_SUCCESS, STOCK_FAILED } from "../Constants";

const initialState = {
  result: null,
  error: false,
  isFetching: false,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STOCK_FETCHING:
      return { ...state, isFetching: true, error: false, result: null };
    case STOCK_FAILED:
      return { ...state, isFetching: false, error: true, result: null };
    case STOCK_SUCCESS:
      return { ...state, isFetching: false, error: false, result: payload };
    default:
      return state;
  }
};
