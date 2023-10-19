import { useMemo, useState, useEffect } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { getAllForms } from "apiCalls";
import { loadTables } from "apiCalls";
import { Flex, Button, Tooltip, ActionIcon, Text } from "@mantine/core";
import { IconSquareChevronRightFilled } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ModalsProvider, modals } from "@mantine/modals";
import { formatDateToYearMonthDay } from "utils";
import { deleteForm } from "apiCalls";
const ConsultationTable = () => {
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: (
        <Text color="red">
          <strong>
            {"Êtes-vous sûr de vouloir supprimer ce formulaire ?"}
          </strong>
        </Text>
      ),
      children: (
        <Text>
          Êtes-vous sûr de vouloir supprimer{" "}
          <strong>
            <em>
              {row.original.date} {row.original.poste}{" "}
            </em>
          </strong>{" "}
          ? Cette action ne peut pas être annulée.
        </Text>
      ),
      labels: { confirm: "Supprimer", cancel: "Annuler" },
      confirmProps: { color: "red" },
      onConfirm: () => { deleteForm(row.original.date,row.original.poste).then(()=>refreshTable()) },
    });
  //should be memoized or stable
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => {
          //convert to Date for sorting and filtering
          const sDay = new Date(row.date);
          sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
          return sDay;
        },
        id: "Date",
        header: "Date",
        filterVariant: "date-range",
        sortingFn: "datetime",
        enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
        Cell: ({ cell }) => formatDateToYearMonthDay(cell.getValue()), //render Date as a string
        Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
      },

      {
        accessorKey: "poste", //hey a simple column for once
        header: "Poste",
        filterVariant: "multi-select",
      },
      {
        accessorKey: "username", //normal accessorKey
        header: "Nom et Prénom",
      },
      {
        accessorKey: "email",
        header: "Matricule",
      },
    ],
    []
  );
  const handleVisClick = async (date, poste) => {
    await loadTables(date, poste);
    navigate("/viewData/controle");
  };
  const [data, setFullData] = useState([]);
  useEffect(() => {refreshTable()}, []);

  const refreshTable = () => {
    getAllForms().then((val) => {
      // console.log("valueeee", val);
      // val.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFullData(val);
    });
  };
  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    enableColumnOrdering: true,
    enableFacetedValues: true,

    enableRowActions: true,

    initialState: { showColumnFilters: true, showGlobalFilter: true },
    positionActionsColumn: "first",
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Button
    //     color="green"
    //     onClick={() => {
    //       for (let i = 0; i < data.length; i++)
    //         try {
    //           {
    //             console.log(table.getRow(i).original);
    //           }
    //         } catch {
    //           console.log("done");
    //         }
    //     }}
    //   >
    //     Generer les courbes a partir de ces fiches
    //   </Button>
    // ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Voir">
          <ActionIcon
            color="primary"
            onClick={() => {
              handleVisClick(row.original.date, row.original.poste);
            }}
          >
            <IconSquareChevronRightFilled />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="supprimer">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    mantinePaginationProps: {
      radius: "xl",
      size: "lg",
    },
    mantineSearchTextInputProps: {
      placeholder: "chercher",
    },
  });

  return (
    <ModalsProvider>
      <MantineReactTable table={table} />;
    </ModalsProvider>
  );
};

export default ConsultationTable;
