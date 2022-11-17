import {
  ButtonDefault,
  DataTable,
  EditCollegeSubjectModal,
  NewCollegeSubjectModal,
  SearchBar,
} from '@/components';
import { DataTableRowText } from '@/components/table/styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CollegeSubject } from '@/models';
import { collegeSubjectsClear } from '@/redux/slices/collegeSubjects';
import { getCollegeSubjects } from '@/redux/thunks/collegeSubjects';
import { showToast } from '@/utils/notifiers';
import { Icon } from '@iconify/react';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Container, Filters, IconsWrapper, Title } from './styles';

const CollegeSubjects: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const {
    data: collegeSubjects,
    isLoading,
    error,
  } = useAppSelector(state => state.collegeSubjects);

  const [selectedRow, setSelectedRow] = useState<CollegeSubject | null>(null);

  const [searched, setSearched] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const filteredRows = collegeSubjects.filter(row => {
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
      field: 'workload',
      headerName: 'Carga horária',
      minWidth: 110,
      flex: 1,
      renderCell: params => <DataTableRowText>{params.row?.workload}</DataTableRowText>,
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
          <Icon
            icon="mdi:pencil-circle"
            width={32}
            height={32}
            color={theme.colors.headsUp.dark}
            onClick={handleShowEditModal}
          />
          <Icon
            icon="mdi:delete-circle"
            width={32}
            height={32}
            color={theme.colors.error.dark}
            onClick={onDelete}
          />
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
    // TODO
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

  useEffect(() => {
    dispatch(getCollegeSubjects()).catch(err => console.log(err));
  }, []);

  if (error) {
    dispatch(collegeSubjectsClear());
    showToast('Erro ao pegar disciplinas.', 'error');
  }

  return (
    <Container>
      <Title>Configurações das disciplinas</Title>

      <Filters>
        <SearchBar
          placeholder="Pesquisar"
          value={searched}
          onChange={(searchVal): void => onSearch(searchVal as string)}
        />
        <ButtonDefault text="Nova disciplina" onClick={handleShowNewModal} />
      </Filters>

      <DataTable
        isCheckbox
        rows={filteredRows}
        columns={columns}
        loading={isLoading}
        onSelectRow={onSelectRow}
      />

      <NewCollegeSubjectModal show={showNew} onClose={handleCloseNewModal} />
      <EditCollegeSubjectModal
        show={showEdit}
        collegeSubject={selectedRow}
        onClose={handleCloseEditModal}
      />
    </Container>
  );
};

export default CollegeSubjects;
