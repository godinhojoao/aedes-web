import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import {
  ComplaintTableProps,
  ComplaintTableRow,
} from "../../interfaces/props/ComplaintTableProps";
import { TablePaginationActions } from "./TablePaginationActions";
import { ComplaintDialog } from "../ComplaintDialog";

export function ComplaintTable({ rows }: ComplaintTableProps): JSX.Element {
  const [currentComplaint, setCurrentComplaint] =
    useState<ComplaintTableRow | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleEdit = (row: ComplaintTableRow): void => {
    setOpenDialog(true);
    setCurrentComplaint(row);
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
                  {row.createdAt}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.city}
                </TableCell>
                <TableCell align="right">{row.formattedAddress}</TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.status}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    endIcon={<ModeEditOutlineRoundedIcon />}
                    onClick={(): void => handleEdit(row)}
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
      <ComplaintDialog
        open={openDialog}
        setOpen={setOpenDialog}
        currentComplaint={currentComplaint}
      />
    </>
  );
}
