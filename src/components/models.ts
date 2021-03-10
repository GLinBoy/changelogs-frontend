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

export interface Owner {
  id?: number;
  name: string;
  title: string;
}

export enum Platform {
  API,
  WEB_APP,
  ANDROID,
  IOS,
  CLIENT,
  MOBILE,
  WEAR,
  CAR,
  TV,
  IOT
}

export interface ChangeLog {
  id?: number;
  versionNo: string;
  buildVersion?: string;
  releaseDate: Date;
  publisher: string;
  contact: string;
  forceUpdate: boolean;
  platform: Platform;
  projectId: number;
  isActive: boolean;
}

export enum ContentType {
  ADDED,
  CHANGED,
  DEPRECATED,
  REMOVED,
  FIXED,
  SECURITY
}

export interface ChangeLogContent {
  id?: number;
  changeLogId?: number;
  content: string;
  contentType: ContentType;
  isActive: boolean;
}
