import { UPDATE_COUNT } from "../constants/msg";

export const updateCount = (count: number) => ({
  type: UPDATE_COUNT,
  payload: count,
});

export const fetchCount = () => {
  return (dispatch) => {
    // 在这里进行网络请求，获取信息数量
    setTimeout(() => {
      dispatch(updateCount(666));
    }, 2000);
  };
};
