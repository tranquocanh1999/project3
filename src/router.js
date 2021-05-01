import Vue from "vue";
import Router from "vue-router";

import auth from "./auth";

import Home from "./views/home";
import Profile from "./views/profile";
import Bill from "./views/sell/bill.vue";
import BillList from "./views/sell/billList.vue";
import ProductList from "./views/inventory-management/products/productList.vue"
import EmployeeList from "./views/admin/employeeList.vue"
import defaultLayout from "./layouts/side-nav-inner-toolbar";
import simpleLayout from "./layouts/single-card";

Vue.use(Router);

const router = new Router({
    routes: [{
            path: "/home",
            name: "home",
            meta: { requiresAuth: true },
            components: {
                layout: defaultLayout,
                content: Home
            }
        },
        {
            path: "/profile",
            name: "profile",
            meta: { requiresAuth: true },
            components: {
                layout: defaultLayout,
                content: Profile
            }
        },

        {
            path: "/bill",
            name: "bill",
            meta: { requiresAuth: true },
            components: {
                layout: defaultLayout,
                content: Bill
            }
        },
        {
            path: "/bill-list",
            name: "bill-list",
            meta: { requiresAuth: true },
            components: {
                layout: defaultLayout,
                content: BillList
            }
        },
        {
            path: "/product-list",
            name: "product-list",
            meta: { requiresAuth: true },
            components: {
                layout: defaultLayout,
                content: ProductList
            }
        },
        {
            path: "/employee-list",
            name: "employee-list",
            meta: { requiresAuth: true },
            components: {
                layout: defaultLayout,
                content: EmployeeList
            }
        },
        {
            path: "/login-form",
            name: "login-form",
            meta: { requiresAuth: false },
            components: {
                layout: simpleLayout,
                content: () =>
                    import ( /* webpackChunkName: "login" */ "./views/login-form")
            },
            props: {
                layout: {
                    title: "Đăng nhập"
                }
            }
        },
        {
            path: "/pageNotFound",
            name: "pageNotFound",
            meta: { requiresAuth: false },
            components: {
                layout: simpleLayout,
                content: () =>
                    import ( /* webpackChunkName: "login" */ "./views/pageNotFound")
            },
        },
        {
            path: "/reset-password",
            name: "reset-password",
            meta: { requiresAuth: false },
            components: {
                layout: simpleLayout,
                content: () =>
                    import ( /* webpackChunkName: "login" */ "./views/reset-password-form")
            },
            props: {
                layout: {
                    title: "Cài lại mật khẩu",
                    description: "Vui lòng nhập địa chỉ email mà bạn đã sử dụng để đăng ký và chúng tôi sẽ gửi cho bạn mật khẩu mới qua mail."
                }
            }
        },
        {
            path: "/create-account",
            name: "create-account",
            meta: { requiresAuth: false },
            components: {
                layout: simpleLayout,
                content: () =>
                    import ( /* webpackChunkName: "login" */ "./views/create-account-form")
            },
            props: {
                layout: {
                    title: "Đăng ký"
                }
            }
        },
        {
            path: "/change-password/:recoveryCode",
            name: "change-password",
            meta: { requiresAuth: false },
            components: {
                layout: simpleLayout,
                content: () =>
                    import ( /* webpackChunkName: "login" */ "./views/change-password-form")
            },
            props: {
                layout: {
                    title: "Change Password"
                }
            }
        },
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/recovery",
            redirect: "/home"
        },
        {
            path: "*",
            redirect: "/pageNotFound"
        }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {

    if (to.name === "login-form" && auth.loggedIn()) {
        next({ name: "home" });
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth.loggedIn()) {
            next({
                name: "login-form",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;