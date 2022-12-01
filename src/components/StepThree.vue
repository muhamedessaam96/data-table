<template>
    <div class="flex flex-col">
        <div class="bg-[#f1f1f1] p-6 rounded-lg w-[500px]">
            <div class="flex justify-between items-center w-full gap-4">
                <label class="block text-gray-700 text-sm font-bold w-[20%]" for="username">
                    school
                </label>
                <div class="relative text-sm w-[80%]">
                    <button
                        class="flex items-center justify-between px-3 py-2 bg-white w-full rounded"
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
            isOptionsExpanded: false,
            selectedOption: "Little Bee Preschool",
            options: [
                "Little Bee Preschool",
                "Education is Power",
                "The Education Key",
                "Lifetime Learning",
                "Oceans of Knowledge",
            ],
        };
    },
    methods: {
        setOption(option) {
            this.selectedOption = option;
            this.isOptionsExpanded = false;
        },
        next() {
            this.$store.commit("udpateSchool", this.selectedOption);
            this.$store.state.step++;
        },
    },
};
</script>

<style>
.ease-custom {
    transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
