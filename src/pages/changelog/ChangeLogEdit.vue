<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-page row justify-center q-pa-sm">
        <div class="col-xs-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <h5 class="q-mb-sm">New ChangeLog</h5>
            </div>
            <q-form autocomplete="off"
              @submit="saveChangeLog" class="row q-col-gutter-md">
            <div class="col-xs-12 col-md-6">
              <q-input filled dense required
                v-model.trim="changelog.versionNo" label="Version No." />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-input filled dense
                v-model.trim="changelog.buildVersion" label="Build Version" />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-input filled dense input-class="text-center"
                v-model.trim="releaseDateTemp">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-date v-model="releaseDateTemp" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="releaseDateTemp" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-6">
              <q-select filled dense v-model="changelog.platform"
                :options="platforms" label="Platform" />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-input filled dense required
                v-model.trim="changelog.publisher" label="Publisher" />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-input filled dense required
                v-model.trim="changelog.contact" label="Contact" />
            </div>
            <div class="col-12">
              <q-toggle v-model="changelog.forceUpdate" label="Force Update" />
            </div>
            <div class="col-12">
              <q-btn dense color="primary" type="submit"
                class="full-width" :disable="saveStatus"
                size="xl" label="Save" />
            </div>

          </q-form>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { date } from 'quasar'
import { defineComponent, ref, computed } from '@vue/composition-api'
import { ChangeLog, ChangeLogContent, Platform, ContentType } from 'components/models'

export default defineComponent({
  name: 'ChangeLogEdit',
  setup () {
    const changelog = ref<ChangeLog>({
      id: undefined,
      versionNo: '',
      buildVersion: undefined,
      releaseDate: new Date().toISOString(),
      publisher: 'anonymouse',
      contact: 'anonymouse@web.com',
      forceUpdate: false,
      platform: Platform[Platform.API],
      projectId: 0,
      isActive: true
    })

    const releaseDateTemp = date.formatDate(Date.now(), 'YYYY-MM-DD') + ' 00:00'

    const platforms = Object.keys(Platform).filter(k => typeof Platform[k as any] === 'number')

    const saveStatus = computed(() => {
      return false
    })

    const saveChangeLog = () => {
      console.log('Project saved!', changelog.value)
    }

    return {
      changelog,
      releaseDateTemp,
      platforms,
      ContentType,
      saveStatus,
      saveChangeLog
    }
  }
})
</script>

<style lang="sass">
.q-field__native[required] ~ .q-field__label:after
  content: ' *'
  color: red
</style>
