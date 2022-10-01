<script>
import Table from './components/Table.vue';
import AddNewData from './components/AddNewData.vue';
import { baseUrl } from './utils';
export default {
  components: { Table, AddNewData },
  data() {
    return {
      allData: [],
    }
  },
  methods: {
    async getAllData() {

      try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        this.allData = data;
      } catch (error) {
        console.log(error)
      }
    },
  },
  beforeMount() {
    this.getAllData();
  },
}
</script>

<template>
  <div class="App"> 
    <header>
      Нажмите дважды на строку, которую хотите изменить. <br>
      Для сортировки нажмите на шапку <br>
      После каждой 5й строки пагинация <br>
      Cервер работает на <a target="_blank" href="http://localhost:1050/table/">1050</a>
    </header>

    <main>
      <AddNewData :all-data="allData" :get-all-data="getAllData" />
      <Table :all-data="allData" :get-all-data="getAllData" />
    </main>
  </div>
</template>

<style scoped>
  .App{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header{
    padding-top: 1rem;
    margin-bottom: 8rem;
  }

</style>
