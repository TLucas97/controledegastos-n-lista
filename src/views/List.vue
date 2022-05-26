<template>
  <div class="control py-4">
    <div>
      <h4>Lista de compras</h4>
      <small>Administre suas compras no mercado!</small>
      <div class="pt-4">
        <b-row>
          <b-col class="text-start"
            ><label for="item">Adicionar item</label></b-col
          >
        </b-row>
        <b-row>
          <b-col>
            <b-form-input
              v-model="newItems.item"
              name="item"
              placeholder="Ex: Café"
            ></b-form-input>
          </b-col>
          <b-col>
            <money
              class="money-input"
              v-model="newItems.value"
              v-bind="money"
            ></money>
          </b-col>
        </b-row>
        <b-button variant="success" class="mt-3" @click="addShoppingItem">
          <b-icon icon="plus-lg"></b-icon>
        </b-button>
      </div>
      <h5 v-if="resultView" class="pt-3">
        Total em compras: <span class="price-result">R$ {{ result }}</span>
      </h5>
      <b-row
        class="pt-5 line-table"
        v-for="(item, index) in items"
        :key="index"
      >
        <b-col cols="8" class="text-start">
          <p>
            {{ item.item }}
            <span class="price-result">(R$ {{ item.value }})</span>
          </p>
        </b-col>
        <b-col class="text-end">
          <b-icon
            style="cursor: pointer"
            @click="removeShoppingItem(index)"
            icon="trash"
          ></b-icon>
        </b-col>
        <b-col class="text-end">
          <b-icon
            style="cursor: pointer"
            @click="showModal = true"
            icon="pen"
          ></b-icon>
          <b-modal v-model="modalShow" hide-footer hide-header>
            <h4 class="mb-2">Edite o item</h4>
            <b-form-input
              v-model="editedItem"
              name="Item"
              placeholder="Ex: Café"
            ></b-form-input>
            <money
              class="money-input my-2"
              v-model="editedValue"
              v-bind="money"
            ></money>
            <b-button @click="editItem(index)">Salvar</b-button>
          </b-modal>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { Money } from "v-money";

export default {
  components: {
    Money,
  },
  data() {
    return {
      modalShow: false,
      counter: 0,
      editedItem: null,
      editedValue: null,
      result: null,
      resultView: false,
      counterView: false,
      items: [],
      sumItems: [],
      item: "",
      newItems: {
        item: "",
        value: null,
      },
      money: {
        decimal: ".",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    addShoppingItem() {
      if (
        this.newItems.item !== "" &&
        this.newItems.value !== null &&
        this.newItems.value !== undefined &&
        this.newItems.value !== 0
      ) {
        const copies = Object.assign({}, this.newItems);
        this.items.push(copies);
        let itemsMap = this.items.map((item) => item.value);
        let sum = itemsMap.reduce((partialSum, a) => partialSum + a);
        console.log(sum);
        this.result = sum.toFixed(2);
        this.resultView = true;
        this.newItems.item = "";
        this.newItems.value = undefined;
        this.$toast.success("Item adicionado", {
          position: "top-right",
          timeout: 2391,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.39,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
        });
      } else {
        this.$toast.warning("Preencha todos os dados para adicionar", {
          position: "top-right",
          timeout: 2391,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.39,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
        });
      }
    },
    removeShoppingItem(index) {
      this.items.splice(index, 1);
      let itemsMap = this.items.map((item) => item.value);
      if (itemsMap.length > 0) {
        let sum = itemsMap.reduce((partialSum, a) => partialSum + a);
        this.result = sum.toFixed(2);
      } else {
        this.resultView = false;
      }
      this.$toast.success("Item removido", {
        position: "top-right",
        timeout: 2391,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.39,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        icon: true,
        rtl: false,
      });
    },
    editItem(index) {
      if (
        this.editedItem !== null &&
        this.editedValue !== null &&
        this.editedValue !== 0
      ) {
        const copies = Object.assign({}, this.newItems);
        this.items.splice(index, 1);
        copies.item = this.editedItem;
        copies.value = this.editedValue;
        this.items.push(copies);
        let itemsMap = this.items.map((item) => item.value);
        if (itemsMap.length > 0) {
          let sum = itemsMap.reduce((partialSum, a) => partialSum + a);
          this.result = sum.toFixed(2);
        } else {
          this.resultView = false;
        }
        this.modalShow = false;
        this.$toast.success("Item editado com sucesso", {
          position: "top-right",
          timeout: 2391,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.39,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
        });
      } else {
        this.$toast.warning("Preencha todos os dados para salvar", {
          position: "top-right",
          timeout: 2391,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.39,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
        });
      }
    },
  },
};
</script>

<style scoped>
.line-table {
  padding-bottom: 0.1em;
  border-bottom: 1px solid black;
}

.money-input {
  border: 1px solid rgba(128, 128, 128, 0.329);
  padding: 0.4em;
  border-radius: 7px;
  transition: 0.3s;
  width: 100%;
}

.price {
  color: green;
  font-size: 0.5rem;
}

.price-result {
  color: green;
}

@media (max-width: 715px) {
  .control {
    max-width: 85%;
  }
  h5 {
    font-size: 0.89rem;
  }
}
</style>
