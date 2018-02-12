// Vue.js based Corvettes Carousel
Vue.component('carousel-control', {
  props: ['order'],
  template: '<a @click.prevent="handleClick" :class="buttonClass" href="#carouselExampleControls" role="button" :data-slide="order">\
      <span :class="iconClass" aria-hidden="true"></span>\
      <span class="sr-only"><slot></slot></span>\
    </a>',
  data() {
    return {
      buttonClass: `carousel-control-${this.order}`
    }
  },
  computed: {
    iconClass() {
      return `${this.buttonClass}-icon`;
    }
  },
  methods: {
    handleClick(event) {
      if (this.order === 'next') {
        this.$emit('goNext');
      } else if (this.order === 'prev') {
        this.$emit('goPrev');
      }
    }
  }
});

Vue.component('carousel-item', {
  props: ['source', 'text', 'active', 'directionClass'],
  template: '<transition name="slide">\
      <div class="carousel-item" :class="directionClass" v-show="active">\
        <img class="d-block w-100" :src="source" :alt="text">\
      </div>\
    </transition>'
  });

Vue.component('carousel', {
  template: '<div id="carouselExampleControls" class="carousel slide">\
    <div class="carousel-inner">\
      <carousel-item v-for="image in images" :source="image.source" :text="image.text" key="image.id" :active="image.isActive" :directionClass="directionClass"></carousel-item>\
    </div>\
    <carousel-control @goPrev="prev" order="prev">Previous</carousel-control>\
    <carousel-control @goNext="next" order="next">Next</carousel-control>\
  </div>',
  data() {
    return {
      directionClass: '',
      images: [
		//------------ Data Start ---
		{ id: 0, source: 'images/c001.jpg', text: 'Corvette 1', isActive: true },  
		{ id: 1, source: 'images/c002.jpg', text: 'Corvette 2', isActive: false },  
		{ id: 2, source: 'images/c003.jpg', text: 'Corvette 3', isActive: false },  
		{ id: 3, source: 'images/c004.jpg', text: 'Corvette 4', isActive: false },  
		{ id: 4, source: 'images/c005.jpg', text: 'Corvette 5', isActive: false },  
		{ id: 5, source: 'images/c006.jpg', text: 'Corvette 6', isActive: false },  
		{ id: 6, source: 'images/c007.jpg', text: 'Corvette 7', isActive: false },  
		{ id: 7, source: 'images/c008.jpg', text: 'Corvette 8', isActive: false },  
		{ id: 8, source: 'images/c009.jpg', text: 'Corvette 9', isActive: false },  
		{ id: 9, source: 'images/c010.jpg', text: 'Corvette 10', isActive: false },  
		{ id: 10, source: 'images/c011.jpg', text: 'Corvette 11', isActive: false },  
		{ id: 11, source: 'images/c012.jpg', text: 'Corvette 12', isActive: false },  
		{ id: 12, source: 'images/c013.jpg', text: 'Corvette 13', isActive: false },  
		{ id: 13, source: 'images/c014.jpg', text: 'Corvette 14', isActive: false },  
		{ id: 14, source: 'images/c015.jpg', text: 'Corvette 15', isActive: false },  
		{ id: 15, source: 'images/c016.jpg', text: 'Corvette 16', isActive: false }   
		//------------ Data End -----
      ]
    }
  },
  methods: {
    getActiveIndex() {
      return this.images.findIndex(obj => obj.isActive);
    },
    next() {
      const activeIndex = this.getActiveIndex();
      let nextIndex = activeIndex + 1;
      let activeItem;
      let nextItem;

      if (nextIndex > this.images.length - 1) {
        nextIndex = 0;
      }
      activeItem = this.images[activeIndex];
      nextItem = this.images[nextIndex];

      nextItem.isActive = true;
      activeItem.isActive = false;
      this.directionClass = 'slide-next';
    },
    prev() {
      const activeIndex = this.getActiveIndex();
      let prevIndex = activeIndex - 1;
      let activeItem;
      let prevItem;

      if (prevIndex < 0) {
        prevIndex = this.images.length - 1;
      }
      activeItem = this.images[activeIndex];
      prevItem = this.images[prevIndex];

      prevItem.isActive = true;
      activeItem.isActive = false;
      this.directionClass = 'slide-prev';
    }
  },
  created() {
    bus
      .$on('goPrev', this.prev)
      .$on('goNext', this.next);
  }
});

const bus = new Vue();

const corvette = new Vue({
  el: '#corvette'
});

document.onkeydown = e => {
  switch (e.keyCode) {
    case 37:
      bus.$emit('goPrev');
      break;
    case 39:
      bus.$emit('goNext');
      break;
    }
};
