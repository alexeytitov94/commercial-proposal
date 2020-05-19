<template>
    <div class="row">
        <div class="col-sm-12 section" v-for="(item, index) in section" :key="index">
            <div class="title mb-3">
                <h3><input type="text" v-model="item.title"></h3>
                <div class="setting">
                    <span v-if="index > 0"><img src="../assets/image/svg/arrow-top.svg" alt="top" @click="$emit('moveSection', index + '-top')"></span>
                    <span v-if="index < section.length-1"><img src="../assets/image/svg/arrow-bottom.svg" alt="bottom" @click="$emit('moveSection', index + '-bottom')"></span>
                    <span><img src="../assets/image/svg/delete.svg" alt="delete" @click="$emit('delete', index)"></span>
                </div>
            </div>

            <div class="group">
                <span>Описание Раздела</span>
                <textarea-autosize
                        v-model="item.description"
                />
            </div>

            <div class="group">
                <span>Название таблицы</span>
                <input v-model="item.table_title"/>
            </div>

            <div class="product">
                <div class="product-item" v-for="(productItem, indexProduct) in item.products" :key="indexProduct" :class="{'roll-up':productItem.roll}">

                    <div class="setting-product">
                        <div class="roll-product-item" @click="updateProduct(index, indexProduct)"><img src="../assets/image/svg/roll.svg" alt="roll"></div>
                        <div class="delete-product-item" @click="delete item.products.splice(indexProduct, 1);"><img src="../assets/image/svg/delete.svg" alt="delete"></div>
                    </div>

                    <div class="group title-product">
                        <span>Название</span>
                        <input v-model="productItem.product_title"/>
                    </div>

                    <div class="group">
                        <span>Описание</span>
                        <div class="description">
                            <div class="description-item" v-for="(item_d, index) in productItem.list_description" :key="index">
                                <span>{{item_d}}</span>
                                <div class="delete" @click="delete productItem.list_description.splice(index, 1);"><img src="../assets/image/svg/delete.svg" alt="delete"></div>
                            </div>
                            <div class="add-description mt-2">
                                <input type="text" v-model="productItem.description_field">
                                <button type="button" class="btn btn-blue" @click="addDescription(productItem, productItem.description_field)">Add</button>
                            </div>
                        </div>
                    </div>

                    <div class="group">
                        <span>Цена</span>
                        <div class="price">
                            <input v-model="productItem.price"/>
                            <input v-model="productItem.type_price"/>
                        </div>
                    </div>

                </div>
            </div>

            <div class="product_block" >
                <AddNewSection @newBlock="addProduct($event, item)" type="Product" class="mb-4"/>
            </div>

            <div class="group">
                <span>Итоговая стоимость</span>
                <input v-model="item.full_price"/>
            </div>
        </div>
    </div>
</template>


<script>
import AddNewSection from './AddNewSection.vue'

export default {
    components: { AddNewSection },
    props: ['section'],
    methods: {
        addDescription(item, name) {
            item.list_description.push(name)
            item.description_field = ''
        },
        addProduct(event, item) {
            item.products.push(event.products[0])
        },
        updateProduct(index, indexProduct) {
            this.section[index].products[indexProduct].roll = !this.section[index].products[indexProduct].roll
            
            let title = this.section[0].title;
            this.section[0].title = '';
            this.section[0].title = title;
        }
    },
}

</script>

<style scoped lang="sass">         
.section
    margin-bottom: 20px
    padding: 15px
    border: 2px solid #1c064d
    border-radius: 4px

    .product_block
        width: 100%

    .title
        width: 100%
        display: flex
        justify-content: space-between
        align-items: center
        align-content: center

        h3
            width: 100%
            
            input
                width: 100%
        
        .setting
            display: flex

            span
                margin-left: 15px
                cursor: pointer

                &:hover
                    img
                        opacity: 1
            img
                width: 25px
                height: 25px
                opacity: .5

    .group
        margin-bottom: 15px

        &:first-child
            margin-bottom: 0

        &:last-child
            margin-bottom: 0
        span
            display: block
            font-size: .9rem
            color: #0000008a

    .product
        display: flex
        flex-direction: column
        margin-bottom: 20px

        .product-item
            position: relative
            width: 100%
            background: #fafafa
            padding: 15px
            border-radius: 4px
            margin-top: 10px
            box-shadow: 0px 2px 7px rgba(109, 109, 109, 0.36)

            &.roll-up
                box-shadow: 0px 1px 7px rgba(109, 109, 109, 0.26)

                .group
                    display: none
                    margin-bottom: 0

                .title-product
                    display: block

                    span
                        display: none

            .setting-product
                position: absolute
                top: 15px
                right: 15px
                display: flex

                .roll-product-item
                    width: 22px
                    height: 25px
                    opacity: .5
                    cursor: pointer

                    &:hover
                        opacity: 1

                .delete-product-item
                    width: 25px
                    height: 25px
                    opacity: .5
                    cursor: pointer

                    &:hover
                        opacity: 1

                .roll-product-item
                    margin-right: 10px

                img
                    height: 100%
                    width: 100%

            .price
                display: flex

                input
                    width: 80px

    .description
        .add-description
            display: flex
            justify-content: space-between
            background: #f1f1f1
            border-radius: 4px

            input
                padding: 5px 10px
        .description-item
            display: flex
            flex-direction: row
            align-items: center
            align-content: center
            justify-content: space-between
            padding: 3px
            border-radius: 2px

            &:hover
                background: #e1e1e15c

            span
                color: #000

            .delete
                cursor: pointer

                &:hover

                    img
                        opacity: 1
                img
                    width: 20px
                    height: 20px
                    opacity: .5

</style>