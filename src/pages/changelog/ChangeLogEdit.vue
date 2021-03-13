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
              <q-input filled dense required label="Release date"
                input-class="text-center" v-model.trim="releaseDateTemp"
                :hint="releaseDateHint">
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
              <div class="row">
                <div v-for="(type, index) in types" :key="type" class="col-xs-4 col-md-2">
                  <q-checkbox v-model="typesState[index]" :label="type" keep-color
                    @input="v=>{typesStateChange(type, v)}"/>
                </div>
              </div>
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
import { defineComponent, ref, reactive, computed, watch } from '@vue/composition-api'
import { ChangeLog, Platform, ContentType } from 'components/models'

export default defineComponent({
  name: 'ChangeLogEdit',
  setup () {
    const currentDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
    const currentTime = date.formatDate(new Date('2021-03-12'), 'HH:mm')

    const changelog = reactive<ChangeLog>({
      id: undefined,
      versionNo: '',
      buildVersion: undefined,
      releaseDate: new Date(currentDate).toISOString(),
      publisher: 'anonymouse',
      contact: 'anonymouse@web.com',
      forceUpdate: false,
      platform: Platform[Platform.API],
      projectId: 0,
      isActive: true
    })

    const releaseDateTemp = ref<string>()
    releaseDateTemp.value = currentDate + ' ' + currentTime

    watch(() => releaseDateTemp.value, (nextDate) => {
      if (nextDate) {
        changelog.releaseDate = new Date(nextDate).toISOString()
      } else {
        changelog.releaseDate = new Date(currentDate).toISOString()
      }
    })
    const releaseDateHint = computed(() => {
      return new Date(changelog.releaseDate).toUTCString()
    })

    const types = Object.keys(ContentType)
    const platforms = Object.keys(Platform)

    const typesState = ref<boolean[]>([])

    const typesStateChange = (type, state) => {
      console.log(type, state)
    }

    const saveStatus = computed(() => {
      return false
    })

    const saveChangeLog = () => {
      console.log('Project saved!', changelog)
    }

    return {
      changelog,
      releaseDateTemp,
      releaseDateHint,
      platforms,
      types,
      typesState,
      typesStateChange,
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
