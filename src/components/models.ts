export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Organization {
  id?: number;
  name: string;
  title: string;
  email: string;
}

export interface Project {
  id?: number;
  isActive: boolean;
  name: string;
  title: string;
  about?: string;
  logo?: string;
  owner: string;
  publicAccess: boolean;
  website?: string;
  readmeLink?: string;
  licenseLink?: string;
  organizationId?: number;
}
