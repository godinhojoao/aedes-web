import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { ComplaintDialogProps } from "../../interfaces/props/ComplaintDialogProps";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const statusOptions = [
  { label: "Pendente", value: "pending", color: "blue" },
  { label: "Cancelada", value: "canceled", color: "purple" },
  { label: "Resolvida", value: "solved", color: "green" },

  // on backend:
  // WAITING
  // DOING
  // SOLVED
  // REJECTED
];

export function ComplaintDialog({
  open,
  setOpen,
  currentComplaint
}: ComplaintDialogProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('currentComplaint', currentComplaint);
  const [formData, setFormData] = React.useState({
    id: "884e7d19-7b16-4447-89d9-d8b1917148c2",
    status: "pending",
    city: "Bagé",
    state: "RS",
    street: "Rua Otávio Hipólito",
    neighborhood: "Getúlio Vargas",
    cep: "96400-090",
    number: "1940",
    createdAt: "09/06/2023 19:00",
    updatedAt: "10/06/2023 21:00",
    description:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum",
  });

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSave = (): void => {
    handleClose();
  };

  const handleChange = (e: { target: { name: any; value: any } }): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
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
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
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
                #{formData.id}
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
              value={formData.status}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: "15px" }}
            >
              {statusOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
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
              value={formData.createdAt}
              fullWidth
              sx={{ marginBottom: "15px" }}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Data de atualização"
              name="updatedAt"
              value={formData.updatedAt}
              fullWidth
              sx={{ marginBottom: "15px" }}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Descrição"
              name="description"
              value={formData.description}
              multiline
              rows={4}
              fullWidth
              sx={{ marginBottom: "4px" }}
              disabled
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
                value={formData.city}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado"
                name="state"
                value={formData.state}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bairro"
                name="neighborhood"
                value={formData.neighborhood}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rua"
                name="street"
                value={formData.street}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Número"
                name="number"
                value={formData.number}
                fullWidth
                sx={{ marginBottom: "4px" }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CEP"
                name="cep"
                value={formData.cep}
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
