import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import PageLoader from "@components/Loading";

const Home = lazy(() => import("@pages/Home"));
const PodcastDetail = lazy(() => import("@pages/PodcastDetail"));
const EpisodeDetail = lazy(() => import("@pages/EpisodeDetail"));
const NotFoundPage = lazy(() => import("@pages/NotFound"));

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetail />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);
