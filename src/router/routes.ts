import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  { path: '/login', name: 'Login', component: () => import('pages/Login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      { path: 'organization/new', name: 'OrganizationNew', component: () => import('pages/organization/OrganizationEdit.vue') },
      { path: 'project/new', name: 'ProjectNew', component: () => import('pages/project/ProjectEdit.vue') },
      { path: 'new', name: 'ChangeLogNew', component: () => import('pages/changelog/ChangeLogEdit.vue') },
      { path: 'import', name: 'ImportChangeLog', component: () => import('pages/ImportChangeLog.vue') },
      { path: 'notifications', name: 'Notifications', component: () => import('pages/Notifications.vue') },
      { path: 'messages', name: 'Messages', component: () => import('pages/Messages.vue') },
      { path: 'help', name: 'Help', component: () => import('pages/Help.vue') },
      {
        path: ':username',
        name: 'Profile',
        component: () => import('pages/profile/Profile.vue'),
        children: [
          { path: 'settings', name: 'ProfileEdit', component: () => import('pages/profile/ProfileEdit.vue') },
          { path: 'projects', name: 'Projects', component: () => import('pages/project/Projects.vue') },
          { path: 'organizations', name: 'Organizations', component: () => import('pages/organization/Organizations.vue') }
        ]
      },
      {
        path: ':username/:project',
        component: () => import('pages/changelog/changeLogs.vue'),
        children: [
          { path: '', name: 'ChangeLogs', component: () => import('pages/changelog/changeLogs.vue') },
          { path: ':version', name: 'ChangeLogsVersion', component: () => import('pages/changelog/changeLogs.vue') }
        ]
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
