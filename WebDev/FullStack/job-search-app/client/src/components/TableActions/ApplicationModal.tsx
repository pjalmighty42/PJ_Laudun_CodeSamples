import ApplicationInterface from "../../interfaces/ApplicationInterfaces";

interface ApplicationModalProps {
  isOpen: boolean;
  type: string;
  handleOpen: () => void;
  handleClose: () => void;
  saveApplication: () => void;
}

function ApplicaionModal({
  isOpen,
  type,
  handleOpen,
  handleClose,
  saveApplication,
}: ApplicationModalProps) {
  return <></>;
}

export default ApplicaionModal;
