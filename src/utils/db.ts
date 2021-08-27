type DbStore = { [key: string]: number[] };
const dbMock: DbStore = {};

export function set(key: string, value: number[]): void {
  dbMock[key] = value;
}
export function fetch(key: string): number[] {
  return dbMock[key];
}
export function keys(): string[] {
  return Object.keys(dbMock);
}

//Added for unit testing
export function clear(): DbStore {
  Object.keys(dbMock).forEach((key) => {
    delete dbMock[key];
  })
  return dbMock;
}