<!-- app/components/home/ClubBanner.vue -->
<template>
  <section class="w-full mx-auto container md:pb-10">
    <div class="relative">
      <div
        class="absolute -top-3.5 right-6 md:right-14 w-11 h-11 md:w-16 md:h-16 rounded-full bg-[#46237A] opacity-90 blur-[1px] -z-10 pointer-events-none"
      />

      <div
        class="absolute -bottom-3.5 left-6 md:left-14 w-11 h-11 md:w-16 md:h-16 rounded-full bg-[#46237A] opacity-90 blur-[1px] -z-10 pointer-events-none"
      />

      <div
        class="relative w-full bg-[#F6F3FC]/45 backdrop-blur-md border border-white/70 rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_8px_30px_rgb(70,35,122,0.07)] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-6"
      >
        <div
          class="w-full lg:w-auto flex flex-col items-center text-center lg:items-start lg:text-right"
        >
          <div
            class="flex items-center justify-between w-full lg:justify-start lg:gap-4"
          >
            <div
              class="shrink-0 w-11 h-11 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center"
            >
              <img
                src="/images/club-diamond.svg"
                alt="باشگاه مشتریان سرمه"
                class="w-full h-full object-contain filter drop-shadow-sm select-none"
              />
            </div>

            <h2
              class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#451877] tracking-tight whitespace-nowrap mx-2 lg:mx-0"
            >
              باشگاه مشتریان سرمه
            </h2>

            <div
              class="shrink-0 w-11 h-11 sm:w-14 sm:h-14 lg:hidden flex items-center justify-center"
            >
              <img
                src="/images/club-diamond.svg"
                alt=""
                class="w-full h-full object-contain filter drop-shadow-sm select-none"
              />
            </div>
          </div>

          <p
            class="text-gray-500 text-xs sm:text-sm lg:text-base mt-1 sm:mt-1.5 font-medium leading-relaxed"
          >
            با هر فعالیت امتیاز بگیر، لول آپ و جوایز هیجان انگیز برنده شو!
          </p>
        </div>

        <div
          class="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 w-full lg:w-auto justify-items-center"
        >
          <button
            type="button"
            class="group w-full max-w-[125px] h-24 sm:w-32 sm:h-32 bg-[#D9D1F0]/80 hover:bg-[#CFBFE8] backdrop-blur-sm rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 p-2 transition-all duration-200 cursor-pointer"
          >
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              <img
                src="/icons/lucky-wheel.svg"
                alt="چرخ و بخت"
                class="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                onerror="
                  this.style.display = 'none';
                  this.nextElementSibling.style.display = 'block';
                "
              />
              <svg
                class="w-7 h-7 sm:w-8 sm:h-8 hidden text-black stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="3"
                  stroke="currentColor"
                />
                <circle cx="12" cy="12" r="5" stroke="currentColor" />
                <line x1="12" y1="3" x2="12" y2="7" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <line x1="3" y1="12" x2="7" y2="12" />
                <line x1="17" y1="12" x2="21" y2="12" />
              </svg>
            </div>
            <span
              class="text-xs sm:text-sm font-bold text-gray-800 text-center"
            >
              چرخ و بخت
            </span>
          </button>

          <button
            type="button"
            class="group w-full max-w-[125px] h-24 sm:w-32 sm:h-32 bg-[#D9D1F0]/80 hover:bg-[#CFBFE8] backdrop-blur-sm rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 p-2 transition-all duration-200 cursor-pointer"
          >
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              <img
                src="/icons/reward-medal.svg"
                alt="جوایز مخصوص"
                class="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                onerror="
                  this.style.display = 'none';
                  this.nextElementSibling.style.display = 'block';
                "
              />
              <svg
                class="w-7 h-7 sm:w-8 sm:h-8 hidden text-black stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <circle cx="12" cy="8" r="6" stroke="currentColor" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.21 13.89L7 21l5-3 5 3-1.21-7.11"
                />
              </svg>
            </div>
            <span
              class="text-xs sm:text-sm font-bold text-gray-800 text-center"
            >
              جوایز مخصوص
            </span>
          </button>

          <button
            type="button"
            class="group w-full max-w-[125px] h-24 sm:w-32 sm:h-32 bg-[#D9D1F0]/80 hover:bg-[#CFBFE8] backdrop-blur-sm rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 p-2 transition-all duration-200 cursor-pointer"
          >
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              <img
                src="/icons/mission-checkbox.svg"
                alt="ماموریت ها"
                class="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                onerror="
                  this.style.display = 'none';
                  this.nextElementSibling.style.display = 'block';
                "
              />
              <svg
                class="w-7 h-7 sm:w-8 sm:h-8 hidden text-black stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4"
                />
              </svg>
            </div>
            <span
              class="text-xs sm:text-sm font-bold text-gray-800 text-center"
            >
              ماموریت ها
            </span>
          </button>
        </div>

        <div class="w-full lg:w-auto shrink-0">
          <div
            class="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm border border-purple-50 flex flex-row lg:flex-col items-center justify-between lg:justify-center text-right lg:text-center w-full lg:min-w-[190px]"
          >
            <div class="flex flex-col items-end lg:items-center">
              <div
                class="text-[#4C2082] font-bold text-sm sm:text-base lg:text-xl tracking-tight mb-0.5 lg:mb-1"
              >
                ۱۰۰ امتیاز هدیه
              </div>
              <div
                class="text-gray-500 text-xs sm:text-xs lg:text-sm font-medium lg:mb-3.5"
              >
                برای شروع(ثبت نام)
              </div>
            </div>

            <NuxtLink
              @click="navigateTo('/panel/sormeh')"
              class="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#9B87CE] hover:bg-[#8871C3] text-white text-xs sm:text-sm font-bold py-1.5 px-4 sm:py-2 sm:px-6 rounded-xl sm:rounded-full transition-all duration-200 shadow-sm shrink-0 cursor-pointer"
            >
              <span>عضویت</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
