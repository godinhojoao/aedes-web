import { useContext, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { ComplaintDialogProps } from "../../interfaces/props/ComplaintDialogProps";
import { complaintStatusesManager } from "../../shared/complaintStatusesManager";
import { formatDateTime } from "../../shared/formatDate";
import { AuthContext, AuthContextValue } from "../../context/AuthContext";
import { UPDATE_COMPLAINT } from "../../graphql/mutations";
import {
  UpdateComplaintInput,
  UpdateComplaintResponse,
} from "../../interfaces/graphql/UpdateComplaintMutation";
import { useMutation } from "@apollo/client";
import { LocalStorageManager } from "../../shared/LocalStorageManager";
import { removeHoursFromTimestamp } from "../../shared/removeHoursFromTimestamp";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export function ComplaintDialog({
  open,
  setOpen,
  currentComplaint,
  setCurrentComplaint,
  afterSave,
}: ComplaintDialogProps): JSX.Element {
  const token = LocalStorageManager.getItem("aedes-token");
  const { account } = useContext(AuthContext) || ({} as AuthContextValue);
  const [updateComplaint] = useMutation<
    UpdateComplaintResponse,
    UpdateComplaintInput
  >(UPDATE_COMPLAINT, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: async () => {
      await afterSave();
      setOpen(false);
    },
  });

  const handleSave = async (): Promise<void> => {
    const complaintToUpdate = {
      id: currentComplaint.id,
      solverId: account?.id,
      solverDescription: currentComplaint.solverDescription || "",
      status: currentComplaint.status,
      location: {
        id: currentComplaint.location.id,
        city: currentComplaint.location.city,
        state: currentComplaint.location.state,
        street: currentComplaint.location.street,
        neighborhood: currentComplaint.location.neighborhood,
        cep: currentComplaint.location.cep,
        number: currentComplaint.location.number,
      },
      updatedAt: new Date(),
    };
    updateComplaint({ variables: { input: complaintToUpdate } });
  };

  const handleChange = (e: { target: { name: any; value: any } }): void => {
    const { name, value } = e.target;
    setCurrentComplaint((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={(): void => setOpen(false)}
        TransitionComponent={Transition}
        sx={{
          width: "60%",
          marginLeft: "auto",
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={(): void => setOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Denúncia
              <Box
                component="span"
                sx={{
                  backgroundColor: "#7cbeff",
                  fontSize: 16,
                  padding: "4px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  ml: 1,
                }}
              >
                #{currentComplaint.id}
              </Box>
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleSave}
              style={{ marginRight: "8px" }}
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom mb={2}>
            Informações
          </Typography>

          <Grid item xs={6}>
            <TextField
              select
              label="Status"
              name="status"
              value={currentComplaint.status || ""}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: "15px" }}
            >
              {complaintStatusesManager.complaintStatuses.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value || ""}
                  style={{ color: option.color }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Data de criação"
              name="createdAt"
              value={
                currentComplaint.createdAt
                  ? formatDateTime(removeHoursFromTimestamp(currentComplaint.createdAt, 3))
                  : ""
              }
              fullWidth
              sx={{ marginBottom: "15px" }}
              disabled
            />
          </Grid>

          {currentComplaint.updatedAt && (
            <Grid item xs={6}>
              <TextField
                label="Data de atualização"
                name="updatedAt"
                value={formatDateTime(removeHoursFromTimestamp(currentComplaint.updatedAt, 3))}
                fullWidth
                sx={{ marginBottom: "15px" }}
                disabled
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <TextField
              label="Descrição"
              name="description"
              value={currentComplaint.description || ""}
              multiline
              rows={4}
              fullWidth
              sx={{ marginBottom: "15px" }}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Descrição do solucionador"
              name="solverDescription"
              value={currentComplaint.solverDescription || ""}
              multiline
              rows={4}
              fullWidth
              sx={{ marginBottom: "4px" }}
              onChange={handleChange}
            />
          </Grid>

          <Typography variant="h6" gutterBottom mt={2} mb={2}>
            Localização
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Cidade"
                name="city"
                value={currentComplaint.location.city || ""}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado"
                name="state"
                value={currentComplaint.location.state || ""}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bairro"
                name="neighborhood"
                value={currentComplaint.location.neighborhood || ""}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rua"
                name="street"
                value={currentComplaint.location.street || ""}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Número"
                name="number"
                value={currentComplaint.location.number || ""}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CEP"
                name="cep"
                value={currentComplaint.location.cep || ""}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
