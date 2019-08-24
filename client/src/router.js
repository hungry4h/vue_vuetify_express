import Vue from 'vue'
import Router from 'vue-router'
import Blogs from './views/blog/List.vue'
import Blog from './views/blog/Show.vue'
import BlogAdd from './views/blog/Add.vue'
import BlogEdit from './views/blog/Edit.vue'
import FileAdd from './views/fileuploader/Add.vue'
import Files from './views/fileuploader/List.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'blogs',
      component: Blogs
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: Blog
    },
    {
      path: "/blog/:blogId/edit",
      name: "blogEdit",
      component: BlogEdit
    },
    {
      path: "/blog/add",
      name: "blogAdd",
      component: BlogAdd
    },
    // file-strage route
    {
      path: "/files",
      name: "files",
      component: Files
    },
    {
      path: "/file/add",
      name: "fileAdd",
      component: FileAdd
    }
  ]
})
