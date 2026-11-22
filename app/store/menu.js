// import { defineStore } from "pinia";
// import { ref } from "vue";
// import { useApi } from "~/composables/api/useApi";

// export const useCategoryStore = defineStore("category", () => {
//   const { getShopFilters } = useApi();
//   const menuItems = ref([]);
//   const filters = ref(null);
//   const loading = ref(false);
//   const isLoaded = ref(false);

//   const fetchMenuData = async ({ force = false } = {}) => {
//     if (menuItems.value.length > 0) return;
//     if (isLoaded.value && !force) return filters.value;
//     if (loading.value) return filters.value;

//     loading.value = true;
//     try {
//       const response = await getShopFilters();
//       filters.value = response;
//       const categories = response?.categories || [];
//       menuItems.value = categories.map((cat) => ({
//         id: cat.id,
//         label: cat.title,
//         link: `/products?category=${cat.slug}`,
//         subItems: cat.sub_categories
//           ? cat.sub_categories.map((subCat) => ({
//               id: subCat.id,
//               label: subCat.title,
//               link: `/products?category=${subCat.slug}`,
//             }))
//           : [],
//       }));
//       isLoaded.value = true;
//       return response;
//     } catch (error) {
//       console.error("❌ Failed to fetch menu data:", error);
//     } finally {
//       loading.value = false;
//     }
//   };
//   const fetchFilters = async ({ force = false } = {}) => {
//     if (isLoaded.value && !force) return filters.value;
//     await fetchMenuData({ force });
//     return filters.value;
//   };
//   const clear = () => {
//     filters.value = null;
//     menuItems.value = [];
//     isLoaded.value = false;
//   };
//   return {
//     menuItems,
//     filters,
//     loading,
//     isLoaded,
//     fetchMenuData,
//     fetchFilters,
//     clear,
//   };
// });

// app/store/menu.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api/useApi";

export const useCategoryStore = defineStore("category", () => {
  const { getShopFilters } = useApi();
  const menuItems = ref([]);
  const filters = ref(null);
  const loading = ref(false);
  const isLoaded = ref(false);

  // دو سطح (و بیشتر) زیرمنو
  const mapSubItems = (items) =>
    Array.isArray(items)
      ? items.map((subCat) => ({
          id: subCat.id,
          label: subCat.title,
          slug: subCat.slug,
          link: `/products?category=${subCat.slug}`,
          subItems: mapSubItems(subCat.sub_categories || subCat.children),
        }))
      : [];

  const fetchMenuData = async ({ force = false } = {}) => {
    if (menuItems.value.length > 0) return;
    if (isLoaded.value && !force) return filters.value;
    if (loading.value) return filters.value;

    loading.value = true;
    try {
      const response = await getShopFilters();
      filters.value = response;
      const categories = response?.categories || [];
      menuItems.value = categories.map((cat) => ({
        id: cat.id,
        label: cat.title,
        slug: cat.slug,
        link: `/products?category=${cat.slug}`,
        subItems: mapSubItems(cat.sub_categories || cat.children),
      }));
      isLoaded.value = true;
      return response;
    } catch (error) {
      console.error("❌ Failed to fetch menu data:", error);
    } finally {
      loading.value = false;
    }
  };

  const fetchFilters = async ({ force = false } = {}) => {
    if (isLoaded.value && !force) return filters.value;
    await fetchMenuData({ force });
    return filters.value;
  };

  const clear = () => {
    filters.value = null;
    menuItems.value = [];
    isLoaded.value = false;
  };

  return {
    menuItems,
    filters,
    loading,
    isLoaded,
    fetchMenuData,
    fetchFilters,
    clear,
  };
});
