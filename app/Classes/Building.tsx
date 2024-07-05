import { CollectionReference, DocumentData, getDocs } from "firebase/firestore"

class Building {
  public buildingName: string
  public database?: CollectionReference<DocumentData, DocumentData>
  public washerNum: number = 0
  public dryerNum: number = 0
  public washersList: string[] = []
  public dryersList: string[] = []

  constructor(
    buildingName: string,
    database?: CollectionReference<DocumentData, DocumentData>
  ) {
    this.buildingName = buildingName
    this.database = database
  }
}

export default Building
