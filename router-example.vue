import Vue from 'vue';
import Router from 'vue-router';
import PageNotFoundView from '../vue/views/PageNotFoundView';
import Login from '../vue/views/Login';
import Structure from '../vue/views/Structure';
import Users from '../vue/views/Users';
import Refers from '../vue/views/Refers';
import Employee from '../vue/views/Employee';
import Unit from '../vue/views/Unit';
import Vacancies from '../vue/views/Vacancies';
import VacancyResponse from '../vue/views/VacancyResponse';
import ApplicationForms from '../vue/views/ApplicationForms';
import ApplicationFormGroups from '../vue/views/ApplicationFormGroups';
import VacationSchedule from '../vue/views/VacationSchedule';
import Documents from '../vue/views/Documents';
import Voting from '../vue/views/Voting';
import Messages from '../vue/views/Messages';
import VacationCountDays from '../vue/views/VacationCountDays';

import Profile from '../vue/views/Profile';
import VacanciesProfile from '../vue/views/Profile/VacanciesProfile';
import ApplicationFormsProfile from "./views/Profile/ApplicationFormsProfile";
import EmployeesProfile from "./views/Profile/EmployeesProfile";
import VacationScheduleProfile from "./views/Profile/VacationScheduleProfile";
import VotingProfile from "./views/Profile/VotingProfile";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/lk',
            component: Login,
            name: 'Login',
            meta: { layout: 'empty'},
            title: 'Search'
        },
        {
            path: '/lk/structure',
            component: Structure,
            name: 'Structure',
            meta: { layout: 'main' },
        },
        {
            path: '/lk/users',
            component: Users,
            name: 'Users',
            meta: { layout: 'main' },
        },
        {
            path: '/lk/refers/:typeRefer',
            component: Refers,
            name: 'Refers',
            meta: { layout: 'main' },
            props: true,
        },
        {
            path: '/lk/employees',
            component: Employee,
            name: 'Employees',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/units',
            component: Unit,
            name: 'Units',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/vacancies',
            component: Vacancies,
            name: 'Vacancies',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/vacancy_response',
            component: VacancyResponse,
            name: 'VacancyResponse',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/application_forms',
            component: ApplicationForms,
            name: 'ApplicationForms',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/application_form_groups',
            component: ApplicationFormGroups,
            name: 'ApplicationFormGroups',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/vacation_schedule',
            component: VacationSchedule,
            name: 'VacationSchedule',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/documents',
            component: Documents,
            name: 'Documents',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/voting',
            component: Voting,
            name: 'Voting',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/messages',
            component: Messages,
            name: 'Messages',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/vacation_count_days',
            component: VacationCountDays,
            name: 'VacationCountDays',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/profile',
            component: Profile,
            name: 'Profile',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/profile/vacation_schedule',
            component: VacationScheduleProfile,
            name: 'VacationScheduleProfile',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/profile/vacancies',
            component: VacanciesProfile,
            name: 'VacanciesProfile',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/profile/voting',
            component: VotingProfile,
            name: 'VotingProfile',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/profile/employees',
            component: EmployeesProfile,
            name: 'EmployeesProfile',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '/lk/profile/application_forms',
            component: ApplicationFormsProfile,
            name: 'ApplicationFormsProfile',
            meta: {layout: 'main'},
            props: true,
        },
        {
            path: '*',
            component: PageNotFoundView,
            name: 'PageNotFoundView',
        },
    ]
});
