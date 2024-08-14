import {configureStore} from '@reduxjs/toolkit'
import bagSlice from './bagSlice';


const homeLine = configureStore({
    reducer: {
        bag: bagSlice.reducer,
        
    }
})

export default homeLine;