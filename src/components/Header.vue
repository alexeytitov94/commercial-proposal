<template>
    <div class="header">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="header-wrapper">
                        <button class="btn btn-default" @click="templateGet=true"> Шаблоны </button>
                        <button class="btn btn-blue" @click="open=true"> Создать DOCX </button>
                    </div>
                </div>
            </div>
        </div>


        <vue-modaltor :visible="open" @hide="open = false" :resize-width='{1500:"30%", 1200:"40%",992:"50%",768:"60%", 500:"75%", 450:"93%"}' :closeScroll="false">
            <template slot="close-icon">
                <img src="@/assets/image/svg/delete.svg" alt="close">
            </template>

            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="group mt-4">
                            <span class="title">Название документа</span>
                            <input v-model="documents.title_document"/>
                        </div>
                        <div class="group">
                            <span class="title">Общая стоимость</span>
                            <div class="price-document">
                                <span>{{fullPrice}}</span>
                                <input v-model="documents.type_price"/>
                            </div>
                        </div>
                        <div class="group">
                            <span class="title">Срок выполнения</span>
                            <div class="price-document">
                                <input v-model="documents.day_complete"/>
                                <span>рабочих дней</span>
                            </div>
                        </div>

                        <div class="group text-center mt-4">
                            <button class="btn btn-blue btn-load" @click="createKp"> 
                                <span v-if="!create">Создать DOCX</span>
                                 <div v-if="create" class="loader">
                                    <svg class="circular" viewBox="25 25 50 50">
                                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </vue-modaltor>

        <!-- Template -->
        <vue-modaltor :visible="templateGet" @hide="templateGet = false" :resize-width='{1500:"50%", 1200:"60%",992:"70%",768:"80%", 500:"85%", 450:"93%"}' :closeScroll="false">
            <template slot="close-icon">
                <img src="@/assets/image/svg/delete.svg" alt="close">
            </template>
            <ChoseTemplate/>
        </vue-modaltor>
    </div>
</template>

<script>

//Word
import '@/assets/plugins/word/docxtemplater.js'
import '@/assets/plugins/word/pizzip.js'
import '@/assets/plugins/word/pizzip-utils.js'
import '@/assets/plugins/word/imagemodule.js'

import '@/assets/plugins/jszip/jszip.js'
import '@/assets/plugins/jszip/jszip-utils.js'



import { saveAs } from 'file-saver'

import ChoseTemplate from '@/components/ChoseTemplate.vue'

export default {
    data() {
        return {
            open: false,
            create: false,
            templateGet: false
        }
    },
    components: { ChoseTemplate },
    props: ['section', 'documents'],
    methods: {
        createKp() {

                var ctx = this;
                ctx.create = !ctx.create;

                let arData = ctx.section;
                let documents = ctx.documents;

                ctx.loadFile("https://b24apps.ru/local/b24apps/alexey/kp_stockwell/big_test/file.php",function(error,content){
                if (error) { throw error }

                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }

                function errorHandler(error) {
                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }


                function base64DataURLToArrayBuffer(dataURL) {
                    const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
                    if (!base64Regex.test(dataURL)) {
                        return false;
                    }
                    const stringBase64 = dataURL.replace(base64Regex, "");
                    let binaryString;
                    if (typeof window !== "undefined") {
                        binaryString = window.atob(stringBase64);
                    } else {
                        binaryString = new Buffer(stringBase64, "base64").toString("binary");
                    }
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        const ascii = binaryString.charCodeAt(i);
                        bytes[i] = ascii;
                    }
                    return bytes.buffer;
                }



                const imageOpts = {
                    getImage(tag) {
                        return base64DataURLToArrayBuffer(tag);
                    },
                    getSize() {
                        return [100, 100];
                    },
                };




                var imageModule = new ImageModule(imageOpts);

                var zip = new PizZip(content);
                var doc;
                try {
                    doc=new window.docxtemplater()
                    .loadZip(zip)
                    .attachModule(imageModule);
                } catch(error) {
                    errorHandler(error);
                }

                doc.setData({
                    "title_document": 'title_document',
                    "full_price": 'full_price',
                    "date_kp": 'date_kp',
                    "section": [
                        {
                            "title": "Лицензия Битрикс24",
                            "description": "На основании озвученных задач (до детального составления технического задания) оптимальным выбором может являться использование облачной версии Битрикс24 с тарифом «Команда».\n 1С-Битрикс позволяет переходить с одного тарифа на другой, а также при необходимости перейти в коробочную версию Битрикс24. \n",
                            "table_title": "Доработка портала Битрикс24",
                            "full_price": "57 480 ₽",
                            "products": [
                                {
                                    "index": 1,
                                    "active": true,
                                    "description_field": 'test',
                                    "roll": false,
                                    "product_title" :"'Битрикс24'. Облачная версия. Тариф «Команда»",
                                    "list_description": [
                                        { 'title_list_description': "- Указана стоимость за 1 месяц, при условии оформления подписки на 1 год." },
                                        { 'title_list_description': "- Разработка архитектуры решения" },
                                        { 'title_list_description': "- Формализация логики бизнес-процессов в архитектуре Битрикс24" },
                                        { 'title_list_description': "- Уточнение деталей с сотрудниками, принимающими участие в бизнес-процессах компании" },
                                    ],
                                    "price": "4 790 ₽/мес",
                                    "type_price": "₽",
                                    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIJBywfp3IOswAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAkUlEQVQY052PMQqDQBREZ1f/d1kUm3SxkeAF/FdIjpOcw2vpKcRWCwsRPMFPsaIQSIoMr5pXDGNUFd9j8TOn7kRW71fvO5HTq6qqtnWtzh20IqE3YXtL0zyKwAROQLQ5l/c9gHjfKK6wMZjADE6s49Dver4/smEAc2CuqgwAYI5jU9NcxhHEy60sni986H9+vwG1yDHfK1jitgAAAABJRU5ErkJggg=="
                                    //"image": "https://aokmo.ru/upload/iblock/7fe/road_sign_361513_960_720.jpg"

                                }
                            ]
                        },
                    ]
                });

                // doc.setData({
                //     "title_document": documents.title_document,
                //     "full_price": documents.full_price + " " + documents.type_price,
                //     "date_kp": documents.day_complete,
                //     "section": arData
                // });

                console.log(arData)

                try {
                    doc.render();
                }
                catch (error) {
                    errorHandler(error);
                }

                var out=doc.getZip().generate({
                    type:"blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                })


                saveAs(out,"kp.docx")

                ctx.create = !ctx.create;
            })
        },
        loadFile(url,callback){
            PizZipUtils.getBinaryContent(url,callback);
        },
    },
    computed: {
        fullPrice() {

            let price = 0;

            if (this.section) {
                for(let item of this.section) {

                    let price_section = 0;
                    for(let item_product of item.products) {
                        price += (+(String(item_product.price.replace(' ',''))))
                        price_section += (+(String(item_product.price.replace(' ','')))) //+price_section + (+item_product.price)
                    }

                    item.full_price = String(price_section).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
                }
            }

            this.documents.full_price = String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")

            return String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
        }
    },
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

    .btn-load
        min-width: 170px
        height: 45px

    .header-wrapper
        padding: 10px 0
        display: flex
        justify-content: flex-end
        width: 100%
        height: 65px

        .btn 
            margin-right: 15px

.group
    margin-bottom: 15px

    .title
        font-size: .9rem
        color: #0000008a

    &:last-child
        margin-bottom: 0
    span
        display: block

        &.full-price-section
            color: #000
            font-size: 1rem

    .price-document
        display: flex

        span
            width: 120px
            margin-right: 10px
        input
            width: 120px
            margin-right: 10px

</style>