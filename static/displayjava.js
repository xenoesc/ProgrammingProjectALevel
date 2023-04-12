// Get the HTML elements for the gauge and gauge text
const gaugeElement = document.querySelector(".gauge");
const gaugeTextElement = document.querySelector(".gauge-container .gauge__text");

// Define an array of colors to be used for the gauge
const colors = ['#009578', '#00a96f', '#00c366', '#92c800', '#f7a600', '#ff7f00', '#ff4d4d', '#d42727', '#b30909'];

// Get the gauge value from a template variable (assumed to be a number between 0 and 1)
const gaugeValue = {{ gauge_value }};

// Define a function to set the gauge value and update the gauge display
function setGaugeValue(gauge, value) {
  // Check that the value is between 0 and 1
  if (value < 0.00 || value > 1.00) {
    return;
  }

  // Set up variables for animating the gauge
  let current = 0;
  const increment = value / 50; // Adjust the increment value to control the animation speed

  // Use setInterval to animate the gauge until it reaches the desired value
  const interval = setInterval(() => {
    current += increment;
    if (current >= value) {
      clearInterval(interval);
      // Display the gauge text with a message based on the gauge value
      gaugeTextElement.style.display = "block";
      if (value <= 0.25) {
        gaugeTextElement.innerText = "This screenshot presents a low likelihood of being illegitimate. However, this tool is not 100% accurate, so please use common sense when replying to emails and clicking links.";
      } else if (value <= 0.75) {
        gaugeTextElement.innerText = "This screenshot presents a reasonable likelihood of being illegitimate. Please be careful when replying or clicking links in this email, and check all senders are legitimate.";
      } else {
        gaugeTextElement.innerText = "This screenshot presents a high likelihood of being illegitimate. It is not recommended that you do not reply to this email or click any links contained in it.";
      }
    }

    // Set the gauge color based on the current value
    const colorIndex = Math.floor(current / (1 / colors.length));
    const color = colors[colorIndex];
    gauge.querySelector(".gauge__fill").style.background = color;

    // Rotate the gauge fill based on the current value
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${current / 2.025}turn)`;

    // Update the gauge cover text with the current percentage
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(current * 99)}%`;
  }, 20);
}

// Call the setGaugeValue function with the gauge element and gauge value
setGaugeValue(gaugeElement, gaugeValue);