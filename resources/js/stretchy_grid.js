// How much thinner than the overall width a row can be before being scaled up,
// moving on to the next row
var GOAL_WIDTH_THRESHOLD_PX = 0;

function resizeGrid(grid) {
  let images = Array.from(grid.children);
  let width = grid.offsetWidth;
  let rowGoalHeight = Number(grid.getAttribute('data-row-height'));
  let pad = Number(grid.getAttribute('data-padding'));

  // Loop through all of this grid's images
  let img;
  let rowHeight;
  let ratio;
  let rowWidth = 0;
  let rowPad = -pad;
  let rowBuffer = [];

  for (let i=0; i<images.length; i++) {
    img = images[i];

    //.push adds img to rowBuffer array
    rowBuffer.push(img);

    // Get image's aspect ratio (w/h)
    ratio = img.getAttribute('data-aspect-ratio');

    // Multiply ratio by goal height and sum widths
    rowWidth += ratio * rowGoalHeight;
    rowPad += pad;

    // If row width is within the goal width threshold, increase the row height
    // to perfectly fit row to grid width
    if (i === images.length-1
        || rowWidth+rowPad > width-GOAL_WIDTH_THRESHOLD_PX) {
      // Subtract out the padding before determining the row height since
      // it is fixed and won't scale with the width
      rowHeight = rowGoalHeight * (width-rowPad-1) / rowWidth;

      //Runs through each image of rowBuffer array
      for (let rowImg of rowBuffer) {
        // Set new, scaled dimensions for each of this row's images
        ratio = rowImg.getAttribute('data-aspect-ratio');
        rowImg.style.height = rowHeight + 'px';
        rowImg.style.width = rowHeight*ratio + 'px';
        rowImg.style.marginLeft = pad + 'px';
        rowImg.style.marginBottom = pad + 'px';
      }

      rowBuffer[0].style.marginLeft = '0';  // Remove margin from first row img
      rowWidth = 0;
      rowPad = -pad;
      rowBuffer = [];
    }
  }

}

function initStretchyGrids() {
  let grids = document.getElementsByClassName('artworks');
  for (let grid of grids) {
    grid.style.marginRight = grid.getAttribute('data-padding') + 'px';

    for (let img of grid.getElementsByTagName('img')) {
      // Store the image aspect ratio in a data attribute
      img.setAttribute('data-aspect-ratio', img.offsetWidth / img.offsetHeight);
    }
    new ResizeObserver(entry => {resizeGrid(grid)}).observe(grid.parentElement);
  }
}

initStretchyGrids();
