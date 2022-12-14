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
import { deleteCollegeSubject, getCollegeSubjects } from '@/redux/thunks/collegeSubjects';
import { Icon } from '@iconify/react';
import { Tooltip } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Wrapper, Filters, IconsWrapper, Title } from '../styles';

const CollegeSubjects: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { data: collegeSubjects, isLoading } = useAppSelector(
    state => state.collegeSubjects
  );

  const [selectedRow, setSelectedRow] = useState<CollegeSubject | null>(null);

  const [searched, setSearched] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
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

  useEffect(() => {
    dispatch(getCollegeSubjects()).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (canDelete) {
      void dispatch(deleteCollegeSubject(selectedRow?.id as number));
    }
  }, [canDelete]);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default CollegeSubjects;
