<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-4" v-for="(item, index) in templateDoc" :key="index">
                <div class="template">
                    <h3>Название шаблона {{item}}</h3>
                    <p>Lorem ipsum dolor sit amet, adipisicing elit. Libero vel optio architecto similique.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            templateDoc: [
                1,2,3,4,5,6,7,8,9,10,11,12,13,14
            ]
        }
    }
}
</script>

<style lang="sass">
.template
    cursor: pointer
    margin-bottom: 15px
    border-radius: 6px
    background: #fff
    -webkit-box-shadow: 0px 5px 10px rgba(88, 88, 88, 0.18)
    box-shadow: 0px 5px 10px rgba(88, 88, 88, 0.18)
    padding: 15px
    h3 
        font-size: 1.3rem
        margin-bottom: 10px
    p
        font-size: .9rem
        opacity: .8
</style>