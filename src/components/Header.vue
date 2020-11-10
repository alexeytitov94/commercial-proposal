<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="header-wrapper">
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
  </div>
</template>

<script>
import '@/assets/plugins/word/docxtemplater.js'
import '@/assets/plugins/word/pizzip.js'
import '@/assets/plugins/word/pizzip-utils.js'
import '@/assets/plugins/word/imagemodule.js'
import '@/assets/plugins/jszip/jszip.js'
import '@/assets/plugins/jszip/jszip-utils.js'

import { saveAs } from 'file-saver'

let br = `
                                                                                                                                                                                              
`

export default {
    data() {
        return {
            open: false,
            create: false,
            templateGet: false
        }
    },
    props: ['section', 'documents'],
    methods: {
        createKp() {

                var ctx = this;
                ctx.create = !ctx.create

                let arData = ctx.section
                let documents = ctx.documents

                arData = arData.map((item) => {
                    item.description = item.description.replace(/\n/g, br)
                    return item
                })

                console.log(arData)

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
                } catch(error) {
                    errorHandler(error);
                }

                doc.setData({
                    "title_document": documents.title_document,
                    "full_price": documents.full_price + " " + documents.type_price,
                    "date_kp": documents.day_complete,
                    "section": arData
                });

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

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--white);
  border-bottom: 1px solid var(--support-silver);
  z-index: 1000;

  .btn-load {
    min-width: 170px;
    height: 40px;
  }

  .header-wrapper {
      padding: 10px 0;
      display: flex;
      justify-content: flex-end;
      width: 100%;
  }
}

.group {
  margin-bottom: 15px;

  .title {
    font-size: 0.9rem;
    color: #000000;
  }

  &:last-child {
    margin-bottom: 0;
  }

  span {
    display: block;

    &.full-price-section {
      color: #000;
      font-size: 1rem;
    }
  }
  .price-document {
    display: flex;

    span {
      width: 120px;
      margin-right: 10px;
    }

    input {
      width: 120px;
      margin-right: 10px;
    }
  }
}
</style>