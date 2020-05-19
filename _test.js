<div class="row">
            <div class="col-sm-12 block mt-30"  v-for="(item, index) in section" :key="index">
                <div class="title">
                    <h3><input type="text" v-model="item.TITLE"></h3>
                    <div class="setting">

                        <span v-if="index > 0"><img src="../assets/image/svg/arrow-top.svg" alt="top" @click="$emit('moveSection', index + '-top')"></span>
                        
                        <span v-if="index < section.length-1"><img src="../assets/image/svg/arrow-bottom.svg" alt="bottom" @click="$emit('moveSection', index + '-bottom')"></span>
                        
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
                                <button @click="addDescription(item)" class="btn btn-blue">Add</button>
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