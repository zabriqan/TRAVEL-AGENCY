export const kebabCaseToTitleCase = (text: string) =>
   text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

export const safeParseToJSON = (str: string | undefined) => {
   if (str === undefined) return {};
   try {
      return JSON.parse(str);
   } catch {
      return {};
   }
}

export const pricesAndCostsRowStarter = { id: '', price: '', cost: '' }

export const defaultTableDataRenderer = <T,>(row: T, column: BasicColumnType<T>) => {
   const value = row[column.key];
   if (value === "") {
      return <span className="text-gray-500 font-mono" > EMPTY </span>
   }
   if (value === null || value === undefined) {
      return <span className='text-gray-500 font-mono' > NULL </span>;
   }
   return String(value);
}