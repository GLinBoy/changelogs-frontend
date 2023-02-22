<template>
  <q-layout view="hHh lpR fff">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="q-gutter-x-sm">
        <q-btn unelevated :ripple="false" no-caps flat to="/">
          <q-avatar>
            <img alt="ChangeLogs logo" src="~assets/changelogs-logo.svg">
          </q-avatar>
          <q-toolbar-title>
            ChangeLogs
          </q-toolbar-title>
        </q-btn>
        <q-space/>
        <q-btn dense round flat icon="notifications_active" to="/notifications">
          <q-badge color="red" rounded floating transparent label="1"/>
        </q-btn>
        <q-btn flat round dense icon="add_box">
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup to="/new">
                <q-item-section>New changelog</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/project/new">
                <q-item-section>New Project</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/organization/new">
                <q-item-section>New Organization</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/import">
                <q-item-section>Import changelog</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn round flat>
          <q-avatar size="42px">
            <img src="/images/avatar.svg" />
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/anonymouse">
                <q-item-section>anonymouse</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/anonymouse/projects">
                <q-item-section>Your projects</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/anonymouse/organizations">
                <q-item-section>Your organizations</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Your following</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/anonymouse/settings">
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/help">
                <q-item-section>Help &amp; Feedback</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
    <q-footer elevated class="bg-primarry text-white text-center">
      <Footer></Footer>
    </q-footer>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Footer from 'components/Footer.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Footer,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return { leftDrawerOpen };
  },
});
</script>
