<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-page row justify-center q-pa-sm">
        <div class="col-xs-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <h5 class="q-mb-sm">Create a new project</h5>
            </div>
            <div class="col-12">
              <p text-justify>A repository contains all project files, including the revision history. Already have a project repository elsewhere? Import a repository.</p>
            </div>
            <div class="col-12">
              <q-form autocomplete="off"
                @submit="saveProject" class="row q-col-gutter-md">
                <div class="col-xs-12 col-md-4">
                  <q-select filled dense options-dense required
                    v-model="project.owner" emit-value
                    option-value="title"
                    option-label="name"
                    :options="owners" label="Owner" />
                </div>
                <div class="col-xs-12 col-md-8">
                  <q-input filled dense required
                    v-model.trim="project.name" label="Project name"
                    :rules="[val => !!val || 'Field is required',
                    val => validateName(val) || 'Field may only contain alphanumeric characters and spaces']">
                    <template v-slot:hint>
                      {{ `Your project URL will be: https://changelogs.info/${project.owner}/${project.title}` }}
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input filled dense
                    v-model.trim="project.about" label="About your project" />
                </div>
                <div class="col-12">
                  <q-file filled dense clearable counter bottom-slots nullable
                    accept="image/*" max-file-size="500000"
                    v-model="projectLogo" label="Project logo">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                    <template v-slot:hint>
                      Only image under 512 KB
                    </template>
                  </q-file>
                </div>
                <div class="col-12">
                  <q-input filled dense lazy-rules clearable
                    v-model.trim="project.website" label="Project website"
                    :rules="[val => validateURL(val, false) || 'Field may be a URL']" />
                </div>
                <div class="col-12">
                  <q-input filled dense lazy-rules clearable
                    v-model.trim="project.readmeLink" label="Project README link"
                    :rules="[val => validateURL(val, false) || 'Field may be a URL']" />
                </div>
                <div class="col-12">
                  <q-input filled dense lazy-rules clearable
                    v-model.trim="project.licenseLink" label="Project license link"
                    :rules="[val => validateURL(val, false) || 'Field may be a URL']" />
                </div>
                <div class="col-12">
                  <q-toggle disable dense v-model="project.publicAccess" label="Public Access"/>
                </div>
                <div class="col-12">
                  <q-btn dense color="primary" type="submit"
                    class="full-width" :disable="saveStatus"
                    size="xl" label="Save" />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from '@vue/composition-api'
import { Project, Owner, CommonError } from 'components/models'
import { validateName, validateURL } from 'components/validators'
import { titleGenerator } from 'components/TitleGenerator'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'ProjectEdit',
  setup (_, context) {
    const axios = context.root.$axios

    const projectLogo =  ref<string>()

    const project = reactive<Project>({
      id: undefined,
      isActive: true,
      name: '',
      title: '',
      about: undefined,
      logo: undefined,
      owner: '',
      publicAccess: true,
      website: undefined,
      readmeLink: undefined,
      licenseLink: undefined,
      organizationId: undefined
    })

    watch(() => project.name, (nextName) => {
      project.title = titleGenerator(nextName)
    })

    watch(() => projectLogo.value, (newLogo) => {
      if (newLogo) {
        const reader = new FileReader()
        reader.onload = (event) => {
          project.logo = event.target.result
        }
        reader.readAsDataURL(newLogo)
      } else {
        project.logo = null
      }
    })

    const owners = ref<Owner[]>([
      {
        id: undefined,
        name: 'anonymouse',
        title: 'anonymouse'
      }
    ])

    axios.get<Owner>('organization/owner')
      .then(response => {
        owners.value = owners.value.concat(response.data)
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

    project.owner = owners.value.find(o => o.id === undefined)?.title || ''

    watch(() => project.owner, (nextOwner) => {
      project.organizationId = owners.value.find(o => o.title === nextOwner)?.id
    })

    const saveStatus = computed(() => {
      return !(!!project.name && validateName(project.name))
    })

    const saveProject = () => {
      axios.post<Project>('project', project)
        .then(async response => {
          await context.root.$router.push({ path: `/project/${response.data.title}` })
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
      project,
      projectLogo,
      validateName,
      validateURL,
      owners,
      saveStatus,
      saveProject
    }
  }
})
</script>

<style lang="sass">
.q-field__native[required] ~ .q-field__label:after
  content: ' *'
  color: red
</style>
