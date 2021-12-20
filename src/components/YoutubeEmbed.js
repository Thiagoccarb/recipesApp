import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  thunkById,
} from '../actions';

const YoutubeEmbed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const youtubeLink = useSelector((state) => state
    .mealsOrDrinksById.mealsOrDrinksById[0].strYoutube);
  const youtubeID = youtubeLink ? youtubeLink.split('=')[1] : null;

  // const youtubeID = () => {
  //   if (pathname.includes('comidas')) {
  //     return youtubeLink.split('=')[1];
  //   }
  // };
  // const youtubeID = youtubeLink.split('=')[1];

  useEffect(() => {
    dispatch(thunkById(id, pathname));
  }, []);

  return (
    <div
      data-testid="video"
      className="youtube-video"
    >
      <iframe
        data-testid="video"
        width="200"
        height="300"
        src={ `https://www.youtube.com/embed/${youtubeID}` }
        frameBorder="0"
        allowFullScreen
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
