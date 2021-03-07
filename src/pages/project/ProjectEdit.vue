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
                    option-value="content"
                    option-label="content"
                    :options="orgs" label="Owner" />
                </div>
                <div class="col-xs-12 col-md-8">
                  <q-input filled dense required
                    v-model="project.name" label="Project name" />
                </div>
                <div class="col-12">
                  <q-input filled dense required
                    v-model="project.title" label="Project title" />
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
                    v-model="project.readmeLink" label="Project README" />
                </div>
                <div class="col-12">
                  <q-input filled dense
                    v-model="project.licenseLink" label="Project license" />
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
import { defineComponent, ref } from '@vue/composition-api'
import { Project } from 'components/models'

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

    const orgs = ref<any[]>([
      {
        id: undefined,
        content: 'anonymouse'
      },
      {
        id: 1,
        content: 'Organization 1'
      },
      {
        id: 2,
        content: 'Organization 2'
      },
      {
        id: 3,
        content: 'Organization 3'
      },
      {
        id: 4,
        content: 'Organization 4'
      }
    ])

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
