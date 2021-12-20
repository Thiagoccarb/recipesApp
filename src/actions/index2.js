import { requestFetchAPI,
  successFetchAPI,
  failFetchAPI,
  setOrigin,
} from './index';

export const MEALORDRINKBYINGREDIENT = 'MEALORDRINKBYINGREDIENT';
export const CAMEFROMINGREDIENT = 'CAMEFROMINGREDIENT';

const MSG = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export const setCameFromIngredients = (value) => ({
  type: CAMEFROMINGREDIENT, value,
});

export const setItemsBySpecIngredient = (value) => ({
  type: MEALORDRINKBYINGREDIENT, value,
});

export const thunkBySpecIngredient = (pathname, value) => async (dispatch) => {
  const link = pathname.includes('comidas') ? 'meal' : 'cocktail';
  const URL = `https://www.the${link}db.com/api/json/v1/1/filter.php?i=${value}`;
  const mealsOrDrinks = pathname.includes('comidas') ? 'meals' : 'drinks';
  try {
    dispatch(requestFetchAPI());
    const request = await fetch(URL);
    const response = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setItemsBySpecIngredient(response[mealsOrDrinks]));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};

export const thunkByFoodOrigin = (value) => async (dispatch) => {
  try {
    const URL = `https:www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    dispatch(requestFetchAPI());
    const request = await fetch(URL);
    const { meals } = await request.json();
    dispatch(successFetchAPI());
    await dispatch(setOrigin(meals));
  } catch (error) {
    global.alert(MSG);
    dispatch(failFetchAPI(error));
  }
};
