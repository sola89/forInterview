import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import NotificationsMixin from './mixins/notifications';
import GridsMixin from './mixins/grids';
import TreeMixin from './mixins/tree';
import RightMixin from './mixins/rights';
import vSelect from 'vue-select';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueHeadful from 'vue-headful';
import locale from 'element-ui/lib/locale/lang/ru-RU'
import { setupInterceptors } from './utils/httpInterceptors';
import { Notification } from 'element-ui'
import moment from 'moment'

Vue.mixin(NotificationsMixin);
Vue.mixin(GridsMixin);
Vue.mixin(TreeMixin);
Vue.mixin(RightMixin);
Vue.use(ElementUI, {locale});
Vue.component('vue-headful', vueHeadful);

Vue.prototype.$notify = Notification;
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;

/** Если любой из запросов вернул ошибку, то выводим соотвествующее уведомление и перенаправляем при необходимости */
axios.interceptors.response.use(function (response) {
    if (response.data.rez === false) {
        Notification.error({title: "Ошибка", message: response.data.msg || 'Непредвиденная ошибка', type: "error"});
    }
    return response
}, function (error) {
    if (error.response && (error.response.data.code === 401 || error.response.status === 401)) {
        store.dispatch('CLEAR_DATA_USER');
        if (router.currentRoute.path !== '/lk') {
            router.push('/lk')
        }
        if (error.response.data.message === 'JWT Token not found') {
            //Notification.error({title: "Ошибка", message: "Сессия устарела", type: "error"});
        }
    } else if (error.response && (error.response.data.code === 403 || error.response.status === 403)) {
        router.push('/lk');
        Notification.error({title: "Ошибка", message: "Доступ запрещен", type: "error"});
    }  else if (error.response && (error.response.data.code === 404 || error.response.status === 404)) {
        Notification.error({title: "Ошибка", message: "Роут не найден", type: "error"});
    } else {
        let errorText;
        if (error.response && error.response.data && error.response.data.message) {
            errorText = error.response.data.message;
        } else if (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]) {
            errorText = error.response.data.errors[0];
        } else {
            errorText = 'Непредвиденная ошибка'
        }
        Notification.error({title: "Ошибка", message: errorText, type: "error"});
    }
    return Promise.reject(error)
});

/** Проверка прав при каждом роуте **/
router.beforeEach(async(to, from, next) => {
    const user = store.getters.user,
        isAuth = store.getters.isAuthenticatedUser;
    // Разрешаем: если пользователь не авторизован и идет на логин или если авторизован и не логин и есть права
    // Перекидываем на логин - если не авторизован и идет не на логин
    // Иначе: перекидываем на профиль
    if ((!isAuth && to.path === '/lk') || (isAuth && (to.path !== '/lk'))) {
        next();
    } else if (to.path !== '/lk' && !isAuth) {
        next({name: 'Login'})
    } else {
        next({name: 'Profile'});
    }
});

Vue.component('v-select', vSelect);

// Используем EventBus для передачи параметров между двумя дочерними компонентами
export const eventBus = new Vue();

new Vue({
    router,
    store,
    template: '<App/>',
    components: { App },
    mounted() {
        setupInterceptors(store);
    },
}).$mount('#app');
