export default {
    install: (app, options) => {
        app.config.globalProperties.$UILogic = {
            getContract: async () => {
                const contract = await import(`./contract.json`);
                console.log(contract);
            }
        }

        app.provide('UILogic', options)
    }
}