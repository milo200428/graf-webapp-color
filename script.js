// Función para convertir RGB a Hexadecimal
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Función para convertir Hexadecimal a RGB
function hexToRgb(hex) {
    // Eliminar el "#" si está presente
    hex = hex.replace(/^#/, '');
    // Convertir a valores RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Función para actualizar el color y el código hexadecimal
function updateColor() {
    // Obtener los valores de los controles deslizantes
    const red = document.getElementById('red').value;
    const green = document.getElementById('green').value;
    const blue = document.getElementById('blue').value;

    // Actualizar los campos de texto
    document.getElementById('red-input').value = red;
    document.getElementById('green-input').value = green;
    document.getElementById('blue-input').value = blue;

    // Actualizar el color del recuadro
    const colorBox = document.getElementById('color-box');
    colorBox.style.backgroundColor = rgb(${red}, ${green}, ${blue});

    // Actualizar el código hexadecimal
    const hexCode = document.getElementById('hex-code');
    hexCode.textContent = rgbToHex(parseInt(red), parseInt(green), parseInt(blue));

    // Actualizar el color picker
    document.getElementById('color-picker').value = rgbToHex(parseInt(red), parseInt(green), parseInt(blue));
}

// Función para actualizar los controles deslizantes desde los campos de texto
function updateFromInput() {
    // Obtener los valores de los campos de texto
    let red = document.getElementById('red-input').value;
    let green = document.getElementById('green-input').value;
    let blue = document.getElementById('blue-input').value;

    // Validar que los valores estén dentro del rango (0-255)
    red = Math.min(255, Math.max(0, red));
    green = Math.min(255, Math.max(0, green));
    blue = Math.min(255, Math.max(0, blue));

    // Actualizar los controles deslizantes
    document.getElementById('red').value = red;
    document.getElementById('green').value = green;
    document.getElementById('blue').value = blue;

    // Actualizar el color
    updateColor();
}

// Función para actualizar los controles desde el color picker
function updateFromColorPicker() {
    // Obtener el valor hexadecimal del color picker
    const hex = document.getElementById('color-picker').value;

    // Convertir el valor hexadecimal a RGB
    const { r, g, b } = hexToRgb(hex);

    // Actualizar los controles deslizantes y campos de texto
    document.getElementById('red').value = r;
    document.getElementById('green').value = g;
    document.getElementById('blue').value = b;
    document.getElementById('red-input').value = r;
    document.getElementById('green-input').value = g;
    document.getElementById('blue-input').value = b;

    // Actualizar el color
    updateColor();
}

// Asignar eventos a los controles deslizantes
document.getElementById('red').addEventListener('input', updateColor);
document.getElementById('green').addEventListener('input', updateColor);
document.getElementById('blue').addEventListener('input', updateColor);

// Asignar eventos a los campos de texto
document.getElementById('red-input').addEventListener('input', updateFromInput);
document.getElementById('green-input').addEventListener('input', updateFromInput);
document.getElementById('blue-input').addEventListener('input', updateFromInput);

// Asignar evento al color picker
document.getElementById('color-picker').addEventListener('input', updateFromColorPicker);

// Inicializar el color al cargar la página
updateColor();