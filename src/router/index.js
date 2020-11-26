import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'

Vue.use(VueRouter)

const routes = [ 
    {
        path: '/main',
        name: 'Main',
        component: Main,
        // 二级路由
        children: [
            {
                path: 'bookstore', 
                name: 'bookstore',
                component: () => import ('@/views/BookStore'),
            },
            {
                path: 'bookshelf',
                name: 'bookshelf',
                component: () => import ('@/views/BookShelf'),
            },
            {
                path: 'category',
                name: 'category',
                component: () => import ('@/views/Category'),
            },
            {
                path: 'rank',
                name: 'rank',
                component: () => import ('@/views/Rank'),
            },
            {
                path: 'my',
                name: 'my',
                component: () => import ('@/views/My'),
            },
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: () => import ('@/views/Search')
    },
    {
        path: '/cateitemlist/:major',
        name: 'cateitemlist',
        component: () => import ('@/views/CateItemList')
    },
    {
        // 书籍详情页
        path: '/book/:bookId',
        name: 'book',
        component: () => import ('@/views/Book'),
    },
    {
        path: '/catalog/:bookId',
        name: 'catalog',
        component: () => import ('@/views/Catalog')
    },
    {
        path: '/searchResult',
        name: 'searchResult',
        component: () => import ('@/components/Search/SearchResult')
    },
    {
        path: '/readbook/:bookid',
        name: 'readbook',
        component: () => import ('@/views/ReadContent'),
    },
    {
        path: '/historyRead',
        name: 'historyRead',
        component: () => import ('@/views/HistoryRead')
    },
    {
        path: '/endBook',
        name: 'endBook',
        component: () => import ('@/views/EndBook')
    },
    {
        path: '/picture',
        name: 'picture',
        component: () => import ('@/views/Picture')
    },
    // 重定向
    {
        path: '*',
        redirect: { 
            name: 'bookstore'
        }
    }
]

const router = new VueRouter({
    routes,
    linkExactActiveClass: 'exact',
    mode: 'history'
})

export default router