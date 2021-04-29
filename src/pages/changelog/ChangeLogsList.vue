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
                  <q-card flat bordered>
                    <q-card-section class="bg-primary text-white">
                      <div class="row items-center no-wrap">
                        <div class="col">
                          <div class="text-h6">{{ changelog.versionNo }}
                            for
                            {{ changelog.platform }}
                            <span v-if="changelog.buildVersion">({{ changelog.buildVersion }})</span>
                          </div>
                          <div class="text-subtitle2">by <b>{{ changelog.publisher }}</b>
                            at
                            {{ date.formatDate(changelog.releaseDate, 'YYYY-MM-DD HH:mm') }}
                          </div>
                        </div>

                        <div class="col-auto">
                          <q-btn flat round color="red" icon="favorite" />
                          <q-btn flat round icon="share" />
                        </div>
                      </div>
                    </q-card-section>

                    <q-card-section>
                      <dl>
                        <div v-for="content in changelog.contents" :key="content.id">
                          <dt class="col-sm-3 text-bold">{{ content.contentType }}:</dt>
                          <dd class="col-sm-9">{{ content.content }}</dd>
                        </div>
                      </dl>
                    </q-card-section>
                  </q-card>
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
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import { ChangeLog, Pagination, SortDirection, Sort, CommonError } from 'components/models'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'ChangeLogsList',
  setup (_, context) {
    const axios = context.root.$axios

    const username = context.root.$route.params.username
    const project = context.root.$route.params.project
    const version = context.root.$route.params.version

    console.log(username)
    console.log(project)
    console.log(version)

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
          console.log(changelogs.value)

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
        date,
        changelogs,
        totalCount,
        pagination,
        nextPage,
        backPage
      }
  }
})
</script>
