import { Input } from "antd";
import { Controller } from "react-hook-form";

const PhInputs = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label: string;
}) => {

  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : null}
      <Controller name={name} render= {({field}) => <Input {...field} type={type} id={name} />}   
      />
      
    </div>
  );
};

export default PhInputs;
