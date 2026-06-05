import { Routes, Route } from "react-router-dom";
import Home from "../websitepages/home";
import About from "../websitepages/about";
import touristpage from "../websitepages/touristpage";
import Explore from "../websitepages/explore";

const MainRouter = () => {
  return (
    <>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
       <Route path="/touristpage" element={<touristpage />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>

    </>
  );
};

export default MainRouter;