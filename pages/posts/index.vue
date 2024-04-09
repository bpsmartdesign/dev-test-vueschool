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

const parseDate = (timestamp?: number) => {
  if (timestamp) return new Date(timestamp).toLocaleString("en-US");
};
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
  <div class="container mx-auto py-12">
    <div
      v-if="pending"
      class="text-lg h-screen flex justify-center items-center"
    >
      Loading ...
    </div>
    <template v-else>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="bg-white shadow-2xl rounded-lg mb-6 tracking-wide cursor-pointer"
        >
          <NuxtImg
            :src="post.image ?? undefined"
            :alt="post.title ?? 'Post Image'"
            class="w-full h-48 rounded-lg rounded-b-none"
          />
          <div class="p-4">
            <h2 class="font-bold text-xl text-gray-800 tracking-normal">
              {{ post.title }}
            </h2>
            <p class="text-sm text-gray-600 italic pt-2 pb-4">
              {{ post.excerpt }}
            </p>
            <div class="flex items-center gap-2">
              <NuxtImg
                width="50"
                height="50"
                quality="80"
                fit="cover"
                loading="lazy"
                class="rounded-md"
                :placeholder="[50, 25, 75, 5]"
                :src="post.user?.avatar ?? undefined"
                :alt="post.user?.firstName ?? 'User avatar'"
              />
              <div class="flex flex-col gap-1">
                <h2 class="text-sm tracking-tighter text-gray-900">
                  by
                  <b class="underline">
                    {{ `${post.user?.firstName} ${post.user?.lastName}` }}
                  </b>
                </h2>
                <span class="text-xs text-gray-400">{{
                  parseDate(post.publishedAt ?? undefined)
                }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
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
