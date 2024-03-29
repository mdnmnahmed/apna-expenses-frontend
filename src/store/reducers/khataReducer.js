import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FetchAPIData from '../../helpers/FetchAPIData';

const initialState = {
    allKhatas: null,
    allKhatasLoader: false,
    selectedKhata: null,

    allKhataTransactions: null,
    allKhataTransactionsLoader: false,

    totalAmount: 0,
}

export const fetchAllKhataTransactions = createAsyncThunk(
    'fetchAllKhataTransactions',
    async (selectedKhataId) => {
        const response = await FetchAPIData('get', `/get-khata-transactions/${selectedKhataId}`);
        console.log('response: ', response);
        return response.data;
    }
)

export const fetchAllKhatas = createAsyncThunk(
    'fetchAllKhatas',
    async () => {
        const response = await FetchAPIData('get', '/get-all-khatas');
        console.log('response: ', response);
        return response.data.data;
    }
)

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addKhata: (state, { payload }) => {
            state.allKhatas = [...state.allKhatas, payload]
        },

        addKhataTransaction: (state, { payload }) => {
            state.allKhataTransactions = [...state.allKhataTransactions, payload]
        },

        updateKhataTransaction: (state, { payload }) => {
            state.allKhataTransactions = state.allKhataTransactions.map(transaction => {
                if (transaction._id === payload._id) {
                    transaction = payload;
                }
                return transaction;
            });
        },

        deleteKhataTransaction: (state, { payload }) => {
            state.allKhataTransactions = state.allKhataTransactions.filter(transaction => transaction._id !== payload._id);
        },

        switchSelectedKhata: (state, { payload }) => {
            state.selectedKhata = payload
        },
    },
    extraReducers: {
        [fetchAllKhataTransactions.pending]: (state) => {
            state.allExpensesDataLoader = true;
        },
        [fetchAllKhataTransactions.fulfilled]: (state, { payload }) => {
            state.allKhataTransactionsLoader = false;
            console.log('payload.data: ', payload);
            state.allKhataTransactions = payload.data;
        },
        [fetchAllKhataTransactions.rejected]: (state) => {
            state.allExpensesDataLoader = false;
            console.log('Error Occur in Fetching Expense Data');
        },
        [fetchAllKhatas.pending]: (state) => {
            state.allKhatasLoader = true;
        },
        [fetchAllKhatas.fulfilled]: (state, { payload }) => {
            state.allKhatasLoader = false;
            state.allKhatas = payload;
            state.selectedKhata = payload[0]
        },
        [fetchAllKhatas.rejected]: (state) => {
            state.allKhatasLoader = false;
            console.log('Error Occur in Fetching Account Data');
        },
    }
});


export const { addKhata, addKhataTransaction, updateKhataTransaction, deleteKhataTransaction, switchSelectedKhata } = expensesSlice.actions;
export default expensesSlice.reducer;