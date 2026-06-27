import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-load all pages — only the home page is needed on first load
// Other routes load their JS only when navigated to
const Home = lazy(() => import("../websitepages/home"));
const About = lazy(() => import("../websitepages/about"));
const Explore = lazy(() => import("../websitepages/explore"));
const Places = lazy(() => import("../websitepages/Places"));

// Minimal fallback that matches the site background
const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      background: "#182318",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "32px",
        height: "32px",
        border: "2px solid rgba(200,169,106,.2)",
        borderTopColor: "#c8a96a",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const MainRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/touristpage" element={<Places />} />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;