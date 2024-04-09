<script lang="ts" setup>
import type { Pagination } from "~/types";

const pagination = ref<Pagination>({ currentPage: 1, perPage: 12, total: 0 });

const offset = computed(
  () => (pagination.value.currentPage - 1) * pagination.value.perPage
);

const { refresh: countPosts } = useFetch("/api/posts/count", {
  method: "get",
  immediate: false,
  watch: false,
  onResponse({ response }) {
    pagination.value.total = response._data?.count ?? 0;
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
    include: "user",
    order: "newestFirst",
    select:
      "id,title,excerpt,publishedAt,image,user.firstName,user.lastName,user.avatar,user.email",
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
  <div class="container py-12">
    <h1 class="text-5xl leading-relaxed font-sans text-center font-extrabold text-gray-800">
      Our Blog
    </h1>
    <h4
      class="text-lg leading-snug max-w-xl mx-auto text-center text-gray-500 mb-8"
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, deleniti
      vel sunt quos excepturi earum aspernatur perferendis.
    </h4>
    <div
      v-if="pending"
      class="text-lg h-screen flex justify-center items-center"
    >
      Loading ...
    </div>
    <template v-else>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <FlexPagination
        v-model:current-page="pagination.currentPage"
        :item-per-page="pagination.perPage"
        :total-items="pagination.total"
        :max-links-displayed="4"
        @update:current-page="onChangePage"
      />
    </template>
  </div>
</template>
