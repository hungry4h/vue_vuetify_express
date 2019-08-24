<template>

    <v-layout row wrap align-center justify-center>

        <v-flex xs12>

            <v-btn
                :to="{name:'blogAdd'}"
                dark
                fab
                top
                right
                color="gray"
            >
              <v-icon>add</v-icon>
            </v-btn>

        </v-flex>

        <v-flex xs12>

            <v-text-field
            placeholder="Search..."
            v-model="search"
            ></v-text-field>

        </v-flex>
        
        <v-flex xs10>
            <v-card v-for="blog in blogs" :key="blog.id" class="mt-2">
              <v-card-title primary-title>
                <div>
                  <div class="headline mb-2">{{blog.title}}</div>
                  <span v-html="`${(blog.body).slice(0, 100)}...`"></span>
                  <p class="mt-2 ml-4">modified at : {{(blog.updatedAt).slice(0,10)}}</p>
                </div>
              </v-card-title>
              <v-card-actions>
                <div class="mb-2">
                    <v-btn small
                        flat color = "indigo"
                        :to="{
                            name:'blog', 
                            params: {
                                blogId: blog.id
                                }
                            }">
                        More ...
                    </v-btn>
                </div>
              </v-card-actions>
            </v-card>
        </v-flex>

    </v-layout>

</template>

<script>
    import BlogService from '@/services/BlogService'

    export default {
    data: () => ({
        blogs: [],
        blog: {},
        search: "",
        dialog: false
    }),

    watch: {
        search (value) {
            const route = {
                name: 'blogs'
            }
            if (this.search !== '') {
                route.query = {
                    search: this.search
                }
            }
            this.$router.push(route)
        },
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.search = value
                this.blogs = (await BlogService.index(value)).data
            }
        }
    }
}
</script>

<style scoped>
</style>

