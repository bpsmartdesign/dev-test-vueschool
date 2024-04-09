<script setup lang="ts">
import type { PostWithUser } from "~/types";

export interface PostCardProps {
  post: any;
}

const props = withDefaults(defineProps<PostCardProps>(), {
  post: undefined,
});

const parseDate = (timestamp?: number) => {
  if (timestamp) return new Date(timestamp).toLocaleString("en-US");
};
</script>

<template>
  <NuxtLink
    :to="`/posts/${props.post?.id}`"
    class="bg-white shadow-2xl rounded-lg mb-6 tracking-wide cursor-pointer"
  >
    <NuxtImg
      :src="props.post?.image ?? undefined"
      :alt="props.post?.title ?? 'Post Image'"
      class="w-full h-48 rounded-lg rounded-b-none"
      format="jpg"
      quality="80"
      fit="cover"
      loading="lazy"
    />
    <div class="p-4">
      <h2 class="font-bold text-xl text-gray-800 tracking-normal">
        {{ props.post?.title }}
      </h2>
      <p class="text-sm text-gray-600 italic pt-2 pb-4">
        {{ props.post?.excerpt }}
      </p>
      <div class="flex items-center gap-2">
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
        <div class="flex flex-col gap-1">
          <h2 class="text-sm tracking-tighter text-gray-900">
            by
            <b class="underline">
              {{
                `${props.post?.user?.firstName} ${props.post?.user?.lastName}`
              }}
            </b>
          </h2>
          <span class="text-xs text-gray-400">{{
            parseDate(props.post?.publishedAt ?? undefined)
          }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
