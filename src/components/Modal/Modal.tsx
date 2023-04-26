import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";

export const CustomModal = (props: {
  open: boolean;
  close: any;
  children: string | JSX.Element | JSX.Element[];
  width: number;
  height: number;
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "400px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: props.width,
    height: props.height,
    bgcolor: "white",
    boxShadow: "25px 25px 150px -15px rgba(38, 50, 56, 0.45)",
    p: 4,
    borderRadius: "8px",
  };

  if (props.open === false) return null;
  else {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
          },
        }}
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>{props.children}</Box>
        </Fade>
      </Modal>
    );
  }
};
