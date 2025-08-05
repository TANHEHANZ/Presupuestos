export interface NavItem {
  label: string;
  icon: string;
  path: string;
  requiredPerms: string[];
}

export interface Nav {
  title: string;
  items: NavItem[];
}
