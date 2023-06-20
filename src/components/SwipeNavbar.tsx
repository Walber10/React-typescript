import { Stack, Typography, styled } from "@mui/material";
import { SwipeLogo } from "./SwipeLogo";

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: "black",
  padding: "10px",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
  },
}));

interface Props {
  userName: string;
}

export const SwipeNavbar = ({ userName }: Props) => {
  return (
    <StyledStack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <SwipeLogo />
      <Typography color="white"> {userName} </Typography>
    </StyledStack>
  );
};
