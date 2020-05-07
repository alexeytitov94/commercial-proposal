<template>
  <div class="col-sm-12 mt-30" :class="{'text-center': btnAddBlock}">
      <button class="btn btn-blue btn-large" v-if="btnAddBlock" @click="btnAddBlockElements">Добавить Блок </button>

      <div class="elements text-center" v-if="!btnAddBlock">
          <div class="title mb-3">
            <h4>Добавление Нового Блока</h4>
            <div class="close" @click="btnAddBlock = !btnAddBlock">
              <img src="../assets/image/svg/delete.svg" alt="close">
            </div>
          </div>
          <div class="row elements-container">
              <div class="col-sm-3" v-for="(item, index) in elements" :class="{'active':item.ACTIVE}" :key="index">
                <div class="item text-center" @click="choseElements(index)">
                  <span class="title">
                    {{item.TITLE}}
                  </span>
                </div>
              </div>
          </div>
          <div class="row elements-item-products mt-3">
            <div class="col-sm-3" v-for="(item, index) in elementsChose.element.PRODUCTS" :class="{'active':item.ACTIVE}" :key="index">
                <div class="item text-center" @click="choseElementsProducts(index)">
                  <span class="title">
                    {{item.TITLE_KP}}
                  </span>
                  <span class="price mt-2">
                    {{item.PRICE}} {{item.TYPE_PRICE}}
                  </span>
                </div>
              </div>
          </div>
          <button class="btn btn-blue mt-4" @click="addNewBlock">Добавить Блок</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
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
        this.elements = response.data
                
        for(let item in ctx.elements) {
          if (item == 0) {
            ctx.elements[item].ACTIVE = true
          } else {
            ctx.elements[item].ACTIVE = false
          }

          for(let item_product in ctx.elements[item].PRODUCTS) {
            if (item_product == 0) {
              ctx.elements[item].PRODUCTS[item_product].ACTIVE = true
            } else {
              ctx.elements[item].PRODUCTS[item_product].ACTIVE = false
            }
          }
        }

        ctx.elementsChose.element = ctx.elements[0];
        ctx.elementsChose.product = ctx.elements[0].PRODUCTS[0]


      });
    },
    choseElements(index) {

      for(var item in this.elements) {
        this.elements[item].ACTIVE = false
      }

      this.elements[index].ACTIVE = true
      this.elementsChose.element = this.elements[index]
      this.$set(this.elements, index, this.elements[index])
      
    },
    choseElementsProducts(index) {
      for(var item in this.elementsChose.element.PRODUCTS) {
        this.elementsChose.element.PRODUCTS[item].ACTIVE = false
      }

      this.elementsChose.element.PRODUCTS[index].ACTIVE = true
      this.elementsChose.product = this.elementsChose.element.PRODUCTS[index]
      this.$set(this.elementsChose.element.PRODUCTS, index, this.elementsChose.element.PRODUCTS[index])
    },
    addNewBlock() {
      this.elementsChose.product.TITLE = this.elementsChose.element.TITLE
      this.elementsChose.product.DESCRIPTION_FIELD = ''
      this.$emit('newBlock', this.elementsChose.product)
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
        background: #2a74f5
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
      font-weight: 700
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
