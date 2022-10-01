<script>
import SingleData from './SingleData.vue';

export default {
    name: 'Table',
    props: {
        allData: Array,
        getAllData: Function,
    },
    components:{SingleData},
    data() {
        return {
            sortBy: '',
            sortRank: 'lower',
            filterConditions: {
                column: '',
                condition: '',
                value: ''
            },
            page: 1,
            perPage: 5,
            pages: [],
            editingDataId: '',
        }
    },

    computed: {
        filteredData() {

            let returnData = '';
            const { column, condition, value } = this.filterConditions;
            this.page = 1;

            switch (condition) {

                case 'equal':

                    returnData = this.allData.filter(data => {
                        
                        return data[column].toLowerCase() === value.toLowerCase();

                    });
                    
                    break;

                case 'include':

                    returnData = this.allData.filter(data => {

                        return data[column].toLowerCase().includes(value.toLowerCase());

                    });
                    
                    break;

                case 'more':

                    returnData = this.allData.filter(data => {

                        return Number(data[column]) > Number(value);

                    });

                    break;

                case 'less':

                    returnData = this.allData.filter(data => {

                        return Number(data[column]) < Number(value);

                    });

                    break;
            
                default:
                    returnData = this.allData
                    break;
            }

            return returnData;
            
        },
        sortedData() {

            const sortBy = this.sortBy;
            let returnValue = this.filteredData;

            // Sorty by distance
            if (sortBy === 'distance') {
                this.sortRank === 'lower' ? returnValue = this.filteredData.sort((a, b) => Number(a.distance) - Number(b.distance))
                    : returnValue = this.filteredData.sort((a, b) => Number(b.distance) - Number(a.distance));

            };

            //Sort by Quantity
            if (sortBy === 'quantity') {
                this.sortRank === 'lower' ? returnValue = this.filteredData.sort((a, b) => Number(a.quantity) - Number(b.quantity))
                    : returnValue = this.filteredData.sort((a, b) => Number(b.quantity) - Number(a.quantity));

            };

            // Sort by Name
            if (sortBy === 'name') {
                this.sortRank === 'lower'
                    ? returnValue = this.filteredData.sort((a, b) => {
                        if (a.name < b.name) return -1
                        if (a.name > b.name) return 1
                        return 0
                    })
                    : returnValue = this.filteredData.sort((a, b) => {
                        if (a.name > b.name) return -1
                        if (a.name < b.name) return 1
                        return 0
                    });

            };

            return this.paginate(returnValue);
        }
    },

    methods: {
        
        handleSort() {
            this.cancelEditData();
            this.sortBy = event.target.getAttribute('data-sort');
            this.sortRank === 'lower' ? this.sortRank = 'higher' : this.sortRank = 'lower';
        },
        setPages() {
            let numberOfPages = Math.ceil(this.filteredData.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate(filteredData) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return filteredData.slice(from, to);
        },
        handleNext() {
            this.cancelEditData();
            const lastPage = Math.ceil(this.filteredData.length / this.perPage);

            if (this.page === lastPage) {
                return;
            }
            else {
                this.page++;
            }
        },
        handlePrev() {
            this.cancelEditData();
            if (this.page === 1) {
                return;
            }
            else {
                this.page--;
            }
        },
        handleEditData(e) {
            this.editingDataId = e.currentTarget.id;
        },
        cancelEditData() {
            this.editingDataId = '';
        },
        resetFilters() {
            this.$refs.filterRef.reset();
            this.$refs.columnFilterRef.selectedIndex = 0;
            this.$refs.conditionFilterRef.selectedIndex = 0;

            for (const key in this.filterConditions) {
                this.filterConditions[key] = '';
            };
        },
    },
}
</script>

<template>
    <div class="wrapper container">

        <form ref="filterRef" @submit.prevent="resetFilters" class="filter-box">
            <span class="filter-box__column-opts">
                <label>Column</label>
                <select ref="columnFilterRef" v-model="filterConditions.column">
                    <option disabled value="">Выберите колонку</option>
                    <option value="name">Название</option>
                    <option value="quantity">Количество</option>
                    <option value="distance">Расстояние</option>
                </select>
            </span>
            <span class="filter-box__condition-opts">
                <label>Условие</label>
                <select ref="conditionFilterRef" v-model="filterConditions.condition">
                    <option disabled value="">Выберите условие</option>
                    <option value="equal">Равно</option>
                    <option value="include">Содержит</option>
                    <option value="more">Больше</option>
                    <option value="less">Меньше</option>
                </select>
            </span>
            <span class="filter-box__text-input">
                <label>Поиск</label>
                <input v-model="filterConditions.value" type="text">
            </span>
            <button class="filter-box__reset-btn">Сбросить</button>
        </form>

        <nav class="pagination">
            <button @click="handlePrev">Пред</button>
            <button @click="handleNext">След</button>
        </nav>

        <table class="table">
            <thead class="table__header table__row">
                <th data-sort="date" @click="handleSort()" class="table__col">Дата</th>
                <th data-sort="name" @click="handleSort()" class="table__col">Название</th>
                <th data-sort="quantity" @click="handleSort()" class="table__col">Количество</th>
                <th data-sort="distance" @click="handleSort()" class="table__col">Расстояние</th>
            </thead>
            <tbody>
                <SingleData v-for="data in sortedData" 
                 :key="data.id" 
                 :handleEditData="handleEditData" 
                 :cancelEditData="cancelEditData"
                 :editingDataId="editingDataId" 
                 :getAllData="getAllData"
                 :data="data"
                >
                </SingleData>
            </tbody>
        </table>

    </div>
</template>

<style lang="scss">
.pagination {

    margin-bottom: 4px;

    button{
        outline: none;
        border: none;
        padding: 8px;
        font-weight: bold;
        background: none;
    }

    button:last-child {
        margin-left: 10px;
    }

}

.filter-box{
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    gap: 8px;

    input, select{
        height: 22px;
        padding: 2px 6px;
    }

    &__column-opts, &__condition-opts, &__text-input{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    &__reset-btn{
        height: fit-content;
        padding: 4px 6px;
        outline: none;
        border: none;
        background-color: #ffc107;
        margin-top: auto;
        margin-bottom: 0px;
    }
   
}

    .table{

        border-collapse: collapse;

        &__header{
            background-color: #06B6D4;

            th{
                cursor: pointer;
            }
        }

        &__col{
            width: 180px;
            height: 40px;
            border: 1px solid gray;
            text-align: center;
        }
    }
</style>