import { HEADER_START } from './constant';



export const header_start = (data) =>({
  type: HEADER_START,
  payload: { ...data }
})

