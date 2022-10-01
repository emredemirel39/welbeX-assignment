<script>
import { baseUrl, getDate, validateConditions, checkValidation } from '../utils';

export default {
    name: 'AddNewData',
    props: {
        allData: Array,
        getAllData: Function,
    },
    data() {
        return {
            form: {
                name: '',
                quantity: '',
                distance: '',
            }
        }
    },
    methods: {
        async addNewData() {

            const isFormValid = checkValidation(this.form, validateConditions);

            if (!isFormValid) {
                this.$refs.formRef.reset();
                this.resetForm();
                return; 
            }

            try {

                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...this.form,
                        date: getDate()
                    })
                });

                const responseData = await response.json();

                if (response.status === 201) {
                    this.allData.push(responseData);
                    alert('Successful!')
                    this.$refs.formRef.reset();
                    this.resetForm();
                } else alert('Error while adding data');

            } catch (error) {
                console.error(error);
            }
        },
        resetForm() {
            for (const key in this.form) {
                this.form[key] = '' ;
            }

        },
    },
}
</script>

<template>
    <form ref="formRef" class="form" @submit.prevent="addNewData" >
        <span class="form__input-box">
            <label>Дата</label>
            <input v-model="form.name" type="text">
        </span>
        <span class="form__input-box">
            <label>Количество</label>
            <input v-model="form.quantity" type="text">
        </span>
        <span class="form__input-box">
            <label>Расстояние</label>
            <input v-model="form.distance" type="text">
        </span>
        <button>Добавить</button>
    </form>
</template>

<style lang="scss" scoped>
.form{
    display: flex;
    border-collapse: collapse;
    margin-bottom: 3rem;
    
    &__input-box{
        display: flex;
        flex-direction: column;

        label{
            background-color: #06B6D4;
        }

        label, input{
            padding: 8px 14px;
            border: 1px solid gray;
            text-align: center;
        }

        &:nth-child(2){
            label, input{
                border-right: none !important;
                border-left: none !important;
            }
        }

        label{
            border-bottom: none !important;
        }
    }

    button{
        margin-left: 1rem;
        height: fit-content;
        margin-top: auto;
        margin-bottom: 0px;
        padding: 8px 4px;
        border: none;
        outline: none;
        background-color: #4ADE80;
    }
}
</style>