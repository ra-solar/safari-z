let carImage;
let backgroundImage;
let animalImages = [];
let carX = 0, carY = 0; // Start at the top-left corner of the background
let carSpeed = 5;
let angle = 0;
let showingAnimal = false;
let animalStartTime;
let currentAnimalImage;
let backgroundWidth, backgroundHeight;

function preload() {
  // Load and resize the car image
  carImage = loadImage("images/toyota.png", function () {
    carImage.resize(carImage.width / 2, 0);
  });
  backgroundImage = loadImage("images/forest.png");

  // Load animal images
  for (let i = 1; i <= 28; i++) {
    // Format the number with leading zeros
    let number = String(i).padStart(2, "0");
    let img = loadImage(`images/animales/animal-${number}.png`);
    animalImages.push(img);
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // Set background dimensions
  backgroundWidth = backgroundImage.width * 5; // Adjust the scaling factor as needed
  backgroundHeight = backgroundImage.height * 5;
}

function draw() {
  if (showingAnimal) {
    // Display the animal image fullscreen
    image(currentAnimalImage, 0, 0, width, height);

    // Check if 2 seconds have passed
    if (millis() - animalStartTime >= 2000) {
      showingAnimal = false; // Return to the game
    }
  } else {
    // Update car position based on key presses
    if (keyIsDown(LEFT_ARROW)) {
      carX -= carSpeed;
      angle = PI; // Rotate 180 degrees
    }
    if (keyIsDown(RIGHT_ARROW)) {
      carX += carSpeed;
      angle = 0; // No rotation
    }
    if (keyIsDown(UP_ARROW)) {
      carY -= carSpeed;
      angle = -HALF_PI; // Rotate -90 degrees (up)
    }
    if (keyIsDown(DOWN_ARROW)) {
      carY += carSpeed;
      angle = HALF_PI; // Rotate 90 degrees (down)
    }

    // Constrain carX and carY
    carX = constrain(carX, -(backgroundWidth - width/2), (backgroundWidth - width)/2);
    carY = constrain(carY, -(backgroundHeight - height)/2, (backgroundHeight - height)/2);

    // Draw the background moving opposite to the car's movement
    push();
    imageMode(CENTER);
    translate(-carX, -carY);
    image(backgroundImage,0, 0, backgroundWidth, backgroundHeight);
    pop();

    // Draw the car centered on the screen
    push();
    translate(width / 2, height / 2);
    rotate(angle);
    imageMode(CENTER);
    image(carImage, 0, 0);
    pop();
  }
}

function keyPressed() {
  if (keyCode === 32 && !showingAnimal) {
    // 32 is the keycode for the space bar
    // Pick a random animal image
    currentAnimalImage = random(animalImages);
    // Set the flag to show the animal image
    showingAnimal = true;
    // Record the start time
    animalStartTime = millis();
  }
}
