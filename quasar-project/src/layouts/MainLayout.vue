<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-md q-py-xl">
        <div class="title text-h3">Todo</div>
        <div class="date">{{ formattedString }} </div>
      </div>
      <q-img src="mountains.jpg " class="img" />
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 217px); margin-top: 217px; border-right: 1px solid #ddd">
          <q-list  padding>
            <q-item to="/" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list " />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>
                        <q-item to="/help" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="mountains.jpg" style="height: 217px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://scontent.flos1-1.fna.fbcdn.net/v/t39.30808-6/305795807_1265413870898592_6909848019798780875_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeHPu9cEJboKJVdq-nTtml1gDjvVYKOcYmQOO9Vgo5xiZB8cEiUn92vKy2nyYCqwNvv9yLQbLELVe1MtqMzJ_kMT&_nc_ohc=_mzd755jOHMAX9IdAuu&_nc_zt=23&_nc_ht=scontent.flos1-1.fna&oh=00_AfApIHAsv8cNzXCrSxva1qglAMOaSmKY8LbFwhY933A-_A&oe=6521D881">
            </q-avatar>
            <div class="text-weight-bold">Margret Edeh</div>
            <div>@edehmargret</div>
          </div>
        </q-img>
      </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { date } from "quasar";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const timeStamp = Date.now();
    const formattedString = date.formatDate(
      timeStamp,
      "dddd D MMMM"
    );

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      formattedString,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped lang="scss">
.img {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
  position: absolute;
  top: 0;
}
</style>
