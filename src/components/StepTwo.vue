<template>
    <div class="flex flex-col">
        <div>
            <div class="bg-[#f1f1f1] p-6 rounded-lg w-[500px]">
                <div class="flex justify-between gap-2 items-center">
                    <label class="block text-gray-700 text-sm font-bold w-[20%]" for="username">
                        Birthday
                    </label>
                    <v-date-picker v-model="date">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                                class="bg-white shadow appearance-none border py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
                                :value="inputValue"
                                v-on="inputEvents"
                                :minDate="new Date(1980, 1, 1)"
                                :maxDate="new Date(2000, 1, 1)"
                            />
                        </template>
                    </v-date-picker>
                </div>
            </div>
        </div>

        <div class="flex justify-end gap-3 mt-3">
            <button
                @click="$store.state.step--"
                class="bg-gray-700 text-white p-2 px-4 rounded-md hover:bg-gray-800"
            >
                back
            </button>
            <button
                @click="next()"
                class="bg-gray-700 text-white p-2 px-4 rounded-md hover:bg-gray-800"
            >
                next
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: new Date(),
        };
    },
    methods: {
        next() {
            this.$store.commit("udpateBirthDay", this.date.toISOString());
            this.$store.state.step++;
        },
    },
};
</script>

<style></style>
