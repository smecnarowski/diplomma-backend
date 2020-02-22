<template>
  <q-page class="flex flex-center">
    <q-card
      class="my-card"
      flat
      bordered
    >
      <q-card-section class="col-12 q-pt-xs">
        <div class="doc-card-title">MAIN</div>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    mapClick(data) {
      console.log(data.latLng)
      console.log(
        `https://api.globalsolaratlas.info/data/lta?loc=${data.latLng.lat()},${data.latLng.lng()}`
      )
    }
  }
}
</script>
