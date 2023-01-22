import { createApp, defineAsyncComponent } from 'vue'
import { createStore } from 'vuex'
import router from './router'
import contract from './contract.json'
import storeLogic from './storeLogic';
import App from './App.vue'
import './assets/main.css'


// Создаем приложение
const app =  createApp(App);

// Создаем динамический стор, на остнове контракта и внешнего модуля логики стора.
// Создаем пустой стор
const store = createStore({});

// Динамически подключаем модули стора с логикой
contract.store.modules.forEach(m => {
    // Если стор пустой, выйти
    if (!m.names || m.names.length === 0) return;

    if (m.names.length === 1) {
        store.registerModule(m.names[0], storeLogic.modules[m.names[0]]);
    } else {
        store.registerModule(m.names[0], storeLogic.modules[m.names[0]]);
        let i = 1;
        while(m.names[i]) {
            const nested = storeLogic.modules.nested.find(x => x.parent === m.names[0]);
            nested && store.registerModule([m.names[0], m.names[i]], nested[m.names[i]]);
            i++;
        }
    }
});

// Динамически загружаем элементы UI библиотеки
const rootModule = contract.elements[0].components;
rootModule.forEach(element => {
    const component = defineAsyncComponent(() => {
        return import(`./components/${element.name}.vue`)
    })

    app.component(element.name, component)
});

// подгружаем Сервис логики для UI на основе контракта в качестве plugin
// таким же образом мы можем подгрузить все сервисы в качестве плагинова и все поднять внутри инфроструктуры VUE.
const plugins: any[] = [];
contract.plugins.forEach(plugin => plugins.push(import(`./${plugin.name}.js`)));

// Ассинхронно подгружаем плагины
Promise.all(plugins).then(stack => {
    stack.forEach(plugin => app.use(plugin.default, plugin?.options));
    app.use(store);
    app.use(router)
    app.mount('#app');
})