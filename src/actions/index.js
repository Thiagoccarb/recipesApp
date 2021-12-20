export const DRINKS = 'DRINKS';
export const LOADING = 'LOADING';
export const MEALS = 'MEALS';
export const MEALSORDRINKS = 'MEALSORDRINKS';
export const MEALSORDRINKSCATEGORIES = 'MEALSORDRINKSCATEGORIES';
export const ID = 'ID';
export const AREA = 'AREA';
export const INGREDIENTS = 'INGREDIENTS';
export const EXPLOREINGREDIENTS = 'EXPLOREINGREDIENTS';
export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';
export const MEALSORDRINKSEARCHBAR = 'MEALSORDRINKSEARCHBAR';
export const MEALSCATEGORIES = 'MEALSCATEGORIES';
export const DRINKSCATEGORIES = 'DRINKSCATEGORIES';
export const REQUEST = 'REQUEST';
export const MEALFILTEREDCATEGORY = 'MEALFILTEREDCATEGORY';
export const DRINKFILTEREDCATEGORY = 'DRINKFILTEREDCATEGORY';
export const BUTTONCATEGORY = 'BUTTONCATEGORY';
export const BUTTONVALIDATE = 'BUTTONVALIDATE';
export const RANDOMMEAL = 'RANDOMMEAL';
export const ORIGIN = 'ORIGIN';

export const INITIALMEALSORDRINKS = 'INITIALMEALSORDRINKS';

const MSG = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export const setMealsOrDrinks = (value) => ({
  type: MEALSORDRINKS, value,
});

export const setMealFilteredCategory = (value) => ({
  type: MEALFILTEREDCATEGORY, value,
});

export const setDrinkFilteredCategory = (value) => ({
  type: DRINKFILTEREDCATEGORY, value,
});

export const setButtonCategory = (value) => ({
  type: BUTTONCATEGORY, value,
});

export const requestFetchAPI = () => ({
  type: REQUEST, loading: true,
});

export const successFetchAPI = () => ({
  type: SUCCESS, loading: false,
});

export const failFetchAPI = (error) => ({
  type: FAIL, loading: false, error,
});

export const setInitialMealsOrDrinks = (value) => ({
  type: INITIALMEALSORDRINKS, value,
});

export const setMealsCategories = (value) => ({
  type: MEALSCATEGORIES, value,
});

export const setDrinksCategories = (value) => ({
  type: DRINKSCATEGORIES, value,
});

export const setId = (value) => ({
  type: ID, value,
});

export const setArea = (value) => ({
  type: AREA, value,
});

export const setOrigin = (value) => ({
  type: ORIGIN, value,
});

export const setIngredient = (value) => ({
  type: INGREDIENTS, value,
});

export const setButtonValidate = (value) => ({
  type: BUTTONVALIDATE, value,
});

export const setRandomMealOrDrinkID = (value) => ({
  type: RANDOMMEAL, value,
});

export const setIngredients = (value) => ({
  type: EXPLOREINGREDIENTS, value,
});

export const thunkMealsOrDrinks = (pathname) => async (dispatch) => {
  const itens = pathname.includes('comidas') ? 'meals' : 'drinks';
  const mealOrCocktail = pathname.includes('comidas') ? 'meal' : 'cocktail';
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(`https://www.the${mealOrCocktail}db.com/api/json/v1/1/search.php?s=`);
    const response = await request.json();
    await dispatch(successFetchAPI());
    await dispatch(setInitialMealsOrDrinks(response[itens]));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkMealorDrinkIng = (searchbar, value, pathname) => async (dispatch) => {
  const itens = pathname.includes('comidas') ? 'meals' : 'drinks';
  const mealOrCocktail = pathname.includes('comidas') ? 'meal' : 'cocktail';
  let URL;
  if (value === 'ingredient') {
    URL = `https://www.the${mealOrCocktail}db.com/api/json/v1/1/filter.php?i=${searchbar}`;
  }
  if (value === 'name') {
    URL = `https://www.the${mealOrCocktail}db.com/api/json/v1/1/search.php?s=${searchbar}`;
  }
  if (value === 'firstLetter') {
    URL = `https://www.the${mealOrCocktail}db.com/api/json/v1/1/search.php?f=${searchbar}`;
  }
  console.log(URL);
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(URL);
    const response = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setInitialMealsOrDrinks(response[itens]));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkMealButtonsCategories = () => async (dispatch) => {
  try {
    dispatch(requestFetchAPI());
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setMealsCategories(meals));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkDrinkButtonsCategories = () => async (dispatch) => {
  try {
    dispatch(requestFetchAPI());
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setDrinksCategories(drinks));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkMealCategorie = (value) => async (dispatch) => {
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
    const { meals } = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setInitialMealsOrDrinks(meals));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkDrinkCategorie = (value) => async (dispatch) => {
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
    const { drinks } = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setInitialMealsOrDrinks(drinks));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkById = (value, pathname) => async (dispatch) => {
  const itens = pathname.includes('comidas') ? 'meals' : 'drinks';
  const mealOrCocktail = pathname.includes('comidas') ? 'meal' : 'cocktail';
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(`https://www.the${mealOrCocktail}db.com/api/json/v1/1/lookup.php?i=${value}`);
    const response = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setId(response[itens]));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkRandomMealorDrinkID = (pathname) => async (dispatch) => {
  const link = pathname.includes('comidas') ? 'meal' : 'cocktail';
  const mealsOrDrinks = pathname.includes('comidas') ? 'meals' : 'drinks';
  const idMealOrIdDrink = pathname.includes('comidas') ? 'idMeal' : 'idDrink';
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(`https://www.the${link}db.com/api/json/v1/1/random.php`);
    const response = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setRandomMealOrDrinkID(response[mealsOrDrinks][0][idMealOrIdDrink]));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkMealorDrinkIngredient = (pathname) => async (dispatch) => {
  const link = pathname.includes('comidas') ? 'meal' : 'cocktail';
  const mealsOrDrinks = pathname.includes('comidas') ? 'meals' : 'drinks';
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(`https://www.the${link}db.com/api/json/v1/1/list.php?i=list`);
    const response = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setIngredients(response[mealsOrDrinks]));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkByArea = () => async (dispatch) => {
  try {
    dispatch(requestFetchAPI());
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setArea(meals));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};
