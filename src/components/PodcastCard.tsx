import { Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import type { IPodcast } from '@models/Podcast'
import '@styles/PodcastCard.css'

interface IPodcastCardProps {
  podcast: IPodcast
}

const PodcastCard = ({ podcast }: IPodcastCardProps) => (
  <Card
    component={Link}
    to={`/podcast/${podcast.id}`}
    className="podcast-card"
    sx={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <CardMedia
      component="img"
      image={podcast.image || '/placeholder-podcast.svg'}
      alt={podcast.name}
      className="podcast-card__image"
      loading="lazy"
      width={170}
      height={170}
      sx={{ aspectRatio: '1', objectFit: 'cover' }}
    />
    <CardContent className="podcast-card__content">
      <Typography
        variant="subtitle2"
        component="h2"
        className="podcast-card__title"
        noWrap
        title={podcast.name}
      >
        {podcast.name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        className="podcast-card__author"
        noWrap
      >
        {podcast.author}
      </Typography>
    </CardContent>
  </Card>
)

export default PodcastCard