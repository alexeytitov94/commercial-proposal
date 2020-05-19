<template>
    <div class="header">
        <button class="btn btn-blue" @click="createKp"> Create DOCX </button>
    </div>
</template>

<script>
export default {
    props: ['section'],
    methods: {
        createKp() {
        }
    }
}
</script>

<style scoped lang="sass">
.header
    position: fixed
    top: 0
    left: 0
    height: 65px
    width: 100%
    background: white
    box-shadow: 0px 4px 4px rgba(166, 166, 166, 0.25)
    z-index: 1000
    display: flex
    justify-content: flex-end
    padding: 10px 30px
</style>