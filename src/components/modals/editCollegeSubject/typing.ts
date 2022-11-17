import { CollegeSubject } from '@/models';
import { ModalProps } from '../typing';

export interface EditCollegeSubjectModalProps extends ModalProps {
  collegeSubject: CollegeSubject | null;
}
