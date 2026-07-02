import { TableRow, TableCell, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { IEpisode } from "@models/Episode";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";

interface IEpisodeRowProps {
  episode: IEpisode;
  podcastId: string;
}

const dataDisplay = (episode: IEpisode) => {
  const data: Array<{
    className: string;
    align?: "right" | "left";
    value: string | number;
    format: (value: string | number) => string;
  }> = [
    {
      className: "episode-row__date",
      value: episode.releaseDate,
      format: (value: string | number) => formatDate(value as string),
    },
    {
      className: "episode-row__duration",
      align: "right",
      value: episode.duration,
      format: (value: string | number) => formatTime(value as number),

    },
  ];

  return (
    <>
      {data.map((item) => (
        <TableCell
          className={item.className}
          align={item.align || "left"}
          key={item.className}
        >
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            {item.format(item.value)}
          </Typography>
        </TableCell>
      ))}
    </>
  );
};

const EpisodeRecord = ({ episode, podcastId }: IEpisodeRowProps) => (
  <TableRow className="episode-row" hover>
    <TableCell className="episode-row__title">
      <Typography
        component={Link}
        to={`/podcast/${podcastId}/episode/${episode.id}`}
        variant="body2"
        sx={{ color: "primary.main", textDecoration: "none" }}
      >
        {episode.title}
      </Typography>
    </TableCell>

    {dataDisplay(episode)}
  </TableRow>
);

export default EpisodeRecord;
