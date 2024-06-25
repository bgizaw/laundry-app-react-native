
// this is the building class. for each building object, it has an attribute buildingName
// question - why isn't the name saved in the constructor?
class Building {
  static buildingName = ""

  static updateBuildingName(newName: string){
    Building.buildingName = newName
  }

  // constructor(public name: string) {
  //   Building.buildingName = name;
  // }
}

export default Building
