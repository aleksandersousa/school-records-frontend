import { CollegeSubject } from '@/models';
import { authApi } from '@/services/api';
import { showToast } from '@/utils/notifiers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCollegeSubjects = createAsyncThunk(
  'collegeSubjects/get',
  async (_, { rejectWithValue }): Promise<CollegeSubject[] | unknown> => {
    try {
      const res = await authApi.get<CollegeSubject[]>('/college_subjects');
      return res.data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createCollegeSubject = createAsyncThunk(
  'collegeSubjects/create',
  async (
    body: { college_subject: CollegeSubject },
    { rejectWithValue }
  ): Promise<CollegeSubject | unknown> => {
    try {
      const res = await authApi.post<CollegeSubject[]>('/college_subjects', body);

      showToast('Disciplina criada com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao criar disciplina.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateCollegeSubject = createAsyncThunk(
  'collegeSubjects/update',
  async (
    payload: { body: { college_subject: CollegeSubject }; collegeSubjectId: number },
    { rejectWithValue }
  ): Promise<CollegeSubject | unknown> => {
    try {
      const res = await authApi.put<CollegeSubject[]>(
        `/college_subjects/${payload.collegeSubjectId}`,
        payload.body
      );

      showToast('Disciplina atualizada com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao atualizar disciplina', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
