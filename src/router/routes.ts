import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: () => import('pages/Login.vue') },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      { path: 'new', name: 'New', component: () => import('pages/changelog/ChangeLogNew.vue') },
      {
        path: 'organization',
        component: () => import('pages/organization/OrganizationPage.vue'),
        children: [
          { path: '', name: 'Organizations', component: () => import('pages/organization/Organizations.vue') },
          { path: 'new', name: 'OrganizationNew', component: () => import('pages/organization/OrganizationNew.vue') },
          { path: ':orgTitle', name: 'Organization', component: () => import('pages/organization/Organization.vue') },
        ],
      },
      {
        path: 'project',
        component: () => import('pages/project/ProjectPage.vue'),
        children: [
          { path: '', name: 'Projects', component: () => import('pages/project/Projects.vue') },
          { path: 'new', name: 'ProjectNew', component: () => import('pages/project/ProjectNew.vue') },
        ],
      },
      {
        path: 'changelog',
        component: () => import('pages/changelog/ChangeLogPage.vue'),
        children: [
          { path: '', name: 'ChangeLogs', component: () => import('pages/changelog/ChangeLogsList.vue') },
          { path: 'new', name: 'ChangeLogNew', component: () => import('pages/changelog/ChangeLogNew.vue') },
        ],
      },
      { path: 'import', name: 'ImportChangeLog', component: () => import('pages/ImportChangeLog.vue') },
      { path: 'notifications', name: 'Notifications', component: () => import('pages/Notifications.vue') },
      { path: 'messages', name: 'Messages', component: () => import('pages/Messages.vue') },
      { path: 'help', name: 'Help', component: () => import('pages/Help.vue') },
      {
        path: 'profile/:username',
        name: 'Profile',
        component: () => import('pages/profile/ProfilePage.vue'),
        children: [
          { path: '', name: 'ProfileView', component: () => import('pages/profile/ProfileView.vue') },
          { path: 'settings', name: 'ProfileEdit', component: () => import('pages/profile/ProfileEdit.vue') },
          { path: 'projects', name: 'UserProjects', component: () => import('pages/project/Projects.vue') },
        ],
      },
      {
        path: ':project',
        component: () => import('pages/changelog/ChangeLogPage.vue'),
        children: [
          { path: '', name: 'ProjectChangeLogs', component: () => import('pages/changelog/ChangeLogsList.vue') },
          { path: ':version', name: 'ChangeLogsVersion', component: () => import('pages/changelog/ChangeLog.vue') },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
