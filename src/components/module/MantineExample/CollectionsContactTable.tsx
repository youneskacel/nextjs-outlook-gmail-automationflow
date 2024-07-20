import { useMemo } from "react";
import { useRouter } from "next/router";

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";

import { Avatar, HStack, Text, Tag, Spinner } from "@chakra-ui/react";
import { useGetContact } from "@/hooks/contact/useContact";

export type Contact = {
  contact_id: number;
  created_at: string;
  email: string | null;
  first_name: string;
  last_name: string | null;
  phone: string | null;
  image: string | null;
  address: string | null;
  suburb: string | null;
  postcode: string | null;
  state: string | null;
  company: { name: string }[];
};

interface CollectionsContactTableProps {
  accountId: string;
}

const CollectionsContactTable = ({
  accountId,
}: CollectionsContactTableProps) => {
  const { data, error, isLoading } = useGetContact();
  const router = useRouter();

  const showLoadingSpinners = () => {
    return (
      <Spinner
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="l"
      />
    );
  };

  const handleShowContact = async (contactId: number) => {
    await router.push({
      pathname: `/apps/${accountId}/collections/contact/${contactId}`,
    });
  };

  const columns = useMemo<MRT_ColumnDef<Contact>[]>(
    () => [
      {
        accessorFn: (row) => `${row.first_name} ${row.last_name ?? ""}`,
        id: "name",
        header: "Name",
        filterVariant: "autocomplete",
        Cell: ({ renderedCellValue, row }) => (
          <HStack
            onClick={() => handleShowContact(row.original.contact_id)}
            cursor={"pointer"}
          >
            <Avatar
              size="sm"
              src={row.original.image ?? ""}
              name={`${row.original.first_name} ${
                row.original.last_name ?? ""
              }`}
              textColor={"proxima.black"}
              bg={"proxima.mediumgray"}
            />
            <Text fontSize={"xs"}>{renderedCellValue}</Text>
          </HStack>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        Cell: ({ renderedCellValue, row }) => (
          <Text fontSize={"xs"}>{renderedCellValue}</Text>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: ({ renderedCellValue, row }) => (
          <Text fontSize={"xs"}>{renderedCellValue}</Text>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        Cell: ({ renderedCellValue, row }) => (
          <>
            {renderedCellValue &&
              row.original.company.map((name) => (
                <Tag
                  size={"sm"}
                  key={name.name}
                  variant="solid"
                  colorScheme="teal"
                >
                  {name.name}
                </Tag>
              ))}
          </>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enablePagination: false,
    enableRowVirtualization: true,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: false,
    enableColumnOrdering: false,
    enableFacetedValues: true,
    enablePinning: false,
    enableRowSelection: true,
    enableDensityToggle: false,
    mantineTableContainerProps: { sx: { maxHeight: "60vh" } },
    enableBottomToolbar: false,
    enableFullScreenToggle: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "xs",
    },
    positionToolbarAlertBanner: "bottom",
    positionGlobalFilter: "left",
    mantineSearchTextInputProps: {
      placeholder: `Search contacts`,
      sx: { minWidth: "300px" },
      variant: "filled",
    },
  });

  return (
    <>
      {isLoading ? showLoadingSpinners() : <MantineReactTable table={table} />}
    </>
  );
};

export default CollectionsContactTable;
