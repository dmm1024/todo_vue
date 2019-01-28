
Vue.component('card', {
  props: ['card', 'index'],
  template: `
  <transition name="animcard">
  <div class="card">
    <i class="material-icons card__remove" v-on:click="cardDelete(index)">close</i>
    <h2 class="card__title">{{card.title}}</h2>
    <div class="card__date">{{card.date}}</div>
    <div class="card__descr">{{card.descr}}</div>
  </div>
  </transition>`,
  methods: {
    cardDelete(index) {
      this.$emit('carddelete', index);
    }
  }
})

const main = new Vue({
  el: '#main',
  data: {
    title: '',
    descr: '',
    taskList: [],
    isVeil: false,
    isFields: false
  },
  beforeMount() {
    if(localStorage.getItem('cardsData')) {
      this.taskList = JSON.parse(localStorage.getItem('cardsData'));
    }
  },
  methods: {
    removeInputs() {
      this.title = '';
      this.descr = '';
    },
    showFields() {
      this.isVeil = true;
      this.isFields = true;
      
      this.$refs.title.focus();
    },
    hideFields() {
      this.isVeil = false;
      this.isFields = false;
    },
    addTask() {
      const task = {};
      const date = new Date();
      const fullYear = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const min = date.getMinutes();
      
      task.title = this.title || `ToDo`;
      task.descr = this.descr;
      task.date = `${day}/${month}/${fullYear} ${hour}:${min}`;
      task.key = +date;
      
      
      this.taskList.push(task);
      
      localStorage.setItem('cardsData', JSON.stringify(this.taskList));
      this.removeInputs();
      this.hideFields();
    },
    removeCard(index) {
      main.taskList.splice(index,1);
      localStorage.setItem('cardsData',JSON.stringify(main.taskList));
    }
  }
})
