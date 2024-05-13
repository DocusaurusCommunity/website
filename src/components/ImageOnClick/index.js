"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react"); // Import React and useState hook
var useBaseUrl_1 = require("@docusaurus/useBaseUrl"); // Import the useBaseUrl function from Docusaurus
var styles_module_scss_1 = require("./styles.module.scss"); // Import styles from SCSS module
// Define the ImageOnClick component as a functional component
var ImageOnClick = function (_a) {
    var imageUrl = _a.imageUrl, altText = _a.altText, buttonName = _a.buttonName;
    var _b = (0, react_1.useState)(false), showImg = _b[0], setShowImg = _b[1]; // State to track whether image should be shown or hidden
    var generatedImageUrl = (0, useBaseUrl_1.default)(imageUrl); // Use the useBaseUrl function to generate the image URL
    return (<span>
      {/* Button to toggle visibility of the image */}
      <a onClick={function () { return setShowImg(!showImg); }} className={styles_module_scss_1.default.cursor}>
        {buttonName}  
      </a>
      {/* Conditionally render the image if showImg is true */}
      {showImg && (<span className={styles_module_scss_1.default.imageonclick}>
          {/* Image element */}
          <img src={generatedImageUrl} alt={altText}/> 
        </span>)}
    </span>);
};
exports.default = ImageOnClick; // Export the ImageOnClick component
