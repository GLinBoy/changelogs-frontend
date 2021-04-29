<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-page row justify-center q-pa-sm">
        <div class="col-xs-12 col-md-6">
          <div class="row q-col-gutter-sm">
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
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import { ChangeLog, Pagination, SortDirection, Sort, CommonError } from 'components/models'
import Change from 'components/changelog/Change.vue'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'ChangeLogsList',
  components: {
    'change': Change
  },
  setup (_, context) {
    const axios = context.root.$axios

    const username = context.root.$route.params.username
    const project = context.root.$route.params.project
    const version = context.root.$route.params.version

    const changelogs = ref<ChangeLog[]>([])

    const totalCount = ref<number>(0)

    const pagination = reactive<Pagination>({
      page: 0,
      size: 20,
      sort: [{
        field: 'createdOn',
        direction: SortDirection.DESC
      }]
    })

    const loadData = () => {
      const urlTemplate = `changelog/${username}/${project}?page=${pagination.page || 0}&size=${pagination.size || 20}&sort=${Array.prototype.map
          .call(pagination.sort, function (s: Sort) { return `${s.field},${s.direction}` })
          .join('&sort=')}`

      axios.get<ChangeLog[]>(urlTemplate)
        .then(response => {
          changelogs.value = response.data
          totalCount.value = <number> response.headers['x-total-count']
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

      onMounted(() => loadData())

      const nextPage = () => {
        pagination.page = pagination.page + 1
        loadData()
      }

      const backPage = () => {
        pagination.page = pagination.page - 1
        loadData()
      }

      return {
        changelogs,
        totalCount,
        pagination,
        nextPage,
        backPage
      }
  }
})
</script>
