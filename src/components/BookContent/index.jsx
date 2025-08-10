import styles from "./bookcontent.module.css";
import { useLocation } from "react-router-dom";
import { Cross } from "@react-vant/icons";
import { useNavigate } from "react-router-dom";



const BookContent = () => {
  const { chapter } = useLocation().state;
  const { chapterTitle, chapterContent } = chapter;
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.bookContent}>
        <div className={styles.title}>
          {chapterTitle}
          <Cross className={styles.close} onClick={() => {
            navigate(-1);
          }} />
        </div>
        <div className={styles.content}>
          {chapterContent.split("\n").map((item, index) => (
            <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{item}</p>
          ))}
        </div>
      </div>

    </>
  )
}

export default BookContent;
