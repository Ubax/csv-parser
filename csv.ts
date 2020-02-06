export class CSVCell {
  constructor(public value: string) {}
}
export class CSVRecord {
  constructor(public cells: CSVCell[]) {}
}
export class CSVData {
  constructor(public records: CSVRecord[], public headers: string[]) {}
}

export class CSVLoader {
  private static split(data: string): Array<string[]> {
    let parsed: Array<string[]> = [];

    let inString: boolean = false;
    let bufor: string = "";
    for (const c of data) {
      if (c === '"') inString = !inString;
      else if (!inString) {
        if (c === "\n") {
          console.log("New line");
          if (parsed.length > 0) {
            parsed[parsed.length - 1].push(bufor);
            bufor = "";
            parsed.push([]);
          }
        } else if (c === ",") {
          if (parsed.length === 0) {
            parsed.push([]);
          }
          parsed[parsed.length - 1].push(bufor);
          bufor = "";
        } else bufor += c;
      } else bufor += c;
    }

    return parsed;
  }
  public static loadCsvFromString(data: string): CSVData {
    let records: CSVRecord[] = [];
    let headers: string[] = [];

    console.log(this.split(data));

    return new CSVData(records, headers);
  }
}
