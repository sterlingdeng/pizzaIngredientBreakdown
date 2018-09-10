class PizzaDataStructure {
  constructor() {
    this.components = new Set();
    this.adjList = new Map();
    this.currentNode = "";
  }

  addRelation(parent, child, percent) {
    if (!this.components.has(parent)) {
      this.components.add(parent);
    }

    if (!this.components.has(child)) {
      this.components.add(child);
    }

    if (!this.adjList.has(parent)) {
      this.adjList.set(parent, new Map());
    }

    this.adjList.get(parent).set(child, percent);
  }

  parseFileToAdjList(data) {
    const parent = data.main;
    const child = data.child;
    const percent = data.percent;

    if (child === "results") {
      this.currentNode = "";
      return null;
    }

    if (parent.length > 0) {
      this.currentNode = parent;
      this.addRelation(this.currentNode, child, percent);
    } else {
      this.addRelation(this.currentNode, child, percent);
    }
  }

  calculatePercentages(search) {
    if (!this.adjList.has(search)) {
      return undefined;
    }
    let result = new Map();
    this.dfsCalculation(search, 1, result);
    console.log(`Analysis for: ${search}`);
    console.log(result);
    let sum = 0;
    result.forEach((value, key) => {
      sum += value;
    });
    console.log(`sum : ${sum}`);
  }

  dfsCalculation(currIngredient, percent, result) {
    // base case, if no children, we reached a leaf node
    if (this.adjList.get(currIngredient) === undefined) {
      if (result.has(currIngredient)) {
        percent += result.get(currIngredient);
      }
      result.set(currIngredient, percent);
      return;
    } else {
      this.adjList.get(currIngredient).forEach((value, ingredient) => {
        //
        let newPercent =
          percent * this.adjList.get(currIngredient).get(ingredient);
        return this.dfsCalculation(ingredient, newPercent, result);
      });
    }
  }

  toString() {
    let str = "";
    let iterable = this.adjList.keys();

    for (let key of iterable) {
      str += `${key} -> `;
      this.adjList.get(key).forEach((value, key) => {
        str += `${key} - ${value} `;
      });
      str += "\n";
    }
    console.log(str);
  }

  listRawMaterials() {
    let s = "Raw Materials are: ";
    let components = this.components.keys();

    for (let component of components) {
      if (!this.adjList.has(component)) {
        s += `${component}, `;
      }
    }
    console.log(s);
  }
}

module.exports = PizzaDataStructure;
