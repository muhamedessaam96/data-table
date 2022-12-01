<template>
    <div class="container mx-a">
        <div class="flex flex-col gap-6 h-screen justify-center items-center">
            <div>
                <StepOne v-if="$store.state.step === 1" />
                <StepTwo v-if="$store.state.step === 2" />
                <StepThree v-if="$store.state.step === 3" />
                <StepFour v-if="$store.state.step === 4" />
                <div class="flex justify-end mt-2">
                    <button
                        v-if="$store.state.step === 4"
                        @click="isClicked = !isClicked"
                        class="underline text-blue-300"
                    >
                        show all data
                    </button>
                </div>
            </div>

            <div>
                <table class="shadow-lg bg-gray-50 border-collapse">
                    <tr class="bg-gray-700 text-white text-center">
                        <th class="border px-8 py-4">ID</th>
                        <th class="border px-8 py-4">First name</th>
                        <th class="border px-8 py-4">Birthday</th>
                        <th class="border px-8 py-4">school</th>
                        <th class="border px-8 py-4">ID</th>
                        <th class="border px-8 py-4">Actions</th>
                    </tr>
                    <tr v-for="(el, index) in data_table" :key="index" class="text-center">
                        <td class="border px-8 py-4">{{ ++index }}</td>
                        <td class="border px-8 py-4">{{ el.fullName }}</td>
                        <td class="border px-8 py-4">{{ el.birthDay }}</td>
                        <td class="border px-8 py-4">{{ el.school }}</td>
                        <td class="border px-8 py-4">{{ el.id }}</td>
                        <td class="border px-8 py-4 space-x-2">
                            <button
                                @click="fillModal(el)"
                                class="bg-green-400 hover:bg-green-500 w-[80px] py-1 rounded-md text-white"
                            >
                                Edit
                            </button>
                            <button
                                @click="deleteRow(el.id)"
                                class="bg-red-400 hover:bg-red-500 w-[80px] py-1 rounded-md text-white"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- modal -->
        <div
            class="fixed inset-0 bg-opacity-60 bg-black flex justify-center items-center"
            v-if="clicked"
        >
            <!-- Modal Body -->
            <div
                id="modal"
                class="bg-white rounded-[10px] overflow-x-auto flex flex-col justify-between md:w-2/6 w-3/4 h-3/4"
            >
                <!-- Modal Header -->
                <div class="bg-gray-500 px-4 py-3 text-center text-white font-semibold text-[24px]">
                    Update
                </div>

                <!-- Modal Body -->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col gap-4">
                    <div class="flex justify-between gap-2 items-center">
                        <label class="block text-gray-700 text-sm font-bold w-[20%]" for="fullname">
                            Full name
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullname"
                            type="text"
                            placeholder="Full name"
                            v-model="elementEdit.fullName"
                        />
                    </div>
                    <div class="flex justify-between gap-2 items-center w-full">
                        <label class="block text-gray-700 text-sm font-bold w-[20%]" for="username">
                            Birthday
                        </label>
                        <v-date-picker v-model="elementEdit.birthDay">
                            <template v-slot="{ inputValue, inputEvents }">
                                <input
                                    class="bg-white shadow appearance-none border py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    mode="date"
                                />
                            </template>
                        </v-date-picker>
                    </div>
                    <div class="flex justify-between items-center w-full gap-4">
                        <label class="block text-gray-700 text-sm font-bold w-[20%]" for="username">
                            school
                        </label>
                        <div class="relative text-sm w-[80%]">
                            <button
                                class="flex items-center justify-between px-3 py-2 bg-white w-full rounded border shadow"
                                @click="isOptionsExpanded = !isOptionsExpanded"
                                @blur="isOptionsExpanded = false"
                            >
                                <span>{{ selectedOption }}</span>
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
                                    :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <transition
                                enter-active-class="transform transition duration-500 ease-custom"
                                enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                leave-active-class="transform transition duration-300 ease-custom"
                                leave-class="translate-y-0 scale-y-100 opacity-100"
                                leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
                            >
                                <ul
                                    v-show="isOptionsExpanded"
                                    class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
                                >
                                    <li
                                        v-for="(option, index) in options"
                                        :key="index"
                                        class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                                        @mousedown.prevent="setOption(option)"
                                    >
                                        {{ option }}
                                    </li>
                                </ul>
                            </transition>
                        </div>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div class="bg-gray-200 px-4 py-3 text-right">
                    <button
                        type="button"
                        class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                        @click="openModal()"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                        @click="updateRow()"
                    >
                        Update
                    </button>
                </div>
            </div>
            <!-- Modal Footer -->
        </div>
        <div class="mx-auto container max-w-xl">
            <h1 v-if="isClicked">{{ dataTable }}</h1>
        </div>
    </div>
</template>

<script>
import StepFour from "./components/StepFour.vue";
import StepOne from "./components/StepOne.vue";
import StepThree from "./components/StepThree.vue";
import StepTwo from "./components/StepTwo.vue";
import { mapGetters } from "vuex";

export default {
    components: { StepOne, StepTwo, StepThree, StepFour },
    data() {
        return {
            dataTable: [],
            clicked: false,
            elementEdit: { fullName: null, birthDay: null, school: null, id: null },
            isOptionsExpanded: false,
            selectedOption: "Little Bee Preschool",
            options: [
                "Little Bee Preschool",
                "Education is Power",
                "The Education Key",
                "Lifetime Learning",
                "Oceans of Knowledge",
            ],
            isClicked: false,
        };
    },
    mounted() {
        this.dataTable = this.data_table;
    },
    computed: {
        ...mapGetters(["data_table"]),
    },
    methods: {
        fillModal(el) {
            // this.$store.dispatch("updateFromDataTable", el);
            this.openModal();
            this.elementEdit = { ...el };
            this.selectedOption = this.elementEdit.school;
        },
        deleteRow(el) {
            this.$store.dispatch("deleteFromDataTable", el);
        },
        updateRow() {
            this.$store.dispatch("updateFromDataTable", this.elementEdit);
            this.clicked = !this.clicked;
        },
        openModal() {
            this.clicked = !this.clicked;
        },
        setOption(option) {
            this.selectedOption = option;
            this.isOptionsExpanded = false;
        },
    },
};
</script>

<style>
.ease-custom {
    transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
