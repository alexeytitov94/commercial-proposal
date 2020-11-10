<template>
  <div class="container mt-4">
    <Header :section="section" :documents="documents"/>

    <Section :section="section"
        :documents="documents"
        @delete="deleteSection($event)"
        @moveSection="moveSection($event)"/>

    <AddNewSection @newBlock="newSection($event)" type="Секцию" class="mb-4"/>

  </div>
</template>

<script>
import AddNewSection from './components/AddNewSection.vue'
import Section from './components/Section.vue'
import Header from './components/Header.vue'

const arrayMove = require('array-move');

export default {
  name: 'app',
  data() {
    return {
      section: [],
      documents: {
        title_document: 'Коммерческое предложение для компании',
        full_price: 0,
        type_price: '₽',
        day_complete: 5,
      }
    }
  },
  components: {
    AddNewSection,
    Section,
    Header
  },
  methods: {
    newSection(data) {
      let elements = data;
      this.section.push(elements)
    },
    deleteSection(index) {
      this.section.splice(index, 1)
    },
    moveSection(index) {

      let type = index.split('-');

      if (type[1] == 'top') {
        this.section = arrayMove(this.section, type[0], type[0]-1)
      } else {
        this.section = arrayMove(this.section, type[0], type[0]+1)
      }
    }
  }
}
</script>

<style lang="scss">
body {
  padding-top: 60px;
}

input, textarea {
  background: none;
  border: none;
  outline: 0 !important;
}
</style>
