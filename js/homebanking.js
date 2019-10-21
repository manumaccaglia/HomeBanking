//Declaración de variables
var nombreUsuario = "Manu Maccaglia";
var claveIngreso = "1234";
var saldoCuenta = 21500;
var limiteExtraccion = 5000;
var saldoAnterior;
var cuentaAmiga1 = "1234567";
var cuentaAmiga2 = "7654321";
var cuentasAmigas = cuentaAmiga1, cuentaAmiga2;
//var claveAlfabetica = abc; Para validar cualquier extracción o envio de dinero. (feature no terminada en el codigo)

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}
//Validaciones
function montoInvalido(montoIngresado) {  //verifica que el monto ingresado sea válido para operar.
    if (isNaN(montoIngresado) || (montoIngresado < 0)) {
        return true;
    }
}
function saldoInsuficiente(montoIngresado) { //verifica la disponibilidad de saldo en la cuenta.
    if (montoIngresado > saldoCuenta) {
        return true;
    }
}
function cuentaAmigaInvalida(cuentaIngresada) { //verifica que la cuenta ingresada para transferir sea una cuenta amiga.
    if (cuentaIngresada != cuentasAmigas) {
        return true;
    }
}
function claveIncorrecta(claveIngresada) { //verifica que la clave ingresada sea la correcta.
    if (claveIngresada != claveIngreso) {
        return true;
    }
}


//Ingreso al Homebanking
iniciarSesion();

//Principales funciones
function sumarDinero(montoSuma) {
    saldoCuenta += montoSuma;
}
function restarDinero(montoResta) {
    saldoCuenta -= montoResta;
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimiteDeExtraccion = parseInt(prompt('Ingrese nuevo límite de extracción.'));
    if (montoInvalido(nuevoLimiteDeExtraccion)) {
        return alert('Ingrese un monto válido.');
    } else {
        limiteExtraccion = nuevoLimiteDeExtraccion;
        actualizarLimiteEnPantalla();
        alert('Su nuevo límite de extracción es de $' + nuevoLimiteDeExtraccion);
    }
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var montoExtraccion = parseInt(prompt('Ingrese monto a extraer.'));

    if (montoInvalido(montoExtraccion)) {
        return alert('Ingrese un monto válido.');
    }
    if (saldoInsuficiente(montoExtraccion)) {
        return alert('No hay saldo disponible en su cuenta para extraer esa cantidad de dinero.\nPor favor ingrese un monto menor.');
    }
    if (montoExtraccion > limiteExtraccion) {
        return alert('La cantidad de dinero que deseas extraer es mayor a tu límite de extracción.\nPor favor, ingrese un monto menor.');
    }
    if (montoExtraccion % 100 !== 0) {
        return alert('Sólo puedes extraer billetes de $100.');
    }
    restarDinero(montoExtraccion);
    actualizarSaldoEnPantalla();
    alert('Has retirado: $' + montoExtraccion + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
}

function depositarDinero() {

    var saldoAnterior = saldoCuenta;
    var montoDeposito = parseInt(prompt("Ingrese monto a depositar."));

    sumarDinero(montoDeposito);
    actualizarSaldoEnPantalla();
    alert('Has depositado: $' + montoDeposito + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);

}

function pagarServicio() {
    var agua = 350;
    var telefono = 425;
    var luz = 210;
    var internet = 570;
    var saldoAnterior = saldoCuenta;
    var servicioElegido = parseInt(prompt('Ingrese el número que corresponda con el servicio que quieres pagar.\n1- Agua.\n2- Teléfono.\n3- Luz.\n4- Internet.'));
    if (montoInvalido(servicioElegido) || servicioElegido >= 5) {
        return alert('No existe el servicio que se ha elegido.\nPor favor intente nuevamente.');
    } else {
        switch (servicioElegido) {
            case 1:
                if (saldoInsuficiente(agua)) {
                    return alert('No hay saldo suficiente en su cuenta para realizar el pago de este servicio.\nPor favor deposite dinero e intente nuevamente.');
                }
                restarDinero(agua);
                alert('Has pagado el servicio Agua.' + '\nSaldo Anterior: $' + saldoAnterior + '\nDinero descontado: $' + agua + '\nSaldo Actual: $' + saldoCuenta);
                actualizarSaldoEnPantalla();
                break;
            case 2:
                if (saldoInsuficiente(telefono)) {
                    return alert('No hay saldo suficiente en su cuenta para realizar el pago de este servicio.\nPor favor deposite dinero e intente nuevamente.');
                }
                restarDinero(telefono);
                alert('Has pagado el servicio Teléfono.' + '\nSaldo Anterior: $' + saldoAnterior + '\nDinero descontado: $' + telefono + '\nSaldo Actual: $' + saldoCuenta);
                actualizarSaldoEnPantalla();
                break;
            case 3:
                if (saldoInsuficiente(luz)) {
                    return alert('No hay saldo suficiente en su cuenta para realizar el pago de este servicio.\nPor favor deposite dinero e intente nuevamente.');
                }
                restarDinero(luz);
                alert('Has pagado el servicio Luz.' + '\nSaldo Anterior: $' + saldoAnterior + '\nDinero descontado: $' + luz + '\nSaldo Actual: $' + saldoCuenta);
                actualizarSaldoEnPantalla();
                break;
            case 4:
                if (saldoInsuficiente(internet)) {
                    return alert('No hay saldo suficiente en su cuenta para realizar el pago de este servicio.\nPor favor deposite dinero e intente nuevamente.');
                }
                restarDinero(internet);
                alert('Has pagado el servicio Internet.' + '\nSaldo Anterior: $' + saldoAnterior + '\nDinero descontado: $' + internet + '\nSaldo Actual: $' + saldoCuenta);
                actualizarSaldoEnPantalla();
                break;
            default:
                alert('Ingrese un valor válido.');
                break;
        }
    }
}

function transferirDinero() {


    var montoTransferencia = parseInt(prompt('Ingrese el monto que desea transferir.'));
    var cuentaTransferencia = prompt('Ingrese el número de cuenta a transferir');

    if (montoInvalido(montoTransferencia)) {
        return alert('Por favor ingrese un monto válido.');
    } else if (saldoInsuficiente(montoTransferencia)) {
        return alert('No hay saldo suficiente en su cuenta para realizar esta transferencia.');
    } else if (cuentaAmigaInvalida(cuentaTransferencia)) {
        return alert('Por favor ingrese una cuenta amiga válida.');
    } else {
        restarDinero(montoTransferencia);
        alert('Se han transferido $' + montoTransferencia + '\nCuenta destino: ' + cuentaTransferencia);
        actualizarSaldoEnPantalla();
    }
}


function iniciarSesion() {
    var claveIngresada = prompt('Por favor ingrese su clave.');

    if (claveIncorrecta(claveIngresada)) {
        alert('La clave ingresada es incorrecta.\nTu dinero ha sido retenido por cuestiones de seguridad.');
        saldoCuenta = 0;
        bloqueoHomebanking();

    } else {
        return alert('Bienvenido ' + nombreUsuario + ' ya puedes comenzar a realizar operaciones.');
    }
}

function cambiarClaveDeAcceso() {
    var nuevaClave = prompt('Por favor ingrese su nueva clave.');
    var confirmación = prompt('Por favor repita la clave.')
    if (nuevaClave == confirmación) {
        claveIngreso = nuevaClave;
    } else {
        return alert('Las claves ingresadas no coinciden.')
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
