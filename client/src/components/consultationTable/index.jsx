import { useMemo, useState, useEffect } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { getAllForms } from "apiCalls";
import { loadTables } from "apiCalls";
import { Flex, Button, Tooltip, ActionIcon } from "@mantine/core";
import {
  IconUserCircle,
  IconSend,
  IconSquareChevronsRightFilled,
  IconSquareChevronRightFilled,
} from "@tabler/icons-react";
import {
  IconEdit,
  IconTrash,
  IconUserCheck,
  IconSquareArrowRightFilled,
} from "@tabler/icons-react";
import { AiFillRightSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: "Zachary",
      lastName: "Davis",
    },
    address: "261 Battle Ford",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Robert",
      lastName: "Smith",
    },
    address: "566 Brakus Inlet",
    city: "Westerville",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Yan",
    },
    address: "7777 Kuhic Knoll",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "John",
      lastName: "Upton",
    },
    address: "722 Emie Stream",
    city: "Huntington",
    state: "Washington",
  },
  {
    name: {
      firstName: "Nathan",
      lastName: "Harris",
    },
    address: "1 Kuhic Knoll",
    city: "Ohiowa",
    state: "Nebraska",
  },
];
// createdAt
// :
// "2023-08-29T06:44:54.070Z"
// date
// :
// "2023-08-29"
// email
// :
// "700"
// ligne
// :
// "FAM2"
// notes
// :
// "notes"
// observation
// :
// "observation"
// poste
// :
// "MATIN"
// taille
// :
// "T2"
// updatedAt
// :
// "2023-08-29T06:44:54.070Z"
// user_id
// :
// "64ec7ae04da520d15d22259b"
// username
// :
// "Ahmed Bouaziz"
// __v
// :
// 0
// _id
// :
// "64ed93e640426f60dbdd099b"
const ConsultationTable = () => {
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
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
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
  useEffect(() => {
    getAllForms().then((val) => {
      console.log("valueeee", val);
      // val.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFullData(val);
    });
  }, []);
  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    enableColumnOrdering: true,
    enableFacetedValues: true,

    enableRowActions: true,

    initialState: { showColumnFilters: true, showGlobalFilter: true },
    positionActionsColumn: "first",
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        color="green"
        onClick={() => {
          for (let i = 0; i < data.length; i++)
            try {
              {
                console.log(table.getRow(i).original);
              }
            } catch {
              console.log("done");
            }
        }}
      >
        Generer les courbes a partir de ces fiches
      </Button>
    ),
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

  return <MantineReactTable table={table} />;
};

export default ConsultationTable;
