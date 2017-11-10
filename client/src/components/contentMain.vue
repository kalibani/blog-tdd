<template>
  <div class="col-md-9">
    <div class="jumbotron" v-for="article in article">
      <h1>{{article.title}}</h1>
      <p>{{article.content}}</p>
      <p>{{article.author}}</p>
    </div>
  </div>
</template>

<script>
export default{
  props: ['article']
}

</script>
