import { createStore } from "vuex";

const store = createStore({
    state: {
        step: 1,
        data: { fullName: null, birthDay: null, school: null, id: null },
        dataTable: [],
    },
    mutations: {
        udpateFullName(state, payload) {
            state.data.fullName = payload;
        },
        udpateBirthDay(state, payload) {
            state.data.birthDay = payload;
        },
        udpateSchool(state, payload) {
            state.data.school = payload;
        },
        udpateId(state, payload) {
            state.data.id = payload;
        },
    },
    getters: {
        data_table(state) {
            return state.dataTable;
        },
    },
    actions: {
        SubmitDataTable(context) {
            let x = context.state.data;
            context.state.dataTable.push({ ...x });
            context.state.data.fullName = null;
            context.state.data.birthDay = null;
            context.state.data.school = null;
            context.state.data.id = null;
        },
        deleteFromDataTable(context, id) {
            let y = context.state.dataTable.findIndex((el) => {
                return el.id === id;
            });
            context.state.dataTable.splice(y, 1);
        },
        updateFromDataTable(context, element) {
            let arr = context.state.dataTable.findIndex((el) => {
                return el.id == element.id;
            });
            context.state.dataTable[arr] = { ...element };
        },
    },
});
export default store;
