<template>
  <input :value="value">
</template>

<script>
  import flatpickr from 'flatpickr'
  import { French } from 'flatpickr/dist/l10n/fr'

  export default {
    props: {
      value: {
        default: null
      }
    },
    data () {
      return {
        fp: null
      }
    },
    watch: {
      value (newVal) {
        // Only used for initialization purposes
        if (this.fp && this.fp.altInput.value === '') {
          this.fp.setDate(newVal, true)
        }
      }
    },
    mounted () {
      if (!this.fp) {
        this.fp = flatpickr(this.$el, {
          'locale': French,
          altInput: true,
          altFormat: 'j F Y',
          wrap: false,
          animate: false,
          onChange: (selectedDates, dateStr) => {
            this.$emit('input', dateStr)
          }
        })
      }
    },
    beforeDestroy () {
      if (this.fp) {
        this.fp.destroy()
        this.fp = null
      }
    }
  }
</script>
