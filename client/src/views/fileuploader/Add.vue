<template>

    <v-layout row wrap align-center justify-center>
        <v-flex xs12>
            <v-form enctype="multipart/form-data" class="mt-8">

                <v-alert v-if="message"
                    :value="true"
                    :class="[error ? 'error' : 'success']"
                >
                    <div class="message-body">{{message}}</div>
                </v-alert>

                <div v-if="!message">

                    <span class="title">Description</span>

                    <div class="mt-3">
                        <v-input>
                            <vue-editor v-model="desc_body"></vue-editor>
                        </v-input>
                    </div> 

                    <div>
                        <input 
                            type="file"
                            ref="file"
                            @change="selectFile">

                        <span v-if="file" class="file-name">
                            File Name : {{file.name}}
                        </span>
                    </div>

                    <v-btn class="primary" @click="sendFile">Submit</v-btn>

                    <v-btn class="warning" :to="{name:'files'}">Back</v-btn>

                </div>
                

            </v-form>
        </v-flex>
    </v-layout>

</template>

<script>
import FileUploadService from '@/services/FileUploadService'
import { VueEditor } from "vue2-editor"

export default {
    components: {
        VueEditor
    },

    data() {
        return {
            desc_title: "",
            desc_body: "",
            file: "",
            message: "",
            error: false
        }
    },

    methods: {
        selectFile() {
            this.file = this.$refs.file.files[0]
            this.error = false
            this.message = ""
            //console.log(this.file)
        },
        async sendFile() {
            const formData = new FormData();
            formData.append('file', this.file)
            //formData.append('desc_title', this.desc_title)
            formData.append('desc_body', this.desc_body)
            try {
                await FileUploadService.post(formData)
                this.message = "Upload is completed"
                this.file = ""
                //this.desc_title = ""
                this.desc_body = ""
                this.error = false
                setTimeout(() => {
                    this.$router.push({name: 'files'})
                }, 1000)
                
            } catch(err) {
                this.message = "Some error occured"
                this.error = true
                setTimeout(() => {
                    this.$router.push({name: 'files'})
                }, 1000)
            }
        }
    }
}
</script>

<style scoped>

</style>