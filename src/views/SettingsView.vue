<template>
    <v-container class="ml-0">
        <div class="d-flex sticky-top" :class="selectedTheme? 'bg-light': 'bg-dark'">
            <h2 >Settings</h2>
        </div>
        <v-expansion-panels class="mb-2">
            <v-row>
                <v-col cols="7">
                    <v-expansion-panel title="Theme Configuration" class="bg-secondary bg-gradient text-dark">
                        <v-expansion-panel-text>
                            <v-label class="text-dark"> Change Theme</v-label>
                            <v-switch v-model="selectedTheme" hide-details inset :label="selectedTheme ? 'light' : 'dark'"
                                @change="handleThemeChange"></v-switch>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-col>
                <v-col cols="5">
                    <v-expansion-panel title="Map Configuration" class="bg-secondary bg-gradient">
                        <v-expansion-panel-text>
                            <v-label>Select Map Type </v-label>
                            <v-switch v-model="selectedTheme" hide-details inset :label="selectedTheme ? 'light' : 'dark'"
                                @change="handleThemeChange"></v-switch>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-col>
                <v-col cols="4">
                    <v-expansion-panel title="General Configuration" class="bg-secondary bg-gradient">
                        <v-expansion-panel-text>
                            <v-label> </v-label>
                            <v-switch v-model="selectedTheme" hide-details inset :label="selectedTheme ? 'dark' : 'light'"
                                @change="handleThemeChange"></v-switch>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-col>
            </v-row>
        </v-expansion-panels>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nihil, praesentium voluptas illum odit iste! Nostrum, voluptatibus. Magni in enim commodi nisi illo tenetur cupiditate illum, impedit, eveniet inventore fuga qui ratione nobis ipsum provident quasi quia aut reprehenderit labore. Eligendi voluptas fuga nostrum itaque libero harum quisquam. Fugiat ab hic nihil nesciunt commodi ea est optio aperiam mollitia, temporibus eius odio, voluptas quam eveniet quia tempora a nam. Eum rerum necessitatibus molestiae tempore officia libero quam asperiores numquam esse eaque qui odio nemo tempora assumenda vero, minus nulla voluptates ipsam id corporis pariatur est perspiciatis reprehenderit sed. Voluptates totam illum ab aliquam consectetur dolor odio soluta praesentium quisquam, sunt, quas veritatis esse at. Quis, explicabo ut laborum nobis dolorum ad voluptate delectus saepe voluptates excepturi blanditiis cum, voluptatem fugiat iste rerum amet. Perspiciatis quo quia esse ad repellendus? Voluptate, natus totam modi illo delectus id possimus ullam aperiam architecto perspiciatis autem perferendis laborum! Deserunt, veritatis nesciunt. Sapiente modi perspiciatis facilis minima quod quaerat. Cum voluptas veniam laudantium officia tempora, quae necessitatibus maiores, amet aperiam, exercitationem consequuntur. Debitis est quae esse error sunt fugit possimus aliquam iure alias impedit nostrum praesentium facilis, cumque facere voluptatum nulla. Aperiam temporibus ex laborum quod ut assumenda voluptatibus tempore nobis facere! Repellat esse dignissimos, fugiat velit veniam nostrum, blanditiis sunt harum totam nesciunt illo in nobis provident corrupti, illum quas rem! Delectus veniam in eveniet, repudiandae inventore rerum commodi soluta temporibus, rem odio itaque dignissimos voluptas. Eaque consectetur rem, quaerat tempore impedit aut quae vero, numquam quod iure libero itaque ratione cupiditate neque sit voluptas placeat magnam quis? Beatae hic fugiat ratione quasi quo qui temporibus veritatis autem ipsam! Eveniet nam similique voluptate dolor nisi. Illo iusto reiciendis animi delectus ullam nobis cumque repudiandae est accusantium esse. Debitis aliquam minima magni non molestiae. Laborum sunt nobis officia quo nostrum consectetur similique dignissimos voluptas, magni, eveniet error, officiis quam quaerat facere fugit laudantium a explicabo! Odit officia voluptatem autem corporis quam non dignissimos sequi obcaecati, in, iusto modi nam soluta cum et dicta facere labore doloremque facilis, hic numquam quae sapiente laboriosam. Vitae inventore consequuntur illo iusto enim natus provident aliquam corrupti maxime impedit eveniet minus, doloremque nulla! Velit aliquam sapiente voluptate veniam illo nostrum nesciunt possimus excepturi vel, aut dignissimos labore tenetur. Repudiandae, ut quis distinctio provident debitis temporibus nisi, tenetur, illum quos dolorum quisquam? Ut, soluta, excepturi tempora aperiam asperiores eum dolore sit cumque temporibus quos tenetur dolores vitae voluptas consectetur cupiditate velit tempore nobis exercitationem illum in? Numquam, dolores natus? Magnam corporis molestias amet veritatis ratione consequatur maiores. Consectetur ipsa reiciendis deleniti beatae aut repudiandae, accusantium ex nobis vitae magni quasi, illo nemo adipisci velit expedita! Magnam officiis ex aliquam ullam architecto, unde fuga rem eum, nam at suscipit, adipisci recusandae provident dolorum dolore. Dignissimos, optio officiis quia blanditiis doloremque non deleniti ad repellat quis commodi facere ducimus sint ratione omnis quas accusantium dicta adipisci laborum maxime dolor sed dolores cum animi? Veritatis soluta doloremque sapiente, ipsum voluptas sed voluptatum perferendis distinctio dicta, deserunt consequatur illo tempore molestiae laudantium, dolor officia iusto nulla vel nesciunt ullam quod natus? Error tenetur possimus fugit ducimus explicabo eaque in quam unde, at similique culpa, harum recusandae! Quibusdam, quaerat. Quis voluptatem accusantium ea soluta eveniet quos facere dicta reprehenderit veniam quas sequi quae impedit quia reiciendis numquam sit quisquam vero enim iure eos aliquid nisi, tempore hic nostrum. Laudantium asperiores soluta eum officia maxime excepturi aut cumque obcaecati doloremque labore ipsa voluptates magnam quaerat blanditiis, veniam iure. Cupiditate explicabo expedita amet perspiciatis porro provident sequi soluta facere, assumenda impedit neque nam, ea sint voluptate cumque corporis reprehenderit asperiores animi voluptatibus laboriosam. Magnam placeat enim, laborum fugit hic, labore, sapiente voluptatibus nesciunt dolore praesentium dolores! Ea quibusdam et rem sequi quo? Libero a consectetur dolorum ex, unde rem. Culpa cum numquam tempora repellat quae maiores asperiores corporis possimus eius quaerat omnis laborum ducimus sapiente adipisci distinctio, accusamus ut dolorem atque quidem at hic illum inventore. Nam est voluptatem id. Esse autem quo hic dignissimos veritatis voluptatibus perspiciatis? Laudantium cupiditate numquam minima vero ipsum iusto atque assumenda facilis, quibusdam quisquam dolorum consequuntur animi error aliquam eius voluptatibus aperiam alias qui, praesentium saepe quas ratione iste incidunt? Amet aliquid minus dolorem perspiciatis maxime excepturi repellendus laboriosam quaerat porro eaque doloribus consequatur blanditiis voluptates commodi esse expedita deserunt, illum nisi atque quia fuga repudiandae ex molestias ullam. Fugiat, tenetur at dolorem voluptates praesentium fugit eius dolores neque omnis corporis quo ipsam debitis aliquam iste! Vitae rerum est rem nisi dignissimos eligendi harum quam, facere ducimus, sit ipsa illum! In ratione sed tempora adipisci! Temporibus nemo consectetur fuga molestiae aut vitae vel totam maiores ratione, magnam quas similique ducimus rerum harum, tempora sit iure sed accusantium tenetur, quod nihil. Laboriosam, eveniet blanditiis! Architecto impedit at deleniti aliquid delectus, atque sit esse laboriosam? Quod obcaecati exercitationem, expedita odit ex eligendi, aspernatur at, optio veritatis fuga voluptatum ratione fugiat earum. Quam sapiente veritatis nulla qui ex autem excepturi temporibus eveniet magnam ducimus eos aliquid vitae velit laborum libero, repellendus consequatur voluptatem illum ut voluptas eaque neque incidunt commodi! Quod ad, qui, dolor nemo saepe dolores minima totam dolore soluta repellendus voluptate nam veniam velit maiores doloremque atque cumque quisquam nisi ducimus. Esse minus vel error maiores, a obcaecati reiciendis nesciunt incidunt alias quibusdam modi aspernatur iste explicabo consequuntur. Ratione, consequatur quidem! Autem, culpa debitis. Veritatis fuga blanditiis cum eos aspernatur suscipit dolores quisquam libero culpa, quas alias fugiat asperiores, quae quos expedita eveniet tempora, nihil id nulla aut dicta vitae ab. Magni quae aliquam non vel facere a eaque, laboriosam amet repellat quaerat voluptates in ipsum eius ipsam delectus. Magnam sequi quibusdam dicta ea ut placeat praesentium tenetur, incidunt eveniet, architecto assumenda doloribus asperiores dolorem vel enim eum hic iusto aliquid nulla accusantium velit laboriosam dolore. Aspernatur, cum! Impedit quis laboriosam earum vero iusto vitae est nemo, quos cupiditate et saepe similique iste eum architecto placeat. Sed vero quidem iusto ab. Exercitationem voluptate modi repudiandae voluptatibus adipisci, expedita nemo! Delectus, nostrum necessitatibus? Dolor!
    </v-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const selectedTheme = ref(false);
const theme = useTheme();

const handleThemeChange = () => {    
    theme.global.name.value = selectedTheme.value ? 'light' : 'dark';
};
</script>
  