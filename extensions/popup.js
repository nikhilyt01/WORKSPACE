const cc = document.querySelector(".cc");
const out = document.querySelector(".out");
const colorPreview = document.querySelector(".color-preview");
const colorText = document.querySelector(".color-text");


cc.addEventListener('input', () => {
    const selectedColor = cc.value;
    colorPreview.style.backgroundColor = selectedColor;
    colorText.textContent = `Selected Color: ${selectedColor}`;

    // Copy color to clipboard
    copyToClipboard(selectedColor);

    // Show a temporary message
    
    alert(`${selectedColor} copied to Clipboard`)
});

function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        console.log('Color copied to clipboard:', color);
    }).catch(err => {
        console.error('Failed to copy color to clipboard:', err);
    });
}
