import { InputProps } from "../types";

export const TextInputProps = ({
  label,
  inputProps,
}: {
  label: string;
  inputProps: InputProps;
}) => {
  return (
    <>
      <div>
        <label>{label}: </label>
        <input {...inputProps} />
      </div>
    </>
  );
};
