<template>
  <div class="container mt-4">
    <div class="row">
      <Header :blocks="blocks"/>
      <Blocks 
        :blocks="blocks"
        @delete="deleteBlock($event)"
        @blocksMove="blocksMove($event)"
      />
      <AddNewBlock @newBlock="newBlock($event)" class="mb-4"/>
    </div>
  </div>
</template>

<script>
import AddNewBlock from './components/AddNewBlock.vue'
import Blocks from './components/Blocks.vue'
import Header from './components/Header.vue'

const arrayMove = require('array-move');

export default {
  name: 'app',
  data() {
    return {
      blocks: []
    }
  },
  components: {
    AddNewBlock,
    Blocks,
    Header
  },
  methods: {
    newBlock(data) {
      let elements = data;
      this.blocks.push(elements)
    },
    deleteBlock(index) {
      this.blocks.splice(index, 1)
    },
    blocksMove(index) {

      let type = index.split('-');

      if (type[1] == 'top') {
        this.blocks = arrayMove(this.blocks, type[0], type[0]-1)
      } else {
        this.blocks = arrayMove(this.blocks, type[0], type[0]+1)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
