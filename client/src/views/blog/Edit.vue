<template>

    <v-layout row wrap>

        <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <div>
                    <div class="headline">Edit</div>
                    <div>
                        <v-text-field
                            v-model="blog.title"
                            label="Title"
                            required
                            ></v-text-field>
                        
                        <div class="mb-4"></div>
                        <v-input>
                            <vue-editor v-model="blog.body"></vue-editor>
                        </v-input>   

                    </div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange" @click="cancle">Back</v-btn>
                <v-btn flat color="orange" @click="update">Save</v-btn>
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
    async mounted() {
      const blogId = this.$store.state.route.params.blogId
      this.blog = (await BlogService.show(blogId)).data
    },
    methods: {
        async update () {
            const blogId = this.$store.state.route.params.blogId
            try {
            await BlogService.put(this.blog)
            this.$router.push({
                name: 'blog',
                params: {
                    blogId : blogId
                }
            })
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

<style scoped>

</style>