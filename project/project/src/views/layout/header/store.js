
import {
  HEADER_START
} from './constant';

export default function storeCases(state = {}, action) {
  switch (action.type) {
    case HEADER_START:
      return { ...state }
   default:
      return state
  }
}

