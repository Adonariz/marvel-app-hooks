import "./comicsList.scss";

import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = (props) => {
  const [comicsList, setComicList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllComics(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newComicsList) => {
    let ended = false;

    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicList((charList) => [...charList, ...newComicsList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 8);
    setComicsEnded((comicsEnded) => ended);
  };

  const renderItems = (arr) => {
    const items = arr.map((item) => {
      const { id, title, thumbnail, price } = item;

      return (
        <li key={id} className="comics__item">
          <a href="#">
            <img src={thumbnail} alt={thumbnail} className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </a>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  };

  const comics = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {comics}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
