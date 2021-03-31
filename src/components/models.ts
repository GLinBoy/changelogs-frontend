export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Violation {
  field?: string;
  message?: string;
}

export interface CommonError {
  title?: string;
  status?: number;
  detail?: string;
  violations?: Violation[];
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
  license?: string;
  licenseLink?: string;
  organizationId?: number;
}

export interface Owner {
  id?: number;
  name: string;
  title: string;
}

export enum Platform {
  API = 'API',
  WEB_APP = 'WEB_APP',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  CLIENT = 'CLIENT',
  MOBILE = 'MOBILE',
  WEAR = 'WEAR',
  CAR = 'CAR',
  TV = 'TV',
  IOT = 'IOT'
}

export enum ContentType {
  ADDED = 'ADDED',
  CHANGED = 'CHANGED',
  DEPRECATED = 'DEPRECATED',
  REMOVED = 'REMOVED',
  FIXED = 'FIXED',
  SECURITY = 'SECURITY'
}

export interface ChangeLogContent {
  id?: number;
  changeLogId?: number;
  content: string;
  contentType: ContentType;
  isActive: boolean;
}

export interface ChangeLog {
  id?: number;
  versionNo: string;
  buildVersion?: string;
  releaseDate: string;
  publisher: string;
  contact: string;
  forceUpdate: boolean;
  platform: Platform;
  projectId: number;
  isActive: boolean;
  contents: ChangeLogContent[];
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Sort {
  field: string;
  direction: SortDirection;
}

export interface Pagination {
  page: number;
  size: number;
  sort: Sort[];
}
