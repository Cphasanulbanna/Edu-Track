import { Progress } from "../ui/progress";

type CustomProgressBarProps = {
  value: number;
};
const CustomProgressBar = ({ value }: CustomProgressBarProps) => {
  return <Progress value={value} />;
};

export default CustomProgressBar;
