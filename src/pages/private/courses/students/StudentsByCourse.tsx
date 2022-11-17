import React, { useEffect, useState } from 'react';
import { DataTable, SearchBar } from '@/components';
import { DataTableRowText } from '@/components/table/styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { GridColDef } from '@mui/x-data-grid';
import { Wrapper, Filters, Title } from '../../styles';
import { getCourses } from '@/redux/thunks/courses';
import { getStudentsByCourse } from '@/redux/thunks/students';
import { useParams } from 'react-router-dom';
import { Course } from '@/models';

const StudentsByCourse: React.FC = () => {
  const dispatch = useAppDispatch();

  const { studentsByCourse, isLoading } = useAppSelector(state => state.students);
  const { id } = useParams();

  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [searched, setSearched] = useState('');
  const filteredRows = studentsByCourse.filter(row => {
    return (
      row?.name?.toLowerCase().includes(searched.toLowerCase()) ??
      row.cpf?.toLowerCase().includes(searched.toLowerCase()) ??
      row.registration_number?.toLowerCase().includes(searched.toLowerCase()) ??
      row.course?.name?.toLowerCase().includes(searched.toLowerCase())
    );
  });

  const columns: GridColDef[] = [
    {
      field: 'registration_number',
      headerName: 'Matrícula',
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <DataTableRowText>{params.row?.registration_number}</DataTableRowText>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 200,
      flex: 1.2,
      renderCell: params => <DataTableRowText>{params.row?.name}</DataTableRowText>,
    },
    {
      field: 'cpf',
      headerName: 'Cpf',
      minWidth: 200,
      flex: 0.5,
      renderCell: params => <DataTableRowText>{params.row?.cpf}</DataTableRowText>,
    },
  ];

  const onSearch = (searchedVal: string): void => {
    setSearched(searchedVal);
  };

  useEffect(() => {
    void dispatch(getStudentsByCourse(Number(id)));
  }, []);

  useEffect(() => {
    dispatch(getCourses()).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (studentsByCourse && studentsByCourse.length > 0) {
      setCourse(studentsByCourse[0]?.course);
    }
  }, [studentsByCourse]);

  return (
    <Wrapper>
      <Title>Estudantes do curso: {course?.name}</Title>

      <Filters>
        <SearchBar
          placeholder="Pesquisar"
          value={searched}
          onChange={(searchVal): void => onSearch(searchVal as string)}
        />
      </Filters>

      <DataTable rows={filteredRows} columns={columns} loading={isLoading} />
    </Wrapper>
  );
};

export default StudentsByCourse;
