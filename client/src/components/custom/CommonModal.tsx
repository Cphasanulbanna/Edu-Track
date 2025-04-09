import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface CommonModalProps {
  title: string;
  description?: string;
  children?: React.ReactElement
  open: boolean;
  close?: ()=> void
}
const CommonModal = ({ title, description,children,open= false,close }: CommonModalProps) => {
  return (
    <Dialog onOpenChange={close} open={open} >
      <DialogOverlay  />
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
