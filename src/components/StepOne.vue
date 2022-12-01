<template>
    <div class="flex flex-col">
        <div class="bg-[#f1f1f1] p-6 rounded-lg w-[500px]">
            <div class="flex justify-between gap-2 items-center">
                <label class="block text-gray-700 text-sm font-bold w-[20%]" for="fullname">
                    Full name
                </label>
                <input
                    class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fullname"
                    type="text"
                    placeholder="Full name"
                    v-model="fullName"
                />
            </div>
        </div>
        <div class="flex justify-end mt-3">
            <button
                class="bg-gray-700 text-white p-2 px-4 rounded-md hover:bg-gray-800"
                @click="next()"
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
            fullName: null,
        };
    },
    methods: {
        next() {
            if (this.fullName.length >= 4 && this.fullName.length <= 10) {
                this.$store.commit("udpateFullName", this.fullName);
                this.$store.state.step++;
            } else {
                alert("the full name must be have 4 - 10 letters");
            }
        },
    },
};
</script>

<style></style>
