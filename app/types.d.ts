interface FieldErrorType {
   properties?: Record<string, any>;
   errors: string[];
}

type BasicColumnType<T> = {
   key: keyof T;
   title: string;
   searchable?: boolean;
   render?: (row: T) => React.ReactNode | string;
}
