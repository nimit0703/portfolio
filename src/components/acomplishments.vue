<template>
  <v-container>
    <div class="flex-column d-sm-flex flex-sm-row offset-md-1 mt-9" data-aos="fade-up" data-aos-offset="50"
      data-aos-delay="1" data-aos-duration="600" data-aos-easing="ease-in-out" data-aos-once="true">
      <v-col cols="12" md="11" sm="12">
        <h1 class="pb-15">Education & Experience</h1>
        <div class="pb-5" v-for="(exp, ei) in experience" :key="ei">
          <div class="d-flex">
            <a :href="exp.link" target="_blank">
              <h2 id="links">{{ exp.company }}</h2>
            </a>
            <h2 class="ml-auto">{{ exp.role }}</h2>
          </div>
          <span>{{ exp.duration }} / {{ exp.location }}</span>
        </div>
      </v-col>
    </div>
    <!-- <v-col cols="12" md="11" sm="12">
      <v-divider id="feelsGoodMan" class="mt-15 offset-md-1" color="#ffffff"></v-divider>
    </v-col> -->
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
const experience = ref([
  {
    company: "Digantara",
    role :"SDE I",
    location: "Bangalore, India",
    duration: "09.2025 - currently",
    link: "https://www.digantara.co.in/"
  },
  {
    company: "eRoam Technologies",
    role: "Software Developer",
    duration: "09.2023 - 08.2025",
    location: "Gujarat, India",
    link: "https://eroam.com/"
  },
  {
    company: "AGS Health PVT. LTD.",
    role: "Associate Research Developer",
    duration: "06.2022 - 08.2023",
    location: "Ahmedabad, Gujarat",
    link: "https://www.agshealth.com/"
  },
  {
    company: "Implifie Technologies",
    role: "Front-End Developer",
    duration: "04.2021 - 06.2022",
    location: "Remote",
    link: "https://implifie.com/"
  },
  {
    company: "SVIT, GTU",
    role: "Placement Coordinator: T&P Cell",
    duration: "08.2021 - 11.2022",
    location: "Gujarat, India",
    link: "https://www.svitvasad.ac.in/"
  },
  {
    company: "SVIT, GTU",
    role: "Bachelor: Computer Eng.",
    duration: "08.2019 - 11.2023",
    location: "Gujarat, India",
    link: "https://www.svitvasad.ac.in/"
  },
])
</script>

<style scoped>
h1 {
  color: #fff;
  font-weight: 400;
  letter-spacing: 2px;
}

h2,
h1,
span {
  cursor: context-menu;
}

h2 {
  font-size: 19px;
  line-height: 1;
  font-weight: 400;
  letter-spacing: 2px;
  font-family: "PT Sans", sans-serif;
}

span {
  color: #fff;
  opacity: 0.5;
  font-size: 13px;
  letter-spacing: 2px;
}

a {
  text-decoration: none;
  color: #fff !important;
  border-bottom: #536dfe solid 1px;
  padding-bottom: 3px;
  padding-top: 1px;
  box-shadow: inset 0 -1px 0 #536dfe;
  padding-left: 3px;
  padding-right: 3px;
  -webkit-transition: 0.9s ease-in-out;
  transition: 0.4s ease-in-out;
}

a:hover {
  opacity: 0.9;
  transition: all 400ms ease-in-out;
  box-shadow: inset 0 -55px 0 0 #536dfe;
}

#links {
  cursor: pointer;
}
</style>