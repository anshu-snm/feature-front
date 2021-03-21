<template>
  <div id="app">
    <label v-show="homePage"
      >Files
      <input
        type="file"
        id="files"
        ref="files"
        multiple
        v-on:change="handleFilesUpload()"
      />
    </label>
    <div v-for="event in events" :key="event.title" v-show="homePage">
      {{ event.title }}
    </div>
    <div v-show="homePage">{{ result_final }}</div>
    <div
      v-for="(file, key) in files"
      :key="file.name"
      class="file-listing"
      v-show="homePage"
    >
      {{ file.name }}
      <span class="remove-file" v-on:click="removeFile(key)">Remove</span>
    </div>
    <button v-on:click="addFiles()" v-show="homePage">Add Files</button>
    <button v-on:click="onClicked()" v-show="homePage">
      <router-link to="/users">Press me</router-link>
    </button>
    <button v-on:click="onPressed()" v-show="homePage">jhb</button>
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
              title
              description
              date
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
                  title
                  description
                  date
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
    //for testing only , here the result_final is getting updated on clicking onpressed, but not with handlefileupload
    onPressed() {
      this.result_final = [{ title: "gvx", description: "nxk" }];
    },

    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      // result_final = [{ title: "ko", description: "vbhb", date: "jxbcjb" }];

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }

      var f = uploadedFiles[0];
      var reader = new FileReader();
      reader.onload = function(e) {
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
        const final_event = [];
        // printing it back to UI
        var resultString = "";
        // this.result_final = [
        //   { title: "fjvbjfvb", description: "fgdb", date: "dvndjbv" }
        // ];
        this.result_final = [
          { title: "fjvbjfvb", description: "fgdb", date: "dvndjbv" }
        ];
        // this.result_final.push(final);

        for (var i = 0; i < result.length; i++) {
          var temp = result[i];

          //           const {
          //     name: kA,
          //     FAMILY CRITERIA: kB,
          //     SUM INSURED: kC,
          // } = {...temp}
          // console.log(temp["SUM INSURED"]);

          final_event.push(temp);
        }
        console.log(final_event);
        console.log(this.result_final);
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
          title
          description
          date
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
