<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item" 
                :class="{on:type==='recommend'}"
                @click="handleToRecommend">每日推荐</div>
            <div class="daily-menu-item" 
                :class="{on:type==='daily'}"
                @click="showThemes=!showThemes">主题日报</div>
            <ul v-show="showThemes">
                <li v-for="(item, index) in themes" :key="index">
                    <a :class="{on:item.id===themeId && type==='daily'}" @click="handleToTheme(item.id)">{{item.name}}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list">
            <Item v-for="(item, index) in  list" :key="index" :data="item"></Item>
        </div>
        <!-- <daily-article></daily-article> -->
    </div>
</template>
<script>
import $ from "./libs/util";
import Item from "./components/item.vue";
export default {
  data() {
    return {
      themes: [],
      showThemes: false,
      type: "recommend",
      themeId: 0,
      list: [],
      recommendList: [],
      isLoading: false,
      dailyTime: $.getTodayTime()
    };
  },
  mounted() {
    this.getThemes();
    this.getRecommendList();
  },
  methods: {
    getThemes() {
      $.ajax.get("themes").then(res => {
        this.themes = res.others;
      });
    },
    handleToRecommend() {
      this.type = "recommend";
      this.recommendList = [];
      this.dailyTime = $.getTodayTime();
      this.getRecommendList();
    },
    getRecommendList() {
      this.isLoading = true;
      const prevDay = $.prevDay(this.dailyTime + 86400000);
      $.ajax.get("news/before/" + prevDay).then(res => {
        this.recommendList.push(res);
        this.list = res.stories
        this.isLoading = false;
      });
    },
    handleToTheme(id) {
      this.type = "daily";
      this.themeId = id;
      this.list = [];
      $.ajax.get("theme/" + id).then(res => {
        this.list = res.stories.filter(item => {
          return item.type !== '1';

        });
      });
    },
    formatDay(date) {
      let month = date.substr(4,2);
      let day = date.substr(6,2);
      if (month.substr(0,1)==='0') {
        month = month.substr(1,1);
      }
      if (day.substr(0,1)) {
        day = day.substr(1,1);
      }
      return `${month}月${day}日`;
    }
  },
  components: {
    Item
    // dailyArticle
  }
};
</script>
<style>
.daily-menu ul {
  list-style: none;
}
.daily-menu ul li a {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 5px 0;
  margin: 5px 0;
  cursor: pointer;
}
.daily-menu ul li a:hover,
.daily-menu ul li a.on {
  color: #3399ff;
}
.daily-list{
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}
.daily-date{
  text-align: center;
  margin: 10px 0;
}
</style>
