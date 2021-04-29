<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-page row justify-center q-pa-sm">
        <div class="col-xs-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <div class="text-h6">latest changelogs:</div>
              <br />
            </div>
            <div class="col-12 q-col-gutter-sm">
              <div class="row"
                v-for="changelog in changelogs" :key="changelog.id">
                  <div class="col-12">
                    <change :changelog="changelog" />
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
import { date } from 'quasar'
import { defineComponent, ref, reactive } from '@vue/composition-api'
import { ChangeLog, Pagination, Sort, SortDirection, CommonError } from 'components/models'
import IndexChange from 'components/changelog/IndexChange.vue'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'PageIndex',
  components: {
    'change': IndexChange
  },
  setup (_, context) {
    const axios = context.root.$axios

    const changelogs = ref<ChangeLog[]>([])

    const pagination = reactive<Pagination>({
      page: 0,
      size: 20,
      sort: [{
        field: 'createdOn',
        direction: SortDirection.DESC
      }]
    })

    const urlTemplate = `changelog/latest?page=${pagination.page || 0}&size=${pagination.size || 20}&sort=${Array.prototype.map
        .call(pagination.sort, function (s: Sort) { return `${s.field},${s.direction}` })
        .join('&sort=')}`

    axios.get<ChangeLog[]>(urlTemplate)
      .then(response => {
        changelogs.value = response.data
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
      changelogs,
      date
    }
  }
})
</script>
