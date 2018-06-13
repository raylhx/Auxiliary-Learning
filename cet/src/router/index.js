import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/home/index'
import cet6 from '@/components/cet6/cet6'
import cet4 from '@/components/cet4/cet4'
import cetpost from '@/components/cetpost/cetpost'
import center from '@/components/center/center'
import about from '@/components/about/about'
import login from '@/components/login/login'
import page404 from '@/components/page404/page404'
import information from '@/components/center/Information'
import setting from '@/components/center/Setting'
import uploadList from '@/components/center/UploadList'
import collection from '@/components/center/collection'
import analysis from '@/components/analysis/analysis'
import userArticle from '@/components/analysis/userArticleAnalysis'
import outline from '@/components/wordList/outline'
import upload from '@/components/uploadAnalysis/uploadAnalysis'
import ArticleManage from '@/admin/articleManage'
import AdminLogin from '@/admin/adminLogin'
import Threshold from '@/admin/threshold'
import User from '@/admin/userManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: page404
    },
    {
      path: '/',
      meta: {
        requireAuth: true
      },
      component: index
    },
    {
      path: '/home',
      meta: {
        requireAuth: true
      },
      component: index
    },
    {
      path: '/cet6',
      meta: {
        requireAuth: true
      },
      component: cet6
    },
    {
      path: '/cetpost',
      meta: {
        requireAuth: true
      },
      component: cetpost
    },
    {
      path: '/cet4',
      meta: {
        requireAuth: true
      },
      component: cet4
    },
    {
      path: '/center',
      component: center,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'information',
          name: 'information',
          meta: {
            requireAuth: true
          },
          component: information
        },
        {
          path: 'setting',
          name: 'setting',
          meta: {
            requireAuth: true
          },
          component: setting
        },
        {
          path: 'uploadlist',
          name: 'uploadList',
          meta: {
            requireAuth: true
          },
          component: uploadList
        },
        {
          path: 'collection',
          name: 'collection',
          meta: {
            requireAuth: true
          },
          component: collection
        }
      ]
    },
    {
      path: '/about',
      component: about,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/:type/analysis/:aId',
      meta: {
        requireAuth: true
      },
      component: analysis
    },
    {
      path: '/center/upload/:aId',
      meta: {
        requireAuth: true
      },
      component: userArticle
    },
    {
      path: '/vocabulary/:range/:type',
      meta: {
        requireAuth: true
      },
      component: outline
    },
    {
      path: '/upload-analysis',
      meta: {
        requireAuth: true
      },
      component: upload
    },
    {
      path: '/sr/sys/admin/articles/:aId',
      component: ArticleManage
    },
    {
      path: '/sr/sys/admin/login',
      component: AdminLogin
    },
    {
      path: '/sr/sys/admin/threshold',
      component: Threshold
    },
    {
      path: '/sr/sys/admin/user',
      component: User
    }
  ]
})
