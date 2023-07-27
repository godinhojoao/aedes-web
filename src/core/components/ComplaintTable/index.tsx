import { useContext, useEffect, useState } from "react";
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
import { removeHoursFromTimestamp } from "../../shared/removeHoursFromTimestamp";

export function ComplaintTable(): JSX.Element {
  const { setIsAuthenticated, setAccount } =
    useContext(AuthContext) || ({} as AuthContextValue);
  const [currentComplaint, setCurrentComplaint] = useState<Complaint | null>(
    null
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState<ComplaintTableRow[]>([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
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
        limit: rowsPerPage,
        offset: page,
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data: FindAllComplaintsResponse) => {
      setTotalCount(data.findAllComplaints.totalCount);
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

  useEffect(() => {
    const fetchComplaints = async (): Promise<void> => {
      const response = await refetchAllComplaints();
      if (response && response.data && response.data.findAllComplaints) {
        const items = response.data.findAllComplaints.items;
        const totalCount = response.data.findAllComplaints.totalCount;
        setRows(items);
        setTotalCount(totalCount);
      }
    };
    fetchComplaints();
  }, [page, refetchAllComplaints]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {formatDateTime(removeHoursFromTimestamp(row.createdAt, 3))}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.location.city}
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
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={totalCount}
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
