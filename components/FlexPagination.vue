<script setup lang="ts">
export interface FlexPaginationProps {
  itemPerPage: number;
  totalItems: number;
  currentPage?: number;
  maxLinksDisplayed?: number;
}
export interface FlexPaginationEmits {
  (e: "update:currentPage", currentPage: number): void;
}

const emits = defineEmits<FlexPaginationEmits>();
const props = withDefaults(defineProps<FlexPaginationProps>(), {
  currentPage: 1,
  maxLinksDisplayed: 4,
});

const lastPage = computed(
  () => Math.ceil(props.totalItems / props.itemPerPage) || 1
);
const showLastLink = computed(() => lastPage.value > 1);
const totalPageDisplayed = computed(() =>
  lastPage.value > props.maxLinksDisplayed + 2
    ? props.maxLinksDisplayed + 2
    : lastPage.value
);
const pages = computed(() => {
  const _pages = [];
  let firstButton =
    props.currentPage - Math.floor(totalPageDisplayed.value / 2);
  let lastButton =
    firstButton +
    (totalPageDisplayed.value - Math.ceil(totalPageDisplayed.value % 2));

  if (firstButton < 1) {
    firstButton = 1;
    lastButton = firstButton + (totalPageDisplayed.value - 1);
  }

  if (lastButton > lastPage.value) {
    lastButton = lastPage.value;
    firstButton = lastButton - (totalPageDisplayed.value - 1);
  }

  for (let page = firstButton; page <= lastButton; page += 1) {
    if (page === firstButton || page === lastButton) {
      continue;
    }

    _pages.push(page);
  }

  return _pages;
});

const handleLinkClick = (e: MouseEvent, page = 1) => {
  e.preventDefault();
  e.stopPropagation();

  const _page = Math.max(1, Math.min(page, lastPage.value));
  emits("update:currentPage", _page);
};
</script>

<template>
  <nav
    role="navigation"
    class="w-full flex items-center justify-between gap-4"
    aria-label="pagination"
  >
    <ul class="inline-flex space-x-2">
      <li
        tabindex="0"
        class="w-10 h-10 flex items-center justify-center cursor-pointer text-xs text-indigo-600 rounded-full border border-indigo-200 hover:border-indigo-100 hover:bg-indigo-100 focus:shadow-outline duration-150"
        aria-label="Go to page 1"
        :class="[
          currentPage === 1 &&
            'bg-indigo-600 border-none text-white shadow-lg hover:bg-indigo-500',
        ]"
        @keydown.space.prevent="(e: any) => (e.target as HTMLAnchorElement).click()"
        @click="(e: any) => handleLinkClick(e, 1)"
      >
        1
      </li>

      <li
        v-if="
          showLastLink &&
          (pages.length === 0 || pages[0] > 2) &&
          pages.length > 5
        "
        class="w-10 h-10 flex items-center justify-center text-xs text-indigo-600"
      >
        ...
      </li>

      <li
        v-for="page in pages"
        :key="page"
        tabindex="0"
        class="w-10 h-10 flex items-center justify-center cursor-pointer text-xs text-indigo-600 rounded-full border border-indigo-200 hover:border-indigo-100 hover:bg-indigo-100 focus:shadow-outline duration-150"
        :aria-label="`Go to page ${page}`"
        :aria-current="currentPage === page ? 'page' : undefined"
        :class="[
          currentPage === page &&
            'bg-indigo-600 border-none text-white shadow-lg hover:bg-indigo-500',
        ]"
        @keydown.space.prevent="(e: any) => (e.target as HTMLAnchorElement).click()"
        @click="(e: any) => handleLinkClick(e, page)"
      >
        {{ page }}
      </li>

      <li
        v-if="showLastLink && pages[pages.length - 1] < lastPage - 1"
        class="w-10 h-10 flex items-center justify-center text-xs text-indigo-600"
      >
        ...
      </li>

      <li
        v-if="showLastLink"
        tabindex="0"
        class="w-10 h-10 flex items-center justify-center cursor-pointer text-xs text-indigo-600 rounded-full border border-indigo-200 hover:border-indigo-100 hover:bg-indigo-100 focus:shadow-outline duration-150"
        :aria-label="`Go to page ${lastPage}`"
        :class="[
          currentPage === lastPage &&
            'bg-indigo-600 border-none text-white shadow-lg hover:bg-indigo-500',
        ]"
        @keydown.space.prevent="(e: any) => (e.target as HTMLAnchorElement).click()"
        @click="(e: any) => handleLinkClick(e, lastPage)"
      >
        {{ lastPage }}
      </li>
    </ul>

    <ul class="inline-flex space-x-2">
      <li
        tabindex="0"
        class="w-10 h-10 flex items-center justify-center cursor-pointer text-xs text-indigo-600 rounded-full hover:bg-indigo-100 focus:shadow-outline duration-150"
        @keydown.space.prevent="(e: any) => (e.target as HTMLAnchorElement).click()"
        @click="(e: any) => handleLinkClick(e, currentPage - 1)"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </li>
      <li
        tabindex="0"
        class="w-10 h-10 flex items-center justify-center cursor-pointer text-xs text-indigo-600 rounded-full hover:bg-indigo-100 focus:shadow-outline duration-150"
        @keydown.space.prevent="(e: any) => (e.target as HTMLAnchorElement).click()"
        @click="(e: any) => handleLinkClick(e, currentPage + 1)"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </li>
    </ul>
  </nav>
</template>
