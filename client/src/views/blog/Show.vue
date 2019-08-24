<template>

    <v-layout row wrap>

        <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <div>
                    <div class="headline">{{blog.title}}</div>
                    <div class="mt-4">
                        <div class="content">
                            <div class="mt-4"></div>
                            <v-divider></v-divider>
                            <div class="ma-4" v-html="blog.body"></div>
                        </div>
                </div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange" @click="cancle">Back</v-btn>
                <v-btn flat color="orange" :to="{
                            name:'blogEdit',
                            params: {
                                blogId : blog.id
                            }
                            }">Edit</v-btn>
                <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                        <v-btn small flat color = "red" dark v-on="on">Delete ...</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Are you sure to delete?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="indigo" text @click="dialog = false">No</v-btn>
                        <v-btn flat color="red" text @click="deleteBlog">Yes</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>

        </v-flex>
        
    </v-layout>

   
</template>

<script>
  import BlogService from '@/services/BlogService'
  import { VueEditor } from "vue2-editor"
    
  export default {
    data: () => ({
        blog: {},
        dialog: false
    }),

     components: {
        VueEditor
    },

    async mounted() {
      const blogId = this.$store.state.route.params.blogId
      this.blog = (await BlogService.show(blogId)).data
    },

    methods: {
      cancle() {
          this.$router.push({name: 'blogs'})
      },
      async deleteBlog() {
        const blogId = this.blog.id
        try {
          await BlogService.delete(blogId)
          this.$router.push({name: 'blogs'})
        } catch(err) {
          console.log(err)
        }      
      }
    }
  }

</script>
