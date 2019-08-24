<template>

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">My Work</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        :to = "{name:'blogs'}"
      >
        <span class="mr-2">Blogs</span>
      </v-btn>
      <v-btn
        flat
        :to = "{name:'files'}"
      >
        <span class="mr-2">Files</span>
      </v-btn>
    </v-toolbar>
    
</template>

<script>
export default {
  data () {
    return {
      //
    }
  }
}
</script>