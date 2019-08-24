<template>

    <v-layout row wrap>

        <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <div>
                    <div class="headline">New ...</div>
                    <div>
                        <v-text-field
                            v-model="blog.title"
                            label="Title"
                            required
                            ></v-text-field>
                        
                        <div class="mb-4">Body</div>
                        <v-input>
                            <vue-editor v-model="blog.body"></vue-editor>
                        </v-input>   

                    </div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange" @click="cancle">Back</v-btn>
                <v-btn flat color="orange" @click="add">Save</v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
        
    </v-layout>

</template>

<script>
  import BlogService from '@/services/BlogService'
  import { VueEditor } from "vue2-editor"

  export default {
    components: {
        VueEditor
    },
    data: () => ({
        blog: {}
    }),
    methods: {
      async add () {
        try {
          await BlogService.post(this.blog)
          this.$router.push({name: 'blogs'})
        } catch(err) {
          console.log(err)
        } 
      },
      cancle () {
          this.$router.push({name: 'blogs'})
      }
    }
  }

</script>