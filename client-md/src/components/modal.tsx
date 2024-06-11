import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  content: { title: string; description: string }; 
}

export default function BasicModal({ open, setOpen, content }: ModalProps) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {content.title}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           {content.description}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
