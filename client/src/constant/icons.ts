import { DeleteIcon, EditIcon, Paperclip } from "lucide-react";
import { FaUsers } from "react-icons/fa6";
import { GiMoneyStack, GiTeacher } from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { PiStudentFill } from "react-icons/pi";

export const iconMap: Record<string, IconType> = {
  PiStudentFill,
  GiTeacher,
  FaUsers,
  delete: DeleteIcon,
  edit: EditIcon,
  transactions: GiMoneyStack,
  courses: Paperclip,
};
