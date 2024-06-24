class buildingClass {
    public building: string;
    public washers: number;
    public dryers: number;
    
    constructor(building: string, washers: number, dryers: number){
      this.building = building
      this.washers = washers
      this.dryers = dryers
    }

    getWasher(){
      return this.washers
    }
}

export default buildingClass