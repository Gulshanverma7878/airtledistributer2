import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice1';
import bankReducer from './slices/bankSlice';
import masterReducer from './slices/masterSlice'
import transactionReducer from  './slices/transactionSlice'
import collectorReducer from './slices/collectorSlice'
import shopReducer from './slices/shopSlice'
import shopReducer1 from './slices/shopSlice1'
import fileUploadReducer from './slices/fileUploadSlice';
import distributorReducer from './slices/distributorSlice';
import ledgertransactionReducer from './slices/distributorledger/transactionSlice';
// import orderReducer from './slices/distributorledger/orderSlice';
import mastertransactionReducer from './slices/distributorledger/orderSlice';
import shopTransactionReducer from './slices/distributorledger/shopTransactionSlice';
import distributorBankTransactionReducer from './slices/distributorledger/distributorBankTransactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    banks: bankReducer,
    master: masterReducer,
    transaction:transactionReducer,
    collector:collectorReducer,
    shop:shopReducer,
    shop1:shopReducer1,
    fileUpload: fileUploadReducer,
    distributor: distributorReducer,
    ledgertransaction: ledgertransactionReducer,
    mastertransaction: mastertransactionReducer,
    shopTransaction: shopTransactionReducer,
    distributorBankTransaction: distributorBankTransactionReducer,
  },
});