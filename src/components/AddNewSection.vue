<template>
  <div class="row">
    <div class="col-sm-12" :class="{'text-center': btnAddBlock}">

      <button class="btn btn-blue btn-large" v-if="btnAddBlock" @click="btnAddBlockElements">Add {{type}}</button>

      <div class="elements text-center" v-if="!btnAddBlock">

          <div class="title mb-3">
            <h4>Add New {{type}}</h4>
            <div class="close" @click="btnAddBlock = !btnAddBlock">
              <img src="../assets/image/svg/delete.svg" alt="close">
            </div>
          </div>

          <div class="row elements-container">
              <div class="col-sm-3" v-for="(item, index) in elements" :class="{'active':item.active}" :key="index">
                <div class="item text-center" @click="choseElements(index)">
                  <span class="title">
                    {{item.title}}
                  </span>
                </div>
              </div>
          </div>
          
          <div class="row elements-item-products mt-3">
            <div class="col-sm-3" v-for="(item, index) in elementsChose.element.table" :class="{'active':item.active}" :key="index">
                <div class="item text-center" @click="choseElementsProducts(index)">
                  <span class="title">
                    {{item.product_title}}
                  </span>
                  <span class="price mt-2">
                    {{item.price}} {{item.type_price}}
                  </span>
                </div>
              </div>
          </div>
          <button class="btn btn-blue mt-4" @click="addNewBlock">Add {{type}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['type'],
  data() {
    return {
      btnAddBlock: true,
      elements: [],
      elementsChose: {
        element: [],
        product: []
      }
    }
  },
  methods: {
    getElementsBlock() {

      var ctx = this;

      axios({
        url: 'https://b24apps.ru/local/b24apps/alexey/kp_stockwell/getProductStockwell.php',
        method: 'POST',
      }).then((response) => {

        ctx.elements = response.data
                
        for(let item in ctx.elements) {
          if (item == 0) {
            ctx.elements[item].active = true
          } else {
            ctx.elements[item].active = false
          }

          for(let item_product in ctx.elements[item].table) {
            if (item_product == 0) {
              ctx.elements[item].table[item_product].active = true
            } else {
              ctx.elements[item].table[item_product].active = false
            }
          }
        }

        ctx.elementsChose.element = ctx.elements[0];
        ctx.elementsChose.product = ctx.elements[0].table[0]
      });
    },
    choseElements(index) {

      for(var item in this.elements) {
        this.elements[item].active = false
      }

      this.elements[index].active = true
      this.elementsChose.element = this.elements[index]
      this.$set(this.elements, index, this.elements[index])
      
    },
    choseElementsProducts(index) {
      for(var item in this.elementsChose.element.table) {
        this.elementsChose.element.table[item].active = false
      }

      this.elementsChose.element.table[index].active = true
      this.elementsChose.product = this.elementsChose.element.table[index]
      this.$set(this.elementsChose.element.table, index, this.elementsChose.element.table[index])
    },
    addNewBlock() {

      this.elementsChose.product.description_field = '';
      this.elementsChose.product.roll = false;

      let result = {
        "title": this.elementsChose.element.title,
        "description": this.elementsChose.element.description,
        "table_title": this.elementsChose.element.table_title,
        "full_price": this.elementsChose.element.full_price ? this.elementsChose.element.full_price:'0',
        "products": [this.elementsChose.product]
      }


      this.$emit('newBlock', result)
      this.btnAddBlock = !this.btnAddBlock
    },
    btnAddBlockElements() {
      this.btnAddBlock = !this.btnAddBlock
      this.getElementsBlock()
    }
  }
}
</script>

<style scoped lang="sass">
  .elements
    width: 100%
    padding: 20px

    .title
      display: flex
      justify-content: space-between
      align-items: center
      align-content: center

      img
        width: 25px
        height: 25px

    .elements-container

    .active .item
        background: #1c064d
        color: #fff

    .item
      display: flex
      justify-content: center
      align-items: center
      border: 1px solid rgba(201, 201, 201, 0.19)
      box-sizing: border-box
      box-shadow: 0px 5px 10px rgba(88, 88, 88, 0.18)
      border-radius: 6px
      min-height: 80px
      font-weight: 500
      font-size: .80rem
      cursor: pointer
      background: #fff
      padding: 10px
      flex-direction: column

    .elements-item-products
      padding: 25px 10px
      border-radius: 3px
      background: #eeeeee63
</style>
