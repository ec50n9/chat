import { UPDATE_COUNT } from "../constants/msg";

const INITIAL_STATE = {
  msgCount: 0,
};

export default function msg(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_COUNT:
      return {
        ...state,
        msgCount: action.payload,
      };
    default:
      return state;
  }
}
