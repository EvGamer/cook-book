import { forOwn } from 'lodash';

const copyRecipe = recipe => ({
  ...recipe,
  refineries: 1,
});

class ProdTable {
  constructor(chain) {
    this.supply = {};
    this.demand = {};
    this.supplyRecipeMap = {};
    this.demandRecipeMap = {};
    this.recipes = {};
    this.chain = chain.map(copyRecipe);
    this.addSupply = this.addItemValue.bind(this, 'supply');
    this.addDemand = this.addItemValue.bind(this, 'demand');
    this.addSupplyRecipe = this.addRecipe.bind(this, 'supplyRecipeMap');
    this.addDemandRecipe = this.addRecipe.bind(this, 'demandRecipeMap');
    forOwn(this.chain, (recipe) => {
      forOwn(recipe.ingredients, (ratio) => {
        this.addDemandRecipe(ratio.id, recipe);
        this.addDemand(ratio, recipe);
      });
      forOwn(recipe.results, (ratio) => {
        this.addSupplyRecipe(ratio.id, recipe);
        this.addSupply(ratio, recipe);
      });
    });
  }

  addItemValue(field, { id, amount }, recipe) {
    const d = (amount / recipe.time) * recipe.refineries;
    if (this[field][id]) {
      this[field][id] += d;
    } else {
      this[field][id] = d;
    }
  }

  update() {
    this.supply = {};
    this.demand = {};
    Object.values(this.chain).forEach((recipe) => {
      recipe.ingredients.forEach((ratio) => {
        this.addDemand(ratio, recipe);
      });
      recipe.results.forEach((ratio) => {
        this.addSupply(ratio, recipe);
      });
    });
  }

  addRecipe(field, id, recipe) {
    if (this[field][id]) {
      this[field][id].push(recipe);
    } else {
      this[field][id] = [recipe];
    }
  }
}

export default ProdTable;