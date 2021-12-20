export const getIngredients = (value) => {
  let ingredients;
  value.forEach((el) => {
    ingredients = (Object.entries(el))
      .filter((e) => ((e[0].includes('strIngredient')
        && (e[1] !== '' && e[1] !== ' ' && e[1] !== null))))
      .map((e) => e[1]);
  });
  return ingredients;
};

export const getMeasures = (value) => {
  let measures;
  value.forEach((el) => {
    measures = (Object.entries(el))
      .filter((e) => (e[0].includes('strMeasure')
        && (e[1] !== '') && (e[1] !== null) && e[1] !== ' '))
      .map((e) => e[1]);
  });
  return measures;
};

export const getItens = (ingredients, measures) => {
  let itens = [];
  const ingredientsAndMeasures = [...ingredients, ...measures];
  ingredientsAndMeasures.forEach((el, i, array) => {
    const splitNumber = 2;
    const number = ingredientsAndMeasures.length / splitNumber;
    if (i < number) {
      itens = [...itens, { ingredient: el, measure: array[i + number] }];
    }
  });
  return itens;
};

export const updateFavoriteRecipes = (element, pathname, ide) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const checkRoute = pathname.includes('comidas');
  const type = checkRoute ? 'comida' : 'bebida';
  const storage = {
    id: checkRoute ? element.idMeal : element.idDrink,
    type,
    area: element.strArea ? element.strArea : '',
    category: element.strCategory ? element.strCategory : '',
    alcoholicOrNot: checkRoute ? '' : element.strAlcoholic,
    name: checkRoute ? element.strMeal : element.strDrink,
    image: checkRoute ? element.strMealThumb : element.strDrinkThumb,
  };
  if (favoriteRecipes === null) {
    return localStorage.setItem('favoriteRecipes', JSON.stringify([storage]));
  }
  const newStorage = [...favoriteRecipes, storage];
  const validate = favoriteRecipes.some((el) => el.id === ide && el.type === type);
  if (!validate) {
    return localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
};
