<script lang="ts" setup>
import { seoMeta } from "~/data";
import type { Pagination } from "~/types";

const route = useRoute();
const router = useRouter();

const pagination = ref<Pagination>({ currentPage: 1, perPage: 12, total: 0 });
const blogView = ref<"grid" | "list">("grid");

const order = computed(
  () =>
    (route.query?.order &&
    ["newestFirst", "oldestFirst"].includes(route.query?.order as string)
      ? route.query.order
      : "newestFirst") ?? "newestFirst"
);
const offset = computed(
  () => (pagination.value.currentPage - 1) * pagination.value.perPage
);
const query = computed(() => ({
  limit: pagination.value.perPage,
  offset,
  order,
  include: "user",
  select:
    "id,title,excerpt,publishedAt,image,user.firstName,user.lastName,user.avatar,user.email",
}));

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
  query: query.value,
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
const toggleSort = async () => {
  const newOrder =
    order.value === "newestFirst" ? "oldestFirst" : "newestFirst";
  router.push({ query: { order: newOrder } });
  await getPosts();
};

onMounted(async () => {
  await countPosts();
  await getPosts();
});
useHead({
  title: "VueSchool Blog posts",
  meta: [
    ...seoMeta,
    {
      hid: "og:title",
      name: "og:title",
      content: "VueSchool Blog posts",
    },
  ],
  link: [
    { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ],
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
          <NuxtLink class="text-indigo-500 underline" to="/posts/hello">
            go to the next task (displaying the individual post)</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="container py-12">
    <h1
      class="text-5xl leading-relaxed font-sans text-center font-extrabold text-gray-800"
    >
      Our Blog
    </h1>
    <h4
      class="text-lg leading-snug max-w-xl mx-auto text-center text-gray-500 mb-8"
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, deleniti
      vel sunt quos excepturi earum aspernatur perferendis.
    </h4>
    <div class="flex justify-between items-center mb-4">
      <div
        class="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-md inline-flex"
      >
        <button
          id="grid"
          class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none border border-transparent hover:text-indigo-400 focus:text-indigo-400 rounded-l-md p-2"
          :class="[
            blogView === 'grid' &&
              'bg-white text-indigo-500 shadow-sm border-indigo-400',
          ]"
          @click="blogView = 'grid'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fill-current w-4 h-4 mr-2"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Grid</span>
        </button>
        <button
          id="list"
          class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none border border-transparent hover:text-indigo-400 focus:text-indigo-400 rounded-r-md p-2"
          :class="[
            blogView === 'list' &&
              'bg-white text-indigo-500 shadow-sm border-indigo-400',
          ]"
          @click="blogView = 'list'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fill-current w-4 h-4 mr-2"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <span>List</span>
        </button>
      </div>
      <button
        class="text-sm text-gray-500 inline-flex items-center gap-1 transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-400 focus:text-indigo-400 p-2"
        @click="toggleSort"
      >
        <svg
          v-if="order === 'newestFirst'"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.5"
          >
            <path d="M4 8h9" />
            <path d="M6 13h7" opacity=".7" />
            <path d="M8 18h5" opacity=".4" />
            <path stroke-linejoin="round" d="M17 20V4l3 4" />
          </g>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.5"
          >
            <path d="M4 16h9" />
            <path d="M6 11h7" opacity=".7" />
            <path d="M8 6h5" opacity=".3" />
            <path stroke-linejoin="round" d="M17 4v16l3-4" />
          </g>
        </svg>
        <span class="font-bold underline">
          Show {{ order === "newestFirst" ? "Oldest" : "Newest" }}
        </span>
      </button>
    </div>
    <template v-if="pending">
      <div
        v-if="blogView === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4"
      >
        <PostLoaderCard v-for="n in 4" :key="n" />
      </div>
      <div v-else class="flex flex-col gap-4 mb-4">
        <PostLoaderList v-for="n in 4" :key="n" />
      </div>
    </template>
    <template v-else>
      <div
        v-if="blogView === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4"
      >
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div v-else class="flex flex-col gap-4 mb-4">
        <PostList v-for="post in posts" :key="post.id" :post="post" />
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
