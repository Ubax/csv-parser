# Csv Parser

This a simple TypeScript library that can be used to parse CSV files.

## Usage 

Import `CSVLoader` from `csv.ts`.

#### CSVLoader

There are two functions that you can use:
- `loadCsvFromString: (data: string) => CSVData`
- `loadFromFile: (file: File) => Promise<CSVData>`

#### CSVData

Type `CSVData` consists of:
- `records: CSVRecord[]`
- `headers: string[]`

#### CSVRecord

Type `CSVRecord` consists of:
- `cells: Map<string, CSVCell>`

#### CSVCell

Type `CSVCell` consists of:
- `addValue: (value: string) => void`
- `isArray: () => boolean`
- `getValue: () => string`
- `getValues: () => string[]`

If cell is array then `getValue` returnts the first element of that array. To read all use `getValues`
