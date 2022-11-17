import React, { useEffect, useState } from 'react';
import {
  ButtonDefault,
  DataTable,
  EditCourseModal,
  NewCourseModal,
  SearchBar,
} from '@/components';
import { DataTableRowText } from '@/components/table/styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Course } from '@/models';
import { Icon } from '@iconify/react';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useTheme } from 'styled-components';
import { Wrapper, Filters, IconsWrapper, Title } from '../styles';
import { deleteCourse, getCourses } from '@/redux/thunks/courses';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/config';

const Courses: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: courses, isLoading } = useAppSelector(state => state.courses);

  const [selectedRow, setSelectedRow] = useState<Course | null>(null);

  const [searched, setSearched] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canGoToStudents, setCanGoToStudents] = useState(false);
  const filteredRows = courses.filter(row => {
    return (
      row?.name?.toLowerCase().includes(searched.toLowerCase()) ??
      row.code?.toLowerCase().includes(searched.toLowerCase())
    );
  });

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'Código',
      minWidth: 200,
      flex: 1.1,
      renderCell: params => <DataTableRowText>{params.row?.code}</DataTableRowText>,
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 200,
      flex: 1.3,
      renderCell: params => <DataTableRowText>{params.row?.name}</DataTableRowText>,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: () => (
        <IconsWrapper>
          <Tooltip title="Relação de alunos por curso">
            <Icon
              icon="mdi:file-chart"
              width={32}
              height={32}
              color={theme.colors.primary.hover}
              onClick={goToSchoolStudents}
            />
          </Tooltip>
          <Tooltip title="Editar">
            <Icon
              icon="mdi:pencil-circle"
              width={32}
              height={32}
              color={theme.colors.headsUp.dark}
              onClick={handleShowEditModal}
            />
          </Tooltip>
          <Tooltip title="Deletar">
            <Icon
              icon="mdi:delete-circle"
              width={32}
              height={32}
              color={theme.colors.error.dark}
              onClick={onDelete}
            />
          </Tooltip>
        </IconsWrapper>
      ),
    },
  ];

  const onSelectRow = (params: GridCellParams | undefined): void => {
    setSelectedRow(params?.row);
  };

  const onSearch = (searchedVal: string): void => {
    setSearched(searchedVal);
  };

  const onDelete = async (): Promise<void> => {
    setCanDelete(true);
  };

  const handleShowNewModal = (): void => {
    setShowNew(true);
  };
  const handleShowEditModal = (): void => {
    setShowEdit(true);
  };
  const handleCloseNewModal = (): void => {
    setShowNew(false);
  };
  const handleCloseEditModal = (): void => {
    setShowEdit(false);
  };

  const goToSchoolStudents = (): void => {
    setCanGoToStudents(true);
  };

  useEffect(() => {
    dispatch(getCourses()).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (canDelete) {
      void dispatch(deleteCourse(selectedRow?.id as number));
    }
  }, [canDelete]);
  useEffect(() => {
    if (canGoToStudents) {
      navigate(
        routes.privates.courses.path + `/${selectedRow?.id?.toString() as string}/alunos`
      );
    }
  }, [canGoToStudents]);

  return (
    <Wrapper>
      <Title>Configurações dos cursos</Title>

      <Filters>
        <SearchBar
          placeholder="Pesquisar"
          value={searched}
          onChange={(searchVal): void => onSearch(searchVal as string)}
        />
        <ButtonDefault text="Novo curso" onClick={handleShowNewModal} />
      </Filters>

      <DataTable
        rows={filteredRows}
        columns={columns}
        loading={isLoading}
        onSelectRow={onSelectRow}
      />

      <NewCourseModal show={showNew} onClose={handleCloseNewModal} />
      <EditCourseModal
        show={showEdit}
        course={selectedRow}
        onClose={handleCloseEditModal}
      />
    </Wrapper>
  );
};

export default Courses;
