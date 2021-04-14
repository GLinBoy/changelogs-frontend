<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-page row justify-center q-pa-sm">
        <div class="col-xs-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <span class="text-subtitle2">latest changelogs:</span>
            </div>
            <div class="col-12">
              <q-card class="my-card" flat
                 v-for="change in changelogs" :key="change.key">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="change.project.logo">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <router-link style="text-decoration: none; color: inherit;"
                        :to="change.project.owner + '/' + change.project.title">
                        {{ change.project.owner + '/' + change.project.title }}
                      </router-link>
                      <router-link style="text-decoration: none; color: inherit;"
                        :to="change.project.owner + '/' + change.project.title + '/' + change.versionNo">
                        <q-chip square dense size="md">
                          <q-avatar icon="lightbulb" color="blue" text-color="white" />
                          {{ change.versionNo }}
                        </q-chip>
                      </router-link>
                      <q-chip square dense size="md">
                        <q-avatar icon="settings" color="red" text-color="white" />
                        {{ change.platform }}
                      </q-chip>
                    </q-item-label>
                    <q-item-label caption>
                      By <b>
                        <router-link :to="change.publisher"
                          style="text-decoration: none; color: inherit;">
                          {{change.publisher}}
                        </router-link>
                      </b> @ <b>{{ date.formatDate(change.releaseDate, 'YYYY-MM-DD HH:mm') }}</b>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-card-section horizontal class="row">
                  <q-card-section class="col-12">
                    <q-card flat bordered>
                      <q-card-section>
                        <dl>
                          <div v-for="content in change.contents" :key="content.id">
                            <dt class="col-sm-3 text-bold">{{ content.contentType }}:</dt>
                            <dd class="col-sm-9">{{ content.content }}</dd>
                          </div>
                        </dl>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { date } from 'quasar'
import { ChangeLog, Pagination, Sort, SortDirection, CommonError } from 'components/models'
import { defineComponent, ref, reactive } from '@vue/composition-api'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'PageIndex',
  components: {},
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
