import { useEffect, useState } from "react";
import styles from "./FriendsPlaying.module.css";

function FriendsPlaying() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/friends-playing")
      .then(res => res.json())
      .then(data => {
        setFriends(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Список друзів:</h2>
      <ul className={styles.list}>
        {friends.map((f, i) => (
          <li key={i} className={styles.listItem}>
            <img
              src={f.avatar}
              alt={f.name}
              width={48}
              className={styles.avatar}
            />
            <strong className={styles.name}>{f.name}</strong>
            {f.game ? (
              <>
                {" "}
                грає в <em className={styles.game}>{f.game}</em>
              </>
            ) : (
              " зараз не грає"
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsPlaying;
