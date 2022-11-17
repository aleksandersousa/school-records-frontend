import { Result, Student } from '@/models';
import { authApi } from '@/services/api';
import { showToast } from '@/utils/notifiers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { resultsClear } from '../slices/results';

export const getResults = createAsyncThunk(
  'results/get',
  async (_, { dispatch, rejectWithValue }): Promise<Student[] | unknown> => {
    try {
      const res = await authApi.get<Student[]>('/results');
      return res.data;
    } catch (error: any) {
      dispatch(resultsClear());
      showToast('Erro ao pegar resultados.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createResult = createAsyncThunk(
  'results/create',
  async (body: { result: Result }, { rejectWithValue }): Promise<Result | unknown> => {
    try {
      const res = await authApi.post<Result[]>('/results', body);

      showToast('Resultado lançado com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao lançar resultado.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateResult = createAsyncThunk(
  'results/update',
  async (
    payload: { body: { result: Result }; resultId: number },
    { rejectWithValue }
  ): Promise<Result | unknown> => {
    try {
      const res = await authApi.put<Result[]>(
        `/results/${payload.resultId}`,
        payload.body
      );

      showToast('Resultado atualizado com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao atualizar resultado', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteResult = createAsyncThunk(
  'results/delete',
  async (resultId: number, { rejectWithValue }): Promise<Result | unknown> => {
    try {
      await authApi.delete(`/results/${resultId}`);

      showToast('Resultado deletado com sucesso!', 'success');

      return resultId;
    } catch (error: any) {
      showToast('Erro ao deletar resultado', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
