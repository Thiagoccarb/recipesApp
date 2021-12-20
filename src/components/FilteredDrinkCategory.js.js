// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// import {
//   thunkDrinkCategorie,
// } from '../actions';

// function FilteredDrinkCategory() {
//   const dispatch = useDispatch();
//   const filteredCategory = useSelector((state) => state
//     .mealsOrDrinksFilteredCategory.ButtonCategory);
//   const filteredMeal = useSelector((state) => state
//     .mealsOrDrinksFilteredCategory.drinkFilteredCategory);

//   const MAX_NUMBER = 12;

//   const filterByCategories = (value) => dispatch(thunkDrinkCategorie(value));

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
//             to={ `/bebidas/${el.idDrink}` }
//           >
//             <div
//               data-testid={ `${index}-recipe-card` }
//             >
//               <span
//                 data-testid={ `${index}-card-name` }
//               >
//                 {el.strDrink}
//               </span>
//               <img
//                 data-testid={ `${index}-card-img` }
//                 src={ el.strDrinkThumb }
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

// export default FilteredDrinkCategory;
