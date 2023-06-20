import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface SwipeButtonProps extends ButtonProps {
  backgroundColor: string;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({
  backgroundColor,
  children,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: backgroundColor,
        color: backgroundColor === "white" ? "black" : "white",
        height: "50px",
        border: "1px solid",
        borderColor: "grey",
        boxShadow: "none",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
