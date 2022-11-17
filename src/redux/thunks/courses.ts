import { Course } from '@/models';
import { authApi } from '@/services/api';
import { showToast } from '@/utils/notifiers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { coursesClear } from '../slices/courses';

export const getCourses = createAsyncThunk(
  'courses/get',
  async (_, { dispatch, rejectWithValue }): Promise<Course[] | unknown> => {
    try {
      const res = await authApi.get<Course[]>('/courses');
      return res.data;
    } catch (error: any) {
      dispatch(coursesClear());
      showToast('Erro ao pegar cursos.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/create',
  async (body: { course: Course }, { rejectWithValue }): Promise<Course | unknown> => {
    try {
      const res = await authApi.post<Course[]>('/courses', body);

      showToast('Curso criado com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao criar curso.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/update',
  async (
    payload: { body: { course: Course }; courseId: number },
    { rejectWithValue }
  ): Promise<Course | unknown> => {
    try {
      const res = await authApi.put<Course[]>(
        `/courses/${payload.courseId}`,
        payload.body
      );

      showToast('Curso atualizado com sucesso!', 'success');

      return res.data;
    } catch (error: any) {
      showToast('Erro ao atualizar curso', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (courseId: number, { rejectWithValue }): Promise<Course | unknown> => {
    try {
      await authApi.delete(`/courses/${courseId}`);

      showToast('Curso atualizado com sucesso!', 'success');

      return courseId;
    } catch (error: any) {
      showToast('Erro ao atualizar curso', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
