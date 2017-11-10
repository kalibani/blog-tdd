<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>
    <contentMain v-bind:article='article'></contentMain>
  </div>

</template>
<script>
  import navbar from '@/components/navbar'
  import sidebar from '@/components/sidebar'
  import contentMain from '@/components/contentMain'
  export default{
    components:{
      navbar, sidebar, contentMain
    },
  data() {
    return  {
      article:[]
    }
  },
  methods:{
    getAllArticles(){
      this.$http.get('/articles')
      .then(({data}) => {
        this.article = data
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  mounted(){
    this.getAllArticles()
  }
}

</script>
