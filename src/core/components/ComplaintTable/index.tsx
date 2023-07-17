import { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Tooltip, Typography } from "@mui/material";
import ModeEditOutlineRounded from "@mui/icons-material/ModeEditOutlineRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { TablePaginationActions } from "./TablePaginationActions";
import { ComplaintDialog } from "../ComplaintDialog";
import {
  FIND_ALL_COMPLAINTS_QUERY,
  FIND_COMPLAINT_QUERY,
} from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { LocalStorageManager } from "../../shared/LocalStorageManager";
import {
  FindAllComplaintsInput,
  FindAllComplaintsResponse,
  ComplaintTableRow,
} from "../../interfaces/graphql/FindAllComplaintsQuery";
import { formatDateTime } from "../../shared/formatDate";
import { AuthContext, AuthContextValue } from "../../context/AuthContext";
import { Complaint } from "../../interfaces/types/Complaint";
import {
  FindComplaintInput,
  FindComplaintResponse,
} from "../../interfaces/graphql/FindComplaintQuery";
import { handleInvalidAuthToken } from "../../shared/handleInvalidAuthToken";
import { complaintStatusesManager } from "../../shared/complaintStatusesManager";

export function ComplaintTable(): JSX.Element {
  const { setIsAuthenticated, setAccount } =
    useContext(AuthContext) || ({} as AuthContextValue);
  const [currentComplaint, setCurrentComplaint] = useState<Complaint | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState<ComplaintTableRow[]>([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const token = LocalStorageManager.getItem("aedes-token");

  function handleApiError(error: any): void {
    handleInvalidAuthToken({ error, setIsAuthenticated, setAccount });
  }

  const { refetch: refetchAllComplaints } = useQuery<
    FindAllComplaintsResponse,
    FindAllComplaintsInput
  >(FIND_ALL_COMPLAINTS_QUERY, {
    variables: {
      input: {
        limit: 5,
        offset: 0,
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data: FindAllComplaintsResponse) => {
      setRows(data.findAllComplaints.items);
    },
    onError: handleApiError,
  });
  const { refetch: refetchCurrentComplaint } = useQuery<
    FindComplaintResponse,
    FindComplaintInput
  >(FIND_COMPLAINT_QUERY, {
    skip: true,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onError: handleApiError,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleEdit = async (row: ComplaintTableRow): Promise<void> => {
    const result = await refetchCurrentComplaint({
      input: {
        id: row.id,
      },
    });
    setCurrentComplaint(result.data.findComplaint);
    setOpenDialog(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {formatDateTime(new Date(row.createdAt))}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.city}
                </TableCell>
                <TableCell align="right">{row.formattedAddress}</TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {complaintStatusesManager.getComplaintStatusTranslation(
                    row.status
                  )}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={row.description}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        component="div"
                        noWrap
                        sx={{
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.description}
                      </Typography>
                      <InfoOutlined
                        fontSize="small"
                        style={{ marginLeft: 4 }}
                      />
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    endIcon={<ModeEditOutlineRounded />}
                    onClick={(): Promise<void> => handleEdit(row)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {currentComplaint && currentComplaint.id && (
        <ComplaintDialog
          open={openDialog}
          setOpen={setOpenDialog}
          currentComplaint={currentComplaint}
          setCurrentComplaint={setCurrentComplaint}
          afterSave={refetchAllComplaints}
        />
      )}
    </>
  );
}
