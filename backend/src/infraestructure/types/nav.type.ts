export interface NavItem {
  label: string;
  icon: string;
  path: string;
}

export interface Nav {
  title: string;
  items: NavItem[];
}
