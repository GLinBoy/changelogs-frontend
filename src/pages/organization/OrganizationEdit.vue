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
import { defineComponent, reactive, ref, computed, watch } from '@vue/composition-api'
import { Organization, CommonError } from 'components/models'
import { validateName, validateEmail } from 'components/validators'
import { titleGenerator } from 'components/TitleGenerator'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'OrganizationEdit',
  setup (_, context) {
    const axios = context.root.$axios

    const isWaiting = ref<boolean>(false)

    const organization = reactive<Organization>({
      name: '',
      title: '',
      email: ''
    })

    watch(() => organization.name, (nextName) => {
      organization.title = titleGenerator(nextName)
    })

    const saveStatus = computed(() => {
      return !(!!organization.name &&
        !!organization.email &&
        validateEmail(organization.email)) || isWaiting.value
    })

    const saveOrganization = () => {
      isWaiting.value = true
      axios.post<Organization>('organization', organization)
        .then(async (response) => {
          await context.root.$router.push({ path: '/organization/' + response.data.title })
        })
        .catch((error: AxiosError) => {
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
          }
          isWaiting.value = false
        })
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
