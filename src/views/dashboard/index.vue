<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div v-html="postForm.content" />
    <Tinymce ref="editor" v-model="postForm.content" :height="400" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'Dashboard',
  components: { Tinymce },
  data() {
    return {
      postForm: {
        content: ''
      },
      pa: '<p>asdasas</p>'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // console.log(postForm.)
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
