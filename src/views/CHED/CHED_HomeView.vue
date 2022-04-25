<template>
  <div class="w-full h-full">
    <div class="flex flex-row justify-evenly">
      <!-- Header -->'
      <!-- <div class="flex flex-row text-left space-x-4">
        <img src="@/assets/img/CHED_logo.png" class="h-28 w-28" />
        <div class="space-y-2">
          <div class="font-semibold text-2xl xxs:leading-tight">
            CHED Program Applications Management System
          </div>
          <p class="font-medium body-small">
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum. Et has minim elitr
            intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit
            quaerendum. At nam minimum ponderum. Est audiam animal molestiae te.
            Ex duo eripuit mentitum
          </p>
        </div>
      </div> -->
      <!-- FIRST BOX -->
      <div
        class="
          flex flex-col
          w-full
          p-8
          m-5
          bg-brand-white
          rounded-md
          shadow-lg
          justify-evenly
        "
      >
        <div class="flex flex-row items-center justify-between">
          <div>
            <svg class="icon" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"
              />
            </svg>
          </div>
          <div class="flex flex-col items-end space-y-1">
            <div class="text-3xl font-extrabold">12k</div>
            <div class="label-s uppercase text-grey-400">
              Higher Education Institutions
            </div>
          </div>
        </div>
        <hr class="m-3" />
        <div class="">
          <div class="carousel w-full">
            <div id="slide1-one" class="carousel-item relative w-full">
              <div class="grid grid-cols-2 w-full divide-x">
                <div class="">
                  <div class="font-bold text-lg">12</div>
                  <span class="label-s text-grey-400"> SUC </span>
                </div>
                <div class="">
                  <div class="font-bold text-lg">123</div>
                  <span class="label-s text-grey-400"> LUC </span>
                </div>
              </div>
              <div
                class="
                  absolute
                  flex
                  justify-between
                  transform
                  -translate-y-1/2
                  left-0
                  right-0
                  top-1/4
                "
              >
                <a href="#slide2-one" class="text-grey-200">❮</a>
                <a href="#slide2-one" class="text-grey-200">❯</a>
              </div>
            </div>
            <div id="slide2-one" class="carousel-item relative w-full">
              <div class="grid grid-cols-2 w-full divide-x">
                <div class="">
                  <div class="font-bold text-lg">12</div>
                  <span class="label-s text-grey-400"> PRIVATE </span>
                </div>
                <div class="">
                  <div class="font-bold text-lg">123</div>
                  <span class="label-s text-grey-400"> OGS </span>
                </div>
              </div>
              <div
                class="
                  absolute
                  flex
                  justify-between
                  transform
                  -translate-y-1/2
                  left-0
                  right-0
                  top-1/4
                "
              >
                <a href="#slide1-one" class="text-grey-200">❮</a>
                <a href="#slide1-one" class="text-grey-200">❯</a>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <!-- SECOND BOX -->
      <div
        class="
          flex flex-col
          w-full
          p-8
          my-5
          bg-brand-white
          rounded-md
          shadow-lg
          justify-evenly
        "
      >
        <div class="flex flex-row items-center justify-between space-x-20">
          <div>
            <svg class="icon" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"
              />
            </svg>
          </div>
          <div class="flex flex-col items-end space-y-1">
            <div class="text-3xl font-extrabold">12k</div>
            <div class="label-s uppercase text-grey-400">Total Account</div>
          </div>
        </div>
        <hr class="m-3" />
        <div class="">
          <div class="carousel w-full">
            <div id="slide1-two" class="carousel-item relative w-full">
              <div class="grid grid-cols-2 w-full divide-x">
                <div class="">
                  <div class="font-bold text-lg">12</div>
                  <span class="label-s text-grey-400"> HEIs </span>
                </div>
                <div class="">
                  <div class="font-bold text-lg">123</div>
                  <span class="label-s text-grey-400"> RQAT </span>
                </div>
              </div>
              <div
                class="
                  absolute
                  flex
                  justify-between
                  transform
                  -translate-y-1/2
                  left-0
                  right-0
                  top-1/4
                "
              >
                <a href="#slide2-two" class="text-grey-200">❮</a>
                <a href="#slide2-two" class="text-grey-200">❯</a>
              </div>
            </div>
            <div id="slide2-two" class="carousel-item relative w-full">
              <div class="w-full">
                <div class="font-bold text-lg">200</div>
                <span class="label-s text-grey-400"> EMPLOYEES </span>
              </div>
              <div
                class="
                  absolute
                  flex
                  justify-between
                  transform
                  -translate-y-1/2
                  left-0
                  right-0
                  top-1/4
                "
              >
                <a href="#slide1-two" class="text-grey-200">❮</a>
                <a href="#slide1-two" class="text-grey-200">❯</a>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <!-- THIRD BOX -->
      <div
        class="
          flex flex-col
          w-full
          p-8
          m-5
          bg-brand-white
          rounded-md
          shadow-lg
          justify-evenly
        "
      >
        <div class="flex flex-row items-center justify-between space-x-20">
          <div>
            <svg class="icon" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"
              />
            </svg>
          </div>
          <div class="flex flex-col items-end space-y-1">
            <div class="text-3xl font-extrabold">12k</div>
            <div class="label-s uppercase text-grey-400">
              Total Applications
            </div>
          </div>
        </div>
        <hr class="m-3" />
        <div class="">
          <div class="carousel w-full">
            <div id="slide1-three" class="carousel-item relative w-full">
              <div class="grid grid-cols-2 w-full divide-x">
                <div class="">
                  <div class="font-bold text-lg">12</div>
                  <span class="label-s text-grey-400"> APPROVAL </span>
                </div>
                <div class="">
                  <div class="font-bold text-lg">123</div>
                  <span class="label-s text-grey-400"> REVISION </span>
                </div>
              </div>
              <div
                class="
                  absolute
                  flex
                  justify-between
                  transform
                  -translate-y-1/2
                  left-0
                  right-0
                  top-1/4
                "
              >
                <a href="#slide3-three" class="text-grey-200">❮</a>
                <a href="#slide2-three" class="text-grey-200">❯</a>
              </div>
            </div>
            <div id="slide2-three" class="carousel-item relative w-full">
              <div class="grid grid-cols-2 w-full divide-x">
                <div class="">
                  <div class="font-bold text-lg">12</div>
                  <span class="label-s text-grey-400"> EVALUATION </span>
                </div>
                <div class="">
                  <div class="font-bold text-lg">123</div>
                  <span class="label-s text-grey-400"> ISSUANCE </span>
                </div>
              </div>
              <div
                class="
                  absolute
                  flex
                  justify-between
                  transform
                  -translate-y-1/2
                  left-0
                  right-0
                  top-1/4
                "
              >
                <a href="#slide1-three" class="text-grey-200">❮</a>
                <a href="#slide3-three" class="text-grey-200">❯</a>
              </div>
            </div>
            <div id="slide3-three" class="carousel-item relative w-full">
              <div class="w-full">
                <div class="font-bold text-lg">200</div>
                <span class="label-s text-grey-400"> COMPLETED </span>
              </div>
              <div
                class="
                  absolute
                  flex
                  justify-between
                  transform
                  -translate-y-1/2
                  left-0
                  right-0
                  top-1/4
                "
              >
                <a href="#slide2-three" class="text-grey-200">❮</a>
                <a href="#slide1-three" class="text-grey-200">❯</a>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from 'parse'
export default {
  name: "HomeView",
  components: {},
  mounted: async function () {
      console.log('hi')
    // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
    const AccessTypes = Parse.Object.extend("AccessTypes");
    const query = new Parse.Query(AccessTypes);
    query.equalTo("objectId", Parse.User.current().get("access_type"));

    const querResult = await query.find();
    var homeType = querResult[0].get("hometype");
    var flag = 0;
      if (homeType === '/home') {
        flag = 1;
      }
    if (flag === 0) {
      this.$router.push("/403");
    } else {
      console.log("Hi!, You have permission to access this Page");
      //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
      //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    }
  },
};
</script>

<style></style>
