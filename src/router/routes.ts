import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  { path: '/login', name: 'Login', component: () => import('pages/Login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      { path: 'new', name: 'New', component: () => import('pages/changelog/ChangeLogNew.vue') },
      {
        path: 'project',
        component: () => import('pages/project/ProjectPage.vue'),
        children: [
          { path: '', name: 'Projects', component: () => import('pages/project/Projects.vue') },
          { path: 'new', name: 'ProjectNew', component: () => import('pages/project/ProjectNew.vue') },
          { path: ':projectTitle', name: 'Project', component: () => import('pages/project/Project.vue') }
        ]
      },
      {
        path: 'changelog',
        component: () => import('pages/changelog/ChangeLogPage.vue'),
        children: [
          { path: '', name: 'ChangeLogs', component: () => import('pages/changelog/ChangeLogsList.vue') },
          { path: 'new', name: 'ChangeLogNew', component: () => import('pages/changelog/ChangeLogNew.vue') },
          { path: ':version', name: 'ChangeLog', component: () => import('pages/changelog/ChangeLog.vue') }
        ]
      },
      { path: 'import', name: 'ImportChangeLog', component: () => import('pages/ImportChangeLog.vue') },
      { path: 'notifications', name: 'Notifications', component: () => import('pages/Notifications.vue') },
      { path: 'messages', name: 'Messages', component: () => import('pages/Messages.vue') },
      { path: 'help', name: 'Help', component: () => import('pages/Help.vue') },
      {
        path: 'profile/:username',
        name: 'Profile',
        component: () => import('pages/profile/Profile.vue'),
        children: [
          { path: 'settings', name: 'ProfileEdit', component: () => import('pages/profile/ProfileEdit.vue') },
          { path: 'projects', name: 'UserProjects', component: () => import('pages/project/Projects.vue') },
        ]
      },
      {
        path: ':project',
        component: () => import('pages/changelog/ChangeLogsList.vue'),
        children: [
          { path: '', name: 'ProjectChangeLogs', component: () => import('pages/changelog/ChangeLogsList.vue') },
          { path: ':version', name: 'ChangeLogsVersion', component: () => import('pages/changelog/ChangeLogsList.vue') }
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
