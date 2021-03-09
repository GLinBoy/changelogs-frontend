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
              <div class="row q-col-gutter-md">
                <div class="col-xs-12 col-md-4">
                  <q-select filled dense options-dense required
                    v-model="project.owner" emit-value
                    option-value="title"
                    option-label="name"
                    :options="orgs" label="Owner" />
                </div>
                <div class="col-xs-12 col-md-8">
                  <q-input filled dense required
                    v-model="project.name" label="Project name" />
                </div>
                <div class="col-12">
                  <span>{{'Your project URL will be: https://changelogs.info/'
                    + project.owner + '/' + project.title }}</span>
                </div>
                <div class="col-12">
                  <q-input filled dense
                    v-model="project.about" label="About your project" />
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
                  <q-input filled dense
                    v-model="project.website" label="Project website" />
                </div>
                <div class="col-12">
                  <q-input filled dense
                    v-model="project.readmeLink" label="Project README link" />
                </div>
                <div class="col-12">
                  <q-input filled dense
                    v-model="project.licenseLink" label="Project license link" />
                </div>
                <div class="col-12">
                  <q-toggle disable dense v-model="project.publicAccess" label="Public Access"/>
                </div>
                <div class="col-12">
                  <q-btn dense color="primary" class="full-width"
                    size="xl" label="Save" @click="saveProject"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { Project, Owner } from 'components/models'

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
      project.value.title = nextName.replace(/\s\s+/g, ' ').trim()
        .replace(/\s+/g, '-').toLowerCase()
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

    const saveProject = () => {
      console.log('Project saved!', project.value)
    }

    return {
      project,
      orgs,
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
