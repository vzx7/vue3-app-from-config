export default {
    modules: {
        account: {
            namespaced: true,
            // module assets
            state: () => ({
                user: 0,
                isLogin: false
            }), // module state is already nested and not affected by namespace option
            getters: {
                isAdmin (state: any) {
                    return state.user === 0;
                } // -> getters['account/isAdmin']
            },
            actions: {
                login (state: any) {
                    state.isLogin = true;
                } // -> dispatch('account/login')
            },
            mutations: {
                login (state: any) {
                    state.isLogin = false;
                } // -> commit('account/login')
            }
        },
        nested: [{
            parent: 'account',
            myPage: {
                state: () => ({
                    page: 1
                }),
                getters: {
                    profile (state: any) {
                        return state.page
                    } // -> getters['account/profile']
                }
            }
        }],
        counter: {
            namespaced: true,
            // module assets
            state: () => ({
                count: 0,
            }), // module state is already nested and not affected by namespace option
            getters: {
                getCount (state: any) {
                    return state.count;
                } // -> getters['counter/getCount']
            },
        }
    }
}