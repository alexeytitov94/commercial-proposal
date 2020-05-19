<template>
  <div class="container mt-4">
    <Header :section="section"/>

    <Section :section="section"
        @delete="deleteSection($event)"
        @moveSection="moveSection($event)"/>

    <AddNewSection @newBlock="newSection($event)" type="Section" class="mb-4"/>
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
      section: []
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

<style lang="sass">
  body
    padding-top: 60px

  input, textarea
    background: none
    border: none
    outline: 0 !important

</style>
