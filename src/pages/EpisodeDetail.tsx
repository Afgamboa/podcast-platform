import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography, Grid, Button } from "@mui/material";
import { usePodcastDetail } from "@hooks/usePodcastDetail";
import PodcastSidebar from "@components/PodcastSidebar";
import ErrorAlert from "@components/ErrorAlert";
import PageLoader from "@components/Loading";
import { sanitizeHtml } from "@utils/sanitizeHtml";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import "@styles/EpisodeDetail.css";

const EpisodeDetail = () => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = usePodcastDetail(podcastId!);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !data) {
    return <ErrorAlert onRetry={refetch} />;
  }

  const episode = data.episodes.find((e) => String(e.id) === episodeId);

  if (!episode) {
    return <ErrorAlert message={t("episode.errorMessage")} />;
  }

  return (
    <Grid container spacing={3} className="episode-detail">
      <Grid size={{ xs: 12, md: 3 }}>
        <PodcastSidebar podcast={data.podcast} />
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <Box className="episode-detail__content">
          <Typography
            variant="h5"
            component="h1"
            className="episode-detail__title"
          >
            {episode.title}
          </Typography>

          <Box className="episode-detail__meta">
            <Typography
              variant="body2"
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              {t("episode.published")}: {formatDate(episode.releaseDate)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              {t("episode.duration")}: {formatTime(episode.duration)}
            </Typography>
          </Box>

          {episode.audioUrl ? (
            <audio
              controls
              src={episode.audioUrl}
              className="episode-detail__player"
              aria-label={episode.title}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No audio available
            </Typography>
          )}

          {episode.description ? (
            <Box
              className="episode-detail__description"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(episode.description),
              }}
            />
          ) : (
            <Typography  className="episode-detail__description"  variant="body2" color="text.secondary">
              {t('episode.noDescription')}
            </Typography>
          )}

          <Button
            component={Link}
            to={`/podcast/${podcastId}`}
            variant="outlined"
            size="medium"
            className="episode-detail__back"
          >
             {t('podcastDetail.backToPodcast')}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EpisodeDetail;
