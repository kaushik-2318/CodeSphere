import styles from "./css/homepage.module.css";
import Header from "../components/Header.jsx";
import Carousel from "../components/Carousel.jsx";
import Content from "../components/Content.jsx";

function HomePage() {
  return (
    <>
      <div className={`bg-no-repeat bg-[#05071a] ${styles.background} mb-[300px]`}  >
        <Header />
        <Carousel />
        <Content />
      </div>
    </>
  );
}

export default HomePage;
