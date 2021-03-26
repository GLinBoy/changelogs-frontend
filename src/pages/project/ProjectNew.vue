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
                    :options="orgs" label="Owner" />
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
                  <q-file filled dense clearable counter bottom-slots
                    accept="image/*" max-file-size="500000"
                    v-model="project.logo" label="Project logo">
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
import { defineComponent, ref, watch, computed } from '@vue/composition-api'
import { Project, Owner } from 'components/models'
import { validateName, validateURL } from 'components/validators'
import { titleGenerator } from 'components/TitleGenerator'

export default defineComponent({
  name: 'ProjectEdit',
  setup () {
    const project = ref<Project>({
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

    watch(() => project.value.name, (nextName) => {
      project.value.title = titleGenerator(nextName)
    })

    const orgs = ref<Owner[]>([
      {
        id: undefined,
        name: 'anonymouse',
        title: 'anonymouse'
      },
      {
        id: 1,
        name: 'Organization 1',
        title: 'organization-1'
      },
      {
        id: 2,
        name: 'Organization 2',
        title: 'organization-2'
      },
      {
        id: 3,
        name: 'Organization 3',
        title: 'organization-3'
      },
      {
        id: 4,
        name: 'Organization 4',
        title: 'organization-4'
      }
    ])

    project.value.owner = orgs.value.find(o => o.id === undefined)?.title || ''

    watch(() => project.value.owner, (nextOwner) => {
      project.value.organizationId = orgs.value.find(o => o.title === nextOwner)?.id
    })

    const saveStatus = computed(() => {
      return !(!!project.value.name && validateName(project.value.name))
    })

    const saveProject = () => {
      console.log('Project saved!', project.value)
    }

    return {
      project,
      validateName,
      validateURL,
      orgs,
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
