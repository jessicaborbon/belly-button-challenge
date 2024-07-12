

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});
// Build the metadata panel
function buildMetadata(sample) {
  // d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    d3.json(url).then((data) => {
      // get the metadata field
      let metadata = data.metadata;

     // Filter the metadata for the object with the desired sample number
      let value = metadata.filter(sampleObj => sampleObj.id == sample);

      // Log the array of metadata objects after the have been filtered
        console.log(value)

    // Get the first index from the array
      let valueData = value[0];

      // Use `.html("") to clear any existing metadata
      d3.select("#sample-metadata").html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
      Object.entries(valueData).forEach(([key, value]) => {
        
        console.log(key,value);
        
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};


  // d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

// function to build both charts
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

      // Get the samples field
      let samplesInfo = data.samples;

      // Filter the samples for the object with the desired sample number
      let value = samplesInfo.filter(sampleObj => sampleObj.id == sample);

      // Get the first index from the array
     let valueData = value[0];

      // Get the otu_ids, otu_labels, and sample_values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;
  
      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);
    
    
      // Render the Bubble Chart
      let trace = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
      }
  };
     // Set up the layout
      let layout = {
           title: "Bacteria Per Sample",
           hovermode: "closest",
            xaxis: {title: "OTU ID"},
      };

      // Call Plotly to plot the bubble chart
      Plotly.newPlot("bubble", [trace], layout)
  });
};
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    function buildBarChart(sample) {
      
         // Use D3 to retrieve all of the data
      d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(sampleObj => sampleObj.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
    // Don't forget to slice and reverse the input data appropriately
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
 
      // Set up the trace for the bar chart
      let trace1 = {
       x: xticks,
       y: yticks,
       text: labels,
       type: "bar",
       orientation: "h"
  };

// Setup the layout
    let layout = {
    title: "Top 10 OTUs Present"
  };

    // Render the Bar Chart
    Plotly.newPlot("bar", [trace1], layout)

  });
};



  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {
  console.log(data);
});

function init() {
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
      // Set a variable for the sample names
      d3.json(url).then((data) => {
        
        let names = data.names;

       // Add  samples to dropdown menu
        names.forEach((id) => {

        // Log the value of id for each iteration of the loop
          console.log(id);

        dropdownMenu.append("option")
        .text(id)
        .property("result",id);
    });

    // Set the first sample from the list
      let sample_one = names[0];

     // Log the value of sample_one
      console.log(sample_one);

      // Build the initial plots
      buildMetadata(sample_one);
      buildBarChart(sample_one);
      buildBubbleChart(sample_one);

  });

};

// Function for event listener
function optionChanged(value) {
  // Build charts and metadata panel each time a new sample is selected

  // Log the new value
  console.log(value); 

 // Call all functions 
 buildMetadata(value);
 buildBarChart(value);
 buildBubbleChart(value);

};

// Initialize the dashboard
init();
