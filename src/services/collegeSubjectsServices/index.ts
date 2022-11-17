import { CollegeSubject } from '@/models';
import {
  collegeSubjectsFailure,
  udpateCollegeSubjects,
} from '@/redux/slices/collegeSubjects';
import { authApi } from '../api';

export const updateCollegeSubject = async (
  collegeSubjectId: number,
  body: { collegeSubject: CollegeSubject },
  dispatch: (
    args: PayloadAction<CollegeSubject | undefined>
  ) => PayloadAction<CollegeSubject>
): Promise<void> => {
  try {
    const res = await authApi.put<CollegeSubject>(
      `/college_subjects/${collegeSubjectId}`,
      body
    );
    dispatch(udpateCollegeSubjects(res.data));
  } catch (error) {
    dispatch(collegeSubjectsFailure());
  }
};
