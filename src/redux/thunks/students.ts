import { Student } from '@/models';
import { authApi } from '@/services/api';
import { showToast } from '@/utils/notifiers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { studentsClear } from '../slices/students';

export const getStudents = createAsyncThunk(
  'students/get',
  async (_, { dispatch, rejectWithValue }): Promise<Student[] | unknown> => {
    try {
      const res = await authApi.get<Student[]>('/students');
      return res.data;
    } catch (error: any) {
      dispatch(studentsClear());
      showToast('Erro ao pegar alunos.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (body: { student: Student }, { rejectWithValue }): Promise<Student | unknown> => {
    try {
      const res = await authApi.post<Student[]>('/students', body);

      showToast('Aluno criado com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao criar aluno.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async (
    payload: { body: { student: Student }; studentId: number },
    { rejectWithValue }
  ): Promise<Student | unknown> => {
    try {
      const res = await authApi.put<Student[]>(
        `/students/${payload.studentId}`,
        payload.body
      );

      showToast('Aluno atualizado com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao atualizar aluno', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (studentId: number, { rejectWithValue }): Promise<Student | unknown> => {
    try {
      await authApi.delete(`/students/${studentId}`);

      showToast('Aluno deletado com sucesso!', 'success');

      return studentId;
    } catch (error: any) {
      showToast('Erro ao deletar aluno', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
