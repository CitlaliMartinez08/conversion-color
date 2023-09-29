

// Obtener elementos del DOM
const colorPicker = document.getElementById("colorPicker");
const coloredDiv = document.getElementById("coloredDiv");
const rgbValue = document.getElementById("rgbValue");
const hslValue = document.getElementById("hslValue");
const hexValue = document.getElementById("hexValue");
const hslaValue = document.getElementById("hslaValue");
const cmykValue = document.getElementById("cmykValue");
const hwbValue = document.getElementById("hwbValue");

// Función para actualizar los campos de texto con los valores de color
function updateColorValues() {
    const selectedColor = colorPicker.value;
    coloredDiv.style.backgroundColor = selectedColor;

    // Convertir el color seleccionado a diferentes formatos y mostrarlos
    const rgb = hexToRgb(selectedColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Mostrar los valores RGB
    rgbValue.value = `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    // Mostrar los valores HSL
    hslValue.value = `HSL(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    // Mostrar los valores HEX
    hexValue.value = selectedColor;

    // Mostrar los valores HSLA
    hslaValue.value = `HSLA(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1.0)`;

    // Calcular los valores CMYK
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    cmykValue.value = `CMYK(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

    // Calcular los valores HWB
    const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
    hwbValue.value = `HWB(${hwb.h}, ${hwb.w}%, ${hwb.b}%)`;
}

// Agregar un event listener para el cambio de color
colorPicker.addEventListener("input", updateColorValues);

// Llamar a la función inicialmente para mostrar los valores iniciales
updateColorValues();

// Función para convertir HEX a RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Función para convertir RGB a CMYK
function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);
    return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

// Función para convertir RGB a HWB
function rgbToHwb(r, g, b) {
const hsl = rgbToHsl(r, g, b);
const w = Math.min(r, g, b) / 255; // Normalizar a un rango de 0 a 1
const bVal = 1 - (Math.max(r, g, b) / 255); // Normalizar a un rango de 0 a 1
return { h: hsl.h, w: Math.round(w * 100), b: Math.round(bVal * 100) };
}

// Función para convertir RGB a HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
