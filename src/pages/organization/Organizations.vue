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
            <div class="col-12 q-pa-lg">
              <div class="row q-col-gutter-md">
                <div class="col-6 text-right">
                  <q-btn outline color="primary"
                    @click="backPage" :disable="pagination.page <= 0"
                    label="Back" icon="navigate_before" />
                </div>
                <div class="col-6">
                  <q-btn outline color="primary"
                    @click="nextPage" :disable="!((pagination.page + 1) *
                      pagination.size <= totalCount)"
                    label="Next" icon-right="navigate_next" />
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
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
} from 'vue';
import {
  Organization,
  CommonError,
  Pagination,
  Sort,
  SortDirection,
} from 'components/models';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';
import { AxiosError } from 'axios';

export default defineComponent({
  name: 'Organizations',
  setup() {
    const $q = useQuasar();

    const organizations = ref<Organization[]>([]);

    const totalCount = ref<number>(0);

    const pagination = reactive<Pagination>({
      page: 0,
      size: 20,
      sort: [{
        field: 'createdOn',
        direction: SortDirection.DESC,
      }],
    });

    const loadData = () => {
      const urlTemplate = `organizations?page=${pagination.page || 0}&size=${pagination.size || 20}&sort=${Array.prototype.map
        .call(pagination.sort, (s: Sort) => `${s.field},${s.direction}`)
        .join('&sort=')}`;
      api.get<Organization[]>(urlTemplate)
        .then((response) => {
          organizations.value = response.data;
          totalCount.value = <number> response.headers['x-total-count'];
        })
        .catch((error: AxiosError) => {
          console.error(error);
          if (error.response && error.response.data) {
            const errorData = <CommonError> error.response.data;
            $q.notify({
              progress: true,
              message: errorData.title,
              caption: errorData.detail,
              position: 'bottom-right',
              color: 'negative',
              icon: 'report_problem',
            });
          } else {
            $q.notify({
              progress: true,
              message: 'Network Error',
              caption: 'Can\'t access the APIs, please check your network, ant try again',
              position: 'bottom-right',
              color: 'negative',
              icon: 'report_problem',
            });
          }
        });
    };

    const nextPage = () => {
      pagination.page += 1;
      loadData();
    };

    const backPage = () => {
      pagination.page -= 1;
      loadData();
    };

    onMounted(() => loadData());

    return {
      organizations,
      pagination,
      totalCount,
      nextPage,
      backPage,
    };
  },
});
</script>
