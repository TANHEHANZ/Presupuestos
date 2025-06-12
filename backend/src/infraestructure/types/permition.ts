export interface PermitionDetail {
  name: string;
  key: string;
  icon: string;
}

export interface Permition {
  group: string;
  color: string;
  icon: string;
  permissions: PermitionDetail[];
}
