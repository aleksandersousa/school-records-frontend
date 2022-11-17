import { Student } from '@/models';
import { ModalProps } from '../typing';

export interface EditStudentModalProps extends ModalProps {
  student: Student | null;
}
