// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import {
//   setId,
//   setIngredient,
// } from '../actions';
// import YoutubeEmbed from './YoutubeEmbed';
// import RecommendedDrinksCard from './RecommendedDrinksCard';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import StartRecipeButton from './StartRecipeButton';

// import '../styles/FoodDetails.css';

// function FoodDetails() {
//   const msg = 'serviço indisponível';
//   const history = useHistory();
//   const id = history.location.pathname.split('/')[2];
//   const dispatch = useDispatch();
//   const isFetching = useSelector((state) => state.mealsOrDrinks.loading);
//   const meal = useSelector((state) => state.mealsOrDrinks.mealsOrDrinksByID);
//   const mealObjectValues = useSelector((state) => state.mealsOrDrinks.ingredients);
//   const ingredients = mealObjectValues
//     .filter((ingredient) => ingredient[0]
//       .includes('strIngredient') && ingredient[1] !== '')
//     .map((e) => e[1]);
//   const measures = mealObjectValues
//     .filter((ingredient) => ingredient[0]
//       .includes('strMeasure') && ingredient[1] !== ' ')
//     .map((e) => e[1]);

//   const getFoodById = async (value) => {
//     const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`;
//     try {
//       dispatch(setLoading(true));
//       const request = await fetch(URL);
//       const { meals } = await request.json();
//       dispatch(setLoading(false));
//       dispatch(setId(meals));
//       dispatch(setIngredient(Object.entries(meals[0])));
//     } catch (error) {
//       global.alert(msg);
//       return error;
//     }
//   };

//   const elements = (
//     <div>
//       {meal.map((el, i) => (
//         <div
//           key={ i }
//           className="item-details"
//         >
//           <img
//             data-testid="recipe-photo"
//             src={ el.strMealThumb }
//             alt={ el.strMeal }
//           />
//           <h1
//             data-testid="recipe-title"
//           >
//             {el.strMeal}
//           </h1>
//           <span>
//             {el.strTags}
//           </span>
//           <button
//             type="button"
//             data-testid="share-btn"
//           >
//             <img
//               src={ shareIcon }
//               alt={ shareIcon }
//             />
//           </button>
//           <button
//             type="button"
//             data-testid="favorite-btn"
//           >
//             <img
//               src={ whiteHeartIcon }
//               alt={ shareIcon }
//             />
//           </button>
//           <h2
//             data-testid="recipe-category"
//           >
//             {el.strCategory}
//           </h2>
//           <ol>
//             {
//               ingredients.map((e, index) => (
//                 <li
//                   key={ index }
//                   data-testid={ `${index}-ingredient-name-and-measure` }
//                 >
//                   {e}
//                 </li>
//               ))
//             }
//           </ol>
//           <ol>
//             {
//               measures.map((e, index) => (
//                 <li
//                   key={ index }
//                   data-testid={ `${index}-ingredient-name-and-measure` }
//                 >
//                   {e}
//                 </li>
//               ))
//             }
//           </ol>
//           <p
//             data-testid="instructions"
//           >
//             {el.strInstructions}
//           </p>
//           <YoutubeEmbed embedId={ el.strYoutube.split('/')[3] } />
//           <RecommendedDrinksCard />
//         </div>
//       ))}
//       {!isFetching && <StartRecipeButton /> }
//     </div>
//   );

//   useEffect(() => {
//     getFoodById(id);
//   }, []);

//   return (
//     elements
//   );
// }

// export default FoodDetails;
