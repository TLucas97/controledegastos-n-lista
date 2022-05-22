<template>
  <div class="home py-4">
    <div>
      <h2>Controle de gastos</h2>
      <b-row class="mt-5 above-715">
        <b-col>
          <b-form-input
            name="Entrada"
            v-model="entries.item"
            placeholder="Entrada"
            label="Entrada"
          ></b-form-input>
        </b-col>
        <b-col>
          <money
            class="money-input"
            v-model="entries.value"
            v-bind="money"
          ></money>
        </b-col>
        <b-col cols="3">
          <b-button variant="success" @click="addIncome">Adicionar</b-button>
        </b-col>
      </b-row>
      <div class="under-715 mt-3">
        <b-row>
          <b-col>
            <b-form-input
              name="Entrada"
              v-model="entries.item"
              placeholder="Entrada"
              label="Entrada"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col>
            <money
              class="money-input"
              v-model="entries.value"
              v-bind="money"
            ></money>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button variant="success" @click="addIncome">Adicionar</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <b-form-input
              name="Saída"
              v-model="outcomes.item"
              placeholder="Saída"
              label="Saída"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col>
            <money
              class="money-input"
              v-model="outcomes.value"
              v-bind="money"
            ></money>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button variant="danger" @click="addOutcome">Adicionar</b-button>
          </b-col>
        </b-row>
      </div>
      <b-row class="my-4 above-715">
        <b-col>
          <b-form-input
            name="Saída"
            v-model="outcomes.item"
            placeholder="Saída"
            label="Saída"
          ></b-form-input>
        </b-col>
        <b-col>
          <money
            class="money-input"
            v-model="outcomes.value"
            v-bind="money"
          ></money>
        </b-col>
        <b-col cols="3">
          <b-button variant="danger" @click="addOutcome">Adicionar</b-button>
        </b-col>
      </b-row>
    </div>
    <div>
      <h3 v-if="hasItems" class="py-4">
        Resultados:
        <span :class="belowZero">R$ {{ result }}</span>
      </h3>
      <b-row>
        <b-col class="items-flex">
          <div v-for="(uau, index) in incomesArr" :key="index">
            <div class="item-value-card my-3 mx-3">
              <h5>
                <span class="font-weight-bold">{{ uau.item }}</span>
              </h5>
              <b-icon
                icon="currency-dollar"
                variant="success"
                style="height: 60px; width: 40px"
              ></b-icon>
              <h5>
                <span class="font-weight-bold">+R$ {{ uau.value }}</span>
              </h5>
              <b-icon
                @click="removeElement_income(index)"
                icon="trash-fill"
                variant="danger"
                class="mt-2"
                style="width: 60px; height: 30px; cursor: pointer"
              ></b-icon>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="items-flex">
          <div v-for="(uau, index) in outcomesArr" :key="index">
            <div class="item-value-card my-3 mx-3">
              <h5>
                <span class="font-weight-bold">{{ uau.item }}</span>
              </h5>
              <b-icon
                icon="currency-dollar"
                variant="danger"
                style="height: 60px; width: 40px"
              ></b-icon>
              <h5>
                <span class="font-weight-bold">-R$ {{ uau.value }}</span>
              </h5>
              <b-icon
                @click="removeElement_outcome(index)"
                icon="trash-fill"
                variant="danger"
                class="mt-2"
                style="width: 60px; height: 30px; cursor: pointer"
              ></b-icon>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { Money } from "v-money";

export default {
  name: "Home",
  components: {
    Money,
  },
  data() {
    return {
      belowZero: "text-success",
      editedIndex: -1,
      hasItems: false,
      result: null,
      incomesArr: [],
      outcomesArr: [],
      entries: {
        item: "",
        value: null,
      },
      outcomes: {
        item: "",
        value: null,
      },
      values: {
        value1: 0,
        value2: 0,
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    addIncome() {
      if (this.entries.value !== null && this.entries.item !== "") {
        const entriesCreation = Object.assign({}, this.entries);
        this.incomesArr.push(entriesCreation);

        let entries = this.incomesArr;
        let outcomes = this.outcomesArr;
        let incomesMap = entries.map((item) => parseInt(item.value));
        let outcomesMap = outcomes.map((item) => parseInt(item.value));

        if (incomesMap.length > 0 && outcomes.length === 0) {
          let sum = incomesMap.reduce((partialSum, a) => partialSum + a);
          this.result = sum;
        } else if (incomesMap.length > 0 && outcomes.length > 0) {
          let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
          let outcomesSum = outcomesMap.reduce(
            (partialSum, a) => partialSum + a
          );
          this.result = incomesSum - outcomesSum;
        }
        if (this.result < 0) {
          this.belowZero = "text-danger";
        } else {
          this.belowZero = "text-success";
        }
        this.entries.value = "";
        this.entries.item = "";
        this.hasItems = true;
      }
    },
    addOutcome() {
      if (this.outcomes.value !== null && this.outcomes.item !== "") {
        const outcomesCreation = Object.assign({}, this.outcomes);
        this.outcomesArr.push(outcomesCreation);

        let entries = this.incomesArr;
        let outcomes = this.outcomesArr;
        let incomesMap = entries.map((item) => parseInt(item.value));
        let outcomesMap = outcomes.map((item) => parseInt(item.value));

        if (outcomesMap.length > 0 && incomesMap.length === 0) {
          let sum = outcomesMap.reduce((partialSum, a) => partialSum + a);
          this.result = sum;
        } else if (incomesMap.length > 0 && outcomes.length > 0) {
          let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
          let outcomesSum = outcomesMap.reduce(
            (partialSum, a) => partialSum + a
          );
          this.result = incomesSum - outcomesSum;
        }
        if (this.result < 0) {
          this.belowZero = "text-danger";
        } else {
          this.belowZero = "text-success";
        }
        this.outcomes.value = "";
        this.outcomes.item = "";
        this.hasItems = true;
      }
    },
    removeElement_income(index) {
      this.incomesArr.splice(index, 1);

      let entries = this.incomesArr;
      let outcomes = this.outcomesArr;
      let incomesMap = entries.map((item) => parseInt(item.value));
      let outcomesMap = outcomes.map((item) => parseInt(item.value));

      if (incomesMap.length > 0 && outcomesMap.length === 0) {
        let sum = incomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = sum;
      } else if (incomesMap.length === 0 && outcomesMap.length > 0){
        let sum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = incomesMap - sum;
      } else if (incomesMap.length > 0 && outcomesMap.length > 0) {
        let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
        let outcomesSum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = incomesSum - outcomesSum;
      } else if (incomesMap.length === 0 && outcomesMap.length === 0) {
        this.result = 0;
        this.hasItems = false;
      }
      if (this.result < 0) {
        this.belowZero = "text-danger";
      } else {
        this.belowZero = "text-success";
      }
      this.entries.value = "";
      this.entries.item = "";
    },

    removeElement_outcome(index) {
      this.outcomesArr.splice(index, 1);

      let entries = this.incomesArr;
      let outcomes = this.outcomesArr;
      let incomesMap = entries.map((item) => parseInt(item.value));
      let outcomesMap = outcomes.map((item) => parseInt(item.value));

      if (outcomes.length > 0 && incomesMap.length === 0) {
        let sum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = incomesMap - sum;
      } else if (outcomes.length === 0 && incomesMap.length > 0){
        let sum = incomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = sum;
      } else if (incomesMap.length > 0 && outcomesMap.length > 0) {
        let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
        let outcomesSum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = incomesSum - outcomesSum;
      } else if (incomesMap.length === 0 && outcomesMap.length === 0) {
        this.result = 0;
        this.hasItems = false;
      }
      if (this.result < 0) {
        this.belowZero = "text-danger";
      } else {
        this.belowZero = "text-success";
      }
      this.entries.value = "";
      this.entries.item = "";
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 45%;
  margin: 0 auto;
}

/* .borders {
  border: 1px solid gray;
  align-items: center;
  padding: 0.5em;
} */

.item-value-card {
  width: 220px !important;
  padding: 1em;
  background: #d1f0ff;
  border-radius: 15px;
}

.items-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
}

.money-input {
  border: 1px solid rgba(128, 128, 128, 0.329);
  padding: 0.4em;
  border-radius: 7px;
  transition: 0.3s;
  width: 100%;
}

@media (max-width: 715px) {
  .above-715 {
    display: none;
  }

  .under-mt {
    margin-top: 0.4em;
  }

  h5 {
    font-size: 1rem;
  }

  .home {
    max-width: 70%;
  }
}
@media (min-width: 715px) {
  .under-715 {
    display: none;
  }
}
</style>
