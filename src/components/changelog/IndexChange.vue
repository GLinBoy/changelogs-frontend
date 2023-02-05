<template>
  <q-card flat bordered>
    <q-card-section class="bg-primary text-white">
      <div class="row items-center no-wrap q-col-gutter-x-xl">
        <div class="col-1">
          <router-link style="text-decoration: none; color: inherit;"
              :to="changelog.project.title">
            <q-avatar rounded size="45px" color="white">
              <img :src="changelog.project.logo" :alt="changelog.project.title + '\'s logo'">
            </q-avatar>
          </router-link>
        </div>
        <div class="col">
          <q-item-label>
            <router-link style="text-decoration: none; color: inherit;"
              :to="changelog.project.title">
              &#8202;<span class="text-h6 text-weight-bolder">
                {{ changelog.project.title }}
              </span>&#8202;
            </router-link>
            <router-link style="text-decoration: none; color: inherit;"
              :to="'/' + changelog.project.title + '/' + changelog.versionNo">
              <q-chip square dense size="md">
                <q-avatar icon="lightbulb" color="blue" text-color="white" />
                {{ changelog.versionNo }}
              </q-chip>
            </router-link>
            <q-chip square dense size="md">
              <q-avatar icon="settings" color="red" text-color="white" />
              {{ changelog.platform }}
            </q-chip>
          </q-item-label>
          <q-item-label caption class="text-white">
            <q-icon name="person"/>&#8202;
            <b>
              <router-link :to="changelog.publisher"
                style="text-decoration: none; color: inherit;">
                {{changelog.publisher}}
              </router-link>
            </b>
            &#8202;<q-icon name="event_note"/>&#8202;
            <b>{{ date.formatDate(changelog.releaseDate, 'YYYY-MM-DD HH:mm') }}</b>
          </q-item-label>
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
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { date } from 'quasar';

export default defineComponent({
  name: 'IndexChange',
  props: {
    changelog: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      date,
    };
  },
});
</script>
