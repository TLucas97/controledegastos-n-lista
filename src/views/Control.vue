<template>
  <div class="control py-4">
    <div>
      <h2>Controle de gastos</h2>
      <small>Administre seus gastos mensais!</small>
      <b-row class="mt-5 above-715">
        <b-col>
          <b-form-input
            name="Entrada"
            v-model="entries.item"
            placeholder="Ex: Salário"
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
              placeholder="Ex: Salário"
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
              placeholder="Ex: Aluguel"
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
            placeholder="Ex: Aluguel"
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
        Renda atual:
        <span :class="belowZero">R$ {{ result }}</span>
      </h3>
      <b-row>
        <b-col>
          <zoom-center-transition group :duration="400" class="items-flex">
            <div v-for="(incomes, index) in incomesArr" :key="index">
              <div class="item-value-card my-3 mx-3" v-show="animation">
                <h5>
                  <span class="font-weight-bold">{{ incomes.item }}</span>
                </h5>
                <b-icon
                  icon="currency-dollar"
                  variant="success"
                  style="height: 60px; width: 40px"
                ></b-icon>
                <h5>
                  <span class="font-weight-bold">+R$ {{ incomes.value }}</span>
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
          </zoom-center-transition>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="items-flex">
          <zoom-center-transition group :duration="400" class="items-flex">
            <div v-for="(outcomes, index) in outcomesArr" :key="index">
              <div class="item-value-card my-3 mx-3" v-show="animation">
                <h5>
                  <span class="font-weight-bold">{{ outcomes.item }}</span>
                </h5>
                <b-icon
                  icon="currency-dollar"
                  variant="danger"
                  style="height: 60px; width: 40px"
                ></b-icon>
                <h5>
                  <span class="font-weight-bold">-R$ {{ outcomes.value }}</span>
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
          </zoom-center-transition>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { Money } from "v-money";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  name: "control",
  components: {
    Money,
    ZoomCenterTransition,
  },
  data() {
    return {
      belowZero: "text-success",
      editedIndex: -1,
      hasItems: false,
      animation: false,
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
      if (
        this.entries.value !== null &&
        this.entries.value !== 0 &&
        this.entries.item !== ""
      ) {
        const entriesCreation = Object.assign({}, this.entries);
        this.incomesArr.push(entriesCreation);
        this.animation = true;

        let entries = this.incomesArr;
        let outcomes = this.outcomesArr;
        let incomesMap = entries.map((item) => item.value);
        let outcomesMap = outcomes.map((item) => item.value);

        if (incomesMap.length > 0 && outcomes.length === 0) {
          let sum = incomesMap.reduce((partialSum, a) => partialSum + a);
          this.result = sum.toFixed(2);
        } else if (incomesMap.length > 0 && outcomes.length > 0) {
          let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
          let outcomesSum = outcomesMap.reduce(
            (partialSum, a) => partialSum + a
          );
          const minus = incomesSum - outcomesSum;
          this.result = minus.toFixed(2);
        }
        if (this.result < 0) {
          this.belowZero = "text-danger";
        } else {
          this.belowZero = "text-success";
        }
        this.entries.value = "";
        this.entries.item = "";
        this.hasItems = true;
        this.$toast.success("Entrada adicionada com sucesso", {
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
    addOutcome() {
      if (this.outcomes.value !== null && this.outcomes.item !== "") {
        const outcomesCreation = Object.assign({}, this.outcomes);
        this.outcomesArr.push(outcomesCreation);

        let entries = this.incomesArr;
        let outcomes = this.outcomesArr;
        let incomesMap = entries.map((item) => item.value);
        let outcomesMap = outcomes.map((item) => item.value);

        if (outcomesMap.length > 0 && incomesMap.length === 0) {
          let sum = outcomesMap.reduce((partialSum, a) => partialSum + a);
          const minus = incomesMap - sum;
          this.result = minus.toFixed(2);
        } else if (incomesMap.length > 0 && outcomes.length > 0) {
          let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
          let outcomesSum = outcomesMap.reduce(
            (partialSum, a) => partialSum + a
          );
          const minus = incomesSum - outcomesSum;
          this.result = minus.toFixed(2);
        }
        if (this.result < 0) {
          this.belowZero = "text-danger";
        } else {
          this.belowZero = "text-success";
        }
        this.outcomes.value = "";
        this.outcomes.item = "";
        this.hasItems = true;
        this.$toast.success("Saída adicionada com sucesso", {
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
    removeElement_income(index) {
      this.incomesArr.splice(index, 1);

      let entries = this.incomesArr;
      let outcomes = this.outcomesArr;
      let incomesMap = entries.map((item) => item.value);
      let outcomesMap = outcomes.map((item) => item.value);

      if (incomesMap.length > 0 && outcomesMap.length === 0) {
        let sum = incomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = sum.toFixed(2);
      } else if (incomesMap.length === 0 && outcomesMap.length > 0) {
        let sum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        const minus = incomesMap - sum;
        this.result = minus.toFixed(2);
      } else if (incomesMap.length > 0 && outcomesMap.length > 0) {
        let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
        let outcomesSum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        const minus = incomesSum - outcomesSum;
        this.result = minus.toFixed(2);
      } else if (incomesMap.length === 0 && outcomesMap.length === 0) {
        this.result = 0;
        this.hasItems = false;
      }
      if (this.result < 0) {
        this.belowZero = "text-danger";
      } else {
        this.belowZero = "text-success";
      }
      this.$toast.success("Entrada removida com sucesso", {
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

    removeElement_outcome(index) {
      this.outcomesArr.splice(index, 1);

      let entries = this.incomesArr;
      let outcomes = this.outcomesArr;
      let incomesMap = entries.map((item) => item.value);
      let outcomesMap = outcomes.map((item) => item.value);

      if (outcomes.length > 0 && incomesMap.length === 0) {
        let sum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        const minus = incomesMap - sum;
        this.result = minus.toFixed(2);
      } else if (outcomes.length === 0 && incomesMap.length > 0) {
        let sum = incomesMap.reduce((partialSum, a) => partialSum + a);
        this.result = sum.toFixed(2);
      } else if (incomesMap.length > 0 && outcomesMap.length > 0) {
        let incomesSum = incomesMap.reduce((partialSum, a) => partialSum + a);
        let outcomesSum = outcomesMap.reduce((partialSum, a) => partialSum + a);
        const minus = incomesSum - outcomesSum;
        this.result = minus.toFixed(2);
      } else if (incomesMap.length === 0 && outcomesMap.length === 0) {
        this.result = 0;
        this.hasItems = false;
      }
      if (this.result < 0) {
        this.belowZero = "text-danger";
      } else {
        this.belowZero = "text-success";
      }
      this.$toast.success("Saída removida com sucesso", {
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
  },
};
</script>

<style scoped>
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

  .control {
    max-width: 70%;
  }
}
@media (min-width: 715px) {
  .under-715 {
    display: none;
  }
}
</style>
