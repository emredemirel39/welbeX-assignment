<script>
import { baseUrl, getDate, checkValidation, validateConditions } from '../utils';

export default {
    name: 'SingleData',
    props: {
        data: Object,
        getAllData: Function,
        handleEditData: Function,
        cancelEditData: Function,
        editingDataId: String,
    },
    data() {
        return {
            url: `${baseUrl}/${this.data.id}`
        }
    },
    computed: {
        editingData() {
            return ({
                name: this.data.name,
                quantity: this.data.quantity,
                distance: this.data.distance
            })
        }
    },
    methods: {
        async deleteData() {

            try {

                const response = await fetch(this.url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseData = await response.json();

                if (response.status === 200) {
                    await this.getAllData();
                } else alert('Error while deleting data!');

            } catch (error) {
                console.log(error);
            }
        },
        async saveData() {

            const isEditingDataValid = checkValidation(this.editingData, validateConditions);

            if (!isEditingDataValid) {
                return;
            };

            try {

                const response = await fetch(this.url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...this.editingData,
                        date: getDate(),
                    })
                });

                const responseData = await response.json();

                if (response.status === 200) {
                    this.getAllData();
                    alert('Successful!');
                    this.cancelEditData();
                } else alert('Error while editing data!');
                
            } catch (error) {
                console.log(error);
            };
        },
    },
    
}
</script>

<template >
    <tr @dblclick="handleEditData" :id="data.id" class="table__row" >
        <td class="table__col" data-label="Date">{{data.date}}</td>
        <td class="table__col" data-label="Name">
            <input v-if="data.id.toString() === editingDataId.toString()" class="table__col" v-model="editingData.name" type="text" />
            <p v-else >{{data.name}}</p>
        </td>
        <td class="table__col" data-label="Quantity">
            <input v-if="data.id.toString() === editingDataId.toString()" class="table__col" v-model="editingData.quantity" type="text" />
            <p v-else >{{data.quantity}}</p>
        </td>
        <td class="table__col" data-label="Distance">
            <input v-if="data.id.toString() === editingDataId.toString()" class="table__col" v-model="editingData.distance" type="text" />
            <p v-else >{{data.distance}}</p>
        </td>
        <span class="table__edit-btn-box" v-if="data.id.toString() === editingDataId.toString()">
            <button @click="cancelEditData">Cancel</button>
            <button @click="saveData">Save</button>
            <button @click="deleteData">Delete</button>
        </span>
    </tr>
    
</template>

<style lang="scss" scoped>
.table__col{

        input{
            max-width: 100%;
            border: none;
            outline: none;
        }
    }

    .table__edit-btn-box{
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        gap: 8px;

        button{
            padding: 6px 4px;
            border: none;
            outline: none;

            &:first-child{
                background-color: #ffc107;
            }

            &:nth-child(2){
                background-color: #4ADE80;
            }

            &:last-child{
                background-color: #dc3545;
            }
        }
    }
</style>