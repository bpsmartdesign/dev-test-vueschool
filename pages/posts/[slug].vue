<script lang="ts" setup>
import DOMPurify from "dompurify";

const { params } = useRoute();
const router = useRouter();

const postId = computed(() => params?.slug);

const {
  data: post,
  pending: loadingPost,
  error,
} = useFetch(`/api/posts/${postId.value}`, {
  method: "get",
  watch: false,
  query: {
    include: "user",
    select:
      "id,title,excerpt,publishedAt,image,content,user.firstName,user.lastName,user.avatar,user.email",
  },
  onResponseError() {
    router.push("/404");
  },
});

console.log("error: ", error.value);
</script>

<template>
  <div v-if="false" class="h-screen flex justify-center items-center">
    <div>
      <h1 class="text-2xl">Display the Individual Post Here</h1>
      <ul class="list-disc list-inside ml-10">
        <li>Keep seo in mind</li>
        <li>Make sure to display optimized images</li>
        <li>Make it look good 💪</li>
      </ul>
    </div>
  </div>
  <PostLoaderArticle v-if="loadingPost" />
  <main v-else class="max-w-screen-md mx-auto py-12">
    <template v-if="post">
      <h2
        class="font-bold text-4xl text-gray-800 tracking-normal leading-relaxed"
      >
        {{ post?.title }}
      </h2>
      <p
        class="border-l-4 border-gray-300 pl-4 bg-gray-100 text-sm text-gray-600 italic p-2 mb-4"
      >
        {{ post?.excerpt }}
      </p>
      <div class="relative">
        <div
          class="absolute left-0 bottom-0 w-full h-full z-10 bg-[linear-gradient(_180deg,_transparent,_rgba(0,_0,_0,_0.7)_)]"
        ></div>
        <NuxtImg
          :src="post?.image ?? undefined"
          :alt="post?.title ?? 'Post Image'"
          class="w-full"
          format="jpg"
          quality="80"
          fit="cover"
          loading="lazy"
        />
        <div class="p-4 absolute w-full bottom-0 left-0 z-20">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <NuxtImg
                width="60"
                height="60"
                quality="80"
                format="jpg"
                fit="cover"
                loading="lazy"
                class="rounded-full border border-gray-100"
                :placeholder="[40, 25, 75, 5]"
                :src="post?.user?.avatar ?? undefined"
                :alt="post?.user?.firstName ?? 'User avatar'"
              />
              <div class="flex flex-col">
                <h2 class="text-sm tracking-tighter text-white">
                  by
                  <b class="text-orange-500 text-lg underline">
                    {{ `${post?.user?.firstName} ${post?.user?.lastName}` }}
                  </b>
                </h2>
                <span class="text-xs text-gray-300">
                  {{ post?.user?.email }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span
                class="text-gray-200 hover:text-orange-500 cursor-pointer duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m20.975 12.185l-.739-.128l.74.128Zm-.705 4.08l-.74-.128l.74.128ZM6.938 20.477l-.747.065l.747-.065Zm-.812-9.393l.747-.064l-.747.064Zm7.869-5.863l.74.122l-.74-.122Zm-.663 4.045l.74.121l-.74-.121Zm-6.634.411l-.49-.568l.49.568Zm1.439-1.24l.49.569l-.49-.568Zm2.381-3.653l-.726-.189l.726.189Zm.476-1.834l.726.188l-.726-.188Zm1.674-.886l-.23.714l.23-.714Zm.145.047l.229-.714l-.23.714ZM9.862 6.463l.662.353l-.662-.353Zm4.043-3.215l-.726.188l.726-.188Zm-2.23-1.116l-.326-.675l.325.675Zm8.561 9.925l-.705 4.08l1.478.256l.705-4.08l-1.478-.256Zm-6.991 9.193H8.596v1.5h4.649v-1.5Zm-5.56-.837l-.812-9.393l-1.495.129l.813 9.393l1.494-.13Zm11.846-4.276c-.507 2.93-3.15 5.113-6.286 5.113v1.5c3.826 0 7.126-2.669 7.764-6.357l-1.478-.256ZM13.255 5.1l-.663 4.045l1.48.242l.663-4.044l-1.48-.243Zm-6.067 5.146l1.438-1.24l-.979-1.136L6.21 9.11l.979 1.136Zm4.056-5.274l.476-1.834l-1.452-.376l-.476 1.833l1.452.377Zm1.194-2.194l.145.047l.459-1.428l-.145-.047l-.459 1.428Zm-1.915 4.038a8.378 8.378 0 0 0 .721-1.844l-1.452-.377A6.878 6.878 0 0 1 9.2 6.11l1.324.707Zm2.06-3.991a.885.885 0 0 1 .596.61l1.452-.376a2.384 2.384 0 0 0-1.59-1.662l-.458 1.428Zm-.863.313a.514.514 0 0 1 .28-.33l-.651-1.351c-.532.256-.932.73-1.081 1.305l1.452.376Zm.28-.33a.596.596 0 0 1 .438-.03l.459-1.428a2.096 2.096 0 0 0-1.548.107l.65 1.351Zm2.154 8.176h5.18v-1.5h-5.18v1.5Zm.581-5.641a5.533 5.533 0 0 0-.104-2.284l-1.452.377a4.03 4.03 0 0 1 .076 1.664l1.48.243ZM8.596 21.25a.916.916 0 0 1-.911-.837l-1.494.129a2.416 2.416 0 0 0 2.405 2.208v-1.5Zm.03-12.244c.68-.586 1.413-1.283 1.898-2.19L9.2 6.109c-.346.649-.898 1.196-1.553 1.76l.98 1.137Zm13.088 3.307a2.416 2.416 0 0 0-2.38-2.829v1.5c.567 0 1 .512.902 1.073l1.478.256Zm-9.122-3.168a1.583 1.583 0 0 0 1.562 1.84v-1.5a.083.083 0 0 1-.082-.098l-1.48-.242Zm-5.72 1.875a.918.918 0 0 1 .316-.774l-.98-1.137a2.418 2.418 0 0 0-.83 2.04l1.495-.13Z"
                  />
                  <path
                    fill="currentColor"
                    d="m3.972 21.47l-.748.066l.748-.065ZM3 10.235l.747-.064a.75.75 0 0 0-1.497.064H3Zm1.719 11.172L3.747 10.17l-1.494.129l.971 11.236l1.495-.129Zm-.969.107v-11.28h-1.5v11.279h1.5Zm-.526.022a.263.263 0 0 1 .263-.285v1.5c.726 0 1.294-.622 1.232-1.344l-1.495.13Zm.263-.285c.146 0 .263.119.263.263h-1.5c0 .682.553 1.237 1.237 1.237v-1.5Z"
                    opacity=".5"
                  />
                </svg>
              </span>
              <span
                class="text-gray-200 hover:text-orange-500 cursor-pointer duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 11.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
                    <path
                      stroke-linecap="round"
                      d="M14.32 16.802L9 13.29m5.42-6.45L9.1 10.35"
                      opacity=".5"
                    />
                    <path
                      d="M19 18.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"
                    />
                  </g>
                </svg>
              </span>
              <span
                class="text-gray-200 hover:text-orange-500 cursor-pointer duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" stroke-width="1.5">
                    <path
                      d="M21 16.09v-4.992c0-4.29 0-6.433-1.318-7.766C18.364 2 16.242 2 12 2C7.757 2 5.636 2 4.318 3.332C3 4.665 3 6.81 3 11.098v4.993c0 3.096 0 4.645.734 5.321c.35.323.792.526 1.263.58c.987.113 2.14-.907 4.445-2.946c1.02-.901 1.529-1.352 2.118-1.47c.29-.06.59-.06.88 0c.59.118 1.099.569 2.118 1.47c2.305 2.039 3.458 3.059 4.445 2.945c.47-.053.913-.256 1.263-.579c.734-.676.734-2.224.734-5.321Z"
                    />
                    <path stroke-linecap="round" d="M15 6H9" opacity=".5" />
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between gap-4 border-b border-gray-200 py-4"
      >
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
            {{ relativeDate(post?.publishedAt ?? undefined) }}
          </span>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M9.25 2.75A.75.75 0 0 1 10 2h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
            <path
              fill="currentColor"
              d="M12 23a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"
              opacity=".5"
            />
            <path
              fill="currentColor"
              d="M13.026 11.275a14.502 14.502 0 0 0-.784-.508c-1.073-.652-1.609-.978-2.09-.617c-.48.36-.524 1.116-.612 2.628c-.024.427-.04.846-.04 1.222s.016.795.04 1.222c.088 1.512.132 2.267.612 2.628c.481.361 1.018.035 2.09-.617c.278-.169.547-.341.784-.508c.27-.19.565-.418.862-.66C14.963 15.188 15.5 14.75 15.5 14s-.537-1.188-1.612-2.065c-.297-.242-.591-.47-.862-.66Z"
            />
          </svg>
          <span>3 min read</span>
        </div>
      </div>
      <article
        class="py-4 prose max-w-full text-gray-600"
        v-html="DOMPurify?.sanitize(post?.content)"
      />
    </template>
  </main>
</template>
