<template>
  <q-card flat bordered>
    <q-card-section class="bg-primary text-white">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">
            <router-link style="text-decoration: none; color: inherit;"
              :to="'/' + projectTitle + '/' + changelog.versionNo">
              {{ changelog.versionNo }}
            </router-link>
            for
            {{ changelog.platform }}
            <span v-if="changelog.buildVersion">({{ changelog.buildVersion }})</span>
          </div>
        </div>

        <div class="col-auto">
          <q-btn flat round icon="share" />
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <dl>
        <div v-for="content in changelog.contents" :key="content.id">
          <dt class="col-sm-3 text-bold">{{ content.contentType }}:</dt>
          <dd class="col-sm-9">{{ content.content }}</dd>
        </div>
      </dl>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="col-6">
        <q-icon size="sm" name="account_circle"/>&#8202;
        <b>
          <router-link :to="{ name: 'Profile', params: { username: changelog.publisher }}"
            style="text-decoration: none; color: inherit;">
            {{changelog.publisher}}
          </router-link>
        </b>
      </div>
      <div class="col-6 text-right">
        <q-icon size="sm" name="event_note"/>&#8202;
        <b>{{ date.formatDate(changelog.releaseDate, 'YYYY-MM-DD HH:mm') }}</b>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { date } from 'quasar';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Change',
  props: {
    changelog: {
      type: Object,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
  },
  setup() {
    const $route = useRoute();
    const { project } = $route.params;

    return {
      date,
      project,
    };
  },
});
</script>
