import { all, put, takeEvery, call } from 'redux-saga/effects'

import { 
    HEADER_START, HEADER_FAILURE, HEADER_SUCCESS
} from './constant';
import { header_start } from './apis';


  

export function* headerStartAsync({payload}) {
    try {
        let { data } = yield call(header_start.bind(this,payload));
        if(data.status!='success'){
            yield put({'type': HEADER_FAILURE, data})
        } else {
            yield   put({'type':HEADER_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': HEADER_START, data: { message : 'Some Internal Error Occurred' }})
    }    
}


export default function* watchAll() {
    yield all([
        takeEvery(HEADER_START, headerStartAsync),
    ])
    
}