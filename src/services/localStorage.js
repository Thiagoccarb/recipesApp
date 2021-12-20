export const updateInProgresRecipes = (id, ingredients, pathname) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const type = pathname.includes('comidas') ? 'meals' : 'cocktails';

  const obj = {};
  obj[id] = [];
  console.log(obj);

  if (inProgressRecipes === null) {
    const toStorage = {
      meals: pathname.includes('comidas') ? obj : {},
      cocktails: pathname.includes('comidas') ? {} : obj,
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(toStorage));
  }
  const newObj = { ...inProgressRecipes[type], ...obj };

  const toStorage = {
    meals: pathname.includes('comidas') ? newObj : inProgressRecipes.meals,
    cocktails: pathname.includes('comidas') ? inProgressRecipes.cocktails : newObj,
  };
  return localStorage.setItem('inProgressRecipes', JSON.stringify(toStorage));
};

export const updateDoneRecipes = (pathname, mealsOrDrinks) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const type = pathname.includes('comidas') ? 'comida' : 'bebida';
  const newDoneRecipes = {
    id: pathname.includes('comidas') ? mealsOrDrinks[0].idMeal : mealsOrDrinks[0].idDrink,
    type,
    area: mealsOrDrinks[0].strArea ? mealsOrDrinks[0].strArea : '',
    category: mealsOrDrinks[0].strCategory ? mealsOrDrinks[0].strCategory : '',
    alcoholicOrNot: mealsOrDrinks[0].strAlcoholic ? mealsOrDrinks[0].strAlcoholic : '',
    name: pathname.includes('comidas')
      ? mealsOrDrinks[0].strMeal : mealsOrDrinks[0].strDrink,
    image: pathname.includes('comidas')
      ? mealsOrDrinks[0].strMealThumb : mealsOrDrinks[0].strDrinkThumb,
    doneDate: date,
    tags: mealsOrDrinks[0].strTags ? [mealsOrDrinks[0].strTags] : [],
  };
  console.log(newDoneRecipes);
  if (!doneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipes]));
  } else {
    const newStorage = [...doneRecipes, newDoneRecipes];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
};

export const updateFavoriteRecipes = (element, pathname, ide, validate) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const info = favoriteRecipes !== null ? favoriteRecipes : [];
  const checkRoute = pathname.includes('comidas');
  const type = checkRoute ? 'comida' : 'bebida';
  const storage = {
    id: element.idMeal ? element.idMeal : element.idDrink,
    type,
    area: element.strArea ? element.strArea : '',
    category: element.strCategory ? element.strCategory : '',
    alcoholicOrNot: element.strAlcoholic ? element.strAlcoholic : '',
    name: element.strMeal ? element.strMeal : element.strDrink,
    image: element.strMealThumb ? element.strMealThumb : element.strDrinkThumb,
  };

  if (validate) {
    const newStorage = [...info, storage];
    return localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
  const newStorage = info.filter((el) => el.id !== ide);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
};

export const checkLocalStorage = (pathname, id, callback) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const itens = pathname.includes('comidas') ? 'meals' : 'cocktails';

  if (inProgressRecipes === null) return callback(false);
  console.log(Object.keys(inProgressRecipes[itens]));

  const array = Object.keys(inProgressRecipes[itens]);
  const validate = array.some((el) => (el === id));

  return callback(validate);
};

export const updateLocalStorage = (e, pathname, type, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const obj = {};
  if (e.target.checked) {
    const newArray = [...inProgressRecipes[type][id], e.target.name];
    obj[id] = newArray;
    const newObj = Object.assign(inProgressRecipes[type], obj);

    const storage = {
      meals: pathname.includes('comidas') ? newObj : inProgressRecipes.meals,
      cocktails: pathname.includes('comidas') ? inProgressRecipes.cocktails : newObj,
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
  }
  const newArray = inProgressRecipes[type][id].filter((el) => el !== e.target.name);
  obj[id] = newArray;
  const newObj = Object.assign(inProgressRecipes[type], obj);

  const storage = {
    meals: pathname.includes('comidas') ? newObj : inProgressRecipes.meals,
    cocktails: pathname.includes('comidas') ? inProgressRecipes.cocktails : newObj,
  };
  return localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
};
