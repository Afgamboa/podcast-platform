import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  TextField,
  Typography,
  Box,
 
} from "@mui/material";
import { useTopPodcasts } from "@hooks/useTopPodcasts";
import { useFilterStore } from "@store/filterStore";
import PodcastCard from "@components/PodcastCard";
import PageLoader from "@components/Loading";
import "@styles/Home.css";
import ErrorAlert from "@components/ErrorAlert";

const Home = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useTopPodcasts();
  const { searchTerm, setSearchTerm } = useFilterStore();

  const filtered = useMemo(
    () =>
      data?.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.author.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ?? [],
    [data, searchTerm],
  );

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <ErrorAlert onRetry={refetch} />;
  }

  return (
    <Box className="home">
      <Box className="home__header">
        <Box className="home__controls">
          <TextField
            size="small"
            placeholder={t("home.filterPlaceholder")}
            variant="filled"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="home__filter"
            sx={{
              "& .MuiFilledInput-root": {
                "&:before, &:after": {
                  display: "none",
                },
              },
            }}
          />
          <Typography variant="body2" className="home__results-count">
            {t("home.resultsCount", { count: filtered.length })}
          </Typography>
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Typography className="home__empty" color="text.secondary">
          {t("home.empty")}
        </Typography>
      ) : (
        <Grid container spacing={2} className="home__grid">
          {filtered.map((podcast) => (
            <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }} key={podcast.id}>
              <PodcastCard podcast={podcast} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
