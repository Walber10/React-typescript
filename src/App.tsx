import {
  Box,
  CircularProgress,
  Paper,
  Snackbar,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { SwipeNavbar } from "./components/SwipeNavbar";
import { SwipeDisplayJob } from "./components/SwipeDisplayJob";
import theme from "./theme";
import {
  useAcceptJob,
  useFetchJobMatches,
  useFetchWorkerProfile,
  useRejectJob,
} from "./Hooks";
import { WORKER_ID } from "./constants";
import { useState } from "react";

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const {
    workerProfile,
    isLoading: isLoadingWorker,
    error: workerError,
  } = useFetchWorkerProfile(WORKER_ID);
  const {
    jobMatches,
    isLoading: isLoadingMatches,
    error: matchesError,
  } = useFetchJobMatches(WORKER_ID);

  const { acceptJob, error: acceptJobError } = useAcceptJob(WORKER_ID);
  const { rejectJob, error: rejectJobError } = useRejectJob(WORKER_ID);

  if (workerError || matchesError || acceptJobError || rejectJobError) {
    setSnackbarMessage("Ops, something went wrong, try again later");
    setSnackbarOpen(true);
  }
  if (isLoadingWorker || isLoadingMatches)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      <Box marginBottom={5}>
        <SwipeNavbar
          userName={`${workerProfile?.firstName} ${workerProfile?.lastName}`}
        />
        <Paper
          sx={{
            maxWidth: { xs: "100%", md: "600px", margin: " auto" },
          }}
        >
          {jobMatches.map((job) => (
            <Stack>
              <SwipeDisplayJob
                key={job.jobId}
                job={job}
                onJobAccept={async () => {
                  const response = await acceptJob(job.jobId);
                  setSnackbarMessage(response.message);
                  setSnackbarOpen(true);
                }}
                onJobReject={async () => {
                  const response = await rejectJob(job.jobId);
                  setSnackbarMessage(response.message);
                  setSnackbarOpen(true);
                }}
              />
            </Stack>
          ))}
        </Paper>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => {
          setSnackbarMessage("");
          setSnackbarOpen(false);
        }}
      />
    </ThemeProvider>
  );
}

export default App;
