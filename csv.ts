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
  private static split(data: string): Array<Array<string>> {
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

    let parsed = this.split(data);
    headers = parsed[0];
    parsed.shift();
    let cells = parsed.map((row: string[]) => {
      return row.map((x: string) => {
        return new CSVCell(x);
      });
    });

    for (let i = 0; i < cells.length; i++) {
      let record = [];
      for (let j = 0; j < cells[i].length; j++) {
        record[headers[j]] = cells[i][j];
      }
      records.push(new CSVRecord(record));
    }

    return new CSVData(records, headers);
  }
}
