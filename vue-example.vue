<!--Пример vue компонента -->

<template>
    <div class="nav-bar">
        <div class="box">
            <div class="ext_buttons">
                <a href="http://citto.ru/" class="ex_bt">
                    <i class="i_link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                        <path d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0Z" fill="#001A34"/>
                        </svg>
                    </i>
                    перейти на сайт
                </a>
                <el-popover
                    placement="bottom"
                    width="800"
                    trigger="click">
                    <div class="msg_list">
                        <div class="empty_msg" v-if="messages.length == 0">
                            Нет новых сообщений
                        </div>
                        <div class="msgs" v-else>
                            <div v-for="(msg, key) in messages" :key="key" :class="{'msg-green': !msg.read}" class="msg-item">
                                <div class="msg-title">{{ msg.caption }}  <span class="msg-date">{{ moment(String(msg.created)).format('DD.MM.YYYY') }}</span></div>
                                <div class="msg-caption">{{ msg.text }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="notify" slot="reference">
                        <a class="ex_bt" ><img :src="msgNotificationImg" alt="" ></a>
                    </div>
                </el-popover>
            </div>
            <div class="logologo"><img src="/img/logo-mini.svg" alt="logo"></div>
            <div class="r_col">
                <el-tooltip class="item" effect="dark" content="Выход" placement="bottom">
                    <div class="exit-button" @click="logout">
                        {{ name }}
                    </div>
                </el-tooltip>
                <el-avatar
                    :size="36"
                    :src="$store.getters.user.photo"
                ></el-avatar>
            </div>
        </div>
    </div>
</template>

<script>
<!--Импорт экшена - вызов мутации для логаута и очищения state в vuex-->
    import { LOGOUT_REQUEST } from '../store/modules/auth/action-types'
    <!--Использую axios для запросов на сервер-->
    import axios from 'axios'
    import moment from 'moment';
    import store from "../store";
    export default {
        props: ['sidebarOpen'],

        data() {
            return {
                name: this.$store.getters.user.name,
                messages: [],
                msgNotificationImg: null,
            }
        },

        methods: {
            logout() {
                this.$store.dispatch(LOGOUT_REQUEST).then(() => {
                    window.location = '/lk';
                }).catch((error) => {
                    console.log(error);
                });
            },
            getMessages() {
                axios.get('/api/messages/show_messages').then(response => {
                    if (response.data.rez) {
                        this.msgNotificationImg = response.data.unread !== 0 ? '/img/n_a.svg' : '/img/n_d.svg' 
                        this.messages = response.data.messages
                        
                    } 
                })
            },
            
        },
        mounted() {
            setTimeout(() => {
                if (store.getters.isAuthenticatedUser) {
                    this.getMessages()
                }
            }, 2000);
        }
    }
</script>

<style lang="scss">
    .logologo {
        position: absolute;
        width: 32px;
        left: 50%;
        margin-left: -16px;
    }

    .msg-green {
        background: rgba(#c2e7b0, .3);
    }
    .msg-date {
        font-size: 12px;
        font-weight: normal;
        padding-left: 5px;
    }

    .msg-item {
        padding: 0 25px;
        border-bottom: 1px solid #e3e3e3;
        padding-bottom: 10px;
        margin-bottom: 10px;
        &:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
    }

    .msg-title {
        font-size: 18px;
        font-weight: bold;
    }

    .msg-caption {
        margin-top: 5px;

    }

    .ext_buttons {
        display: flex;
        align-items: center;
    }

    .notify {
        padding-left: 15px;
    }

    .notify .ex_bt {
        padding: 8.5px;
    }

    .notify .ex_bt:hover {
        background: #fff;
        border: 1px solid #001A34;
    }

    .ex_bt {
        border: 1px solid #E3E3E3;
        color: #001A34;
        border-radius: 100px;
        opacity: 1;
        text-decoration: none;
        font-family: Roboto, sans-serif;
        padding: 7px 17px;
        transition: all .2s ease-in;
        display: flex;
        cursor: pointer;
    }
    .i_link {
        padding-right: 10px;
    }

    .ex_bt path {
        transition: all .2s ease-in;
    }

    .ex_bt:hover {
        background: #001A34;
        color: #fff;
        border: 1px solid transparent;
    }

    .ex_bt:hover path {
        fill: #fff
    }

    .exit-button {
        cursor: pointer;
    }

    .r_col {
        display: flex;
        align-items: center;
    }

    .r_col .exit-button {
        margin-right: 15px;
    }
</style>
