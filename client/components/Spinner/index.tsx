import React from "react";

interface SpinnerProps {
  floating?: boolean;
}

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  const { floating } = props;

  return (
    <div className={`spinner ${floating ? "floating" : ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
