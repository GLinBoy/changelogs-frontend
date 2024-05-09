<template>
  <div class="row">
    <div class="col-sm-12 col-md-2">
      <div class="row">
        <div class="col-12">
          <q-avatar size="180px">
            <img src="/images/avatar.svg">
          </q-avatar>
        </div>
        <div class="col-12">
          <span class="text-h4">Hojjat Abedi</span>
        </div>
        <div class="col-12">
          <span class="text-caption">GLinBoy</span>
        </div>
        <div class="col-12">
          <span class="text-body2">
            A JAVA Developer, C++ Programmer & Python Adventurer! I'm GLinBoy ;-)
          </span>
        </div>
        <div class="col-12">
          <q-btn outline size="sm" class="full-width" label="Edit Profile" />
        </div>
        <div class="col-12">
          <span>
            <q-icon name="account_group_outline" />
             23 followers · 21 following
          </span>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-10">
      Profile Content
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileView',
});
</script>
