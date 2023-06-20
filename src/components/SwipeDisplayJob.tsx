import {
  Box,
  Divider,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConstructionIcon from "@mui/icons-material/Construction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SwipeButton } from "./SwipeButton";
import { JobMatch } from "../Model";
import { formatShiftDate, openGoogleMaps } from "../Utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SwipeDisplayJobRowProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  handleClickOnRow?: () => void;
}

const SwipeDisplayJobRow = ({
  icon,
  title,
  description,
  handleClickOnRow,
}: SwipeDisplayJobRowProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 2,
        cursor: handleClickOnRow ? "pointer" : "default",
      }}
      onClick={handleClickOnRow}
    >
      {icon}
      <Box width="100%">
        <Typography>{title}</Typography>
        <Box>{description}</Box>
      </Box>
      {handleClickOnRow && <ArrowForwardIosIcon sx={{ marginLeft: 5 }} />}
    </Paper>
  );
};

type SwipeDisplayJobsProp = {
  job: JobMatch;
  onJobAccept: () => void;
  onJobReject: () => void;
};

export const SwipeDisplayJob = ({
  job,
  onJobAccept,
  onJobReject,
}: SwipeDisplayJobsProp) => {
  const {
    jobTitle,
    company,
    milesToTravel,
    wagePerHourInCents,
    requirements,
    shifts,
  } = job;

  return (
    <Box>
      <Box component="img" src={jobTitle.imageUrl} sx={{ width: "100%" }} />
      <Box padding="10px">
        <Typography>{jobTitle.name}</Typography>
        <Typography variant="body2">{company.name}</Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
        sx={{ backgroundColor: "#30d5ab" }}
      >
        <Box>
          <Typography variant="caption">Distance</Typography>
          <Typography color="white">{milesToTravel.toFixed(2)} km</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Hourly Rate</Typography>
          <Typography color="white">
            ${wagePerHourInCents.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
      <Container sx={{ marginY: 1 }}>
        <Stack gap={1}>
          <SwipeDisplayJobRow
            icon={<CalendarMonthIcon />}
            title="Shift Dates"
            description={
              <Box
                sx={{
                  height: "auto",
                  maxHeight: "60px",
                  width: "100%",
                  overflowY: "auto",
                  overfloXx: "hidden",
                }}
              >
                {shifts.map((x, i) => {
                  const shiftDateFormated = formatShiftDate(
                    x.startDate,
                    x.endDate
                  );
                  return (
                    <Box key={i}>
                      <Typography variant="subtitle1">
                        {shiftDateFormated}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            }
          />
          <Divider />
          <SwipeDisplayJobRow
            icon={<LocationOnIcon />}
            title="Location"
            description={
              <Stack direction="row" width="100%" gap={5} alignItems="center">
                <Typography variant="subtitle1">
                  {company.address.formattedAddress}
                </Typography>
              </Stack>
            }
            handleClickOnRow={() =>
              openGoogleMaps(company.address.formattedAddress)
            }
          />
          {requirements && requirements.length > 0 && (
            <Stack gap={1}>
              <Divider />
              <SwipeDisplayJobRow
                icon={<ConstructionIcon />}
                title={"Requirements"}
                description={requirements?.map((x, i) => (
                  <Typography key={i} variant="subtitle1">
                    -{x}
                  </Typography>
                ))}
              />
            </Stack>
          )}
          <Divider />
          {company.reportTo != undefined && (
            <SwipeDisplayJobRow
              icon={<AccountCircleIcon />}
              title={"Report To"}
              description={
                <Typography variant="subtitle1">
                  {company.reportTo?.name} {company.reportTo?.phone}
                </Typography>
              }
            />
          )}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={2}
          marginTop={2}
          marginBottom={5}
        >
          <SwipeButton backgroundColor="white" onClick={onJobAccept}>
            No Thanks
          </SwipeButton>
          <SwipeButton backgroundColor="black" onClick={onJobReject}>
            I'll Take it
          </SwipeButton>
        </Stack>
      </Container>
    </Box>
  );
};
