// Interface/store.ts
export interface AlertInterface {
  showAlert: boolean;
  closable?: boolean;
  title?: string;
  icon?: string; //optional
  text?: string;
  variant?:  'elevated'| 'flat' | 'tonal' | 'outlined' | 'text' | 'plain' ;
  type?: "error" | "warning" | "success" | "info";
}
