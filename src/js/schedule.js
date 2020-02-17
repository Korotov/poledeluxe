import Accordion from './accordion';
const SHEETPARAMS = {
  id: "1rMBMYT168iMQVzsCgUzJJWidCeWiCfXv9acvju9EU3U",
  apikey: 'AIzaSyA4kJ6B3oX7FB4uzGHTRenD0yRSnpYaLw0',
};
const SHEETURL = "https://sheets.googleapis.com/v4/spreadsheets/1rMBMYT168iMQVzsCgUzJJWidCeWiCfXv9acvju9EU3U/values:batchGet?"
    +"ranges='polotna'!B3%3AD17&ranges='polotna'!E3%3AG17&ranges='polotna'!H3%3AJ17&ranges='polotna'!K3%3AM17&ranges='polotna'!N3%3AP17&ranges='polotna'!Q3%3AS17&ranges='polotna'!T3%3AV17&"
    + "ranges='pilony'!B3%3AD17&ranges='pilony'!E3%3AG17&ranges='pilony'!H3%3AJ17&ranges='pilony'!K3%3AM17&ranges='pilony'!N3%3AP17&ranges='pilony'!Q3%3AS17&ranges='pilony'!T3%3AV17&"
    +"ranges='kontinent'!B3%3AD17&ranges='kontinent'!E3%3AG17&ranges='kontinent'!H3%3AJ17&ranges='kontinent'!K3%3AM17&ranges='kontinent'!N3%3AP17&ranges='kontinent'!Q3%3AS17&ranges='kontinent'!T3%3AV17"
    + "&ranges='styles'!A1%3AA50"
    +"&key="+SHEETPARAMS.apikey;
function encodeQueryData(data) {
   let ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
};
document.addEventListener("DOMContentLoaded", function(){
  new Vue({
    el:'.wrapper',
    data: {
      polotna: [],
      pilony:[],
      kontinent: [],
      lessonList: [],
      filterByStyle: 'Все направления',
      filterByGym: 'Все залы',
    },
    methods: {
      isShowLesson: function(lesson){
        
        let filter = this.filterByStyle === 'Все направления'
                     || this.filterByStyle === lesson.name;
        let name = lesson.name.trim();
        return filter && name && lesson.status;
        
      },
      haveLessons: function(day){
        let byStyle = this.filterByStyle;
        let lessons = day.lessons;
        if ( (!byStyle || byStyle === 'Все направления') && day.lessons.length>=1) return true;
        for ( let lesson of day.lessons ) {
          if (lesson.name === byStyle) return true;
        }
        return false;
      },
    },
    created(){
      let timeStamp = Date.now();
      let lastStamp = sessionStorage.updated;
      if (lastStamp && timeStamp - lastStamp < 20*60*1000) {
        console.log("Get data from sessionStorage!");
        this.polotna = JSON.parse(sessionStorage.polotna);
        this.pilony = JSON.parse(sessionStorage.pilony);
        this.kontinent = JSON.parse(sessionStorage.kontinent);
        this.lessonList = JSON.parse(sessionStorage.lessonList);
      }
      else {
        axios.get(SHEETURL)
        .then(responce => {
            console.log(responce.status);
            for (let range of responce.data.valueRanges){
              if (range.range.includes('polotna')) {
                this.polotna.push(getDayFromSheet(range.values));
              } 
              else if(range.range.includes('pilony')){
                this.pilony.push(getDayFromSheet(range.values));
              }
              else if(range.range.includes('kontinent')){
                this.kontinent.push(getDayFromSheet(range.values));
              }  
              else if(range.range.includes('styles')){
                for (let value of range.values) {
                  this.lessonList.push(value[0]);
              }
              }
            }
            sessionStorage.setItem('polotna', JSON.stringify(this.polotna));
            sessionStorage.setItem('pilony', JSON.stringify(this.pilony));
            sessionStorage.setItem('kontinent', JSON.stringify(this.kontinent));
            sessionStorage.setItem('lessonList', JSON.stringify(this.lessonList));
            sessionStorage.setItem('updated', Date.now());
            console.log("Updated from google sheets");
          })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error);
          });
        }
    } //end created
  });
});

function getDayFromSheet (data) {
  let result = {
    dayOfWeek: data[0][0],
    lessons:[],
  };
  
  for (let el of data) {
    if (el.length>=2) {
      let lesson = {time:el[0], name:el[1], status: true};
      if (lesson.time.trim().length<=2) {
        lesson.time+=':00';
      }
      if (el[2]) {
        lesson.status = false;
      }
      result.lessons.push(lesson);
    }
  }
  return result;
}
function tommorowSchedule() {

}