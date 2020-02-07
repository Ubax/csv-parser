export class CSVCell {
  private _value: string[];
  constructor(_value: string) {
    this._value = [_value];
  }
  public addValue(value: string): void {
    this._value.push(value);
  }
  public isArray(): boolean {
    return this._value.length > 1;
  }
  public getValue(): string {
    return this._value[0];
  }
  public getValues(): string[] {
    return this._value;
  }
}
export class CSVRecord {
  constructor(public cells: Map<string, CSVCell>) {}
}
export class CSVData {
  constructor(public records: CSVRecord[], public headers: string[]) {}
}

export class CSVLoader {
  private static split(data: string): Array<Array<string>> {
    let parsed: Array<string[]> = [[]];

    let inString: boolean = false;
    let bufor: string = "";
    for (const c of data) {
      if (c === '"') inString = !inString;
      else if (!inString) {
        if (c === "\n") {
          if (bufor !== "") {
            parsed[parsed.length - 1].push(bufor.trim());
            bufor = "";
            parsed.push([]);
          }
        } else if (c === ",") {
          parsed[parsed.length - 1].push(bufor.trim());
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
      let record: Map<string, CSVCell> = new Map();
      for (let j = 0; j < cells[i].length; j++) {
        let cell: CSVCell | undefined = record.get(headers[j]);
        if (cell !== undefined) {
          record.get(headers[j])?.addValue(cells[i][j].getValue());
        } else record.set(headers[j], cells[i][j]);
      }
      records.push(new CSVRecord(record));
    }

    return new CSVData(
      records,
      headers.filter((x, index, array) => {
        return array.indexOf(x) === index;
      })
    );
  }
  public static async loadFromFile(file: File) {
    return this.loadCsvFromString(await file.text());
  }
}
