// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// import {
//   thunkMealCategorie,
// } from '../actions';

// function FilteredMealCategory() {
//   const dispatch = useDispatch();
//   const filteredCategory = useSelector((state) => state
//     .mealsOrDrinksFilteredCategory.ButtonCategory);
//   const filteredMeal = useSelector((state) => state
//     .mealsOrDrinksFilteredCategory.mealFilteredCategory);

//   const MAX_NUMBER = 12;

//   const filterByCategories = (value) => dispatch(thunkMealCategorie(value));

//   useEffect(() => {
//     if (filteredCategory) {
//       filterByCategories(filteredCategory);
//     }
//   }, [filteredCategory]);

//   return (
//     filteredMeal.map((el, index) => {
//       if (index < MAX_NUMBER) {
//         return (
//           <Link
//             key={ index }
//             to={ `/comidas/${el.idMeal}` }
//           >
//             <div
//               data-testid={ `${index}-recipe-card` }
//             >
//               <span
//                 data-testid={ `${index}-card-name` }
//               >
//                 {el.strMeal}
//               </span>
//               <img
//                 data-testid={ `${index}-card-img` }
//                 src={ el.strMealThumb }
//                 alt={ index }
//               />
//             </div>
//           </Link>
//         );
//       }
//       return '';
//     })
//   );
// }

// export default FilteredMealCategory;
