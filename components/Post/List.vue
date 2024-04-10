<script setup lang="ts">
export interface PostCardProps {
  post: any;
}

const props = withDefaults(defineProps<PostCardProps>(), {
  post: undefined,
});
</script>

<template>
  <NuxtLink
    :to="`/posts/${props.post?.id}`"
    class="group flex items-center justify-between gap-4 bg-white shadow-xl rounded-lg tracking-wide cursor-pointer p-2 border border-transparent hover:border-indigo-400"
  >
    <NuxtImg
      :src="props.post?.image ?? undefined"
      :alt="props.post?.title ?? 'Post Image'"
      class="h-20 rounded-lg"
      format="jpg"
      quality="80"
      fit="cover"
      loading="lazy"
    />
    <div class="w-full">
      <h2 class="font-bold text-xl text-gray-800 tracking-normal">
        {{ props.post?.title }}
      </h2>
      <p class="peer mb-2 text-gray-600">
        {{ props.post?.excerpt }}
      </p>
      <div class="flex items-center gap-2 text-xs text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.96 2c.418 0 .756.31.756.692V4.09c.67-.012 1.422-.012 2.268-.012h4.032c.846 0 1.597 0 2.268.012V2.692c0-.382.338-.692.756-.692s.756.31.756.692V4.15c1.45.106 2.403.368 3.103 1.008c.7.641.985 1.513 1.101 2.842v1H2V8c.116-1.329.401-2.2 1.101-2.842c.7-.64 1.652-.902 3.103-1.008V2.692c0-.382.339-.692.756-.692"
          />
          <path
            fill="currentColor"
            d="M22 14v-2c0-.839-.013-2.335-.026-3H2.006c-.013.665 0 2.161 0 3v2c0 3.771 0 5.657 1.17 6.828C4.349 22 6.234 22 10.004 22h4c3.77 0 5.654 0 6.826-1.172C22 19.657 22 17.771 22 14"
            opacity=".5"
          />
          <path
            fill="currentColor"
            d="M18 16.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
          />
        </svg>
        <span>
          {{ relativeDate(props.post?.publishedAt ?? undefined) }}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-2 w-1/5">
      <NuxtImg
        width="40"
        height="40"
        quality="80"
        format="jpg"
        fit="cover"
        loading="lazy"
        class="rounded-md"
        :placeholder="[40, 25, 75, 5]"
        :src="props.post?.user?.avatar ?? undefined"
        :alt="props.post?.user?.firstName ?? 'User avatar'"
      />
      <div class="flex flex-col gap-1 overflow-hidden">
        <h2 class="text-sm tracking-tighter text-gray-900">
          by
          <b class="underline">
            {{ `${props.post?.user?.firstName} ${props.post?.user?.lastName}` }}
          </b>
        </h2>
        <span class="text-xs text-gray-400 truncate">
          {{ props.post?.user?.email }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
