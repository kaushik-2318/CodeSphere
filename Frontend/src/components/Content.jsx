import { Hovereffect } from "./Hovereffect";

import styles from "./css/content.module.css";

function Content() {
  return (
    <>
      <div className={`${styles.background} flex justify-center items-center`}>
        <Hovereffect />
      </div>
    </>
  );
}
export default Content;
