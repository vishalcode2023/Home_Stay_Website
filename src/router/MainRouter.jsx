import { Routes, Route } from "react-router-dom";
import Home from "../websitepages/home";
import About from "../websitepages/about";
import Explore from "../websitepages/explore";
import Places from "../websitepages/Places";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/touristpage" element={<Places/>}/>
      </Routes>
    </>
  );
};

export default MainRouter;
