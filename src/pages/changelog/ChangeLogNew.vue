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
            <div class="col-xs-12 col-md-4">
              <q-select filled required dense
                options-dense emit-value map-options
                v-model="changelog.projectId"
                option-value="id"
                option-label="name"
                :options="projects"
                label="Project" />
            </div>
            <div class="col-xs-12 col-md-4">
              <q-input filled dense required maxlength=32 counter
                v-model.trim="changelog.versionNo" label="Version No."
                :rules="[val => !!val || 'Field is required',
                  val => validatePathVariable(val) ||
                  'May only contain alphanumeric characters, dash, underline and dot']" />
            </div>
            <div class="col-xs-12 col-md-4">
              <q-input filled dense maxlength=32 counter
                v-model.trim="changelog.buildVersion" label="Build Version"
                :rules="[val => validatePathVariable(val, false) ||
                  'May only contain alphanumeric characters, dash, underline and dot']" />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-input filled dense required label="Release date"
                input-class="text-center" v-model.trim="releaseDateTemp"
                :hint="releaseDateHint"
                :rules="[val => !!val || 'Field is required']">
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
              <q-input filled dense required maxlength=128 counter
                v-model.trim="changelog.publisher" label="Publisher"
                  :rules="[val => !!val || 'Field is required']" />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-input filled dense required maxlength=64 counter
                v-model.trim="changelog.contact" label="Contact"
                  :rules="[val => !!val || 'Field is required',
                    val => validateEmail(val) || 'Invalid email address']" />
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
              <div class="row">
                <div class="col-12" style="max-width: 100%">
                  <q-card v-show="changelog.contents.length > 0">
                    <q-tabs dense inline-label outside-arrows mobile-arrows swipeable shrink stretch
                      align="justify" v-model="contentTab" class="bg-primary text-white shadow-2 fit col">
                      <q-tab v-for="content in changelog.contents"
                        :key="content.contentType"
                        :name="content.contentType"
                        :label="content.contentType"
                        :alert="!!content.content ? 'green' : 'red'" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="contentTab" animated>
                      <q-tab-panel v-for="content in changelog.contents"
                        class="q-pa-xs"
                        :key="content.contentType"
                        :name="content.contentType">
                        <q-input filled dense required
                          v-model.trim="content.content" type="textarea"
                          :hint="content.contentType + ': Add each change in new line'" />
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card>
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
import { ChangeLog, ChangeLogContent, Platform, ContentType, MinimizedProject, CommonError } from 'components/models'
import { validatePathVariable, validateEmail } from 'components/validators'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'ChangeLogNew',
  setup (_, context) {
    const axios = context.root.$axios

    const currentDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
    const currentTime = date.formatDate(new Date('2021-03-12'), 'HH:mm')

    const changelog = reactive<ChangeLog>({
      id: undefined,
      versionNo: '',
      buildVersion: undefined,
      releaseDate: new Date(currentDate).toISOString(),
      publisher: '',
      contact: '',
      forceUpdate: false,
      platform: Platform[Platform.API],
      projectId: -1,
      isActive: true,
      contents: []
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

    const projects = ref<MinimizedProject[]>([])

    axios.get<MinimizedProject[]>('project/minimized')
      .then(response => {
        projects.value = projects.value.concat(response.data)
        if (response.data && response.data.length > 0) {
          const prjTitle = <string> context.root.$route.query.p
          if (prjTitle && response.data.some(p => p.title === prjTitle)) {
            changelog.projectId = response?.data?.find(p => p.title === prjTitle)?.id || -1
          } else {
            changelog.projectId = response.data[0].id
          }
        } else {
          context.root.$q.notify({
            progress: true,
            message: 'Projects is empty',
            caption: 'You didn\'t add any project! Please add a project ad try again.',
            position: 'bottom-right',
            color: 'negative',
            icon: 'report_problem'
          })
        }
      })
      .catch((error: AxiosError) => {
        console.error(error)
        if (error.response && error.response.data) {
          const errorData = <CommonError> error.response.data
          context.root.$q.notify({
            progress: true,
            message: errorData.title,
            caption: errorData.detail,
            position: 'bottom-right',
            color: 'negative',
            icon: 'report_problem'
          })
        } else {
          context.root.$q.notify({
            progress: true,
            message: 'Network Error',
            caption: 'Can\'t access the APIs, please check your network, ant try again',
            position: 'bottom-right',
            color: 'negative',
            icon: 'report_problem'
          })
        }
      })

    const types = Object.keys(ContentType)
    const platforms = Object.keys(Platform)

    const typesState = ref<boolean[]>([])

    const typesStateChange = (type: ContentType, state: boolean) => {
      if (state) {
        changelog.contents.push(reactive<ChangeLogContent>({
          id: undefined,
          changeLogId: undefined,
          content: '',
          contentType: ContentType[type],
          isActive: true
        }))
        contentTab.value = type
      } else {
        changelog.contents = changelog.contents.filter(c => c.contentType !== type)
        if (changelog.contents.length > 0) {
          contentTab.value = changelog.contents[0].contentType
        } else {
          contentTab.value = ''
        }
      }
    }

    const contentTab = ref<string>()

    const saveStatus = computed(() => {
      return changelog.versionNo && changelog.releaseDate &&
        changelog.publisher && changelog.contact &&
        (changelog.contents.length > 0 &&
          changelog.contents.filter(c => c.content === null || c.content === '').length > 0)
    })

    const saveChangeLog = () => {
      axios.post<ChangeLog>('changelog', changelog)
        .then(async response => {
          const project: MinimizedProject = projects.value.find(p => p.id === response.data.projectId)
          await context.root.$router
            .push({ path: `/${project.owner}/${project.title}/${response.data.versionNo}` })
        })
        .catch((error: AxiosError) => {
          console.error(error)
          if (error.response && error.response.data) {
            const errorData = <CommonError> error.response.data
            context.root.$q.notify({
              progress: true,
              message: errorData.title,
              caption: errorData.detail,
              position: 'bottom-right',
              color: 'negative',
              icon: 'report_problem'
            })
          } else {
            context.root.$q.notify({
              progress: true,
              message: 'Network Error',
              caption: 'Can\'t access the APIs, please check your network, ant try again',
              position: 'bottom-right',
              color: 'negative',
              icon: 'report_problem'
            })
          }
        })
    }

    return {
      validatePathVariable,
      validateEmail,
      projects,
      changelog,
      releaseDateTemp,
      releaseDateHint,
      platforms,
      types,
      typesState,
      typesStateChange,
      contentTab,
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
