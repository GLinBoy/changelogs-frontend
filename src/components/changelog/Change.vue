<template>
  <div class="col-12">
    <q-card flat bordered>
      <q-card-section class="bg-primary text-white">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ changelog.versionNo }}
              for
              {{ changelog.platform }}
              <span v-if="changelog.buildVersion">({{ changelog.buildVersion }})</span>
            </div>
            <div class="text-subtitle2">by <b>{{ changelog.publisher }}</b>
              at
              {{ date.formatDate(changelog.releaseDate, 'YYYY-MM-DD HH:mm') }}
            </div>
          </div>

          <div class="col-auto">
            <q-btn flat round color="red" icon="favorite" />
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
  </div>
</template>

<script lang="ts">
import { date } from 'quasar'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Change',
  props: {
    changelog: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {
      date
    }
  }
})
</script>
