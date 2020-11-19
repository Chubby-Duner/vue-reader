import {
    Loading,
    Toast, 
    Tab,
    Tabs,
    List,
    Cell,
    Skeleton,
    Search,
    Checkbox,
    Button,
    Dialog,
    Popup,
    Swipe, 
    SwipeItem,
    Lazyload,
    Slider,
    NavBar,
    Empty    
} from 'vant'

const vants = [
    Loading,
    Toast,
    Tab,
    Tabs,
    List,
    Cell,
    Skeleton,
    Search,
    Checkbox,
    Button,
    Dialog,
    Popup,
    Swipe, 
    SwipeItem,
    Lazyload,
    Slider,
    NavBar,
    Empty    
]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }
}