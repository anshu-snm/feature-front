<template>
  <div class="listing-item">
    <figure class="image">
      <img
        src="https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzd8fGluc3VyYW5jZSUyMHBob3Rvc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
        alt="image"
      />
      <figcaption>
        <div class="caption">
          <h1>{{ event.name }}</h1>
        </div>
      </figcaption>
    </figure>
    <div class="listing">
      <h4>
        <div>Sum Insured :</div>
        <div class="highlight">{{ event.SUM_INSURED_ }}</div>
      </h4>
      <h4>
        <div>Normal room rent limit:</div>
        <div class="highlight">{{ event.NORMAL_ROOM_RENT_LIMIT_ }}</div>
      </h4>
      <h4>
        <div>Covid Hospitalization:</div>
        <div class="highlight">{{ event.COVID_19_HOSPITALISATION_ }}</div>
      </h4>
      <h4>
        <div>Emergency Ambulance Charges:</div>
        <div class="highlight">{{ event.EMERGENCY_AMBULANCE_CHARGES_ }}</div>
      </h4>
      <h4>
        <div>Maternity Benefits:</div>
        <div class="highlight">
          {{ event.MATERNITY_BENEFITS_LIMITS_AND_COVERAGES_ }}
        </div>
      </h4>
      <h4>
        <div>Pre Existing Benefits:</div>
        <div class="highlight">{{ event.PRE_EXISTING_DISEASE_ }}</div>
      </h4>
      <h4>
        <div>Day Care :</div>

        <div class="highlight">{{ event.DAY_CARE_PROCEDURES_ }}</div>
      </h4>
      <h4>
        <div>Lasik Treatment:</div>
        <div class="highlight">{{ event.LASIK_TREATMENT_ }}</div>
      </h4>
      <h4>
        <div>Dental Treatment:</div>
        <div class="highlight">{{ event.DENTAL_TREATMENT_ }}</div>
      </h4>
      <h4>
        <div>Cashless Claims:</div>
        <div class="highlight">{{ event.CASHLESS_CLAIMS_ }}</div>
      </h4>
      <h4>
        <div class="highlight1">
          <div>Total:</div>
          <b>Rs {{ event.Quote_ }}</b>
        </div>
      </h4>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "FinalList",
  props: ["event"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.highlight {
  color: blue;
}
.highlight1 {
  color: blueviolet;
  font-size: 20px;
}
</style>
