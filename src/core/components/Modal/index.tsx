import { Box, Button, Modal, Typography } from "@mui/material";

type ModalProps = {
  open: boolean;
  currentErrors: string[];
  onClose: () => void;
};

export const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  currentErrors,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "16px",
          outline: "none",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Houve algo errado</Typography>
        <Box mt={1} mb={2}>
          {currentErrors.map((error, index) => {
            return <Typography key={error + index}>{error}</Typography>;
          })}
        </Box>
        <Button variant="contained" color="primary" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </Modal>
  );
};
