<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-page row justify-center q-pa-sm">
        <div class="col-xs-12 col-md-6">
          <div class="row q-col-gutter-sm">
            <div v-for="org in organizations" :key="org.id" class="col-xs-12 col-sm-6">
              <q-card>
                <q-card-section horizontal>
                  <q-item clickable class="col" :to="'/organization/' + org.title">
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="/images/company.svg">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ org.name }}</q-item-label>
                      <q-item-label caption>
                        {{ org.email }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-card-actions vertical>
                    <q-btn flat round color="blue" icon="language" />
                    <q-btn flat round color="teal" icon="alternate_email" />
                  </q-card-actions>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12">
              <div class="row q-col-gutter-md">
                <div class="col-6 text-right"><q-btn outline color="primary" label="Back" icon="navigate_before" /></div>
                <div class="col-6"><q-btn outline color="primary" label="Next" icon-right="navigate_next" /></div>
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
import { Organization, CommonError } from 'components/models'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'Organizations',
  setup (_, context) {
    const axios = context.root.$axios

    const organizations = ref<Organization[]>([])

    axios.get<Organization[]>('organization?sort=createdOn,desc')
      .then(response => {
        console.log(response.headers)
        organizations.value = response.data
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
    return {
      organizations
    }
  }
})
</script>
