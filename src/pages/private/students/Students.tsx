import React, { useEffect, useState } from 'react';
import {
  ButtonDefault,
  DataTable,
  EditStudentModal,
  NewStudentModal,
  SearchBar,
} from '@/components';
import { DataTableRowText } from '@/components/table/styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Student } from '@/models';
import { Icon } from '@iconify/react';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useTheme } from 'styled-components';
import { Wrapper, Filters, IconsWrapper, Title } from '../styles';
import { Tooltip } from '@mui/material';
import { deleteStudent, getStudents } from '@/redux/thunks/students';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/config';

const Students: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: students, isLoading } = useAppSelector(state => state.students);

  const [selectedRow, setSelectedRow] = useState<Student | null>(null);

  const [searched, setSearched] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canGoToRecords, setCanGoToRecords] = useState(false);
  const filteredRows = students.filter(row => {
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
    {
      field: 'course',
      headerName: 'Curso',
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <DataTableRowText>{params.row?.course?.name}</DataTableRowText>
      ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.7,
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: () => (
        <IconsWrapper>
          <Tooltip title="Histórico escolar">
            <Icon
              icon="mdi:clipboard-text-clock-outline"
              width={32}
              height={32}
              color={theme.colors.primary.default}
              onClick={goToSchoolRecords}
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

  const goToSchoolRecords = (): void => {
    setCanGoToRecords(true);
  };

  useEffect(() => {
    void dispatch(getStudents());
  }, []);

  useEffect(() => {
    if (canDelete) {
      void dispatch(deleteStudent(selectedRow?.id as number));
    }
  }, [canDelete]);
  useEffect(() => {
    if (canGoToRecords) {
      navigate(
        routes.privates.students.path +
          `/${selectedRow?.id?.toString() as string}/historico`
      );
    }
  }, [canGoToRecords]);

  return (
    <Wrapper>
      <Title>Configurações dos alunos</Title>

      <Filters>
        <SearchBar
          placeholder="Pesquisar"
          value={searched}
          onChange={(searchVal): void => onSearch(searchVal as string)}
        />
        <ButtonDefault text="Novo aluno" onClick={handleShowNewModal} />
      </Filters>

      <DataTable
        rows={filteredRows}
        columns={columns}
        loading={isLoading}
        onSelectRow={onSelectRow}
      />

      <NewStudentModal show={showNew} onClose={handleCloseNewModal} />
      <EditStudentModal
        show={showEdit}
        student={selectedRow}
        onClose={handleCloseEditModal}
      />
    </Wrapper>
  );
};

export default Students;
