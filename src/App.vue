<template>
  <div id="app">
    <div id="center1">
      <h1 id="centre">Feature Comparision</h1>
      <label class="button1" id="middle" v-show="homePage"
        >Files
        <input
          type="file"
          id="files"
          ref="files"
          multiple
          v-on:change="handleFilesUpload()"
        />
      </label>

      <div
        v-for="(file, key) in files"
        :key="file.name"
        class="file-listing"
        v-show="homePage"
        id="middle2"
      >
        {{ file.name }}
        <button class="remove-file button1" v-on:click="removeFile(key)">
          Remove
        </button>
      </div>
      <!-- <button v-on:click="addFiles()" v-show="homePage">Add Files</button> -->
      <button
        v-on:click="onClicked()"
        id="last"
        class="button1"
        v-show="homePage"
      >
        <router-link to="/users">Compare</router-link>
      </button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
// import "babel-polyfill";
// import "./app";
import XLSX from "xlsx";
import gql from "graphql-tag";

export default {
  data() {
    return {
      files: [],
      result_final: []
    };
  },
  methods: {
    async onClicked() {
      console.log(this.result_final);
      await this.$apollo.mutate({
        mutation: gql`
          mutation($label: [EventInput]) {
            createEvent(eventInput: $label) {
              name
              SUM_INSURED_
              NORMAL_ROOM_RENT_LIMIT_
              ICU_RENT_LIMIT_
              CO_PAY_CLAUSE_
              COVID_19_HOSPITALISATION_
              CAPPING_ON_AILMENTS_
              NEW_BORN_BABY_COVERAGE_FROM_DAY_1_
              PRE_AND_POST_NATAL_COVERAGE_
              AGE_BRACKET_
              CONGENITAL_DISEASE_
              CORPORATE_BUFFER_
              DAY_CARE_PROCEDURES_
              CLAIMS_INTIMATION_
              RE_IMBURSEMENT_CLAIMS_REPORTING_SUBMITTING_PERIOD_
              ORGAN_DONAR_EXPENSES_
              PREMIUM_CALCULATION_
              THIRD_PARTY_ADMINISTRATOR_TPA_
              LASIK_TREATMENT_
              DENTAL_TREATMENT_
              SPECIFIC_TREATMENTS_
              CASHLESS_CLAIMS_
              Quote_
              GST_
              Quote_Including_GST_
              EMERGENCY_AMBULANCE_CHARGES_
              PRE_AND_POST_HOSPITALIZATION_COVERAGE_
              MATERNITY_BENEFITS_LIMITS_AND_COVERAGES_
              _9_MONTHS_WAITING_PERIOD_FOR_MATERNITY_
              _1ST_2ND_AND_4TH_YEAR_EXCLUSION_CLAUSE_
              _1ST_30_DAYS_EXCLUSION_CLAUSE_
              PRE_EXISTING_DISEASE_
              DOMICILIARY_HOSPITALIZATION_COVER_
              HOSPITALIZATION_INJURY_ARISING_OUT_TERRORISM_
            }
          }
        `,
        variables: {
          label: this.result_final
        },
        refetchQueries: [
          {
            query: gql`
              query {
                events {
                  name
                  SUM_INSURED_
                  NORMAL_ROOM_RENT_LIMIT_
                  ICU_RENT_LIMIT_
                  CO_PAY_CLAUSE_
                  COVID_19_HOSPITALISATION_
                  CAPPING_ON_AILMENTS_
                  NEW_BORN_BABY_COVERAGE_FROM_DAY_1_
                  PRE_AND_POST_NATAL_COVERAGE_
                  AGE_BRACKET_
                  CONGENITAL_DISEASE_
                  CORPORATE_BUFFER_
                  DAY_CARE_PROCEDURES_
                  CLAIMS_INTIMATION_
                  RE_IMBURSEMENT_CLAIMS_REPORTING_SUBMITTING_PERIOD_
                  ORGAN_DONAR_EXPENSES_
                  PREMIUM_CALCULATION_
                  THIRD_PARTY_ADMINISTRATOR_TPA_
                  LASIK_TREATMENT_
                  DENTAL_TREATMENT_
                  SPECIFIC_TREATMENTS_
                  CASHLESS_CLAIMS_
                  Quote_
                  GST_
                  Quote_Including_GST_
                  EMERGENCY_AMBULANCE_CHARGES_
                  PRE_AND_POST_HOSPITALIZATION_COVERAGE_
                  MATERNITY_BENEFITS_LIMITS_AND_COVERAGES_
                  _9_MONTHS_WAITING_PERIOD_FOR_MATERNITY_
                  _1ST_2ND_AND_4TH_YEAR_EXCLUSION_CLAUSE_
                  _1ST_30_DAYS_EXCLUSION_CLAUSE_
                  PRE_EXISTING_DISEASE_
                  DOMICILIARY_HOSPITALIZATION_COVER_
                  HOSPITALIZATION_INJURY_ARISING_OUT_TERRORISM_
                }
              }
            `
          }
        ]
      });
    },

    addFiles() {
      this.$refs.files.click();
    },

    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }

      var f = uploadedFiles[0];
      var reader = new FileReader();

      reader.onload = e => {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: "binary"
        });

        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[firstSheet]
        );

        // Get the list of companies.
        var companies = Object.keys(excelRows[0]);
        companies.shift();

        var result = [];
        for (var i = 0; i < companies.length; i++) {
          result.push({ name: companies[i] });
        }

        //Add the data rows from Excel file.
        // First row contains the struct name.
        for (var i = 1; i < excelRows.length; i++) {
          var feature = excelRows[i]["Features"];
          for (var j = 0; j < companies.length; j++) {
            result[j][feature] = excelRows[i][companies[j]];
          }
        }
        var final_event = [];
        for (var i = 0; i < result.length; i++) {
          var temp = result[i];
          Object.keys(temp).forEach(key => {
            var replacedKey = key
              .trim()

              .replace(/\s\s+/g, "_");
            if (key !== replacedKey) {
              temp[replacedKey] = temp[key];
              delete temp[key];
            }
          });
          console.log(temp);
          final_event.push(temp);
        }
        // console.log("res", result);
        //this.result_final = final_event;
        this.result_final = JSON.parse(
          JSON.stringify(final_event).replace(/\s(?=\w+":)/g, "")
        );

        // this.result_final = JSON.stringify(final_event);
        console.log("res ===>", this.result_final);
      };
      reader.readAsBinaryString(f);
    },
    removeFile(key) {
      this.files.splice(key, 1);
    }
  },
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"
    );
    document.head.appendChild(externalScript);
  },
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/xlsx.full.min.js"
    );
    document.head.appendChild(externalScript);
  },
  apollo: {
    events: gql`
      query {
        events {
          name
          SUM_INSURED_
          NORMAL_ROOM_RENT_LIMIT_
          ICU_RENT_LIMIT_
          CO_PAY_CLAUSE_
          COVID_19_HOSPITALISATION_
          CAPPING_ON_AILMENTS_
          NEW_BORN_BABY_COVERAGE_FROM_DAY_1_
          PRE_AND_POST_NATAL_COVERAGE_
          AGE_BRACKET_
          CONGENITAL_DISEASE_
          CORPORATE_BUFFER_
          DAY_CARE_PROCEDURES_
          CLAIMS_INTIMATION_
          RE_IMBURSEMENT_CLAIMS_REPORTING_SUBMITTING_PERIOD_
          ORGAN_DONAR_EXPENSES_
          PREMIUM_CALCULATION_
          THIRD_PARTY_ADMINISTRATOR_TPA_
          LASIK_TREATMENT_
          DENTAL_TREATMENT_
          SPECIFIC_TREATMENTS_
          CASHLESS_CLAIMS_
          Quote_
          GST_
          Quote_Including_GST_
          EMERGENCY_AMBULANCE_CHARGES_
          PRE_AND_POST_HOSPITALIZATION_COVERAGE_
          MATERNITY_BENEFITS_LIMITS_AND_COVERAGES_
          _9_MONTHS_WAITING_PERIOD_FOR_MATERNITY_
          _1ST_2ND_AND_4TH_YEAR_EXCLUSION_CLAUSE_
          _1ST_30_DAYS_EXCLUSION_CLAUSE_
          PRE_EXISTING_DISEASE_
          DOMICILIARY_HOSPITALIZATION_COVER_
          HOSPITALIZATION_INJURY_ARISING_OUT_TERRORISM_
        }
      }
    `
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
#middle {
  margin-left: 440px;
}
#middle2 {
  margin-left: 440px;
  margin-top: 30px;
}
#last {
  margin-left: 440px;
  margin-top: 30px;
}
#centre {
  margin-left: 440px;
}
</style>
