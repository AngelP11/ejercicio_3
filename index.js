const minCaracters = (passArr) => {
    if (passArr.length < 16) return false

    return true
}

const letters = (passArr) => {
    const caracters = ['!','@','#','$','%','ˆ','&','*','-','_','+','=','?']
    let mayus = false
    let minus = false

    for (let i = 0; i <= passArr.length - 1; i++) {
        if (isNaN(passArr[i])) {
            // Ignoramos cualquier otro simbolo que no sea una letra
            if (caracters.includes(passArr[i])) continue

            if (passArr[i] === passArr[i].toUpperCase()) {
                mayus = true
            } else {
                minus = true
            }
        }
    }

    if(!mayus || !minus) {
        return false
    }

    return true
}

const notRepeat = (passArr) => {
    let status = true

    for (let i = 1; i <= passArr.length - 1; i++) {
        if (passArr[i] === passArr[i-1]) {
            status = false
        }
    }

    return status
}

const numbersCounter = (passArr) => {
    let count = 0

    for (let i = 0; i <= passArr.length - 1; i++) {
        if (parseInt(passArr[i])) {
            count++
        }
    }

    if (count < 4) {
        return false
    }

    return true
}

const specialCaracters = (passArr) => {
    const caracters = ['!','@','#','$','%','ˆ','&','*','-','_','+','=','?']
    let count = 0
    let caracters_counter = []
    let position_counter = []

    // Recorremos el array de caracteres y comprobamos que alguno este dentro del password
    for (let i = 0; i <= caracters.length - 1; i++) {
        for (let j = 0; j <= passArr.length - 1; j++) {
            if (caracters[i] == passArr[j]) {
                count++
                caracters_counter.push(caracters[i]) //Guardamos cada uno del caracteres que encontro
                position_counter.push(j) // Guardamos la posicion donde encontro los caracteres
            }
        }
    }

    if (count >= 2) {
        // Convertimos el contador de caracteres en un Set o Conjunto, que no permite valores repetidos y lo comparamos con la longitud orginal del password
        if (new Set(caracters_counter).size == caracters_counter.length) {
            for (let k = 1; k <= position_counter.length - 1; k++) {
                // Para comprobar que no estan juntos, restamos las posiciones que tienen dentro del password y si da 1 o -1, entonces estan juntos
                const ecu = position_counter[k] - position_counter[k-1]

                if (ecu == 1 || ecu == -1) {
                    return false
                }
            }
        } else {
            return false
        }
    } else {
        return false
    }

    return true
}

const notZeroOrSpace = (passArr) => {
    if (passArr.includes('0') || passArr.includes(' ')) return false

    return true
}

const validate = (password) => {
    const pass_split = password.split("")
    let status = true

    if (!letters(pass_split)) {
        console.log("La contrasena debe contener al menos una mayuscula")
        status = false
    }

    if (!minCaracters(pass_split)) {
        console.log("La contrasena debe contener al menos 16 caracteres")
        status = false
    }

    if (!notRepeat(pass_split)) {
        console.log("La contrasena NO puede tener 2 caracteres iguales seguidos")
        status = false
    }

    if (!numbersCounter(pass_split)) {
        console.log("La contrasena debe contener al menos 4 numeros")
        status = false
    }

    if (!specialCaracters(pass_split)) {
        console.log("La contrasena debe contener al menos 2 caracteres especiales, sin repetirse y sin ir seguidos")
        status = false
    }

    if (!notZeroOrSpace(pass_split)) {
        console.log("La contrasena no puede contener '0' o espacios en blanco")
        status = false
    }

    if (status) console.log("Contrasena valida!")
}

//Comprobamos que el password sea valido
validate("Ad@mi#n123456789")