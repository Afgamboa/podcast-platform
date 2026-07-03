import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { IPodcast } from "@models/Podcast";
import "@styles/PodcastSidebar.css";

interface IPodcastSidebarProps {
  podcast: IPodcast;
}

const PodcastSidebar = ({ podcast }: IPodcastSidebarProps) => (
  <Box component="aside" className="podcast-sidebar">
    <Link to={`/podcast/${podcast.id}`}>
      <img
        src={podcast.image || "/placeholder-podcast.svg"}
        alt={podcast.name}
        className="podcast-sidebar__image"
        loading="lazy"
      />
    </Link>
    <Box className="podcast-sidebar__info">
      <Typography variant="subtitle1">{podcast.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {podcast.author}
      </Typography>
    </Box>
    <Box className="podcast-sidebar__description">
      <Typography variant="caption">Description:</Typography>
      <Typography variant="body2">{podcast.summary}</Typography>
    </Box>
  </Box>
);

export default PodcastSidebar;
