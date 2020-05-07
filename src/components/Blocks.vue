<template>
    <div class="col-sm-12 blocks mt-30">
        <div class="row">
            <div class="col-sm-12 block mt-30"  v-for="(item, index) in blocks" :key="index">
                <div class="title">
                    <h3>{{item.TITLE}}</h3>
                    <div class="setting">

                        <span v-if="index > 0"><img src="../assets/image/svg/arrow-top.svg" alt="top" @click="$emit('blocksMove', index + '-top')"></span>
                        
                        <span v-if="index < blocks.length-1"><img src="../assets/image/svg/arrow-bottom.svg" alt="bottom" @click="$emit('blocksMove', index + '-bottom')"></span>
                        
                        <span><img src="../assets/image/svg/delete.svg" alt="delete" @click="$emit('delete', index)"></span>
                    </div>
                </div>
                <div class="content mt-3">

                    <div class="content-item mb-3">
                        <textarea-autosize
                            placeholder="Title KP"
                            ref="TITLE_KP"
                            v-model="item.TITLE_KP"
                        />
                    </div>

                    <div class="content-item mb-4">
                        <div class="description">
                            <div class="description-item" v-for="(item_d, index) in item.DESCRIPTION" :key="index"> 
                                <span class="title">
                                    {{item_d}}
                                </span>
                                <div class="delete" @click="delete item.DESCRIPTION.splice(index, 1);">
                                    <img src="../assets/image/svg/delete.svg" alt="delete">
                                </div>
                            </div>
                            <div class="description-field mt-2">
                                <input type="text" v-model="item.DESCRIPTION_FIELD">
                                <button @click="addDescription(item)" class="btn btn-blue">Добавить</button>
                            </div>
                        </div>
                    </div>

                    <div class="content-item mb-3">
                        <div class="price">
                            <input type="text" class="price border-right" v-model="item.PRICE">
                            <input type="text" class="price" v-model="item.TYPE_PRICE">
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['blocks'],
    methods: {
        addDescription(item) {
            item.DESCRIPTION.push(item.DESCRIPTION_FIELD)
            item.DESCRIPTION_FIELD=""
        },
        deleteDescription(item, index) {
            item.DESCRIPTION.splice(index, 1)
        }
    },
}

</script>

<style scoped lang="sass">
    .blocks
        .block
            background: #fbfbfb
            padding: 20px
            border-radius: 6px
            box-shadow: 0px 2px 6px rgba(152, 151, 151, 0.25)
            border: 2px solid #c0c0c021

        .title
            display: flex
            justify-content: space-between
            align-items: center

            .setting
                display: flex
                
                span
                    padding: 5px
                    border-radius: 2px
                    margin-right: 15px
                    transition: all .2s

                    &:hover
                        background: #dfdfdf75
                    
                    &:last-child
                        margin-right: 0

                    img
                        width: 25px
                        height: 25px
        .content
            .description

                .description-item
                    display: flex
                    justify-content: space-between
                    padding: 10px
                    background: #dcdcdc33
                    border-radius: 3px
                    margin-bottom: 7px

                    img
                        width: 25px
                        height: 25px

                .description-field
                    position: relative

                    input
                        width: 100%
                        
                    button
                        position: absolute
                        top: 0
                        right: 0
                        height: 100%
        input
            outline: none
            padding: 10px
            background: #dcdcdc33
            border: none
            border-radius: 3px

            &:focus
                background: #cccccca1

            .border-right
                border-top-right-radius: 0!important
                border-bottom-right-radius: 0!important
                border-right: 1px solid #c1c1c1!important
        textarea
            width: 100%
            outline: none
            padding: 10px
            background: #dcdcdc33
            border: none
            border-radius: 3px

            &:focus
                background: #cccccca1
                

</style>