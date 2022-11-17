import { TypeOfResult } from '@/models';
import { authApi } from '@/services/api';
import { showToast } from '@/utils/notifiers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeOfResultsClear } from '../slices/typeOfResults';

export const getTypeOfResults = createAsyncThunk(
  'typeOfResults/get',
  async (_, { dispatch, rejectWithValue }): Promise<TypeOfResult[] | unknown> => {
    try {
      const res = await authApi.get<TypeOfResult[]>('/type_of_results');
      return res.data;
    } catch (error: any) {
      dispatch(typeOfResultsClear());
      showToast('Erro ao pegar tipos dos resultados.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
