import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "./NotFound";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [notFound, setNotFound] = useState(false);
  const { search } = useParams();

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
        }
        return res.json();
      })
      .then((data) => setWord(data[0].meanings));
  }, [search]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      {word && (
        <>
          <h1>Definition: </h1>
          {word.map((meaning) => (
            <p key={uuidv4()}>
              {meaning.partOfSpeech + ": "}
              {meaning.definitions[0].definition}
            </p>
          ))}
        </>
      )}
    </>
  );
}
