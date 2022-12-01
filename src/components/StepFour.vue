<template>
    <div class="flex flex-col">
        <div class="bg-[#f1f1f1] p-6 rounded-lg w-[500px]">
            <div class="flex justify-between items-center gap-2 w-full">
                <label class="block text-gray-700 text-sm font-bold w-[20%]" for="id"> ID </label>
                <input
                    class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="id"
                    type="text"
                    placeholder="id"
                    v-model="id"
                />
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
                class="bg-gray-700 text-white p-2 px-4 rounded-md hover:bg-gray-800"
                @click="next()"
            >
                submit
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: null,
        };
    },
    methods: {
        next() {
            if (this.id.length === 4) {
                this.$store.commit("udpateId", this.id);
                this.$store.dispatch("SubmitDataTable");
                this.$store.state.step = this.$store.state.step - 3;
            } else {
                alert("id must be 4 digit");
            }
        },
    },
};
</script>

<style></style>
