import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { usePodcastDetail } from "@hooks/usePodcastDetail";
import PodcastSidebar from "@components/PodcastSidebar";
import EpisodeRecord from "@components/EpisodeRecord";
import PageLoader from "@components/Loading";
import "@styles/PodcastDetail.css";
import ErrorAlert from "@components/ErrorAlert";

const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = usePodcastDetail(podcastId!);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !data) {
    return <ErrorAlert onRetry={refetch} />;
  }

  const { podcast, episodes } = data;

  const tableCellSx = {
    color: "primary.main",
  };

  return (
    <Grid container spacing={3} className="podcast-detail">
      <Grid size={{ xs: 12, md: 3 }}>
        <PodcastSidebar podcast={podcast} />
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <Paper className="podcast-detail__episodes" elevation={1}>
          <Typography
            variant="h6"
            component="h2"
            className="podcast-detail__episodes-title"
          >
            {t("podcastDetail.episodeCount", { count: episodes.length })}
          </Typography>

          <TableContainer className="podcast-detail__table-container">
            <Table aria-label="episodes list">
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellSx}>
                    {t("podcastDetail.episodes")}
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    {t("podcastDetail.dateColumn")}
                  </TableCell>
                  <TableCell align="right" sx={tableCellSx}>
                    {t("podcastDetail.durationColumn")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {episodes.map((episode) => (
                  <EpisodeRecord
                    key={episode.id}
                    episode={episode}
                    podcastId={podcastId!}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PodcastDetail;
