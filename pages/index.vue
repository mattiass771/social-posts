<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
const description = ref('');
const image = ref(undefined);
const message = ref('');
const isLoading = ref(false);

const submitPost = async (): Promise<void> => {
  console.log('Title:', title.value);
  console.log('Description:', description.value);

  // Set isLoading to true while waiting for the response
  isLoading.value = true;

  try {
    // Fetch the message from the API
    const { data } = await useFetch('/api/chat-completion', {
      method: 'POST',
      body: { description: description.value, title: title.value },
    });
    // @ts-ignore
    message.value = data.value.message;
    // @ts-ignore
    image.value = data.value.image
  } finally {
    // Set isLoading back to false after the response is received
    isLoading.value = false;
  }
};
</script>

<style scoped>
.bg-accent {
    background-color: #41b883;
}

.bg-accent-light {
    background-color: #63d5a3;
}
</style>

<template>
    <div class="min-h-screen bg-gray-100 flex items-center">
        <div class="container mx-auto px-4">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
                <h2 class="text-2xl font-bold text-center mb-6">Create a Social Media Post</h2>
                <form @submit.prevent="submitPost" class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                            Title
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title" v-model="title" type="text" placeholder="Enter post title" />
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                            Description
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                            id="description" v-model="description" placeholder="Enter post description"></textarea>
                    </div>
                    <div class="flex items-center justify-center">
                        <button
                            v-if="!isLoading"
                            class="bg-accent hover:bg-accent-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            @click="submitPost"
                        >
                            Submit
                        </button>
                        <div v-else class="loader w-6 h-6 text-accent"></div>
                    </div>
                </form>
            </div>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 mx-auto" v-if="message">
            <div class="space-y-4">
                <div v-if="image" class="text-center">
                    <img class="w-full h-64 object-cover rounded-md mb-4" :src="image" alt="Social media card preview image">
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-2">{{ title }}</h2>
                    <p class="text-gray-700 whitespace-pre-line">{{ message }}</p>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.bg-accent {
  background-color: #41b883;
}
.bg-accent-light {
  background-color: #63d5a3;
}
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #41b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>