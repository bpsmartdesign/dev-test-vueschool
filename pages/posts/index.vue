<script lang="ts" setup>
import type { Pagination } from "~/types";

const pagination = ref<Pagination>({ currentPage: 2, perPage: 12, total: 0 });

const offset = computed(
  () => (pagination.value.currentPage - 1) * pagination.value.perPage
);
const { refresh: countPosts } = useFetch("/api/posts/count", {
  method: "get",
  immediate: false,
  watch: false,
  onResponse({ response }) {
    pagination.value.total = response._data?.count ?? 0
  },
});
const {
  error,
  data: posts,
  pending,
  refresh: listPosts,
} = useFetch("/api/posts", {
  method: "get",
  immediate: false,
  watch: false,
  query: {
    limit: pagination.value.perPage,
    offset,
    inclue: "user",
    select: "title",
  },
  onResponse({ response }) {
    // Process the response data
    console.log(": ", response);
  },
});
const onChangePage = async (page: number) => {
  pagination.value.currentPage = page;
  await getPosts();
};
const getPosts = async () => {
  await listPosts();

  if (error.value) {
    console.error("an error has occured: ", error.value);
  }
};

onMounted(async () => {
  await countPosts();
  await getPosts();
});
</script>

<template>
  <div v-if="false" class="h-screen flex justify-center items-center">
    <div>
      <h1 class="text-2xl">Display The Paginated Posts Here</h1>
      <ul class="list-disc list-inside ml-10">
        <li>Keep performance in mind</li>
        <li>Make sure to display optimized images</li>
        <li>Paginate according to your desired strategy</li>
        <li>Provide a sort order control</li>
        <li>Store the sort order in the URL</li>
        <li>Make it look good 💪</li>
        <li>
          Then
          <NuxtLink class="text-blue-500 underline" to="/posts/hello">
            go to the next task (displaying the individual post)</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="h-screen items-center grid grid-cols-3">
    <div v-if="pending" class="text-lg">Loading ...</div>
  </div>
</template>
