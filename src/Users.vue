<template>
  <div>
    <div class="hover-table-layout">
      <FinalList v-for="event in events" :key="event.name" :event="event" />
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import FinalList from "./FinalList.vue";

export default {
  name: "User",
  components: {
    FinalList
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
  }
};
</script>
<style>
body {
  background: #5d3f6a;
  font-family: "Source Sans Pro", sans-serif;
}
#title {
  text-align: center;
  color: white;
  font-size: 30px;
  text-transform: uppercase;
  margin-top: 100px;
}
.hover-table-layout {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}
.listing-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  float: left;
  background: #fff;
  border-radius: 10px;
  z-index: 0;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
}
.listing-item:hover,
.listing-item.active {
  -webkit-transform: scale(1.03);
  -moz-transform: scale(1.03);
  transform: scale(1.03);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  z-index: 2;
}
.listing-item .listing {
  padding: 20px;
  position: relative;
}
.listing-item .listing:before {
  content: "";
  position: absolute;
  top: -15px;
  left: -o-calc(50% - 15px);
  left: -moz-calc(50% - 15px);
  left: -webkit-calc(50% - 15px);
  left: calc(50% - 15px);
  border-bottom: 20px solid #fff;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
figure.image img {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
figure.image {
  position: relative;
  margin: 0;
  padding: 0;
}
figure.image figcaption {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  bottom: 4px;
  background: rgba(0, 0, 0, 0.6);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
figcaption .caption {
  position: relative;
  top: 50%;
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
figcaption h1 {
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
}
figcaption p {
  color: white;
  font-size: 12px;
}
.listing h4 {
  font-size: 13px;
  text-align: center;
  padding: 5px 10px;
  font-weight: bold;
}
.listing h4:not(:last-child) {
  border-bottom: 1px solid #ccc;
}
.listing-item:hover figure.image figcaption {
  background: rgba(195, 39, 43, 0.6);
}
@media only screen and (min-width: 540px) {
  .listing-item {
    display: block;
    width: -webkit-calc(100%/3);
    width: -moz-calc(100%/3);
    width: calc(100% / 3);
  }
}
@media only screen and (min-width: 1024px) {
  .hover-table-layout {
    padding: 30px;
  }
}
</style>
