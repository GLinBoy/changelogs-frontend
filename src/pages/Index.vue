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
            <div class="col-12">
              <div class="row q-pa-md justify-center">
                <div class="col-xs-6 col-md-3 q-pa-md">
                  <q-btn outline color="primary"
                    icon="navigate_before"
                    label="Back"
                    class="full-width"
                    :disable="pagination.page === 0"
                    @click="backPage" />
                </div>
                <div class="col-xs-6 col-md-3 q-pa-md">
                  <q-btn outline color="primary"
                    label="Next"
                    icon-right="navigate_next"
                    class="full-width"
                    :disable="(pagination.page + 1) * pagination.size >= totalCount"
                    @click="nextPage"  />
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
import { useQuasar, date } from 'quasar';
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
} from 'vue';
import {
  ChangeLog,
  Pagination,
  Sort,
  SortDirection,
  CommonError,
} from 'components/models';
import { api } from 'boot/axios';
import { AxiosError } from 'axios';

import IndexChange from 'components/changelog/IndexChange.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    change: IndexChange,
  },
  setup() {
    const $q = useQuasar();

    const changelogs = ref<ChangeLog[]>([]);

    const totalCount = ref<number>(0);

    const pagination = reactive<Pagination>({
      page: 0,
      size: 10,
      sort: [
        {
          field: 'createdOn',
          direction: SortDirection.DESC,
        },
      ],
    });

    const loadData = () => {
      const urlTemplate = `changelogs/latest?page=${pagination.page || 0}&size=${pagination.size || 10}&sort=${Array.prototype.map
        .call(pagination.sort, (s: Sort) => `${s.field},${s.direction}`)
        .join('&sort=')}`;

      api.get<ChangeLog[]>(urlTemplate)
        .then((response) => {
          changelogs.value = response.data;
          totalCount.value = <number> response.headers['x-total-count'];
          window.scrollTo(0, 0);
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

    onMounted(() => loadData());

    const nextPage = () => {
      pagination.page += 1;
      loadData();
    };

    const backPage = () => {
      pagination.page -= 1;
      loadData();
    };

    return {
      changelogs,
      date,
      pagination,
      totalCount,
      nextPage,
      backPage,
    };
  },
});
</script>
