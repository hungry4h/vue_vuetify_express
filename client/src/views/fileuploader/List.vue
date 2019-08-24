<template>

    <v-layout row wrap align-center justify-center>
        <v-flex xs12 md8>

            <v-btn
                :to="{name:'fileAdd'}"
                dark
                fab
                top
                right
                color="gray"
            >
              <v-icon>add</v-icon>
            </v-btn>

            <v-flex>
            
            <v-text-field
            placeholder="Search..."
            v-model="search"
            ></v-text-field>

            </v-flex>

            <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1 mt-3"
            >
                <template slot="items" slot-scope="props">
                <td class="text-xs-center"><a @click="download(props.item.id)">
                                            {{ props.item.file_name }}
                                        </a></td>
                <td class="text-xs-center">{{ props.item.file_size/1000000 }} mb</td>
                <td class="text-xs-center">{{ (props.item.createdAt).slice(0,10) }}</td>
                </template>
            </v-data-table>

        </v-flex>
    </v-layout>

</template>

<script>
    import FileUploadService from '@/services/FileUploadService'

    export default {
        data() {
            return {
                items: [],
                item: {}, 
                search: "",
                headers: [
                    { text: 'File Name', align: 'center' },
                    { text: 'File Size', align: 'center' },
                    { text: 'Upload Date',  align: 'center' }
                ],
            }
        },

        watch: {
            search (value) {
                const route = {
                    name: 'files'
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
                    this.items = (await FileUploadService.index(value)).data
                }
            }
        },
        
        //async mounted() {
        //    this.items = (await FileUploadService.index()).data
        //},

        methods: {
            //async download(fileId) {
                //await FileUploadService.download(fileId)
                //console.log(fileId)
            download(fileId) { 
                window.open(`http://localhost:3000/file-download/${fileId}`)
            }
        }
    }
</script>

<style scoped>
</style>