<template>
  <q-layout>
    <q-page-container>
      <q-page class="row padding justify-evenly">
        <div class="row">
          <div class="col-12">
            <div class="row q-pt-xl text-center">
              <div class="col-12">
                <p>Tell us about your organization</p>
              </div>
            </div>
            <div class="row text-center">
              <div class="col-12">
                <h3 class="q-mt-none">Set up your team</h3>
              </div>
            </div>
            <div class="row q-pb-lg">
              <div class="col-12">
                <q-input required dense filled label="Organization account name" v-model.trim="organization.name"
                  :rules="[val => !!val || 'Field is required',
                    val => validateName(val) || 'Field may only contain alphanumeric characters and spaces']"
                  :hint="'This will be the name of your account on ChangeLogs.Your URL will be: https://changelogs.info/'
                    + organization.title"/>
              </div>
            </div>
            <div class="row q-pb-lg">
              <div class="col-12">
                <q-input required dense filled label="Contact email"
                  :rules="[val => !!val || 'Field is required',
                    val => validateEmail(val) || 'Invalid email address']"
                  v-model.trim="organization.email" />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-btn dense color="primary" class="full-width"
                  :disable="saveStatus"
                  size="xl" label="Save" @click="saveOrganization"/>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { Organization } from 'components/models'
import { validateName, validateEmail } from 'components/validators'

export default defineComponent({
  name: 'OrganizationEdit',
  setup () {
    const organization = ref<Organization>({
      name: '',
      title: '',
      email: ''
    })

    watch(() => organization.value.name, (nextName) => {
      organization.value.title = nextName.replace(/\s\s+/g, ' ').trim()
        .replace(/\s+/g, '-').toLowerCase()
    })

    const saveStatus = computed(() => {
      return !(!!organization.value.name &&
        !!organization.value.email &&
        validateEmail(organization.value.email))
    })

    const saveOrganization = () => {
      console.log('Organization saved!', organization.value)
    }

    return {
      organization,
      validateEmail,
      validateName,
      saveStatus,
      saveOrganization
    }
  }
})
</script>

<style lang="sass">
.q-field__native[required] ~ .q-field__label:after
  content: ' *'
  color: red
</style>
